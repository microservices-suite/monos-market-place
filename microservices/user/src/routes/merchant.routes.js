
const express = require('express');
const { merchantContrellers } = require('../controllers');

const router = express.Router();
router
    .route('/')
    .post(merchantContrellers.createMerchant)
    .get(merchantContrellers.getMerchants);

router
    .route('/:id')
    .get(merchantContrellers.getMerchant)
    .patch(merchantContrellers.updateMerchant)
    .delete(merchantContrellers.deleteMerchant);

module.exports = router;
