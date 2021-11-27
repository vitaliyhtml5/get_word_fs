const fs = require('fs');
const validator = require('validator');
const getAllData = require('./get_all_data.js');

const addCategory = (req, res) => {

    getAllData('./fs/category.json', (data) => {
        let newId;
        if (data.length > 0) {
            newId = Number(data[data.length - 1].id) + 1;
        } else {
            newId = 1;
        }

        const category = {
            id: newId,
            name: req.body.category
        }
        data.push(category);

        try {
            if (!validator.isAlpha(req.body.category,'en-US', {ignore:' '}) && !validator.isAlpha(req.body.category,'en-US', {ignore:'-'}) && !validator.isAlpha(req.body.category,'en-US', {ignore:'\''})) {
                res.status(400).send({code: 400, message:'non-english chars'});
            } else {
                fs.writeFile('./fs/category.json', JSON.stringify(data), err => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.status(201).send({message:'category was added'});
                    }
                });
            }
        } catch(e) {
            res.status(500).send('something went wrong');
        } 
    });
}

module.exports = addCategory;