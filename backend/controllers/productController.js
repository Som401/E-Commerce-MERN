const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../middlewares/error');
const Product = require('../models/productModel');

// Get all products
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
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
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
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