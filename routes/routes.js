const express = require('express')

const controller = require('../controllers/controller')
const authController = require('../controllers/authController')
const router = express.Router();

router.route('/').post(controller.Home).get(controller.Display)
router.route('/event').get(controller.getEvent).post(controller.createEvent)
router.route('/login').get(authController.Display)
router.route('/dashboard')
module.exports = router;
