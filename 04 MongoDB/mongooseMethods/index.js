const mongoose = require('mongoose');
const connectionString = 'mongodb://0.0.0.0:27017/test1'; //replace localhost with 0.0.0.0

async function start() {
    await mongoose.connect(connectionString);
    console.log('connected');

    const studentSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30
        },
        age: Number
    });

    studentSchema.methods.getInfo = function () {
        return `Hello, I'm ${this.name} and I'm ${this.age} years old.`
    }

    studentSchema.virtual('talk').get(function () {
        return `All my inforamtion is name - ${this.name} and age ${this.age}.`
    })

    studentSchema.path('age').validate(function () {
        console.log('in validate function');
        return this.age > 2 && this.age < 120
    }, 'Name must be between 2 and 10 symbols long');

    const Student = mongoose.model('Student', studentSchema);
    const studentGosho = new Student({
        name: 'Gosho',
        age: 17
    });

    const studentIvan = new Student({
        name: 'Ivan',
        age: 35,
    });

    const searchedStudents = await Student
    .find({})
    .where('age').gte(20).lte(25)
    .select(['name', 'age']); //or only 'name'

    console.log(searchedStudents);
}

start()
