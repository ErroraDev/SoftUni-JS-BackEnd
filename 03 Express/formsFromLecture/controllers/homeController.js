const router = require('express').Router();

router.get('/', (request, response) => {
    response.render('home');
});

router.get('/about', (request, response) => {
    response.render('pages/about');
});

module.exports = router;
