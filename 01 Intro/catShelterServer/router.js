const { sendImage } = require("./handlers/static");
const { catEdit } = require('./handlers/catEdit');

let routes = {};

function register(path, handler) {
    routes[path] = handler;
}

function match(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const urlPathname = url.pathname;
    const handler = routes[urlPathname];
    
    if (typeof handler == 'function') {
        handler(request, response);
    } else if(urlPathname.startsWith('/content/images/')){
        sendImage(request, response);
    } else if(urlPathname.endsWith('/edit')){
        let catId = urlPathname.replace("/edit", "").replace(new RegExp(".*/"), "");
        catEdit(request, response, catId);
    }
    else {
        routes.default(request, response);
    }
}

module.exports = {
    register,
    match
};
