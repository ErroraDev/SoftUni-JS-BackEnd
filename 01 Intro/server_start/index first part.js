const http = require('http');

const httpServer = http.createServer((request, response) => {

    console.log("Working");
    response.write("Hello");
    response.end();
})

httpServer.listen(3000);
