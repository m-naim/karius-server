const express = require('express');
const subscriptionHandler = require('../controllers/subscriptionHandler');

const router = express.Router();

router.post('/', subscriptionHandler.handlePushNotificationSubscription);
router.get('/:id', subscriptionHandler.sendPushNotification);

module.exports = router;
