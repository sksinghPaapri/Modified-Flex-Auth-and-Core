const express = require('express');
const accessControlController = require('./accessControlController');
const authController = require('../appAuth/authController')

const router = express.Router();

// Protect all routes after this middleware
//router.use(authController.protect);

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/signup', accessControlController.createOne);
router.patch('/update', accessControlController.updateOne);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
// Protect all routes after this middleware







module.exports = router;

