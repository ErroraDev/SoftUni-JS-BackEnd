const router = require('express').Router();
const { request, response } = require('express');
const { getList, getById, deleteById } = require('../services/productService');

router.get('/', (request, response) => {
    const products = getList();
    response.render('catalog', {
        products
    });
});

router.get('/:productId', (request, response) => {
    const id = request.params.productId;
    const product = getById(id);
    if (product) {
        response.render('details', product);
    } else {
        response.render('missingProduct', {
            id
        });
    }
});

router.get('/:productId/delete', (request, response) => {
    const id = request.params.productId;
    const product = getById(id);
    if (product) {
        response.render('delete', product);
    } else {
        response.render('missingProduct', {
            id
        });
    }
});

router.post('/:productId/deleteConfirm', async (request, response) => {
    const id = request.params.productId;
    const product = getById(id);
    if (product) {
        await deleteById(id);
        response.redirect('/catalog');
    } else {
        response.render('missingProduct', {
            id
        });
    }
});

module.exports = router;
