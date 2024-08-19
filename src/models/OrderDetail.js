const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    qty: {
        type: Number,
        required: [true, "Please provide a quantity"],
        min: [1, "Quantity must be at least 1"],
    },
});

module.exports = mongoose.model("OrderDetail", orderDetailSchema);
