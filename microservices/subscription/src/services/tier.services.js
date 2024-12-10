
const { ObjectId } = require('mongodb');
const { tierModel } = require('../models');

const createTier = async ({ body }) => {
    const tier = await tierModel.create(body);
    return { tier };
};

const getTiers = async () => {
    const tiers = await tierModel.find({});
    return { tiers };
};

const getTierById = async ({ id }) => {
    const tier = await tierModel.findById(id);
    return { tier };
};

const updateTierProfile = async ({ id, body }) => {
    const upserted_tier = await tierModel.findByIdAndUpdate(id, { ...body }, { new: true, runValidators: true });
    return { upserted_tier };
};

const deleteTier = async ({ id }) => {
    await tierModel.findByIdAndDelete(id);
};
module.exports = {
    createTier,
    getTiers,
    getTierById,
    updateTierProfile,
    deleteTier
};
