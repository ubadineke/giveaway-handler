const express = require('express')

const controller = require('../controllers/controller')
const router = express.Router();

router.route('/').post(controller.Home).get(controller.Display)
router.route('/login')

module.exports = router;
