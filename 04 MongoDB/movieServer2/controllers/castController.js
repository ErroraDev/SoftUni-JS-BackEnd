const express = require('express');
const castController = express.Router();
const castService = require('../services/castService');

castController.get('/cast/create', (request, response) => {
    response.render('cast-create');
});

castController.post('/cast/create', async (request, response) => {
    const newCast = request.body;

    await castService.createCastAndUploadToDatabase(newCast);

    response.redirect('/');
});

module.exports = castController;
