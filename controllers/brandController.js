const Brand = require('../models/Brand');
const { uploadToCloudinary } = require('../middleware/upload');

exports.getAll = async (req, res) => {
    try {
        const brands = await Brand.find().sort({ name: 1 });
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!req.file) return res.status(400).json({ message: 'Logo required' });
        const result = await uploadToCloudinary(req.file.buffer, 'hari-furnicher/brands');
        const brand = await Brand.create({ name, logo: result.secure_url });
        res.status(201).json(brand);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { name } = req.body;
        const updateData = { name };
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, 'hari-furnicher/brands');
            updateData.logo = result.secure_url;
        }
        const brand = await Brand.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await Brand.findByIdAndDelete(req.params.id);
        res.json({ message: 'Brand deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
