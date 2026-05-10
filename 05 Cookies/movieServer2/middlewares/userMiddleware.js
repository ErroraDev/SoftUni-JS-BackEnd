const { } = require('../');
const jsonWebToken = require('jsonwebtoken');
const util = require('util');
const { secretKey } = require('../config/configVariables');

exports.userMiddleware = async (request, response, next) => {
    const token = request.cookies['user'];

    if (!token) {
        return next();
    }

    const verify = util.promisify(jsonWebToken.verify);
    try {
        const decodedToken = await verify(token, secretKey);

        request.user = decodedToken;
        response.locals.isAuthenticate = true;

        next();
    } catch (error) {
        response.clearCookie('user');
        response.redirect('/login');
    }

};

exports.isAuthenticate = (request, response, next) => {
    if(!request.user){
        return response.redirect('/login');
    }

    next();
};
