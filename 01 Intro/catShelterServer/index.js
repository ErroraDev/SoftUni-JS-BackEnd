const http = require('http');

const router = require('./router');
const { homePage, defaultPage } = require('./handlers/home');
const { sendCSS } = require('./handlers/static');
const { breedAdd } = require('./handlers/breed');
const { catAdd } = require('./handlers/catAdd');

router.register('/', homePage);
router.register('/cat/add-breed', breedAdd);
router.register('/cat/add-cat', catAdd);

router.register('/content/styles/site.css', sendCSS);
router.register('default', defaultPage);

const catServer = http.createServer((request, response) =>{
    router.match(request, response);
});

catServer.listen(3000);
