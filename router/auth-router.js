const express = require('express');
const router = express.Router();
const usersController = require('../controller/auth-controller')

router.route('/register')
            .post(usersController.register)
router.route('/login')
            .post(usersController.login)
// router.route('/logout')
//             .get(usersController.logout)
module.exports = router;