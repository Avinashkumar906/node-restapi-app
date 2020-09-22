const express = require('express')
const mailController = require('../controller/mailController')

const router = express.Router();

router.post('/mailservice',mailController.postMail)

router.post('/testmailservice',mailController.postMail)

module.exports = router;