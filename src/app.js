const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import Middlewares
const errorMiddleware = require("./middlewares/error");

// Import Routes
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Initialize express
const app = express();

// Parsing
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Properly configure CORS
app.use(
  cors({
    origin: "https://ecom-d4ehhbk4x-rohanawans-projects.vercel.app", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200, // For older browsers
  })
);

// Ensure the preflight request (OPTIONS) is handled properly
app.options("*", cors());

// Use Routes
app.use("", userRoutes);
app.use("", itemRoutes);
app.use("", cartRoutes);
app.use("", orderRoutes);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
