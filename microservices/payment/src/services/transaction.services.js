
const { ObjectId } = require('mongodb');
const Transaction  = require('../models/transaction.model');

const createTransaction = async ({ body }) => {
    const transaction = await Transaction.create(body);
    return { transaction };
};

const getTransactions = async () => {
    const transactions = await Transaction.find({});
    return { transactions };
};

const getTransactionById = async ({ id }) => {
    const transaction = await Transaction.findById(id);
    return { transaction };
};

const updateTransactionByReference = async ({ reference, body }) => {
    const upserted_transaction = await Transaction.Profile({ reference }, { ...body }, { new: true, runValidators: true });
    return { upserted_transaction };
};

const updateTransactionProfile = async ({ id, body }) => {
    const upserted_transaction = await Transaction.findByIdAndUpdate(id, { ...body }, { new: true, runValidators: true });
    return { upserted_transaction };
};

const deleteTransaction = async ({ id }) => {
    await Transaction.findByIdAndDelete(id);
};
module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransactionProfile,
    deleteTransaction,
    updateTransactionByReference
};
