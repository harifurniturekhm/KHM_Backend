require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const app = express();

// ✅ SIMPLE WORKING CORS (Fixes everything)
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/user-auth', require('../routes/userAuthRoutes'));
app.use('/api/products', require('../routes/productRoutes'));
app.use('/api/categories', require('../routes/categoryRoutes'));
app.use('/api/advertisements', require('../routes/advertisementRoutes'));
app.use('/api/orders', require('../routes/orderRoutes'));
app.use('/api/manual-sales', require('../routes/manualSaleRoutes'));
app.use('/api/brands', require('../routes/brandRoutes'));
app.use('/api/offers', require('../routes/offerRoutes'));
app.use('/api/reviews', require('../routes/reviewRoutes'));
app.use('/api/queries', require('../routes/queryRoutes'));
app.use('/api/likes', require('../routes/likeRoutes'));

app.get('/', (req, res) => {
    res.json({ message: 'Hari Furniture & Co API Running' });
});

// Seed admin
const seedAdmin = async () => {
    try {
        const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
        if (!exists) {
            const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            await Admin.create({ email: process.env.ADMIN_EMAIL, password: hashed });
            console.log('Admin seeded');
        }
    } catch (err) {
        console.error('Seed error:', err.message);
    }
};

connectDB().then(() => {
    seedAdmin();
});

// Start server if running directly (local dev)
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ❗ VERY IMPORTANT FOR VERCEL
module.exports = app;
