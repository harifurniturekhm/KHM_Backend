const Category = require('../models/Category');
const { uploadToCloudinary } = require('../middleware/upload');

exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        let image = '';
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'hari-furnicher/categories');
            image = result.secure_url;
        }
        const category = await Category.create({ name, image });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { name } = req.body;
        const updateData = { name };
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'hari-furnicher/categories');
            updateData.image = result.secure_url;
        }
        const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
