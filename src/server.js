const app = require("./app");
const connectToMongoDB = require("./config/database");

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.log(`Uncaught Exception Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
});

// Load environment variables if on development
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "src/config/config.env" });
}

// Connect to MongoDB
connectToMongoDB();

const server = app.listen(process.env.PORT || 5500, () => {
    console.log(
        `Server is running on http://localhost:${process.env.PORT || 5500}`
    );
});

// Unhandled Promise Rejection Error
process.on("unhandledRejection", (err) => {
    console.log(`Unhandled Rejection Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled rejection");

    server.close(() => {
        process.exit(1);
    });
});
