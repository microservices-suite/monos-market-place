
const { tierServices } = require('../services');
const { asyncErrorHandler, APIError } = require('@monos-market-place/utilities');

const createTier = asyncErrorHandler(async (req, res) => {
    const { body } = req;
    const { tier: data } = await tierServices.createTier({ body });
    res.status(201).json({ data });
});

const getTiers = asyncErrorHandler(async (req, res) => {
    const { tiers: data } = await tierServices.getTiers();
    res.status(200).json({ data });
});

const getTier = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { tier: data } = await tierServices.getTierById({ id });
    if (!data) {
        throw new APIError(404, 'tier not found');
    }
    res.status(200).json({ data });
});

const updateTier = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { tier } = await tierServices.getTierById({ id });
    if (!tier) {
        throw new APIError(404, 'tier not found');
    }
    const { upserted_tier: data } = await tierServices.updateTierProfile({ id, body });
    res.status(200).json({ data });
});

const deleteTier = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { tier } = await tierServices.getTierById({ id });
    if (!tier) {
        throw new APIError(404, 'tier not found');
    }
    await tierServices.deleteTier({ id });
    res.status(200).json({ message: 'Deletion successful' });
});
module.exports = {
    createTier,
    getTiers,
    getTier,
    updateTier,
    deleteTier
};

