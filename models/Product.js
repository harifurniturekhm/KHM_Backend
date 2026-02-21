const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String }],
    categoryType: { type: String, enum: ['category', 'non-category'], default: 'non-category' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    shortDescription: { type: String, default: '' },
    detailedDescription: { type: String, default: '' },
    specifications: [{
        name: { type: String },
        value: { type: String },
    }],
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
