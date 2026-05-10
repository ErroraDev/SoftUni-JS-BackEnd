const express = require('express');
const router = express.Router();
const homeController = require('./controllers/homeController');
const movieController = require('./controllers/movieController');
const castController = require('./controllers/castController');
const userController = require('./controllers/userController');

router.use(movieController);
router.use(castController);
router.use(userController);
router.use(homeController);

router.get('*', (request, response) => {
    response.render('404');
});

module.exports = router;
