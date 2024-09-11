const multer = require('multer');
const path = require('path');

// Configure multer to save files to the 'uploads' directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); // Ensure this path is correct
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
