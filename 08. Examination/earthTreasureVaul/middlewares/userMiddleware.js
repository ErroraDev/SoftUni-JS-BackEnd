const jsonwebtoken = require('jsonwebtoken');
const { secretKey } = require('../config');

exports.userMiddleware = async (request, response, next) => {
    const token = request.cookies['user'];

    if(!token){
       return next();
    }

    try {
        const decodedToken = await jsonwebtoken.verify(token, secretKey);

        request.user = decodedToken;
        response.locals.isAuthenticated = true;
        response.locals.user = decodedToken;

        next();
    } catch (error) {
        response.clearCookie('user');
        response.redirect('/user/login');
    }
};

exports.isAuthenticated = (request, response, next) => {
    if (!request.user) {
        return response.redirect('/user/login');
    }

    next();
};

exports.isGuest = (request, response, next) => {
    if (request.user) {
        return response.redirect('/');
    }

    next();
};
