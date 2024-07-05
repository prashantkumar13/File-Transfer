const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require('path');

// Multer configuration
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Define the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        ///generate unique name
        const uniqueName = uuidv4();
        cb(null, uniqueName+path.extname(file.originalname)); // Define the file name
    },
});


let upload = multer({
    storage: storage,
    // Set the file size limit in bytes (e.g., 1MB = 1000000 bytes)
    limits: { fileSize: 1000000 },
    ///filter function->choose only these files
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myfile');

//Check file type function
function checkFileType(file, cb) {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images and PDFs only!');
    }
};

module.exports = upload;
