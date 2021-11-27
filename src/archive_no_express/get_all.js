const http = require('http');
const selectAll = require('./db/select_all.js');

const getAll = (req, res) => {
    selectAll((err, data) => {
        try {
            if (err) {
                res.writeHead(400, {'Content-Type': 'text/plain'}).end(err);
            } else {
                res.writeHead(200, {'Content-type': 'application/json'}).end(JSON.stringify(data));
            }
        } catch(e) {
            res.writeHead(500, {'Content-Type': 'text/plain'}).end('something went wrong');
        } 
    });
}

module.exports = getAll;