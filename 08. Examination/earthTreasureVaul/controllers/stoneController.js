const stoneController = require('express').Router();

const { isAuthenticated } = require('../middlewares/userMiddleware');
const { getErrorMessage } = require('../utility/errorsUtility');
const stoneService = require('../services/stoneService');

stoneController.get('/create', isAuthenticated, (request, response) => {
    response.render('stones/create');
});

stoneController.post('/create', isAuthenticated, async (request, response) => {
    const stoneForm = request.body;

    try {
        const createdStone = await stoneService.create(request.user._id, stoneForm);

        response.redirect('/stones');
    } catch (error) {
        response.render('stones/create', { ...stoneForm, error: getErrorMessage(error) });
    }
});

stoneController.get('/', async (request, response) => {
    const stonesAll = await stoneService.getAll().lean();

    response.render('stones/dashboard', { stonesAll });
});

stoneController.get('/:stoneId/details', async (request, response) => {
    const stoneDetails = await stoneService.getOneWithOwnerAndLikes(request.params.stoneId).lean();
    const stoneOwnerId = stoneDetails.owner._id.toString();

    const isOwner = stoneOwnerId && stoneOwnerId == request.user?._id; //optional chaining if there is no ? and the value is undefined it will crash
    const isLiked = stoneDetails.likedList.some(user => user._id.toString() == request.user?._id);

    request.stoneCurrent = stoneDetails;

    response.render('stones/details', { ...stoneDetails, isOwner, isLiked });
});

stoneController.get('/:stoneId/like', isAuthenticated, async (request, response) => {
    await stoneService.like(request.params.stoneId, request.user._id);

    response.redirect(`/stones/${request.params.stoneId}/details`);
});

stoneController.get('/:stoneId/delete', isAuthenticated, async (request, response) => {

    if (isStoneOwner(request.params.stoneId, request.user?._id)) {
        await stoneService.delete(request.params.stoneId);
    }

    response.redirect('/stones');
});

stoneController.get('/:stoneId/edit', isAuthenticated, loadStoneInRequest, async (request, response) => {
    if (isStoneOwner(request.params.stoneId, request.user?._id)) {
        response.render('stones/edit', { ...request.stoneCurrent });
    } else {
        response.redirect('/stones');
    }
});

stoneController.post('/:stoneId/edit', isAuthenticated, async (request, response) => {
    if (isStoneOwner(request.params.stoneId, request.user?._id)) {
        const courseEditForm = request.body;

        try {
            await stoneService.edit(request.params.stoneId, courseEditForm);
            response.redirect(`/stones/${request.params.stoneId}/details`);
        } catch (error) {
            response.render('stones/edit', { error: getErrorMessage(error), ...courseEditForm, _id: request.params.stoneId});
        }
    } else {
        response.redirect('/stones');
    }
});

async function isStoneOwner(stoneId, userId) {
    const stone = await stoneService.getOne(stoneId).lean();
    const ownerId = stone.owner.toString();

    if (ownerId && ownerId == userId) {
        return true;
    }
    return false;
};

async function loadStoneInRequest(request, response, next) {
    request.stoneCurrent = await stoneService.getOne(request.params.stoneId).lean();
    next();
};

module.exports = stoneController;
