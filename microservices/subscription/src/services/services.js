
const { ObjectId } = require('mongodb');
const Subscription  = require('../models/models');

const createSubscription = async ({ body }) => {
    const subscription = await Subscription.create(body);
    return { subscription };
};

const getSubscriptions = async () => {
    const subscriptions = await Subscription.find({});
    return { subscriptions };
};

const getSubscriptionById = async ({ id }) => {
    const subscription = await Subscription.findById(id);
    return { subscription };
};

const updateSubscriptionProfile = async ({ id, body }) => {
    const upserted_subscription = await Subscription.updateOne({ _id: ObjectId(id)  }, { ...body }, { upsert: false });
    return { upserted_subscription };
};

const deleteSubscription = async ({ id }) => {
    await Subscription.deleteOne({ _id: ObjectId(id) });
};
module.exports = {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscriptionProfile,
    deleteSubscription
};
