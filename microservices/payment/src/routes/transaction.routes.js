
const express = require('express');

const { transactionControllers } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(transactionControllers.getTransactions)
    .post(transactionControllers.createTransaction)

router
    .route('/initialize')
    .post(transactionControllers.initializeTransaction)
router
    .route('/verify')
    .post(transactionControllers.verifyTransaction)

router
    .route('/:id')
    .get(transactionControllers.getTransaction)
    .patch(transactionControllers.updateTransaction)

module.exports = router;
