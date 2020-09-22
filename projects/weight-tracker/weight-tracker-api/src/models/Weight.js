const mongoose = require('mongoose');

const WeightSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    weight: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

module.exports = mongoose.model('Weight', WeightSchema);