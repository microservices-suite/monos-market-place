
const { ObjectId } = require('mongodb');
const Product  = require('../models/models');

const createProduct = async ({ body }) => {
    const product = await Product.create(body);
    return { product };
};

const getProducts = async () => {
    const products = await Product.find({});
    return { products };
};

const getProductById = async ({ id }) => {
    const product = await Product.findById(id);
    return { product };
};

const updateProductProfile = async ({ id, body }) => {
    const upserted_product = await Product.findByIdAndUpdate({ _id }, { ...body }, { new: true, runValidators: true });
    return { upserted_product };
};

const deleteProduct = async ({ id }) => {
    await Product.findByIdAndDelete(id);
};
module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductProfile,
    deleteProduct
};
