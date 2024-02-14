const express = require('express');

// All routes
const accessControlRoutes = require('../modules/accessControl/accessControlRoutes');
const accountRoutes = require('../modules/account/accountRoutes');

// Routers
const router = express.Router();

router.use('/accessControl', accessControlRoutes)
router.use('/account', accountRoutes)

module.exports = router;