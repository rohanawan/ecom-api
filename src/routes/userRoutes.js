const express = require("express");
const router = express.Router();

// Import Controllers
const {
    signup,
    login,
    updatePassword,
} = require("../controllers/userController");

// route 01 - /signup - POST
router.route("/signup").post(signup);

// route 02 - /login - POST
router.route("/login").post(login);

// route 03 - /password/update - PUT
router.route("/password/update").put(updatePassword);

module.exports = router;
