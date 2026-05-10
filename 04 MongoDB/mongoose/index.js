const mongoose = require('mongoose');
const connectionString = 'mongodb://0.0.0.0:27017/test1'; //replace localhost with 0.0.0.0

async function start() {
    await mongoose.connect(connectionString);
    console.log('connected');

    const studentSchema = new mongoose.Schema({
        name: String,
        age: Number
    });

    const Student = mongoose.model('Student', studentSchema);
    const studentGosho = new Student({
        name: 'Gosho',
        age:17
    });
    console.log(studentGosho);

    const result = await studentGosho.save();
    console.log(result);
}

start()
