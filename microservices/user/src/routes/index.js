const express = require('express');
const userRoutes = require('./user.routes');
const merchantRoutes = require('./merchant.routes');

const router = express.Router();

const defaultRoutes = [
    {
        path:'/merchants',
        route: merchantRoutes
    },
    {
        path:'/users',
        route: userRoutes
    }
]
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

module.exports = router;
