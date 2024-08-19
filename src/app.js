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
    origin: "https://ecom-d4ehhbk4x-rohanawans-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // or specify your frontend origin instead of '*'
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Use Routes
app.use("", userRoutes);
app.use("", itemRoutes);
app.use("", cartRoutes);
app.use("", orderRoutes);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
