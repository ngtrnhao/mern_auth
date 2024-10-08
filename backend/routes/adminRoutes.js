const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');
const Order = require('../models/Order');  
const User = require('../models/User');
const Product = require('../models/Product'); 
const inventoryController = require('../controllers/inventoryController');
const supplierController = require('../controllers/supplierController');

router.use(authMiddleware);
router.use(adminMiddleware);

// Quản lý sản phẩm
router.get('/products', adminController.getAllProducts);
router.post('/products', upload.single('image'), adminController.createProduct);
router.put('/products/:id', upload.single('image'), adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Quản lý đơn hàng
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:id', adminController.updateOrderStatus);

// Quản lý người dùng
router.get('/users', adminController.getAllUsers);
router.put('/users/:id', adminController.updateUserStatus);

// Thống kê
router.get('/statistics', async (req, res) => {
  try {
    const totalRevenue = await calculateTotalRevenue();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const topProducts = await getTopProducts();
    const monthlySales = await getMonthlySales();

    res.json({
      totalRevenue,
      totalOrders,
      totalUsers,
      topProducts,
      monthlySales
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

async function calculateTotalRevenue() {
  const result = await Order.aggregate([
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);
  return result[0]?.total || 0;
}

async function getTopProducts(limit = 5) {
  return await Product.aggregate([
    { $sort: { soldQuantity: -1 } },
    { $limit: limit },
    { $project: { name: 1, soldQuantity: 1 } }
  ]);
}

async function getMonthlySales() {
  const currentYear = new Date().getFullYear();
  const result = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(`${currentYear}-01-01`), $lt: new Date(`${currentYear + 1}-01-01`) }
      }
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        revenue: { $sum: '$totalAmount' }
      }
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        revenue: 1
      }
    },
    { $sort: { month: 1 } }
  ]);

  // Đảm bảo có đủ 12 tháng, thêm các tháng còn thiếu với doanh thu 0
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullYearSales = monthNames.map((name, index) => {
    const monthData = result.find(item => item.month === index + 1);
    return {
      month: name,
      revenue: monthData ? monthData.revenue : 0
    };
  });

  return fullYearSales;
}

// Quản lý kho hàng
router.get('/products/low-stock', inventoryController.getLowStockProducts);
router.put('/products/update-stock', inventoryController.updateStock);

// Quản lý đơn đặt hàng
router.get('/purchase-orders', inventoryController.getPurchaseOrders);
router.post('/purchase-orders', inventoryController.createPurchaseOrder);
router.put('/purchase-orders/:id', inventoryController.updatePurchaseOrder);
router.get('/purchase-orders/:id/pdf', authMiddleware, adminMiddleware, (req, res, next) => {
  console.log('PDF route hit');
  inventoryController.generatePurchaseOrderPDF(req, res, next);
});

// Kiểm tra hàng tồn kho thấp
router.post('/check-low-stock', inventoryController.manualCheckLowStock);

// Quản lý nhà cung cấp
router.get('/suppliers', supplierController.getSuppliers);
router.post('/suppliers', supplierController.createSupplier);
router.put('/suppliers/:id', supplierController.updateSupplier);
router.delete('/suppliers/:id', supplierController.deleteSupplier);

module.exports = router;