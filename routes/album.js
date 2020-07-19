const express = require('express');
const albumController = require('../controller/albumController');
const fileController = require('../controller/fileUploadController')
const authController = require('../controller/authContoller')

const router = express.Router();

router.get('/getimages', albumController.getImage);
router.get('/getalbums', albumController.getAlbum);
router.get('/deleteimage', authController.verifyToken, albumController.deleteImage, fileController.fileDestroy)
router.get('/deletealbum', authController.verifyToken, albumController.deleteAlbum, fileController.multiFiledestroy)

router.post('/postimage', authController.verifyToken, fileController.fileUploaderAndNext, albumController.postImage);

module.exports = router;