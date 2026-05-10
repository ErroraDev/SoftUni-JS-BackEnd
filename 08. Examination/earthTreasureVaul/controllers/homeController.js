const homeController = require('express').Router();
const { isAuthenticated } = require('../middlewares/userMiddleware');
const stoneService = require('../services/stoneService');
const searchService = require('../services/searchService');

homeController.get('/', async (request, response) => {
    const stonesTheLastThree = await stoneService.getLastThree().lean();
    response.render('home', { stonesTheLastThree });
});

homeController.get('/search', async (request, response) => {
    const stoneName = request.query.name;

    const stonesFromSearch = await searchService.searchFromDatabase(stoneName);

    response.render('search', { stonesFromSearch, stoneName });
});

module.exports = homeController;
