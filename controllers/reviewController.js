const Review = require('../models/Review');
const User = require('../models/User');

exports.getByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name email').sort({ createdAt: -1 });
        const avg = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
        res.json({ reviews, averageRating: Math.round(avg * 10) / 10, count: reviews.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { product, rating, comment } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const userName = user.email.split('@')[0];
        const review = await Review.create({ product, rating, comment, userName, user: user._id });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
