const path = require('path');
const tinify = require("tinify");
tinify.key = "lYpXvgggjYXpX0hBmzwGtMcZBzQfbBnt";

const uploadImg = (req, res) => {
    let filedata = req.file.filename;
    const pathToImg = path.join(__dirname, `../public/img/words/${filedata}`);

    if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
        const source = tinify.fromFile(pathToImg);
        const resized = source.resize({
            method: "scale",
            height: 400
        });
        resized.toFile(pathToImg);
    }

    try {
        res.send({image: filedata});
    } catch (e) {
        res.status(500).send({message: 'image was not uploaded'});
    }
}

module.exports = uploadImg;