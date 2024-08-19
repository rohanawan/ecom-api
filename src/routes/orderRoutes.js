const express = require("express");
const router = express.Router();

// Import Controllers
const {
    addOrder,
    showOrderHistory,
} = require("../controllers/orderController");

// route 01 - /order - POST
router.route("/order").post(addOrder);

// route 02 - /order/:userId - GET
router.route("/order/:userId").get(showOrderHistory);

module.exports = router;
