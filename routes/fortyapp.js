const express = require('express');
const fortyAppController = require('../controller/fortyAppController');
const authController = require('../controller/authContoller')

const router = express();

router.route('/taskboard')
    .get(fortyAppController.getTaskboard)
    .post(fortyAppController.getTaskboard)
    .patch(fortyAppController.getTaskboard)
    .delete(fortyAppController.getTaskboard)

router.route('/task')
    .get()
    .post(fortyAppController.postTask)
    .patch(fortyAppController.getTaskboard)
    .delete(fortyAppController.getTaskboard)

router.route('/tasksboard') 
    .get(fortyAppController.getTaskboardById)   

module.exports = router;