const Product = require('../models/Product');
const { uploadToCloudinary } = require('../middleware/upload');

exports.getAll = async (req, res) => {
    try {
        const products = await Product.find().populate('category').sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFeatured = async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true }).populate('category').sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { name, categoryType, category, shortDescription, detailedDescription, specifications, price, stock, isFeatured } = req.body;
        const images = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.buffer, 'hari-furnicher/products');
                images.push(result.secure_url);
            }
        }

        const parsedSpecs = specifications ? JSON.parse(specifications) : [];
        const product = await Product.create({
            name, images, categoryType,
            category: category || null,
            shortDescription, detailedDescription,
            specifications: parsedSpecs,
            price: Number(price), stock: Number(stock),
            isFeatured: isFeatured === 'true',
        });
        res.status(201).json(product);
    } catch (error) {
        console.error('Product create error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, categoryType, category, shortDescription, detailedDescription, specifications, price, stock, isFeatured, existingImages } = req.body;
        const images = existingImages ? JSON.parse(existingImages) : [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file.buffer, 'hari-furnicher/products');
                images.push(result.secure_url);
            }
        }

        const parsedSpecs = specifications ? JSON.parse(specifications) : [];
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name, images, categoryType,
            category: category || null,
            shortDescription, detailedDescription,
            specifications: parsedSpecs,
            price: Number(price), stock: Number(stock),
            isFeatured: isFeatured === 'true',
        }, { new: true });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSpecNames = async (req, res) => {
    try {
        const products = await Product.find({}, 'specifications');
        const names = new Set();
        products.forEach(p => p.specifications.forEach(s => names.add(s.name)));
        res.json([...names]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
