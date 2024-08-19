const mongoose = require("mongoose");

// Connect to MongoDB
const connectToMongoDB = () => {
    mongoose.connect(process.env.MONGO_URI).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    });
};

module.exports = connectToMongoDB;
