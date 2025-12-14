const User = require('../models/userModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const sendToken = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register User
exports.registerUser = asyncErrorHandler(async (req, res, next) => {

    const { name, email, gender, password } = req.body;

    // Default avatar object
    let avatarData = {
        public_id: "default_avatar",
        url: "https://res.cloudinary.com/demo/image/upload/v1/avatar_placeholder.png",
    };

    // Only upload to Cloudinary if avatar is provided
    if (req.body.avatar && req.body.avatar !== "") {
        try {
            console.log("📤 Attempting to upload avatar to Cloudinary...");
            console.log("📊 Avatar data length:", req.body.avatar.length);
            console.log("🔍 Avatar data preview:", req.body.avatar.substring(0, 50) + "...");

            // Validate base64 data URL format
            if (!req.body.avatar.startsWith('data:image/')) {
                console.error("❌ Invalid avatar format: does not start with 'data:image/'");
                return next(new ErrorHandler("Invalid image format. Please upload a valid image file.", 400));
            }

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale",
            });

            avatarData = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
            console.log("✅ Avatar uploaded successfully to Cloudinary!");
            console.log("📸 Avatar URL:", myCloud.secure_url);
            console.log("🆔 Public ID:", myCloud.public_id);
        } catch (error) {
            console.error("❌ Cloudinary upload error:", error.message);
            console.error("📋 Full error details:", error);

            // Return specific error instead of using default avatar
            return next(new ErrorHandler(`Avatar upload failed: ${error.message}. Please try a different image or contact support.`, 500));
        }
    } else {
        console.log("ℹ️  No avatar provided, using default avatar");
    }

    const user = await User.create({
        name,
        email,
        gender,
        password,
        avatar: avatarData,
    });

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
});

// Logout User
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Get User Details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Forgot Password
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    try {
        await sendEmail({
            email: user.email,
            templateId: process.env.SENDGRID_RESET_TEMPLATEID,
            data: {
                reset_url: resetPasswordUrl
            }
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
});

// Reset Password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {

    // create hash token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Invalid reset password token", 404));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
});

// Update Password
exports.updatePassword = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is Invalid", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = asyncErrorHandler(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }

    await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// ============================================
// ADDRESS MANAGEMENT
// ============================================

// Add New Address
exports.addAddress = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    const { name, phoneNo, address, city, state, country, pinCode, isDefault } = req.body;

    // If this is set as default, unset other defaults
    if (isDefault) {
        user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses.push({ name, phoneNo, address, city, state, country, pinCode, isDefault });

    await user.save();

    res.status(200).json({
        success: true,
        message: "Address added successfully"
    });
});

// Update Address
exports.updateAddress = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    const address = user.addresses.id(req.params.addressId);

    if (!address) {
        return next(new ErrorHandler("Address not found", 404));
    }

    const { name, phoneNo, address: addr, city, state, country, pinCode, isDefault } = req.body;

    // If setting as default, unset other defaults
    if (isDefault) {
        user.addresses.forEach(a => a.isDefault = false);
    }

    address.name = name || address.name;
    address.phoneNo = phoneNo || address.phoneNo;
    address.address = addr || address.address;
    address.city = city || address.city;
    address.state = state || address.state;
    address.country = country || address.country;
    address.pinCode = pinCode || address.pinCode;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Address updated successfully"
    });
});

// Delete Address
exports.deleteAddress = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== req.params.addressId);

    await user.save();

    res.status(200).json({
        success: true,
        message: "Address deleted successfully"
    });
});

// Set Default Address
exports.setDefaultAddress = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    user.addresses.forEach(addr => {
        addr.isDefault = addr._id.toString() === req.params.addressId;
    });

    await user.save();

    res.status(200).json({
        success: true,
        message: "Default address set successfully"
    });
});

// ============================================
// PAYMENT METHOD MANAGEMENT
// ============================================

// Add Payment Method
exports.addPaymentMethod = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    const { type, isDefault } = req.body;
    let paymentData = { type, isDefault };

    if (type === 'Card') {
        const { cardNumber, cardHolderName, expiryDate } = req.body;

        // Store only last 4 digits
        const last4 = cardNumber.slice(-4);
        paymentData.cardNumber = last4;
        paymentData.cardHolderName = cardHolderName;
        paymentData.expiryDate = expiryDate;
    }

    // If setting as default, unset other defaults
    if (isDefault) {
        user.paymentMethods.forEach(pm => pm.isDefault = false);
    }

    user.paymentMethods.push(paymentData);

    await user.save();

    res.status(200).json({
        success: true,
        message: "Payment method added successfully"
    });
});

// Update Payment Method
exports.updatePaymentMethod = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    const paymentMethod = user.paymentMethods.id(req.params.paymentId);

    if (!paymentMethod) {
        return next(new ErrorHandler("Payment method not found", 404));
    }

    const { type, cardNumber, cardHolderName, expiryDate, isDefault } = req.body;

    // If setting as default, unset other defaults
    if (isDefault) {
        user.paymentMethods.forEach(pm => pm.isDefault = false);
    }

    if (type) paymentMethod.type = type;
    if (cardNumber) paymentMethod.cardNumber = cardNumber.slice(-4); // Store only last 4
    if (cardHolderName) paymentMethod.cardHolderName = cardHolderName;
    if (expiryDate) paymentMethod.expiryDate = expiryDate;
    if (isDefault !== undefined) paymentMethod.isDefault = isDefault;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Payment method updated successfully"
    });
});

// Delete Payment Method
exports.deletePaymentMethod = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    user.paymentMethods = user.paymentMethods.filter(pm => pm._id.toString() !== req.params.paymentId);

    await user.save();

    res.status(200).json({
        success: true,
        message: "Payment method deleted successfully"
    });
});

// Set Default Payment Method
exports.setDefaultPayment = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    user.paymentMethods.forEach(pm => {
        pm.isDefault = pm._id.toString() === req.params.paymentId;
    });

    await user.save();

    res.status(200).json({
        success: true,
        message: "Default payment method set successfully"
    });
});

// ============================================
// ADMIN DASHBOARD
// ============================================

// Get All Users --ADMIN
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get Single User Details --ADMIN
exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Role --ADMIN
exports.updateUserRole = asyncErrorHandler(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        role: req.body.role,
    }

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Delete User --ADMIN
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
    }

    await user.remove();

    res.status(200).json({
        success: true
    });
});