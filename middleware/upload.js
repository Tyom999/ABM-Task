const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync(__dirname + '/../uploads')){
            fs.mkdirSync(__dirname +'/../uploads');
        }
         cb(null,__dirname +  '/../uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now().toString() +  file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
}).array('productImage', 3);

module.exports = upload;
