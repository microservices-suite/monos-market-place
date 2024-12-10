const mongoose = require('mongoose');

const tierSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            enum: ['Starter', 'Pro', 'Enterprise'],  // The types of subscription tiers
        },
        price: {
            type: Number,
            required: true,
        },
        maxProducts: {
            type: Number,
            required: true,
        },
        maxBranches: {
            type: Number,
            required: true,
        },
        features: {
            type: [String],  // Features available for each tier
            required: true,
        },
    },
    {
        timestamps: true,  // Automatically adds createdAt and updatedAt fields
    }
);

const Tier = mongoose.model('Tier', tierSchema);

module.exports = Tier;
