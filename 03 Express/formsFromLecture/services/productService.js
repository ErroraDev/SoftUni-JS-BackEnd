const fs = require('fs');

///** @type {Object[]} */
const data = JSON.parse(fs.readFileSync('./services/data.json'));

function getList() {
    return data;
}

function getById(id) {
    return data.find(p => p.id == id);
}

// function create(name, price){
//     const id = 'product' + Math.random();
//     data.push({
//         id,
//         name,
//         price
//     });

//     fs.writeFile('./services/data.json', JSON.stringify(data, null, 2), () => {});
// }

async function create(name, price) {
    const id = 'product' + Math.random();
    data.push({
        id,
        name,
        price
    });

    await persist();
}

async function deleteById(id){
    const index = data.findIndex(p => p.id == id);
    data.splice(index, 1);

    await persist();
}

async function persist(){
    return new Promise((resolve, reject) => {
        fs.writeFile(
            './services/data.json',
            JSON.stringify(data, null, 2),
            (error) => {
                if (error == null) {
                    resolve();
                } else {
                    reject(error);
                }
            })
    });
}

module.exports = {
    getList,
    getById,
    create,
    deleteById
}
