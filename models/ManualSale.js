const mongoose = require('mongoose');

const manualSaleSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    date: { type: Date, required: true },
    address: { type: String, default: '' },
    // Legacy fields (optional now)
    product: { type: String },
    sellingPrice: { type: Number },
    // New POS fields
    products: [{
        productName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 }
    }],
    totalAmount: { type: Number },
    paymentType: { type: String, enum: ['Cash', 'UPI'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('ManualSale', manualSaleSchema);
