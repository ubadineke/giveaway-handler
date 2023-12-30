const express = require('express')

const controller = require('../controllers/controller')
const router = express.Router();

router.route('/').post(controller.Handler)

module.exports = router;
