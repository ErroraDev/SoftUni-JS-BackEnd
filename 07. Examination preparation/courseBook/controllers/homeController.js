const homeController = require('express').Router();
const { isAuthenticated } = require('../middlewares/userMiddleware');
const courseService = require('../services/courseService');
const userService = require('../services/userService');

homeController.get('/', async (request, response) => {
    const coursesTheLastThree = await courseService.getLastThree().lean();
    response.render('home', { coursesTheLastThree });
});

homeController.get('/profile', isAuthenticated, async (request, response) => {
    const userCurrent = await userService.getUser(request.user._id).lean();
    const createCoursesCount = userCurrent.createdCourses?.length || 0;
    const signUpCoursesCount = userCurrent.signedUpCourses?.length || 0;

    response.render('profile', { userCurrent, createCoursesCount, signUpCoursesCount });
});

module.exports = homeController;
