const { getAllArticles, createArticle } = require('../services/articleServices');

const articleController = require('express').Router();

articleController.get('/', async (request, response) => {
    const articles = await getAllArticles();

    response.render('articles', {
        title: '- Articles',
        articles
        // articles: [
        //     {
        //         author: 'John',
        //         title: 'Eh 1',
        //         content: 'Static article 1'
        //     },
        //     {
        //         author: 'Mary',
        //         title: 'Lo 1',
        //         content: 'Static article 2'
        //     }
        // ]
    });
});

articleController.post('/', async (request, response) => {
    console.log(request.body);
    await createArticle(request.body.author, request.body.title, request.body.content);
    response.redirect('/articles');
});

module.exports = articleController;
