const fs = require('fs');
const asyncFs = require('fs').promises;
const path = require('path');
const { breedRead } = require('./breed');
const { readJSONFile } = require('./catAdd');

async function homePage(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    const layout = await asyncFs.readFile('./views/home/index.html');
    response.write(layout.toString().replace('<%%Cats%%>', await setCatsList(`http://${request.headers.host}`)));

    response.end();
}

function defaultPage(request, response) {
    response.statusCode = 404;
    response.write(`<h1>404 Not found</h1>
    <p>The resource you requested cannot be found</p>`);
    response.end();
}

async function getImageList() {
    const files = await asyncFs.readdir('./content/images');
    let imagesString = '<ul>';
    for (let file of files) {
        imagesString += `<li><img src="./img/${file}"></li>`;
    }
    imagesString += '</ul>'
    return imagesString;
}

async function setCatsList(host) {
    let catsList  = '';
    const catsAllArray = await readJSONFile(`./data/cats.json`);

    for (const cat of catsAllArray) {
        catsList += `<li>
            <img src="${host + cat.imagePath}" alt="${cat.name}">
            <h3>${cat.name}</h3>
            <p><span>Breed: </span>${cat.breed}</p>
            <p><span>Description: </span>${cat.description}</p>
            <ul class="buttons">
                <li class="btn edit"><a href="./cat/${cat.id}/edit">Change Info</a></li>
                <li class="btn delete"><a href="">New Home</a></li>
            </ul>
        </li>`
    }
    return catsList;
}

module.exports = {
    homePage,
    defaultPage
}
