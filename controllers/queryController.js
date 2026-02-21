const Query = require('../models/Query');

exports.getAll = async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 });
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const query = await Query.create(req.body);
        res.status(201).json(query);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await Query.findByIdAndDelete(req.params.id);
        res.json({ message: 'Query deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.toggleRead = async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);
        if (!query) return res.status(404).json({ message: 'Query not found' });
        query.read = !query.read;
        await query.save();
        res.json(query);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
