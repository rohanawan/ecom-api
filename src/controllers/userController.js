const User = require("../models/User");
const bcrypt = require("bcryptjs");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

const { SALT_ROUNDS } = require("../constants");

// Controller 01: Signup a new user - /signup - POST
exports.signup = catchAsyncErrors(async (req, res, next) => {
    // Extract data from request body
    const { email, password, name, postCode, address } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({
        email,
    });

    if (userExists) {
        return next(new ErrorHandler("User already exists", 400));
    }

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user instance
    const user = new User({
        email,
        password: hashedPassword,
        name,
        postCode,
        address,
    });

    // Save the user to the database
    const result = await user.save();

    // Respond with success message and the user ID
    res.status(201).json({ userId: result._id, message: "User created!" });
});

// Controller 02: Login a user - /login - POST
exports.login = catchAsyncErrors(async (req, res, next) => {
    // Extract login credentials from request body
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter your credentials", 400));
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        return next(
            new ErrorHandler(`User not found with email: ${email}`, 404)
        );
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    // Respond with the user ID (Session management not included)
    res.status(200).json({ userId: user._id });
});

// Controller 03: Update user password - /password/update - PUT
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    // Extract user ID and new password from request body
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId) {
        return next(new ErrorHandler("User ID is required", 400));
    }

    if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Check if old password matches

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Update the user's password
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "Password updated successfully" });
});
