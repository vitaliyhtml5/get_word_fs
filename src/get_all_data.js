const fs = require('fs');

const getAllData = (filePath, callback) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            callback(JSON.parse(data));
        }
    });     
}

module.exports = getAllData;


// Async reading files
//https://coderoad.ru/10058814/%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BE%D1%82-fs-readFile
// fs.readFile('./Index.html', function read(err, data) {
//     const content = data;
//     processFile(content);
// });

// function processFile(content) {
//     console.log(content);
// }