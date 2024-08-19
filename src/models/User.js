const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    name: {
        type: String,
        required: [true, "Please provide your name"],
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [50, "Name must be at most 50 characters long"],
        trim: true,
    },
    postCode: {
        type: String,
        required: [true, "Post Code Is Required"],
        minlength: [5, "Post Code Must Be At Least 5 Characters"],
        maxlength: [6, "Post Code Must Be At Most 6 Characters"],
    },
    address: {
        type: String,
        required: [true, "Address Is Required"],
        minlength: [3, "Address Must Be At Least 3 Characters"],
        maxlength: [100, "Address Must Be At Most 100 Characters"],
        trim: true,
    },
});

module.exports = mongoose.model("User", userSchema);
