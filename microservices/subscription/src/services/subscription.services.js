
const { ObjectId } = require('mongodb');
const {subscriptionModel}  = require('../models');

const createSubscription = async ({ body }) => {
    const subscription = await subscriptionModel.create(body);
    return { subscription };
};

const getSubscriptions = async () => {
    const subscriptions = await subscriptionModel.find({});
    return { subscriptions };
};

const getSubscriptionById = async ({ id }) => {
    const subscription = await subscriptionModel.findById(id).populate('tier');
    return { subscription };
};

const updateSubscriptionProfile = async ({ id, body }) => {
    const upserted_subscription = await subscriptionModel.findByIdAndUpdate({ _id }, { ...body }, { new: true, runValidators: true });
    return { upserted_subscription };
};

const deleteSubscription = async ({ id }) => {
    await subscriptionModel.findByIdAndDelete(id);
};
module.exports = {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscriptionProfile,
    deleteSubscription
};
