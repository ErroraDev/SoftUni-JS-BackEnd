const asyncFs = require('fs').promises;

async function read() {
    const breedsAll = await asyncFs.readFile('./breeds.json');
    let breedsAllString = breedsAll.toString();
    let breedsAllArray = breedsAllString.split(';');

    return breedsAllArray;
}
async function write() {
    let breedsAllArrayFromFile = await read();
    
    let data = 'breed=Biala';
    data = data.replace(new RegExp('.*?='), "");

    if(breedsAllArrayFromFile[0].length < 2){
        asyncFs.writeFile('./breeds.json', data);
    }else if(!breedsAllArrayFromFile.includes(data)){
        breedsAllArrayFromFile.push(data);
        asyncFs.writeFile('./breeds.json', breedsAllArrayFromFile.join(';'));
    }
}

write();
