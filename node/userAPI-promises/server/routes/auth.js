var express = require('express');
var router = express.Router();
var validator = require('../middleware/requestValidator');
var authController = require('../controllers/authController');

router.post('/', authController.authenticate);

module.exports = router;
