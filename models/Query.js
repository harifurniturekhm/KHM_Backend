const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Query', querySchema);
