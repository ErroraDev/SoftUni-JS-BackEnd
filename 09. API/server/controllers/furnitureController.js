const furnitureController = require('express').Router();
const furnitureService = require('../service/furnitureService');

furnitureController.get('/', async (request, response) => {
    let queryString = request.query.where;
    queryString = queryString?.replace('_ownerId=', '').replace(/"/g, '');

    if (queryString) {
        let queryObject = {};
        queryObject['_ownerId'] = queryString;

        const myFurnitures = await furnitureService.specific(queryObject);

        console.log(myFurnitures);
        response.json(myFurnitures);
    }else{
        const furnituresAll = await furnitureService.getAll();
        response.json(furnituresAll);
    }
});

furnitureController.post('/', async (request, response) => {
    let furnitureData = request.body;
    furnitureData = { ...furnitureData, _ownerId: request.user.userId };
    const furnitureCurrent = await furnitureService.create(furnitureData);

    response.json(furnitureCurrent);//or {ok: true});
});

furnitureController.get('/:furnitureId', async (request, response) => {
    const furnitureSearched = await furnitureService.getOne(request.params.furnitureId);

    response.json(furnitureSearched);
});

furnitureController.put('/:furnitureId', async (request, response) => {
    const furnitureData = request.body;
    const furnitureSearched = await furnitureService.update(request.params.furnitureId, furnitureData);

    response.json(furnitureSearched);
});

furnitureController.delete('/:furnitureId', async (request, response) => {
    await furnitureService.delete(request.params.furnitureId);

    response.json({ ok: true });
});

module.exports = furnitureController;
