const fs = require('fs');
const path = require('path');
const getAllData = require('./get_all_data.js');

const editWord = (req, res) => {
    getAllData('./fs/words.json', (data) => {
        const indexWord = data.findIndex(item => Number(item.id) == req.body.id);
        data[indexWord].english = req.body.english;
        data[indexWord].transcription = req.body.transcription;
        data[indexWord].russian = req.body.russian;
        data[indexWord].image = req.body.image;
        data[indexWord].category = req.body.category;

        try {
            fs.writeFile('./fs/words.json', JSON.stringify(data), err => {
                if (err) {
                    res.send(err);
                } else {
                    replaceImg(req.body.oldImage);
                    res.status(200).send({message:'word was edited'});
                }
            });
        } catch(e) {
            res.status(500).send('something went wrong');
        } 
    });

    function replaceImg(imgName) {
        const sourceUrls = path.join(__dirname, `../public/img/words/${imgName}`);
        fs.unlinkSync(sourceUrls);
    }
}

module.exports = editWord;

