const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const server = express();

server.use(express.urlencoded({extended: false}));
server.use(cookieParser());

const db = {};

//with Express
// server.get('/', (request, response) => {
//     const loginInfo = request.header('Cookie');
//     console.log(loginInfo);
//     if(loginInfo){
//         response.send(loginInfo)
//     }else{
//         response.send(`Please login`);
//     }
// })

//with Cookie parser
server.get('/', (request, response) => {
    const user = request.cookies['user'];
    
    if(user){
        response.send(user)
    }else{
        response.send(`Please login`);
    }
});

server.get('/logout', (request, response) => {
    response.clearCookie('user');
    response.end();
})

server.get('/login', (request, response) => {
    response.send(`<form action="/login" method="post">
        <label>Username</label>
        <input type="text" name="username"/>
        <label>Password</label>
        <input type="text" name="password"/>
        <input type="submit" name="login"/>
    </form>`);
});

//with Express
// server.post('/login', (request, response) => {
//     console.log(request.body);

//     response.header('Set-Cookie', `loginInfo=${request.body.username}`);

//     response.end();
// });

//with Cookie parser
// server.post('/login', (request, response) => {
//     response.cookie('user', request.body.username);

//     response.end();
// });

//with Hashing
server.post('/login', async (request, response) => {
    response.cookie('user', request.body.username);
    const hash = db[request.body.username];
    if(!hash){
        return response.status(401).end();
    }

    const isValid = await bcrypt.compare(request.body.password, hash);
    if(!isValid){
        return response.status(401).send('Unauthorized');
    }

    response.send('Logged in successfully');

    response.end();
});

server.get('/register', (request, response) => {
    response.send(`<form action="/register" method="post">
        <label>Username</label>
        <input type="text" name="username"/>
        <label>Password</label>
        <input type="text" name="password"/>
        <input type="submit" name="register"/>
    </form>`);
});

server.post('/register', async (request, response) => {
    const salt = await bcrypt.genSalt(10)
    const saltedHash = await bcrypt.hash(request.body.password, salt);
    console.log(saltedHash);

    db[request.body.username] = saltedHash;

    response.redirect('/login');
});

server.listen(3000);
