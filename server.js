require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const app = express();

// CORS
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'https://khm-frontend-hvsq7gt0l-harifurniturekhms-projects.vercel.app',
        process.env.CLIENT_URL,
    ].filter(Boolean),
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user-auth', require('./routes/userAuthRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/advertisements', require('./routes/advertisementRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/manual-sales', require('./routes/manualSaleRoutes'));
app.use('/api/brands', require('./routes/brandRoutes'));
app.use('/api/offers', require('./routes/offerRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/queries', require('./routes/queryRoutes'));
app.use('/api/likes', require('./routes/likeRoutes'));

app.get('/', (req, res) => res.json({ message: 'Hari Furnicher & Co API' }));

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

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    seedAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
