const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide a user"],
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: [true, "Please provide an item"],
    },
    qty: {
        type: Number,
        required: [true, "Please provide a quantity"],
        min: [1, "Quantity must be at least 1"],
    },
    ordered: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Cart", cartSchema);
