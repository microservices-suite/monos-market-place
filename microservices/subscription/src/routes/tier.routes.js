
const express = require('express');
const { validate } = require('@monos-market-place/utilities');

const  tierController  = require('../controllers/tier.controllers');

const router = express.Router();

router
    .route('/')
    .post(tierController.createTier)
    .get(tierController.getTiers);

router
    .route('/:id')
    .get(tierController.getTier)
    .patch(tierController.updateTier)
    .delete(tierController.deleteTier);

module.exports = router;
