const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../middlewares/error');
const User = require('../models/userModel');
const crypto = require('crypto');

// Register user
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler('Please provide all required fields', 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'sample_id',
      url: 'https://res.cloudinary.com/sample/image/upload/v1234/sample.jpg',
    },
  });

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    token,
    user,
  });
});

// Login user
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('Please enter email & password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

// Logout
exports.logout = asyncErrorHandler(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

// Get user details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update password
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!req.body.oldPassword || !req.body.newPassword) {
    return next(new ErrorHandler('Please provide old and new password', 400));
  }

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    token,
    message: 'Password updated successfully',
  });
});

// Update user profile
exports.updateProfile = asyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user,
  });
});

// Forgot password
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    resetToken,
    message: 'Password reset token sent',
  });
});

// Reset password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler('Reset password token is invalid or expired', 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    token,
    message: 'Password reset successfully',
  });
});

// Get all users (admin)
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user role (admin)
exports.updateUserRole = asyncErrorHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: 'User role updated successfully',
    user,
  });
});

// Delete user (admin)
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 404)
    );
  }

  await User.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});
