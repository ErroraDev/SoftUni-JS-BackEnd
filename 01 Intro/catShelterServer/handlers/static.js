const fs = require('fs');

function sendCSS(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/css'
    });
    fs.createReadStream('./content/styles/site.css').pipe(response);
}

function sendImage(request, response) {
    let filePath = "";
    if(request.url.startsWith("http")){
        filePath = request.url;
    }else{
        filePath = '.' + decodeURI(request.url);        
    }
    
    if(fs.existsSync(filePath)){
        fs.createReadStream(filePath).pipe(response);
    }
}

module.exports = {
    sendCSS,
    sendImage
};
