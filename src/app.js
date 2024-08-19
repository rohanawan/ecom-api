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

app.use(
  cors({
    origin: "https://ecom-app-ruddy.vercel.app", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Custom CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ecom-app-ruddy.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST, PUT,DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Ensure that the preflight request is successful
  }
  
  next();
});

// Use Routes
app.use("/api/v1", userRoutes); // Update the base path to avoid conflicting with static assets
app.use("/api/v1", itemRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", orderRoutes);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
