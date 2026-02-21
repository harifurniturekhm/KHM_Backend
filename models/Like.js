const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    visitorId: { type: String, required: true },
}, { timestamps: true });

likeSchema.index({ product: 1, visitorId: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);
