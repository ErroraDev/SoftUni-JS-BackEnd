const { create } = require('../services/productService');

const router = require('express').Router();

router.get('/', (request, response) => {
    response.render('create');
});

// router.post('/', (request, response) => {
//     console.log('handling post');
//     console.log(request.body);

//     create(request.body.name, Number(request.body.price));

//     response.redirect('/catalog');
// });

router.post('/', async (request, response, next) => {
    console.log('handling post');
    console.log(request.body);

    try {
        await create(request.body.name, Number(request.body.price));
    } catch (error) {
        next(error);
    }

    response.redirect('/catalog');
});

module.exports = router;
