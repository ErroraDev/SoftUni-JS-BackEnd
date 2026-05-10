const asyncFs = require('fs').promises;
const querystring = require('querystring');

const breedsFileLocation = './data/breeds.json';

async function breedAdd(request, response) {
    if (request.method == 'GET') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const layout = await asyncFs.readFile('./views/addBreed.html');
        response.write(layout.toString());
        response.end();
    } else if (request.method == 'POST') {
        let data = '';

        request.on('data', (chunk) => data += chunk);
        request.on('end', () => {
            response.writeHead(301, {
                'Location': '/'
            });
            response.end(async () => {
                breedWrite(data);
            });
        });
    }
}

async function breedRead() {
    const breedsAll = await asyncFs.readFile(breedsFileLocation);
    let breedsAllString = breedsAll.toString();
    let breedsAllArray = breedsAllString.split(';');

    return breedsAllArray;
}
async function breedWrite(data) {
    let breedsAllArrayFromFile = await breedRead();
    
    data = data.replace(new RegExp('.*?='), "");

    if(breedsAllArrayFromFile[0].length < 2){
        asyncFs.writeFile(breedsFileLocation, data);
    }else if(!breedsAllArrayFromFile.includes(data)){
        breedsAllArrayFromFile.push(data);
        asyncFs.writeFile(breedsFileLocation, breedsAllArrayFromFile.join(';'));
    }
}

async function setBreeds(){
    const breedsAll = await breedRead();
    let selectsAll = '';
    for (const breed of breedsAll) {
        selectsAll += `<option value="${breed}">${breed}</option>`
    }
    
    return selectsAll;
}

module.exports = {
    breedAdd,
    breedRead,
    setBreeds
};
