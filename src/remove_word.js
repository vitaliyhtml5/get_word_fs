const fs = require('fs');
const path = require('path');
const getAllData = require('./get_all_data.js');

const removeWord = (req, res) => {
    getAllData('./fs/words.json', (data) => {
        const indexWord = data.findIndex(item => Number(item.id) == req.query.word_id);
        const oldImage =  data[indexWord].image;
        data.splice(indexWord, 1);

        try {
            fs.writeFile('./fs/words.json', JSON.stringify(data), err => {
                if (err) {
                    res.send(err);
                } else {
                    removeImg(oldImage);
                    res.status(200).send({message:'word was removed'});
                }
            });
        } catch(e) {
            res.status(500).send('something went wrong');
        }
    });

    function removeImg(imgName) {
        const sourceUrls = path.join(__dirname, `../public/img/words/${imgName}`);
        fs.unlinkSync(sourceUrls);
    }
}

module.exports = removeWord;