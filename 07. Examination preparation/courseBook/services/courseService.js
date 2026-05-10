const Course = require('../models/Course');
const User = require('../models/User')

exports.create = async (userId, courseData) => {
    const createdCourse = await Course.create({
        owner: userId,
        ...courseData,
        dateCreated: Date.now()
    });

    await User.findByIdAndUpdate(userId, { $push: { createdCourses: createdCourse._id } });

    return createdCourse;
}

exports.getAll = () => Course.find();

exports.getOne = (courseId) => Course.findById(courseId);
exports.getOneWithOwner = (courseId) => Course.findById(courseId).populate('owner');
exports.getOneWithOwnerAndStudents = (courseId) => Course.findById(courseId).populate('owner').populate('signUpList');
exports.signUp = async (courseId, userId) => {
    await Course.findByIdAndUpdate(courseId, { $push: { signUpList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { signedUpCourses: courseId } });
};
exports.delete = (courseId) => Course.findByIdAndDelete(courseId);
exports.edit = (courseId, courseData) => Course.findByIdAndUpdate(courseId, courseData, { runValidators: true });
exports.getLastThree = () => Course.find().sort({dateCreated: -1}).limit(3);
