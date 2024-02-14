const express = require('express');
const accountController = require('./accountController');
const authController = require('../appAuth/authController')

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);


router.route('/')
    .get(accountController.getAll)
    .post(accountController.createOne)

router.route('/:id')
    .get(accountController.getOne)
    .patch(accountController.updateOne)
    .delete(accountController.deleteOne)

module.exports = router;

