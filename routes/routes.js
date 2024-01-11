const express = require('express')

const controller = require('../controllers/controller')
const authController = require('../controllers/authController')
const router = express.Router();

router.route('/').post(controller.Home).get(controller.Display)
router.route('/event').get(authController.protect, controller.getEvent).post(authController.protect, controller.createEvent)
router.route('/login').get(authController.Display)
router.route('/event/instance').post(authController.protect, controller.createEventInstance)
module.exports = router;

//  /event/Weekly_Data_Giveaway