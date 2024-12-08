
const { ObjectId } = require('mongodb');
const Branch  = require('../models/models');

const createBranch = async ({ body }) => {
    const branch = await Branch.create(body);
    return { branch };
};

const getBranchs = async () => {
    const branchs = await Branch.find({});
    return { branchs };
};

const getBranchById = async ({ id }) => {
    const branch = await Branch.findById(id);
    return { branch };
};

const updateBranchProfile = async ({ id, body }) => {
    const upserted_branch = await Branch.updateOne({ _id: ObjectId(id)  }, { ...body }, { upsert: false });
    return { upserted_branch };
};

const deleteBranch = async ({ id }) => {
    await Branch.deleteOne({ _id: ObjectId(id) });
};
module.exports = {
    createBranch,
    getBranchs,
    getBranchById,
    updateBranchProfile,
    deleteBranch
};
