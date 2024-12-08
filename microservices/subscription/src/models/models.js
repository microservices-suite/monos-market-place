
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}
    , {
        timestamps: true
    });

const Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports =  Subscription;
