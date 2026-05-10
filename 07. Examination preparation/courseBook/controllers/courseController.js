const courseController = require('express').Router();

const { response } = require('express');
const { isAuthenticated } = require('../middlewares/userMiddleware');
const courseService = require('../services/courseService');

const { getErrorMessage } = require('../utility/errorsUtility');

courseController.get('/', isAuthenticated, async (request, response) => {
    const courses = await courseService.getAll().lean();

    response.render('courses/catalog', { courses });
});

courseController.get('/create', isAuthenticated, (request, response) => {
    response.render('courses/create');
});

courseController.post('/create', isAuthenticated, async (request, response) => {
    const courseForm = request.body;

    try {
        const createdCourse = await courseService.create(request.user._id, courseForm);

        response.redirect('/courses');
    } catch (error) {
        response.render('courses/create', { ...courseForm, error: getErrorMessage(error) });
    }
});

courseController.get('/:courseId/details', isAuthenticated, async (request, response) => {
    const courseDetails = await courseService.getOneWithOwnerAndStudents(request.params.courseId).lean();
    const courseOwnerId = courseDetails.owner._id.toString();

    const studentsParagraph = courseDetails.signUpList.map(user => user.username).join(', ');
    const isOwner = courseOwnerId && courseOwnerId == request.user?._id; //optional chaining if there is no ? and the value is undefined it will crash
    const isSigned = courseDetails.signUpList.some(user => user._id.toString() == request.user?._id);

    request.courseCurrent = courseDetails;

    response.render('courses/details', { ...courseDetails, studentsParagraph, isOwner, isSigned });
});

courseController.get('/:courseId/sign-up', isAuthenticated, async (request, response) => {
    await courseService.signUp(request.params.courseId, request.user._id);

    response.redirect(`/courses/${request.params.courseId}/details`);
});

courseController.get('/:courseId/delete', isAuthenticated, async (request, response) => {

    if (isCourseOwner(request.params.courseId, request.user?._id)) {
        await courseService.delete(request.params.courseId);
    }

    response.redirect('/courses');
});

courseController.get('/:courseId/edit', isAuthenticated, loadCourseInRequest, async (request, response) => {
    if (isCourseOwner(request.params.courseId, request.user?._id)) {
        response.render('courses/edit', { ...request.courseCurrent });
    } else {
        response.redirect('/courses');
    }
});

courseController.post('/:courseId/edit', isAuthenticated, async (request, response) => {
    if (isCourseOwner(request.params.courseId, request.user?._id)) {
        const courseEditForm = request.body;

        try {
            await courseService.edit(request.params.courseId, courseEditForm);
            response.redirect(`/courses/${request.params.courseId}/details`);
        } catch (error) {
            response.render('courses/edit', { error: getErrorMessage(error), ...courseEditForm, _id: request.params.courseId});
        }
    } else {
        response.redirect('/courses');
    }
});

async function isCourseOwner(courseId, userId) {
    const course = await courseService.getOne(courseId).lean();
    const ownerId = course.owner.toString();

    if (ownerId && ownerId == userId) {
        return true;
    }
    return false;
};

async function loadCourseInRequest(request, response, next) {
    request.courseCurrent = await courseService.getOne(request.params.courseId).lean();
    next();
};

module.exports = courseController;
