const express = require('express');
const albumController = require('../controller/albumController');
const fileController = require('../controller/fileUploadController')
const authController = require('../controller/authContoller')

const router = express.Router();

router.get('/getimages', albumController.getImage);
router.get('/getalbums', albumController.getAlbum);
router.get('/deleteimage/:id', authController.verifyToken, albumController.deleteImage, fileController.fileDestroy)

router.post('/postimage', albumController.postImage);

module.exports = router;