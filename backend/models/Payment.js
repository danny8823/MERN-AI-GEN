const mongoose = require('mongoose')

// SCHEMA
const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reference: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        required: true
    },
    subscriptionPlan: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    monthlyRequestCount: {
        type: Number,
        default: true
    }
},{
    timestamps: true
})

//* COMPILE TO FROM THE MODEL */
const Payment = mongoose.mongo('Payment', paymentSchema);

module.exports = Payment;