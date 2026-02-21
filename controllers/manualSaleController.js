const ManualSale = require('../models/ManualSale');

exports.getAll = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const filter = {};
        if (startDate && endDate) {
            filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        const sales = await ManualSale.find(filter).sort({ date: -1 });

        const totalSold = sales.reduce((sum, s) => sum + (s.totalAmount || s.sellingPrice || 0), 0);

        res.json({ sales, totalSold });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const sale = await ManualSale.create(req.body);
        res.status(201).json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const sale = await ManualSale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await ManualSale.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sale deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
