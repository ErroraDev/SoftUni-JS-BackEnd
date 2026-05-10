const express = require('express');
const router = express.Router();
const homeController = require('./controllers/homecontroller');
const movieController = require('./controllers/movieController');

router.use(movieController);
router.use(homeController);

router.get('*', (request, response) => {
    response.render('404');
});

module.exports = router;
