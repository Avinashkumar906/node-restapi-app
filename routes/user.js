const express = require('express')
const Auth = require('../controller/authContoller')
const mailController = require('../controller/mailController')

const router = express();

router.route('/signup')
    .get()
    .post( Auth.signUp)    

router.route('/signin')
    .get()
    .post(Auth.signIn)

router.route('/validate')
    .get(Auth.verifyToken, Auth.verifyUser)

router.route('/resettoken')
    .post(Auth.resetToken, mailController.postMail)

router.route('/reset')
    .post(Auth.resetPassword)

module.exports = router;