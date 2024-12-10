
const {merchantServices} = require('../services');
const { asyncErrorHandler, APIError } = require('@monos-market-place/utilities');

const createMerchant = asyncErrorHandler(async (req, res) => {
    const { body } = req;
    const { merchant: data } = await merchantServices.createMerchant({ body });
    res.status(201).json({ data });
});

const getMerchants = asyncErrorHandler(async (req, res) => {
    const { merchants: data } = await merchantServices.getMerchants();
    res.status(200).json({ data });
});

const getMerchant = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { merchant: data } = await merchantServices.getMerchantById({ id });
    if (!data) {
        throw new APIError(404, 'merchant not found');
    }
    res.status(200).json({ data });
});

const updateMerchant = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { merchant } = await merchantServices.getMerchantById({ id });
    if (!merchant) {
        throw new APIError(404, 'merchant not found');
    }
    const { upserted_merchant: data } = await merchantServices.updateMerchantProfile({ id, body });
    res.status(200).json({ data });
});

const deleteMerchant = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { merchant } = await merchantServices.getMerchantById({ id });
    if (!merchant) {
        throw new APIError(404, 'merchant not found');
    }
    await merchantServices.deleteMerchant({ id });
    res.status(200).json({ message: 'Deletion successful' });
});
module.exports = {
    createMerchant,
    getMerchants,
    getMerchant,
    updateMerchant,
    deleteMerchant
};

