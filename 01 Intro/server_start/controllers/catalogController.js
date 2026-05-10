const formidable = require("formidable");
const {html, data} = require("../utility.js");

function catalogPage(request, response){
    response.write(html(`<h1>Catalog</h1>
    <p>List of items</p>
    <ul>
        ${data.map(i => `<li>${i.name} - ${i.color}</li>`).join('\n')}
    </ul>`, 'Catalog'));
    response.end();
}

function createPage(request, response){
    response.write(html(`<h1>Create Item</h1>
    <form method="POST" action="/createItem">
        <label> Name: <input type="text" name="name"></label>
        <label> Color: 
            <select name="color">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
            </select>
        </label>
        <input type="submit" value="Create">
    </form>`))
    response.end();
}

function createItem(request, response){
    console.log("in create item");
    console.log(request.method);
    
    const form = new formidable.IncomingForm();
    form.parse(request, (errors, fields) => {
        console.log(fields);
        console.log(fields.name);
        console.log(fields.color);
        const item = {
            id: Math.random(),
            name: fields.name[0],
            color: fields.color[0]
        }
        
        data.push(item);

        response.writeHead(301, [
            'Location',
            '/catalog'
        ])

        response.end();
    });
}

module.exports = {
    catalogPage,
    createPage,
    createItem
};
