const {html} = require("../utility.js");

function homePage(request, response){
    response.write(html(`<h1>Home Page</h1>
    <p>Welcome to our site</p>`));
    response.end();
}

function aboutPage(request, response){
    response.write(html(`<h1>About Us</h1>
    <p>Contact: +0898 282 842</p>`));
    response.end();
}

function defaultPage(request, response){
    response.statusCode = 404;
    response.write(html(`<h1>404 Not found</h1>
    <p>The resource you requested cannot be found</p>`));
    response.end();
}

module.exports = {
    homePage,
    aboutPage,
    defaultPage
};
