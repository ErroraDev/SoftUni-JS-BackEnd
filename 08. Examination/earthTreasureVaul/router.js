const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const stoneController = require('./controllers/stoneController')

router.use('/', homeController);
router.use('/user', userController);
router.use('/stones', stoneController);

router.all('*', (request, response) => {
    response.render('404');
});

module.exports = router;
