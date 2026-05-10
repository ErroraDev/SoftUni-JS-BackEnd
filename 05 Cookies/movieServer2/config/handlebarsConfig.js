const handlebars = require('express-handlebars');

function configHandlebars(server) {
    server.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }));
    server.set('view engine', 'hbs');

    return server;
}

module.exports = configHandlebars;
