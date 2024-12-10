const express = require('express');
const subscriptionRoutes = require('./subscription.routes');
const tierRoutes = require('./tier.routes');

const router = express.Router();

const defaultRoutes = [
    {
        path:'/subscriptions',
        route: subscriptionRoutes
    },
    {
        path:'/tiers',
        route: tierRoutes
    }
]
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

module.exports = router;
