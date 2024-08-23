const mongoose = require('mongoose')

// SCHEMA
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    trialActive: {
        type: String,
        required: true
    },
    trialExpires: {
        type: Date
    },
    subscription: {
        type: String,
        enum: ['Trial','Free','Basic','Premium']
    },
    apiRequestCount: {
        type: Number,
        default: 0
    },
    monthlyRequestCount: {
        type: Number,
        default: 0
    },
    nextBillingDate: Date,
    payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment'
        }
    ],
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'History'
        }
    ]
},{
    timestamps: true
})

//* COMPILE TO FROM THE MODEL */
const User = mongoose.mongo('User', userSchema);

module.exports = User;