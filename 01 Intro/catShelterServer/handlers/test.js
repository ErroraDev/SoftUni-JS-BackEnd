function test() {

    let data = `-----------------------------32855458316949215553425560934
    Content-Disposition: form-data; name="name"
    
    Sharencho
    -----------------------------32855458316949215553425560934
    Content-Disposition: form-data; name="description"
    
    Good cat
    -----------------------------32855458316949215553425560934
    Content-Disposition: form-data; name="upload"; filename="Energy reasons.jpg"
    Content-Type: image/jpeg
    
    ����`;

    let body = data;
    
    let indexOfFirstLine = body.indexOf('\r\n');
    let firstLine = body.substring(0, indexOfFirstLine);

    let dataReceivedArray = data.split(firstLine);
    
    let name = "\r\nContent-Disposition: form-data; name=\"name\"\r\n\r\nSharencho\r\n".replace(new RegExp("\\r\\n.*\\r\\n\\r\\n"), "").replace(new RegExp("\\r\\n"), "");
    name = name.replace("\\r\\n", "");
    let description = dataReceivedArray[2].replace(new RegExp(".*\\r\\n\\r\\n"), "").replace("\\r\\n", "");
    let breed = dataReceivedArray[4].replace(new RegExp(".*\\r\\n\\r\\n"), "").replace("\\r\\n", "");

}

test();
