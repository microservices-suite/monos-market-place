
const services = require('../services/services');
const { asyncErrorHandler, APIError } = require('@monos-market-place/utilities');

const createBranch = asyncErrorHandler(async (req, res) => {
    const { body } = req;
    const { branch: data } = await services.createBranch({ body });
    res.status(201).json({ data });
});

const getBranchs = asyncErrorHandler(async (req, res) => {
    const { branchs: data } = await services.getBranchs();
    res.status(200).json({ data });
});

const getBranch = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { branch: data } = await services.getBranchById({ id });
    if (!data) {
        throw new APIError(404, 'branch not found');
    }
    res.status(200).json({ data });
});

const updateBranch = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { branch } = await services.getBranchById({ id });
    if (!branch) {
        throw new APIError(404, 'branch not found');
    }
    const { upserted_branch: data } = await services.updateBranchProfile({ id, body });
    res.status(200).json({ data });
});

const deleteBranch = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { branch } = await services.getBranchById({ id });
    if (!branch) {
        throw new APIError(404, 'branch not found');
    }
    await services.deleteBranch({ id });
    res.status(200).json({ message: 'Deletion successful' });
});
module.exports = {
    createBranch,
    getBranchs,
    getBranch,
    updateBranch,
    deleteBranch
};

