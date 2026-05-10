const fsAsync = require('fs').promises;
const { setBreeds } = require('./breed');
const { readJSONFile } = require('./catAdd');

async function catEdit(request, response, catId){
    if (request.method == 'GET') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const catsAllArray = await readJSONFile(`./data/cats.json`);
        const currentCat = catsAllArray.find((cat) => cat.id = catId);

        const layout = await fsAsync.readFile('./views/editCat.html');
        const breedsAll = await setBreeds();
        let editFormData = catFormWithData(currentCat);
        editFormData = editFormData.replace("<%%Breeds%%>", breedsAll);
        response.write(layout.toString().replace('<%%editCat%%>', editFormData));

        response.end();

    } else if (request.method == 'POST') {
        let data = [];

        request.on('data', chunk => data.push(chunk));
        request.on('end', async () => {
            processEditData(data, catId);
            response.end();
        });
    }
}

function catFormWithData(cat){
    return `<form action="/cat/${cat.id}/edit" method="POST" class="cat-form" enctype="multipart/form-data">
        <h2>Edit Cat</h2>
        <label for="name">Name</label>
        <input name="name" type="text" id="name" value="${cat.name}">
        <label for="description">Description</label>
        <textarea id="description" name="description">${cat.description}</textarea>
        <label for="image">Image</label>
        <input name="image" type="file" id="image">

        <label for="group">Breed</label>
        <select name="breed" id="group">
            <%%Breeds%%>
        </select>
        <button type="submit">Edit Cat</button>
    </form>`;
}

async function processEditData(data, currentCatId) {
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

    const id = Number(currentCatId);
    const imagePath = `/content/images/${imageName}`;

    let cat = {
        id,
        name,
        description,
        imagePath,
        breed,
    }

    catsAllArray[id-1] = cat;

    await fsAsync.writeFile(`./data/cats.json`, JSON.stringify(catsAllArray, null, 2));

    await fsAsync.writeFile(`./content/images/${imageName}`, imageOnly);
}

module.exports = {
    catEdit
}
