
const { userModel } = require('../models');

const createUser = async ({ body }) => {
    const user = await userModel.create(body);
    return { user };
};

const getUsers = async () => {
    const users = await userModel.find({});
    return { users };
};

const getUserById = async ({ id }) => {
    const user = await userModel.findById(id);
    return { user };
};

const updateUserProfile = async ({ id, body }) => {
    // Update the user document
    const upserted_user = await userModel.findByIdAndUpdate(
        id,
        { ...body },
        { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` ensures validation is run
    ); return { upserted_user };
};

const deleteUser = async ({ id }) => {
    await userModel.findByIdAndDelete(id);
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUserProfile,
    deleteUser
};
