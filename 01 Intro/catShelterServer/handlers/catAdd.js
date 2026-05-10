const fs = require('fs');
const fsAsync = require('fs').promises;
const { setBreeds } = require('./breed');

async function catAdd(request, response) {
    if (request.method == 'GET') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const layout = await fsAsync.readFile('./views/addCat.html');
        response.write(layout.toString().replace('<%%Breeds%%>', await setBreeds()));

        response.end();
    } else if (request.method == 'POST') {
        let data = [];

        request.on('data', chunk => data.push(chunk));
        request.on('end', async () => {
            processData(data);
            response.end();
        });
    }
}

async function processData(data) {
    const bodyBuffer = Buffer.concat(data);
    let dataString = bodyBuffer.toString('ascii');

    let indexOfFirstLine = dataString.indexOf('\r\n');
    let delimiter = dataString.substring(0, indexOfFirstLine);

    let dataReceivedArray = dataString.split(delimiter);

    let name = dataReceivedArray[1].replace(new RegExp("\\r\\n.*\\r\\n\\r\\n"), "").replace(new RegExp("\\r\\n"), "");
    let description = dataReceivedArray[2].replace(new RegExp("\\r\\n.*\\r\\n\\r\\n"), "").replace(new RegExp("\\r\\n"), "");
    let breed = dataReceivedArray[4].replace(new RegExp("\\r\\n.*\\r\\n\\r\\n"), "").replace(new RegExp("\\r\\n"), "");

    let forthLine = dataString.indexOf(delimiter, 10);
    forthLine = dataString.indexOf(delimiter, forthLine + 1);
    forthLine = dataString.indexOf("\r\n\r\n", forthLine + 1);
    let imageClose = dataString.indexOf(delimiter, forthLine + 1) - 2;

    let image = dataReceivedArray[3];
    let imageName = image.replace(new RegExp("\\r\\n.*filename=\""), "")
    imageName = imageName.substring(0, imageName.indexOf("\"\r\n"));

    let imageOnly = Buffer.alloc(imageClose - forthLine + 4);

    bodyBuffer.copy(imageOnly, 0, forthLine + 4, imageClose);
    let catsAllArray = [];

    catsAllArray = await readJSONFile(`./data/cats.json`);

    const id = catsAllArray.length + 1;
    const imagePath = `/content/images/${imageName}`;

    let cat = {
        id,
        name,
        description,
        imagePath,
        breed,
    }

    catsAllArray.push(cat);

    await fsAsync.writeFile(`./data/cats.json`, JSON.stringify(catsAllArray, null, 2));

    await fsAsync.writeFile(`./content/images/${imageName}`, imageOnly);
}

async function readJSONFile(filePath){
    try {
        const catsAllString = (await fsAsync.readFile(filePath)).toString();
        return JSON.parse(catsAllString);
    } catch (error) {

    }
}

module.exports = {
    catAdd,
    readJSONFile
}
