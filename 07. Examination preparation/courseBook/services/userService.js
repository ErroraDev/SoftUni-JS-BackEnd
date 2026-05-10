const User = require('../models/User');
const bcrypt = require('bcrypt');

const jsonwebtoken = require('jsonwebtoken');
//const util = require('util');
//const jsonwebtokenSign = util.promisify(jsonwebtoken.sign());
//const jsonwebtokenVerify = util.promisify(jsonwebtoken.verify());
const { secretKey } = require('../config');

exports.register = async (userForm) => {
    const userFromDatabase = await User.findOne({ email: userForm.email });

    if(userFromDatabase){
        throw new Error('You must use another email');
    }

    const createdUser = await User.create(userForm);
    console.log(createdUser.createdAt);

    const token = await generateToken(createdUser);

    return token;
};

exports.login = async ({ email, password }) => {
    const userFromDatabase = await User.findOne({ email });

    if (!userFromDatabase) {
        throw new Error('Username or password is invalid');
    }

    const isValid = await bcrypt.compare(password, userFromDatabase.password);

    if (!isValid) {
        throw new Error('Username or password is invalid');
    }

    const token = await generateToken(userFromDatabase);

    return token;
};

function generateToken(userObject){
    const payload = {
        _id: userObject._id,
        username: userObject.user,
        email: userObject.email
    };

    return jsonwebtoken.sign(payload, secretKey, { expiresIn: '2h'});
};

exports.getUser = (userId) => User.findById(userId).populate(['createdCourses', 'signedUpCourses']);
