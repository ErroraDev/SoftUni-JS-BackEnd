const express = require('express');
const session = require('express-session');

const server = express();
server.use(express.urlencoded({ extended: false }));
server.use(session({
    secret: '123 secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

server.get('/', (request, response) => {
    console.log(request.session);

    if(request.session.userInfo){
        response.send(`Hello ${request.session.userInfo.username}`);
    }else{
        response.send('Please login');
    }
});

server.get('/login', (request, response) => {
    response.send(`<form action="/login" method="post">
        <label>Username</label>
        <input type="text" name="username"/>
        <label>Password</label>
        <input type="text" name="password"/>
        <input type="submit" name="login"/>
    </form>
`)
});

server.post('/login', (request, response) => {
    request.session.userInfo = request.body;
    request.session.privateInfo = 'skritiDanni';

    response.end();
});

server.listen(3000);

//1:11

