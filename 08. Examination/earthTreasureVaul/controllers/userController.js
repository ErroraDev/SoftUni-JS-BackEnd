const userController = require('express').Router();

const { isGuest, isAuthenticated } = require('../middlewares/userMiddleware');
const userService = require('../services/userService');
const { getErrorMessage } = require('../utility/errorsUtility');

userController.get('/register', isGuest, (request, response) => {
    response.render('user/register');
});

userController.post('/register', isGuest, async (request, response) => {
    const userForm = request.body;

    try {
        const token = await userService.register(userForm);

        response.cookie('user', token);
        response.redirect('/');
    } catch (error) {
        response.render('user/register', {
            email: userForm.email,
            error: getErrorMessage(error)
        });
    }
});

userController.get('/login', isGuest, (request, response) => {
    response.render('user/login');
});

userController.post('/login', isGuest, async (request, response) => {
    const loginData = request.body;
    try {
        const token = await userService.login(loginData);

        response.cookie('user', token);
        response.redirect('/');
    } catch (error) {
        response.render('user/login', { email: loginData.email, error: getErrorMessage(error) });
    }
});

userController.get('/logout', isAuthenticated, (request, response) => {
    response.clearCookie('user');
    response.redirect('/');
});

module.exports = userController;
