
const express = require('express');

const router = express.Router();


const usersController = require('../controller/user-controller')
const appError = require('../utility/appError');

// register

// login


router.route('/register')
            .post(usersController.register)

router.route('/login')
            .post(usersController.login)

module.exports = router;