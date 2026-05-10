const User = require('../models/User');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const { secretKey } = require('../config/configVariables');

exports.register = (userForm) => {
    if (userForm.password != userForm.repeatPassword) {
        throw new Error('Passwords are not the same');
    }

    return User.create(userForm);
};

exports.login = async (email, password) => {
    const userFromDatabase = await User.findOne({ email });

    if (!userFromDatabase) {
        //throw new Error('User doesn\'t exist');
        throw new Error('User or password are not correct');
    }

    const isMatched = await bcrypt.compare(password, userFromDatabase.password);
    if (!isMatched) {
        throw new Error('User or password are not correct');
    }

    const payload = {
        _id: userFromDatabase._id,
        email: userFromDatabase.email
    }
    const token = await jsonWebToken.sign(payload, secretKey, { expiresIn: '2h' });

    return token;
};

function signUser(payload, secret, options = {}) {
    const loginPromise = new Promise((resolve, reject) => {
        jsonWebToken.sign(payload, secret, options, (error, token) => {
            if (error) {
                return reject(error);
            }

            resolve(token);
        });
    });

    return loginPromise;
}
