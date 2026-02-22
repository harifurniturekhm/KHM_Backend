const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const verifyUserToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Login required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

const restrictToLocalhost = (req, res, next) => {
    const origin = req.headers.origin || req.headers.referer || '';
    const isAllowed = origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:') || origin.startsWith('file://') || origin === 'null';

    if (!isAllowed) {
        return res.status(403).json({ message: 'Admin access restricted to localhost or Desktop App' });
    }
    next();
};

module.exports = { verifyToken, verifyUserToken, restrictToLocalhost };

