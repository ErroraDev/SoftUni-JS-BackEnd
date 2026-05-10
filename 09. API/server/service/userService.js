const User = require("../models/User");
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secretKey } = require("../config");

exports.register = async (userData) => {
    if (userData.password && userData.password != userData.repeatPassword) {
        throw new Error('Password missmatch here');
    }

    const user = await User.create(userData);

    const token = jsonWebToken.sign({
        userId: user._id,
        email: user.email
    }, secretKey);

    return {
        userId: user._id,
        email: user.email,
        token
    }
};

exports.login = async (userData) => {

    const userFinded = await User.findOne({ email: userData.email })

    if (!userFinded) {
        throw new Error('User or Password do not match - user');
    }

    const isValid = await bcrypt.compare(userData.password, userFinded.password);
    if(!isValid){
        throw new Error('User or Password do not match - password');
    }

    const token = jsonWebToken.sign({
        userId: userFinded.id,
        email: userFinded.email
    }, 'secretkey123456');

    return {
        userId: userFinded._id,
        email: userFinded.email,
        token
    }
};
