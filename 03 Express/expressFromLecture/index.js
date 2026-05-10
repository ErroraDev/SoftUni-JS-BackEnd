const express = require('express');
const { router } = require('./catalogController');
const { routerForMiddleware } = require('./middleware');

const app = express();
app.get('/', (request, response) => {
    response.send('Hello');
});

app.get('/img', (request, response) => {
    console.log('handle post request');
    response.end();
});

app.get('/clipboard', (request, response) => {
    response.sendFile(__dirname + '/clipboard01.png');
});

app.get('/file', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

app.get('/data', (request, response) => {
    response.json([
        {
            name:'Peter',
            age:25
        },
        {
            name:'John',
            age:31
        }
    ]);
});

app.use(router);
app.use('/middleWare', routerForMiddleware);


app.route('/route')
    .get((request, response) => {
        response.send('<form method="POST"><input name="name"><button>Send</button></form>');
    })
    .post((request, response) => {
        console.log('route with two methods');
        response.status(201).send('Item created');
    });

app.all('/users/:userId', (request, response) => {
    console.log(request.params);
    response.send('all other pages');
});

app.all('/catalog/:category/:id', (request, response) => {
    console.log(request.params);
    response.send('Nested parameters');
});

app.all('/catalog/*', (request, response) => {
    response.send('all catalog pages');
});

app.all('*', (request, response) => {
    response.send('all other pages');
});

app.listen(3000);
