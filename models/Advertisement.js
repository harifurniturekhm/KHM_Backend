const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
    media: { type: String, required: true },
    mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    isActive: { type: Boolean, default: true },
    redirectLink: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Advertisement', advertisementSchema);
