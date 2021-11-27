const url = require('url');
const path = require('path');
const fs = require('fs');

const setStatic = (req, res) => {
    const public = path.join(__dirname, '../public');
    let filePath = `.${req.url}`;
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    if (filePath === './') {
        filePath = `${public}/index.html`;
    }

    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }
   console.log(contentType) 
    res.writeHead(200, {'Content-Type': contentType});
    const readStream = fs.createReadStream(`${public}/${path.basename(filePath)}`,'utf8').on('error', onError);
    readStream.pipe(res);
       
    function onError(err) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'}).end();
        }
    }
}

module.exports = setStatic;