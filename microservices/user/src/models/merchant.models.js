const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types; // For referencing other collections

// Branch Schema
const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});

// Merchant Schema
const merchantSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        branches: {
            type: [branchSchema],
            required: true,
        },
        subscription: {
            type: ObjectId,
            ref: 'Subscription',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = Merchant;
