
const { ObjectId } = require('mongodb');
const { merchantModel } = require('../models');

const createMerchant = async ({ body }) => {
    const merchant = await merchantModel.create(body);
    return { merchant };
};

const getMerchants = async () => {
    const merchants = await merchantModel.find({});
    return { merchants };
};

const getMerchantById = async ({ id }) => {
    const merchant = await merchantModel.findById(id).populate('user');
    return { merchant };
};

const updateMerchantProfile = async ({ id, body }) => {
    const upserted_merchant = await merchantModel.updateOne({ _id: ObjectId(id) }, { ...body }, { upsert: false });
    return { upserted_merchant };
};

const deleteMerchant = async ({ id }) => {
    await merchantModel.deleteOne({ _id: ObjectId(id) });
};
module.exports = {
    createMerchant,
    getMerchants,
    getMerchantById,
    updateMerchantProfile,
    deleteMerchant
};
