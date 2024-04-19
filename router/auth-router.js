const express = require('express');
const router = express.Router();
const usersController = require('../controller/auth-controller')

router.route('/register')
            .post(usersController.register)
router.route('/login')
            .post(usersController.login)
module.exports = router;