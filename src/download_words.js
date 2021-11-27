const fs = require('fs');
const fastcsv = require('fast-csv');
const getAllData = require('./get_all_data.js');

const downloadWordsJson = (req, res) => {
    getAllData('./fs/words.json', (data) => {
        try {
            fs.writeFile('./download-files/words.json', JSON.stringify(data), (err) => {
                if (err === 'No connection to db') {
                    res.send(err);
                } else {
                    res.download('./download-files/words.json');
                }
            });
        } catch (e) {
            res.status(500).send('something went wrong');
        }
    });
}

const downloadWordsCsv = (req, res) => {
    getAllData('./fs/words.json', (data) => {
        try {
            const ws = fs.createWriteStream('./download-files/words.csv');
            fastcsv 
            .write(data, { headers: true }) 
            .pipe(ws)
            setTimeout(() => {
                res.download('./download-files/words.csv')}, 2000);
        } catch (e) {
            res.status(500).send('something went wrong');
        }
    });
}

module.exports = {downloadWordsCsv,downloadWordsJson};