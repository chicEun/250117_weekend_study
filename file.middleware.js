const multer = require('multer');

const destination = (req, file, callback) => {
    if(file.mimetype.startsWith("image")) {
        callback(null, 'uploads/')
    } else {
        callback(new Error("이미지 파일 아님"))
    }
    callback(null, 'uploads/')
}

const filename = (req, file, callback) => {
   callback(null, file.originalname);
}


const storage = multer.diskStorage({destination, filename})
const upload = multer({storage})

module.exports = upload;