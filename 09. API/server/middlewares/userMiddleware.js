const jsonwebtoken = require('jsonwebtoken');
const { secretKey } = require('../config');

exports.userMiddleware = (request, response, next) => {
    const token = request.headers['x-authorization'];

    if(!token){
       return next();
    }

    try {
        const decodedToken = jsonwebtoken.verify(token, secretKey);

        request.user = decodedToken;
        
        next();
    } catch (error) {
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
