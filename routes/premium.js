const express = require('express');

const premiumController = require('../controllers/premium');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/showLeaderboard', authMiddleware.authenticate, premiumController.getUserLeaderboard);
//router.get('/showLeaderboard', authMiddleware.authenticate);

module.exports = router;
