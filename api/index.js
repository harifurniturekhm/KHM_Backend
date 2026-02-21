require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const app = express();

// CORS — allow localhost for dev and deployed frontend
const allowedOrigins = [
    /^http:\/\/localhost:\d+$/,
    /^http:\/\/127\.0\.0\.1:\d+$/,
    // Production frontend URLs — add your deployed Vercel client & admin URLs here:
    process.env.CLIENT_URL,
    'https://khm-frontend-hvsq7gt0l-harifurniturekhms-projects.vercel.app',
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const isAllowed = allowedOrigins.some(o =>
            typeof o === 'string' ? o === origin : o.test(origin)
        );
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
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

app.get('/', (req, res) => res.json({ message: 'Hari Furniture & Co API' }));

// Seed admin on cold start
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

// Connect to DB and seed (runs once per cold start on Vercel)
connectDB().then(() => {
    seedAdmin();
});

// IMPORTANT: Do NOT call app.listen() for Vercel serverless
module.exports = app;
