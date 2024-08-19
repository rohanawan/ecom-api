const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderDate: { type: Date, default: Date.now },
    status: {
        type: String,
        required: [true, "Please provide a status"],
        enum: ["Pending", "Shipped", "Delivered"],
        default: "Pending",
    },
});

module.exports = mongoose.model("Order", orderSchema);
