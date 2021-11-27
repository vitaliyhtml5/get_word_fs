const fs = require('fs');
const getAllData = require('./get_all_data.js');

const addWord = (req, res) => {
    getAllData('./fs/words.json', (data) => {
        let newId;
        if (data.length > 0) {
            newId = Number(data[data.length - 1].id) + 1;
        } else {
            newId = 1;
        }

        const word = {
            id: newId,
            english: req.body.english,
            transcription: req.body.transcription,
            russian: req.body.russian,
            image: req.body.image,
            category: req.body.category
        }
        data.push(word);

        try {
            fs.writeFile('./fs/words.json', JSON.stringify(data), err => {
                if (err) {
                    res.send(err);
                } else {
                    res.status(201).send({message:'word was created'});
                }
            });
        } catch(e) {
            res.status(500).send('something went wrong');
        } 
    });
}

module.exports = addWord;