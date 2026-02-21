const Like = require('../models/Like');

exports.toggle = async (req, res) => {
    try {
        const { product, visitorId } = req.body;
        const existing = await Like.findOne({ product, visitorId });
        if (existing) {
            await Like.findByIdAndDelete(existing._id);
            return res.json({ liked: false });
        }
        await Like.create({ product, visitorId });
        res.json({ liked: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getByVisitor = async (req, res) => {
    try {
        const likes = await Like.find({ visitorId: req.params.visitorId }).populate('product');
        res.json(likes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.check = async (req, res) => {
    try {
        const { visitorId } = req.query;
        const likes = await Like.find({ visitorId });
        const likedProductIds = likes.map(l => l.product.toString());
        res.json(likedProductIds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
