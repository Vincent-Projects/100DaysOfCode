const mongoose = require('mongoose');

const WeightSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Weight', WeightSchema);