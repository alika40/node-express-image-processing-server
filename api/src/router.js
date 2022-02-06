const { Router } = require('express');
const multer = require('multer');

const router = Router();
const storage = multer.diskStorage({ destination: 'api/uploads/', filename: filename});
const upload = multer({ fileFilter: fileFilter, storage: storage});

function filename(request, file, callback) {
    callback(null, file.originalname);
}

function fileFilter(request, file, callback) {
    if (file.mimetype !== 'image/png') {
        request.fileValidationError = 'Wrong file type';
        return callback(null, false, new Error('Wrong file type'));
    }
    return callback(null, true);
}


router.post('/upload', upload.single('photo'), function(request, response ) {
    if ( request.fileValidationError ) { 
        return response.status(400).json({ error: request.fileValidationError });
    }
    return response.status(201).json({ success: true });
});


module.exports = router;