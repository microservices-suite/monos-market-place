
const express = require('express');
const { validate } = require('@monos-market-place/utilities');

const  branchController  = require('../controllers/controllers');

const router = express.Router();

router
    .route('/branchs')
    .post(branchController.createBranch)
    .get(branchController.getBranchs);

router
    .route('/branchs/:id')
    .get(branchController.getBranch)
    .patch(branchController.updateBranch)
    .delete(branchController.deleteBranch);

module.exports = router;
