const express = require('express');
const albumController = require('../controller/albumController');
const fileController = require('../controller/fileUploadController')
const authController = require('../controller/authContoller')

const router = express();

router.route('/image')
    .get()
    .post(authController.verifyToken, fileController.fileUploaderAndNext, albumController.postImage)
    .delete(authController.verifyToken, albumController.deleteImage, fileController.fileDestroy)

router.route('/images')
    .get(albumController.getImage)
    .post()

router.route('/albums')
    .get(albumController.getAlbum);

module.exports = router;