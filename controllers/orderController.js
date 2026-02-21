const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Offer = require('../models/Offer');

exports.create = async (req, res) => {
    try {
        const { address, product, quantity } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const prod = await Product.findById(product);
        if (!prod) return res.status(404).json({ message: 'Product not found' });

        const now = new Date();
        const activeOffer = await Offer.findOne({
            product: prod._id,
            isActive: true,
            startDate: { $lte: now },
            endDate: { $gte: now }
        });

        const unitPrice = activeOffer ? activeOffer.discountedPrice : prod.price;
        const totalPrice = unitPrice * (quantity || 1);

        const order = await Order.create({
            user: user._id,
            customerName: user.name,
            mobile: user.phone,
            address, product,
            quantity: quantity || 1,
            totalPrice,
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const orders = await Order.find().populate('product').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const ManualSale = require('../models/ManualSale');

exports.updateStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('product');
        if (!order) return res.status(404).json({ message: 'Order not found' });

        const previousStatus = order.status;
        order.status = req.body.status;
        await order.save();

        // Auto-convert to Manual Sale if just delivered
        if (req.body.status === 'Delivered' && previousStatus !== 'Delivered') {
            await ManualSale.create({
                customerName: order.customerName || 'Online Customer',
                date: new Date(),
                address: order.address,
                product: order.product ? order.product.name : 'Unknown Product',
                sellingPrice: order.totalPrice,
                products: [{
                    productName: order.product ? order.product.name : 'Unknown Product',
                    quantity: order.quantity || 1,
                    price: order.totalPrice / (order.quantity || 1)
                }],
                totalAmount: order.totalPrice,
                paymentType: req.body.paymentType || 'Cash' // Use paymentType from frontend or default to Cash
            });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
