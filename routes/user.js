const express = require('express')
const Auth = require('../controller/authContoller')
const User = require('../controller/userController')

const router = express.Router();

router.get('/getuserdata', User.getUserData)

router.post('/postsignup', Auth.signUp)
router.post('/userlogin', Auth.postUserLogin)
router.post('/nameandbio',  Auth.verifyToken, User.postNameAndBio)
router.post('/postaboutdata', Auth.verifyToken, User.postAboutSection)
router.post('/postportfoliodata', Auth.verifyToken, User.postPortfolioSection)
router.post('/postresumedata', Auth.verifyToken, User.postResumeSection)
router.post('/postcontactdata', Auth.verifyToken, User.postUserData)

module.exports = router;