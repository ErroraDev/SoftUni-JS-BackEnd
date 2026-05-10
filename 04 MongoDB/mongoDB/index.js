const mongodb = require('mongodb');
const connectionString = 'mongodb://0.0.0.0:27017'; //replace localhost with 0.0.0.0
const client = new mongodb.MongoClient(connectionString);

async function run() {
    const db = client.db('test1');
    const collection = db.collection('students');

    const studentsCursor = await collection.find({age: 37});
    const students = await studentsCursor.toArray();

    console.log(students);
}

run();

