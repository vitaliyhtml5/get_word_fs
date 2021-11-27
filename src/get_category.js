const fs = require('fs');

const getCategory = (req, res) => {
    try {
        fs.readFile('./fs/category.json', (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        });
    } catch(e) {
        res.status(500).send('something went wrong');
    }
}

module.exports = getCategory;

