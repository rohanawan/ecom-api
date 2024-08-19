const express = require("express");
const router = express.Router();

// Import Controllers
const {
    showItems,
    showItem,
    getItemsByCategory,
    addItem,
} = require("../controllers/itemController");

// route 01 - /items - GET
router.route("/items").get(showItems);

// route 02 - /item/:id - GET
router.route("/item/:id").get(showItem);

// route 03 - /items/:category - GET
router.route("/items/:category").get(getItemsByCategory);

// route 04 - /item - POST
router.route("/item").post(addItem);

module.exports = router;
