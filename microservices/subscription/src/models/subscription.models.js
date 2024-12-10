const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;  // For referencing other collections

const subscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: 'User',  
            required: true,
        },
        tier: {
            type: ObjectId,
            ref: 'Tier',  // Link to Tier model, representing the bought plan
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'expired'],
            default: 'active',
        },
        extraBranches: {
            type: Number,
            default: 0,  // Extra branches the business subscribes to
        },
        price: {
            type: Number,
            required: true,  // The total price the user paid
        },
    },
    {
        timestamps: true,  
    }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
