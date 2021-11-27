const http = require('http');
const url = require('url');
const searchWordQuery = require('./db/search_word.js');

const searchWord = ((req, res) => {
    const word = url.parse(req.url,true).query.word;

    searchWordQuery(word, (err, data) => {
        try {
            if (err) {
                res.writeHead(400, {'Content-Type': 'text/plain'}).end(err);
            } else {
                res.writeHead(200, {'Content-type': 'application/json'}).end(JSON.stringify(data));
            }
        } catch (e) {
            res.writeHead(500, {'Content-Type': 'text/plain'}).end('something went wrong');
        }
    });
});

module.exports = searchWord;