const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Is Required"],
        minlength: [2, "Name Must Be At Least 2 Characters"],
        maxlength: [200, "Name Must Be At Most 200 Characters"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"],
        min: [0, "Product Price Must Be At Least 0"],
    },
    category: {
        type: String,
        required: [true, "Please provide a category"],
    },
    photo: {
        type: String,
        required: [true, "Please provide a photo"],
    },
});

module.exports = mongoose.model("Item", itemSchema);
