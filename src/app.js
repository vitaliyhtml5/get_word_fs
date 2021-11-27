const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'), {
    extensions: ['html']
}));
const port = process.env.PORT || 3000;
const upload = multer({dest:path.join(__dirname, '../public/img/words')});

const getAll = require('./get_all.js');
const getCategory = require('./get_category.js');
const addCategory = require('./add_category.js');
const addWord = require('./add_word.js');
const editCategory = require('./edit_category.js');
const editWord = require('./edit_word.js');
const removeCategory = require('./remove_category.js');
const removeWord = require('./remove_word.js');
const uploadImg = require('./upload_img.js');
const downloadWords = require('./download_words.js');

app.get('/get-all-words', (req, res) => getAll(req, res));
app.get('/get-category', (req, res) => getCategory(req, res));

app.post('/add-category', (req, res) => addCategory(req, res));
app.post('/add-word', (req, res) => addWord(req, res));

app.put('/edit-category', (req, res) => editCategory(req, res));
app.put('/edit-word', (req, res) => editWord(req, res));

app.delete('/remove-category', (req, res) => removeCategory(req, res));
app.delete('/remove-word', (req, res) => removeWord(req, res));

app.post('/upload-image', upload.single("filedata"), (req, res, next) => uploadImg(req, res));

app.get('/download-json', (req, res) => downloadWords.downloadWordsJson(req, res));
app.get('/download-csv', (req, res) => downloadWords.downloadWordsCsv(req, res));

// 404 error
app.get('*/*', (req, res) => res.status(404).sendFile(`${path.join(__dirname,'../public')}/404-error.html`));

app.listen(port, () => {     console.log(`Server is running on port ${port}`);  });