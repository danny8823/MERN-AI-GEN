const mongoose = require('mongoose')

// SCHEMA
const historySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

//* COMPILE TO FROM THE MODEL */
const ContentHistory = mongoose.model('ContentHistory', historySchema);

module.exports = ContentHistory;