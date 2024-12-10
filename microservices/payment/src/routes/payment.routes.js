
const express = require('express');
const { validate } = require('@monos-market-place/utilities');

const paymentController = require('../controllers/payment.controllers');

const router = express.Router();

router
    .route('/')
    .post(paymentController.createPayment)
    .get(paymentController.getPayments);
router
    .route('/gateway')
    .get(paymentController.getRedirectUrl)
    .patch(paymentController.updatePayment)
router
    .route('/callback')
    .patch(paymentController.updatePayment)
router
    .route('/:id')
    .patch(paymentController.updatePayment)
module.exports = router;
