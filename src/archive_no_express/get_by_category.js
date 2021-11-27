const http = require('http');
const url = require('url');
const selectByCategory = require('./db/select_by_category.js');

const getByCategory = (req, res) => {
    const category = url.parse(req.url,true).query.category;
    
    selectByCategory(category.toString(), (err, data) => {
        try {
            if (err) {
                res.writeHead(400, {'Content-Type': 'text/plain'}).end(err)
            } else {
                res.writeHead(200, {'Content-type': 'application/json'}).end(JSON.stringify(data));
            }
        } catch (e) {
            res.writeHead(500, {'Content-Type': 'text/plain'}).end('something went wrong');
        } 
    });
}

module.exports = getByCategory;