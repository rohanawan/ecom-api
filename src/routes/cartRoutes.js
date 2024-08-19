const express = require("express");
const router = express.Router();

// Import Controllers
const {
    addToCart,
    showCart,
    updateCartItem,
    removeCartItem,
} = require("../controllers/cartController");

// route 01 - /cart - POST
router.route("/cart").post(addToCart);

// route 02 - /cart/:userId - GET
router.route("/cart/:userId").get(showCart);

// route 03 - /cart/update - PUT
router.route("/cart/update").put(updateCartItem);

// route 04 - /cart/delete - DELETE
router.route("/cart/delete").delete(removeCartItem);

module.exports = router;
