const Item = require("../models/Item");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Controller 01: Show Items - /item - POST
exports.showItems = catchAsyncErrors(async (req, res) => {
    // Retrieve all items from the database
    const items = await Item.find({});

    // Respond with the array of items
    res.status(200).json(items);
});

// Controller 02: Get a specific item - /item/:id - GET
exports.showItem = catchAsyncErrors(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Respond with the array of items
    res.status(200).json(item);
});

// Controller 03: Get items by category - /items/:category - GET
exports.getItemsByCategory = catchAsyncErrors(async (req, res, next) => {
    // Extract the category from the URL parameter
    const category = req.params.category;

    // Find items that have the requested category
    const items = await Item.find({ category: category });

    // If no items found, return an empty array
    if (!items.length) {
        return next(new ErrorHandler("No items found in this category", 404));
    }

    // Return the found items
    res.status(200).json(items);
});

// Controller 04: Add an item - /item - POST
exports.addItem = catchAsyncErrors(async (req, res, next) => {
    // Extract item details from the request body
    const { name, price, category, photo } = req.body;

    if (!name || !price || !category || !photo) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    // Create a new item instance
    const item = new Item({
        name,
        price,
        category,
        photo,
    });

    // Save the item to the database
    const result = await item.save();

    // Respond with the item ID and success message
    res.status(201).json({
        itemId: result._id,
        message: "Item added successfully",
    });
});
