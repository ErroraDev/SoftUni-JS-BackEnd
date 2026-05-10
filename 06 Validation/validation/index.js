const express = require('express');
const validator = require('validator');
const { check, validationResult } = require('express-validator');

const server = express();

server.use(express.urlencoded({ extended: false }));

server.get('/', (request, response) => {
    response.send('Hello');
});

server.get('/register', (request, response) => {
    response.send(`
    <form action="/register" method="post">
        <div>
            <label for="username">Username</label>
            <input type="text" name="username">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password">
        </div>
        <div>
            <label for="Submit">Submit</label>
            <input type="submit" name="send">
        </div>
    </form>`);
});

server.post('/register', (request, response) => {
    // if (request.body.password.length < 8) {
    //     return response.status(400).send('Password should be at least 8 characters');
    // }

    //validator
    if (validator.isLength(request.body.username, { max: 64, min: 8 })) {
        return response.status(400).send('Password should be at least 8 characters');
    }

    if (validator.isEmail(request.body.username)) {
        return response.status(400).send('Username should be a valid email');
    }

    console.log(request.body);
    response.redirect('/');
});


// //express-validator
// server.post('/register',check('username').isEmail(),
// check('password').isLength({min: 5}), (request, response) => {

//     //express-validator
//     const errors = validationResult(request);

//     if(!errors.isEmpty()){
//         return response.status(400).send('Username should be a valid email');
//     }

//     console.log(request.body);
//     response.redirect('/');
// });

function passwordValidate(password) {
    let isValid = true;

    if (password < 8) {
        isValid = false
    }

    return isValid;
}

server.listen(3000);
