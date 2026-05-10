const Stone = require('../models/Stone');
const User = require('../models/User')

exports.create = async (userId, stoneData) => {
    const createdStone = await Stone.create({
        owner: userId,
        ...stoneData
    });

    await User.findByIdAndUpdate(userId, { $push: { ownedStones: createdStone._id } });

    return createdStone;
}

exports.getAll = () => Stone.find();
exports.getOneWithOwnerAndLikes = (stoneId) => Stone.findById(stoneId).populate('owner').populate('likedList');
exports.like = async (stoneId, userId) => {
    await Stone.findByIdAndUpdate(stoneId, { $push: { likedList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { likedStones: stoneId } });
};
exports.delete = (stoneId) => Stone.findByIdAndDelete(stoneId);
exports.edit = (stoneId, stoneData) => Stone.findByIdAndUpdate(stoneId, stoneData, { runValidators: true });
exports.getOne = (stoneId) => Stone.findById(stoneId);
exports.getLastThree = () => Stone.find().sort({createdAt: -1}).limit(3);
