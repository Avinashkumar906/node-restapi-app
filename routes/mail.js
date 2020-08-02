const express = require('express')
const mailController = require('../controller/mailController')

const router = express.Router();

router.get('/mailservice',mailController.postMail)

module.exports = router;