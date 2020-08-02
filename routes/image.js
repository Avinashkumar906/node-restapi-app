const express = require('express');
const albumController = require('../controller/albumController');
const fileController = require('../controller/fileUploadController')
const authController = require('../controller/authContoller')

const router = express();

router.route('/image')
    .get(authController.verifyToken,albumController.getImage)
    .post(authController.verifyToken, fileController.fileUploaderAndNext, albumController.postImage)
    .patch(authController.verifyToken, albumController.patchImage)
    .delete(authController.verifyToken, albumController.deleteImage, fileController.fileDestroy)

router.route('/images')
    .get(albumController.getImages)
    .post()

router.route('/albums')
    .get(albumController.getAlbum);

router.route('/likeimage')
    .get(authController.verifyToken,albumController.likeImage)

router.route('/heartimage')
    .get(authController.verifyToken,albumController.heartImage)

module.exports = router;