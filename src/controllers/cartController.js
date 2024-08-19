const Cart = require("../models/Cart");
const mongoose = require("mongoose");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Controller 01: Add an item to the cart - /cart - POST
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const { userId, itemId, qty } = req.body;

  if (!userId || !itemId || !qty) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Create a new cart item
  const cartItem = new Cart({
    userId,
    itemId,
    qty,
    // ordered is false by default as defined in the model
  });

  // Save the cart item to the database
  const result = await cartItem.save();

  // Respond with the cart item ID and success message
  res.status(201).json({
    cartId: result._id,
    message: "Item added to cart",
  });
});

// Controller 02: Show items in the cart - /cart/:userId - GET
exports.showCart = catchAsyncErrors(async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.params.userId); // Correctly instantiate ObjectId

  if (!userId) {
    return next(new ErrorHandler("User ID is required", 400));
  }

  const cartItems = await Cart.aggregate([
    { $match: { userId: userId, ordered: false } }, // Match user's cart items that haven't been ordered
    {
      $lookup: {
        from: "items", // The collection to join
        localField: "itemId", // Field from the Cart collection
        foreignField: "_id", // Field from the Items collection
        as: "itemDetails", // Array of matching items
      },
    },
    { $unwind: "$itemDetails" }, // Deconstructs the array field from the joined documents
    {
      $project: {
        userId: 1,
        itemId: 1,
        name: "$itemDetails.name",
        qty: 1,
        price: "$itemDetails.price",
        photo: "$itemDetails.photo",
      },
    },
  ]);

  if (!cartItems.length) {
    return next(new ErrorHandler("No items in your cart", 404));
  }

  res.status(200).json(cartItems);
});

// Controller 03: Update cart item quantity - /cart/update - PUT
exports.updateCartItem = catchAsyncErrors(async (req, res, next) => {
  const { userId, cartItemId, qty } = req.body;

  if (qty < 1) {
    return next(new ErrorHandler("Quantity must be at least 1", 400));
  }

  if (!cartItemId || !qty || !userId) {
    return next(
      new ErrorHandler("Cart ID, user ID, and quantity are required", 400)
    );
  }

  // Find the cart item which contains the user ID
  const cartItem = await Cart.findOne({ _id: cartItemId, userId });

  if (!cartItem) {
    return next(new ErrorHandler("Cart item not found", 404));
  }

  // Update the quantity
  cartItem.qty = qty;
  const updatedCartItem = await cartItem.save();

  res.status(200).json({ message: "Cart item updated", updatedCartItem });
});

// Controller 04: Remove an item from the cart - /cart/delete/:cartId - DELETE
exports.removeCartItem = catchAsyncErrors(async (req, res, next) => {
  const { userId, cartItemId } = req.body;

  if (!userId || !cartItemId) {
    return next(new ErrorHandler("User ID and Cart ID are required", 400));
  }

  const cartItem = await Cart.findById({ _id: cartItemId, userId });
  if (!cartItem) {
    return next(new ErrorHandler("Cart item not found", 404));
  }

  await cartItem.deleteOne();

  res.status(200).json({ message: "Cart item removed" });
});
