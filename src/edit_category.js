const fs = require('fs');
const validator = require('validator');
const getAllData = require('./get_all_data.js');

const editCategory = (req, res) => {
    getAllData('./fs/category.json', (data) => {
        const indexCategory = data.findIndex(item => Number(item.id) == req.body.id);
        data[indexCategory].name = req.body.category;

        try {
            if (!validator.isAlpha(req.body.category,'en-US', {ignore:' '}) && !validator.isAlpha(req.body.category,'en-US', {ignore:'-'}) && !validator.isAlpha(req.body.category,'en-US', {ignore:'\''})) {
                res.status(400).send({code: 400, message:'non-english chars'});
            } else {
                fs.writeFile('./fs/category.json', JSON.stringify(data), err => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.status(200).send({message:'category was edited'});
                    }
                });
            }
        } catch(e) {
            res.status(500).send('something went wrong');
        } 
    });
}

module.exports = editCategory;