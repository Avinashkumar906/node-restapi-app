const express = require('express');
const fortyAppController = require('../controller/fortyAppController');
const authController = require('../controller/authContoller')

const router = express();

router.route('/tasksboard')
    .get(authController.verifyToken, fortyAppController.getTaskboards)

router.route('/tasks')
    .get(authController.verifyToken, fortyAppController.getTasks)

router.route('/task')
    .get(authController.verifyToken, fortyAppController.getTaskById)
    .post(authController.verifyToken, fortyAppController.postTask)
    .patch(authController.verifyToken, fortyAppController.patchTask)
    .delete(authController.verifyToken, fortyAppController.deleteTask)

router.route('/taskboard') 
    .post(authController.verifyToken, fortyAppController.postTaskboard)   
    .patch(authController.verifyToken, fortyAppController.patchTaskboard)
    .delete(authController.verifyToken, fortyAppController.deleteTaskboard)

module.exports = router;