const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
 user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paypalOrderId: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'paid'], // Thêm 'paid' vào danh sách
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  shippingInfo: {
    fullName: String,
    phone: String,
    address: String,
    provinceId: String,
    provinceName: String,
    districtId: String,
    districtName: String,
    wardId: String,
    wardName: String
  },
  shippingAddress: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
