const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const registerValidator = require('../validators/validateRegister');

router.post('/signIn', authController.signIn);
router.post('/signUp', registerValidator.rules, authController.signUp);
router.post('/logout', authController.logout);

module.exports = router;
