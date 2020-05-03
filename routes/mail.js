const express = require('express')
const mailController = require('../controller/mailController')

const router = express.Router();

router.post('/postmailtoadmin',mailController.postMail)
router.post('/postfrommarble',mailController.postToMarble)
router.post('/posttocharity',mailController.postToCharity)

module.exports = router;