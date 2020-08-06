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

router.route('/myuploads')
    .get(authController.verifyToken,albumController.getMyUploads);

router.route('/likeimage')
    .get(authController.verifyToken,albumController.likeImage)

router.route('/heartimage')
    .get(authController.verifyToken,albumController.heartImage)

router.route('/mytags')
    .get(authController.verifyToken,albumController.getTagged)
    .post()

router.route('/myliked')
    .get(authController.verifyToken,albumController.getLiked)

router.route('/myfavorite')
    .get(authController.verifyToken,albumController.getFavorite)

router.route('/myPrivate')
    .get(authController.verifyToken,albumController.getPrivate)

module.exports = router;