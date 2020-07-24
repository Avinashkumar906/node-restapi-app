const express = require('express')
const Auth = require('../controller/authContoller')
const User = require('../controller/userController')

const router = express();

router.route('/userdata')
    .get(User.getUserData)

router.route('/nameandbio')
    .get()
    .post(Auth.verifyToken, User.postNameAndBio)

router.route('/userabout')
    .get()
    .post(Auth.verifyToken, User.postAboutSection)

router.route('/userportfolio')
    .get()
    .post( Auth.verifyToken, User.postPortfolioSection)

router.route('/userresume')
    .get()
    .post(Auth.verifyToken, User.postResumeSection)
    
router.route('/usercontact')
    .get()
    .post(Auth.verifyToken, User.postUserData)

router.route('/resume')
    .get((req,res)=>{
        res.download(require('path').join(__dirname,'../','Profile.doc'))
    })

module.exports = router;