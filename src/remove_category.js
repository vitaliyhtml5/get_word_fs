const fs = require('fs');
const path = require('path');
const getAllData = require('./get_all_data.js');

const removeCategory = (req, res) => {
    getAllData('./fs/category.json', (data) => {
        const indexCategory = data.findIndex(item => Number(item.id) == req.query.category_id);
        const category = data[indexCategory].name;
        data.splice(indexCategory, 1);
        
        try {
            fs.writeFile('./fs/category.json', JSON.stringify(data), err => {
                if (err) {
                    res.send(err);
                } else {
                    removeWordsinArr(category);
                    res.status(200).send({message:'category was removed'});
                }
            });
        } catch(e) {
            res.status(500).send('something went wrong');
        }
    });

    function removeWordsinArr(category) {
        getAllData('./fs/words.json', (data) => {
            for (let i in data) {
                if (data[i].category === category) {
                    const sourceUrls = path.join(__dirname, `../public/img/words/${data[i].image}`);
                    fs.unlinkSync(sourceUrls);
                    data.splice(i, 1);
                }
            }
            removeWordsInFile(data);
        });
    }

    function removeWordsInFile(data) {
        fs.writeFile('./fs/words.json', JSON.stringify(data), err => {
            if (err) {
                res.send(err);
            }
        });
    }
}

module.exports = removeCategory;