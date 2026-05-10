const express = require('express');
const userController = express.Router();
const userService = require('../services/userService');

userController.get('/register', (request, response) => {
    response.render('register');
});

userController.post('/register', async (request, response) => {
    const userForm = request.body;
    console.log(userForm);

    await userService.register(userForm);

    response.redirect('/login');
    response.end();
});

userController.get('/login', (request, response) => {
    response.render('login');
});

userController.post('/login', async (request, response) => {
    const { email, password } = request.body;
    const token = await userService.login(email, password);
    console.log(token);

    response.cookie('user', token);

    response.redirect('/');
});

userController.get('/logout', (request, response) => {
    response.clearCookie('user');
    response.redirect('/');
});

module.exports = userController;
