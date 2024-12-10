
const express = require('express');
const { validate } = require('@monos-market-place/utilities');

const  subscriptionController  = require('../controllers/subscription.controllers');

const router = express.Router();

router
    .route('/')
    .post(subscriptionController.createSubscription)
    .get(subscriptionController.getSubscriptions);

router
    .route('/:id')
    .get(subscriptionController.getSubscription)
    .patch(subscriptionController.updateSubscription)
    .delete(subscriptionController.deleteSubscription);

module.exports = router;
