const Product = require('../models/Product');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    console.log('Product data:', product); // Thêm log để kiểm tra
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  console.log('Received product creation request:', req.body);
  console.log('Received files:', req.files);
  try {
    const { name, description, price, category, stock, sizes, colors } = req.body;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin sản phẩm' });
    }
    const product = new Product({
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      sizes: sizes ? sizes.split(',').map(size => size.trim()) : [],
      colors: colors ? colors.split(',').map(color => color.trim()) : [],
      image: req.files.image ? `/uploads/${req.files.image[0].filename}` : '',
      detailImages: req.files.detailImages 
        ? req.files.detailImages.map(file => `/uploads/${file.filename}`)
        : []
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Lỗi server khi tạo sản phẩm', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi cập nhật sản phẩm', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json({ message: 'Đã xóa sản phẩm' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error: error.message });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json(product.reviews);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

exports.addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    await product.save();

    res.status(201).json({ message: 'Đã thêm đánh giá thành công' });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi thêm đánh giá', error: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, minRating, sort } = req.query;
    let query = {};

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      query.averageRating = { $gte: Number(minRating) };
    }

    let sortOption = {};
    if (sort === 'price_asc') sortOption.price = 1;
    if (sort === 'price_desc') sortOption.price = -1;
    if (sort === 'newest') sortOption.createdAt = -1;
    if (sort === 'best_selling') sortOption.salesCount = -1;

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(20);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};