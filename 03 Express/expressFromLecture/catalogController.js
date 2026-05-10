const { Router } = require('express');

const router = Router();

router.get('/product', (request, response) => {
    response.send('Catalog Page');
});

router.get('/product/:productId', (request, response) => {
    response.send('Product details page ' + request.params.productId);
});

router.get('/product/:location/:id', (request, response) => {
    response.send('Nested parameters ' + request.params.location + ', ' + request.params.id);
});

module.exports = {
    router
}
