
const services = require('../services/services');
const { asyncErrorHandler, APIError } = require('@monos-market-place/utilities');

const createSubscription = asyncErrorHandler(async (req, res) => {
    const { body } = req;
    const { subscription: data } = await services.createSubscription({ body });
    res.status(201).json({ data });
});

const getSubscriptions = asyncErrorHandler(async (req, res) => {
    const { subscriptions: data } = await services.getSubscriptions();
    res.status(200).json({ data });
});

const getSubscription = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { subscription: data } = await services.getSubscriptionById({ id });
    if (!data) {
        throw new APIError(404, 'subscription not found');
    }
    res.status(200).json({ data });
});

const updateSubscription = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { subscription } = await services.getSubscriptionById({ id });
    if (!subscription) {
        throw new APIError(404, 'subscription not found');
    }
    const { upserted_subscription: data } = await services.updateSubscriptionProfile({ id, body });
    res.status(200).json({ data });
});

const deleteSubscription = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { subscription } = await services.getSubscriptionById({ id });
    if (!subscription) {
        throw new APIError(404, 'subscription not found');
    }
    await services.deleteSubscription({ id });
    res.status(200).json({ message: 'Deletion successful' });
});
module.exports = {
    createSubscription,
    getSubscriptions,
    getSubscription,
    updateSubscription,
    deleteSubscription
};

