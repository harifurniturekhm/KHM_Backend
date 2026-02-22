const Offer = require('../models/Offer');
const Product = require('../models/Product');

exports.getAll = async (req, res) => {
    try {
        const offers = await Offer.find().populate('product').sort({ createdAt: -1 });
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getActive = async (req, res) => {
    try {
        const now = new Date();
        await Offer.updateMany({ endDate: { $lt: now }, isActive: true }, { isActive: false });
        const offers = await Offer.find({ isActive: true, startDate: { $lte: now }, endDate: { $gte: now } }).populate('product');
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { product, offerPercent, startDate, endDate } = req.body;
        const prod = await Product.findById(product);
        if (!prod) return res.status(404).json({ message: 'Product not found' });

        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        const discountedPrice = Math.round(prod.price - (prod.price * offerPercent / 100));
        const offer = await Offer.create({ product, offerPercent, startDate: start, endDate: end, discountedPrice });
        res.status(201).json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { product, offerPercent, startDate, endDate } = req.body;
        const prod = await Product.findById(product);
        if (!prod) return res.status(404).json({ message: 'Product not found' });

        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        const discountedPrice = Math.round(prod.price - (prod.price * offerPercent / 100));
        const offer = await Offer.findByIdAndUpdate(req.params.id, { product, offerPercent, startDate: start, endDate: end, discountedPrice, isActive: true }, { new: true });
        res.json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await Offer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Offer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
