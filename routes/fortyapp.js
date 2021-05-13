const express = require('express');
const fortyAppController = require('../controller/fortyAppController');
const authController = require('../controller/authContoller')

const router = express();

router.route('/tasksboard')
    .get(authController.verifyToken, fortyAppController.getTaskboards)
    .post(fortyAppController.getTaskboards)
    .patch(fortyAppController.getTaskboards)
    .delete(fortyAppController.getTaskboards)

router.route('/task')
    .get()
    .post(fortyAppController.postTask)
    .patch(fortyAppController.getTaskboards)
    .delete(fortyAppController.getTaskboards)

router.route('/taskboard') 
    .get(fortyAppController.getTaskboardById)   

module.exports = router;