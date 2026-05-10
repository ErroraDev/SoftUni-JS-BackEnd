const Stone = require('../models/Stone');


async function searchFromDatabase(name){
    let query = {};

    if(name){
        query.name = new RegExp(name, 'i');
    }

    return Stone.find(query).lean();
};

exports.searchFromDatabase = searchFromDatabase;
