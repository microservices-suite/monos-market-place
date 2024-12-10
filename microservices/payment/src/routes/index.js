const express = require('express');
const paymentRoutes = require('./payment.routes');
const transactionRoutes = require('./transaction.routes');

const router = express.Router();

const defaultRoutes = [
    {
        path:'/payments',
        route: paymentRoutes
    },
    {
        path:'/transactions',
        route: transactionRoutes
    }
]
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

module.exports = router;
