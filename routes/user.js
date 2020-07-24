const express = require('express')
const Auth = require('../controller/authContoller')

const router = express();

router.route('/signup')
    .get()
    .post( Auth.signUp)    

router.route('/signin')
    .get()
    .post(Auth.signIn)

module.exports = router;