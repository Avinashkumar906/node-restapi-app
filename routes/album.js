const express = require('express');
const albumController = require('../controller/albumController');
const fileController = require('../controller/fileUploadController')

const router = express.Router();

router.get('/getimages', albumController.getImage);
router.get('/getalbums', albumController.getAlbum);
router.post('/postimage', albumController.postImage);
router.get('/delete/:filename', fileController.fileDestroy)

module.exports = router;