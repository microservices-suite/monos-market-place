
const express = require('express');
const { userContrellers } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .post(userContrellers.createUser)
    .get(userContrellers.getUsers);

router
    .route('/:id')
    .get(userContrellers.getUser)
    .patch(userContrellers.updateUser)
    .delete(userContrellers.deleteUser);

module.exports = router;
