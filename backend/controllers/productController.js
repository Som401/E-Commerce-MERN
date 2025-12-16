const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../middlewares/error');
const Product = require('../models/productModel');

// Get all products with filtering, search, and pagination
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const resultPerPage = 12;
  const productsCount = await Product.countDocuments();

  // Build query object
  let queryObj = {};

  // Keyword search (search in name and description)
  if (req.query.keyword) {
    queryObj.$or = [
      { name: { $regex: req.query.keyword, $options: 'i' } },
      { description: { $regex: req.query.keyword, $options: 'i' } }
    ];
  }

  // Category filter
  if (req.query.category) {
    queryObj.category = req.query.category;
  }

  // Price filter
  if (req.query['price[gte]'] && req.query['price[lte]']) {
    queryObj.price = {
      $gte: Number(req.query['price[gte]']),
      $lte: Number(req.query['price[lte]'])
    };
  }

  // Ratings filter
  if (req.query['ratings[gte]']) {
    queryObj.ratings = { $gte: Number(req.query['ratings[gte]']) };
  }

  // Count filtered products
  const filteredProductsCount = await Product.countDocuments(queryObj);

  // Sorting
  let sortObj = {};
  if (req.query.sort) {
    const sortParam = req.query.sort;
    if (sortParam === 'name_asc') {
      sortObj = { name: 1 };
    } else if (sortParam === 'name_desc') {
      sortObj = { name: -1 };
    } else if (sortParam === 'price_asc') {
      sortObj = { price: 1 };
    } else if (sortParam === 'price_desc') {
      sortObj = { price: -1 };
    } else if (sortParam === 'ratings_desc') {
      sortObj = { ratings: -1 };
    }
  }

  // Pagination - skip if 'all' parameter is true
  let products;
  if (req.query.all === 'true') {
    // Fetch ALL products without pagination for caching
    products = await Product.find(queryObj)
      .sort(Object.keys(sortObj).length > 0 ? sortObj : { createdAt: -1 });
  } else {
    // Normal pagination
    const currentPage = Number(req.query.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    products = await Product.find(queryObj)
      .sort(Object.keys(sortObj).length > 0 ? sortObj : { createdAt: -1 })
      .limit(resultPerPage)
      .skip(skip);
  }

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get single product details
exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('reviews.user', 'name email');

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Create product review
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  if (!rating || !productId) {
    return next(new ErrorHandler('Please provide rating and productId', 400));
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.rating = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Review added successfully',
  });
});

// Get product reviews
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate('reviews.user', 'name email avatar');

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete review
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.params.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const rating = reviews.length === 0 ? 0 : avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully',
  });
});

// Create product (admin)
exports.createProduct = asyncErrorHandler(async (req, res, next) => {
  const cloudinary = require('cloudinary');

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product,
  });
});

// Update product (admin)
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  const cloudinary = require('cloudinary');

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Images handling
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else if (req.body.images) {
    images = req.body.images;
  }

  if (images.length > 0 && images[0] !== undefined) {
    // Delete old images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product,
  });
});

// Delete product (admin)
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  await Product.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// Get all products (admin)
exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});