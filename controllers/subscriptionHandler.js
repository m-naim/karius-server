const subscriptions = {};
const crypto = require('crypto');
const webpush = require('web-push');

const vapidKeys = {
  privateKey: 'bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU',
  publicKey: 'BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8',
};

webpush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);

function createHash(input) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(Buffer.from(input));
  return md5sum.digest('hex');
}

function handlePushNotificationSubscription(req, res) {
  console.log(req);
  const subscriptionRequest = req.body;
  const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
  console.log(susbscriptionId);
  subscriptions[susbscriptionId] = subscriptionRequest;
  res.status(201).json({ id: susbscriptionId });
}

function sendPushNotification(req, res) {
  console.log('sendPushNotification');
  const subscriptionId = req.params.id;
  const pushSubscription = subscriptions[subscriptionId];
  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: 'Test Notification from back-end ',
        image: '/images/jason-leung-HM6TMmevbZQ-unsplash.jpg',
        tag: 'Test',
      }),
    )
    .catch((err) => {
      console.log(err);
    });

  res.status(202).json({});
}

module.exports = { handlePushNotificationSubscription, sendPushNotification };
