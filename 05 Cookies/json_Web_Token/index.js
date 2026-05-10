const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jsonWebToken = require('jsonwebtoken');
const secretKeyForWebToken = '123456789abc';

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

const dbPassword = {
    'Peter': '$2b$10$Tx5uekk1MNKhD0b6Tsacq.t5fkC1ypC2Xo1/EtKJQxe5NoFzDPLyq'
};

//with Cookie parser
server.get('/', (request, response) => {
    const token = request.cookies['authorisation'];

    if (!token) {
        response.send(`Please login`);
    }

    const decodedToken = jsonWebToken.verify(token, secretKeyForWebToken);
    console.log(decodedToken);
    
    response.send('You are loged in.');
    response.end();
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

//with Hashing
server.post('/login', async (request, response) => {
    response.cookie('user', request.body.username);
    const hash = dbPassword[request.body.username];
    if (!hash) {
        return response.status(401).end();
    }

    const isValid = await bcrypt.compare(request.body.password, hash);
    if (!isValid) {
        return response.status(401).send('Unauthorized');
    }

    const payload = {
        username: request.body.username,
        //email,
        //roles
    }
    
    //synchronous
    const token = jsonWebToken.sign(payload, secretKeyForWebToken, { expiresIn: '2h' });
    console.log(token);

    response.cookie('authorisation', token);

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

    dbPassword[request.body.username] = saltedHash;

    response.redirect('/login');
});

server.listen(3000);
