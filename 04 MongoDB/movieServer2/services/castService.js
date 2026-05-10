const Cast = require('../models/Cast');

function readCastFromDatabase() {
    const castAll = Cast.find({});
    return castAll;
}

async function createCastAndUploadToDatabase(castAllFields) {
    await Cast.create({
        name: castAllFields.name,
        age: castAllFields.age,
        born: castAllFields.born,
        nameInMovie: castAllFields.nameInMovie,
        castImage: castAllFields.castImage
    });
}

exports.readSpecificCastFromDatabase = (givenId) => {
    return Cast.findOne({ _id: givenId });
};

function readCastFromArray(castArray){
    // const castObjectIds = castArray.map(id => new Types.ObjectId(id));
    // const castAll = Cast.find({ _id: { $in: castObjectIds } });
    // return castAll;   
    return Cast.find({ _id: { $in: castArray } });
};

exports.readCastFromDatabase = readCastFromDatabase;
exports.createCastAndUploadToDatabase = createCastAndUploadToDatabase;
exports.readCastFromArray = readCastFromArray;
