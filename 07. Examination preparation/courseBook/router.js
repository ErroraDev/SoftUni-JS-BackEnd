const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const courseController = require('./controllers/courseController');

router.use('/', homeController);
router.use('/user', userController);
router.use('/courses', courseController);
router.all('*', (request, response) => {
    response.render('404');
});

module.exports = router;
