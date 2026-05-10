const http = require('http');

const router = require('./router.js');
const { catalogPage, createPage, createItem } = require('./controllers/catalogController.js');
const { homePage, aboutPage, defaultPage } = require('./controllers/homeController.js');

router.register('/', homePage);
router.register('/catalog', catalogPage);
router.register('/about', aboutPage);
router.register('/create', createPage);
router.register('/createItem', createItem);
router.register('default', defaultPage);

const serverHttp = http.createServer((request, response) => {
    console.log('Request received');
    router.match(request, response);
});

serverHttp.listen(3000);
