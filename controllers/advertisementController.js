const Advertisement = require('../models/Advertisement');
const { uploadToCloudinary } = require('../middleware/upload');

exports.getActive = async (req, res) => {
    try {
        const ads = await Advertisement.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(ads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const ads = await Advertisement.find().sort({ createdAt: -1 });
        res.json(ads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { redirectLink } = req.body;
        if (!req.file) return res.status(400).json({ message: 'Media file required' });

        const isVideo = req.file.mimetype.startsWith('video');
        const result = await uploadToCloudinary(req.file.buffer, 'hari-furnicher/ads', isVideo ? 'video' : 'image');

        const ad = await Advertisement.create({
            media: result.secure_url,
            mediaType: isVideo ? 'video' : 'image',
            redirectLink: redirectLink || '',
        });
        res.status(201).json(ad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.toggleActive = async (req, res) => {
    try {
        const ad = await Advertisement.findById(req.params.id);
        if (!ad) return res.status(404).json({ message: 'Ad not found' });
        ad.isActive = !ad.isActive;
        await ad.save();
        res.json(ad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await Advertisement.findByIdAndDelete(req.params.id);
        res.json({ message: 'Advertisement deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
