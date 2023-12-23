const multer = require('multer');


const storage = multer.diskStorage({
    destination(request, file, callback){
        callback(null, 'images/');
    },
    filename(request, file, callback) {
        callback(null, file.originalname);
    }
});

const types = ['image/png', 'image/jpg', 'image/jif'];

const fileFilter = (request, file, callback) => {
    if (types.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(null, false);
    }
}


module.exports = multer({ storage, fileFilter });