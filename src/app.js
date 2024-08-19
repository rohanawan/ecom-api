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

// Apply CORS for all routes
app.use(cors());

// Custom CORS Middleware for specific route handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://ecom-app-ruddy.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Use Routes
app.use("/api/v1", userRoutes); 
app.use("/api/v1", itemRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", orderRoutes);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
