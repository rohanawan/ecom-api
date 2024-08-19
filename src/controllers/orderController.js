const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Cart = require("../models/Cart");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Controller 01: Add an order - /order - POST
exports.addOrder = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return next(new ErrorHandler("User ID is required", 400));
  }

  // Create a new order
  const order = new Order({ userId });
  const orderResult = await order.save();

  // Retrieve cart items that are not ordered yet
  const cartItems = await Cart.find({ userId, ordered: false });
  if (cartItems.length === 0) {
    return next(new ErrorHandler("No items in cart to order", 400));
  }

  // Track whether all updates are successful
  let allUpdatesSuccessful = true;

  // For each cart item, create an order detail and mark the cart item as ordered
  for (let item of cartItems) {
    const orderDetail = new OrderDetail({
      orderId: orderResult._id,
      itemId: item.itemId,
      qty: item.qty,
    });

    // Attempt to save the OrderDetail
    const savedOrderDetail = await orderDetail.save();
    if (!savedOrderDetail) {
      allUpdatesSuccessful = false;
      break; // Exit loop on first failure
    }

    // Attempt to mark the cart item as ordered
    item.ordered = true;
    const updatedCartItem = await item.save();
    if (!updatedCartItem) {
      allUpdatesSuccessful = false;
      break; // Exit loop on first failure
    }
  }

  if (!allUpdatesSuccessful) {
    // Handle partial updates or failures here
    // This could involve manual rollback steps or compensating actions
    return next(
      new ErrorHandler(
        "Error processing order, some items may not have been updated correctly",
        500
      )
    );
  }

  // Respond with the order ID and success message
  res.status(201).json({
    orderId: orderResult._id,
    message: "Order placed",
  });
});

// Controller 02: Show order history - /order/history - GET
module.exports.showOrderHistory = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new ErrorHandler("User ID is required", 400));
  }

  let resObj = {
    orderNumber: [],
    orderDate: [],
    totalItems: [],
    totalItemsPrice: [],
  };

  // Retrieve order history for the user
  const orderHistory = await Order.find({ userId: userId }).select(
    "orderDate _id"
  );

  orderHistory.forEach(async (order) => {
    resObj.orderNumber.push(order._id);
    resObj.orderDate.push(order.orderDate);
  });

  const orderDetails = resObj.orderNumber.map(async (orderId) => {
    const orderDetails = await OrderDetail.find({
      orderId: orderId,
    }).populate("itemId");

    return orderDetails;
  });

  const newOrderDetails = await Promise.all(orderDetails);

  let totalItems = 0;
  let totalPrice = 0;

  newOrderDetails.forEach((order) => {
    order.forEach((item) => {
      totalItems += item.qty;
      totalPrice += item.itemId.price * item.qty;
    });

    resObj.totalItems.push(totalItems);
    resObj.totalItemsPrice.push(totalPrice);

    totalItems = 0;
    totalPrice = 0;
  });

  res.status(200).json(resObj);
});
