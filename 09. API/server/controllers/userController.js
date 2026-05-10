const userController = require('express').Router();

const userService = require('../service/userService');

userController.post('/register', async (request, response) => {
    const userData = request.body;
    
    const { userId, email, token } = await userService.register(userData);

    response.json({
        _id: userId,
        email,
        accessToken: token
    });
});

userController.post('/login', async (request, response) => {
    const userData = request.body;
    
    const { userId, email, token } = await userService.login(userData);

    response.json({
        _id: userId,
        email,
        accessToken: token
    });
});

userController.get('/logout', async (request, response) => {
    response.json({ ok: true});
});

module.exports = userController;
