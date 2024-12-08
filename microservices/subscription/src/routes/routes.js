
const express = require('express');
const { validate } = require('@monos-market-place/utilities');

const  subscriptionController  = require('../controllers/controllers');

const router = express.Router();

router
    .route('/subscriptions')
    .post(subscriptionController.createSubscription)
    .get(subscriptionController.getSubscriptions);

router
    .route('/subscriptions/:id')
    .get(subscriptionController.getSubscription)
    .patch(subscriptionController.updateSubscription)
    .delete(subscriptionController.deleteSubscription);

module.exports = router;
