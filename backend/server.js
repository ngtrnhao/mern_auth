require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');
const cron = require('node-cron');
const inventoryController = require('./controllers/inventoryController');
const deliveryRoutes = require('./routes/deliveryRoutes');
const chatRoutes = require('./routes/chatRoutes');


dotenv.config();

console.log('ADMIN_SECRET:', process.env.ADMIN_SECRET);

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

app.use(cors({
  origin: function (origin, callback) {
    // Cho phép requests không có origin (như mobile apps hoặc curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  console.log('Request body:', req.body);
  next();
});

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
//const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categories');
const addressRoutes = require('./routes/addressRoutes');

// Đặt route admin trước các route khác
app.use('/api/admin', authMiddleware, adminMiddleware, (req, res, next) => {
  console.log('Admin route accessed');
  next();
}, adminRoutes);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', (req, res, next) => {
  console.log('Request to /api/products:', req.method, req.url);
  next();
}, productRoutes);
app.use('/api/cart', cartRoutes);
//app.use('/api/user', userRoutes);
//Admin routes
app.use('/api/user', userRoutes);

/*app.use('/api/categories', categoryRoutes);*/
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/address', addressRoutes);

const productController = require('./controllers/productController');
console.log(productController); // Kiểm tra xem object này có chứa hàm getProductsByCategorySlug không

// Add this line after other route definitions
app.get('/api/categories/:slug/products', productController.getProductsByCategorySlug);

app.get('/api/products/slug/:slug', productController.getProductBySlug);

const inventoryRoutes = require('./routes/inventoryRoutes');

// Thêm dòng này vào phần sử dụng routes
app.use('/api/inventory', inventoryRoutes);

const supplierRoutes = require('./routes/supplierRoutes');

// Thêm dòng này vào phần khai báo routes
app.use('/api/suppliers', supplierRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({
      message: 'Origin not allowed',
      allowedOrigins: process.env.NODE_ENV === 'development' ? allowedOrigins : undefined
    });
  } else {
    next(err);
  }
});

// Chạy mỗi ngày lúc 00:00
cron.schedule('0 0 * * *', () => {
  inventoryController.checkAndCreatePurchaseOrders();
});

// Sau đó mới đến các route khác và static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Add admin routes
app.use('/api', adminRoutes);

// Add route for delivery management
app.use('/api/admin/deliveries', require('./routes/deliveryRoutes'));
app.use('/api/deliveries', deliveryRoutes);

// Import cronJobs
require('./utils/cronJobs');

// Thêm route chat trước middleware xác thực
app.use('/api/chat', chatRoutes);

// Các route khác cần xác thực
app.use('/api', authMiddleware, (req, res, next) => {
  console.log('Protected route accessed');
  next();
});

module.exports = app;