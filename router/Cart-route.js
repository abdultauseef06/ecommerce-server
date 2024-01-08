const express = require("express");
const router = express.Router();

const cartControllers = require("../controllers/Cart-controller"); // Import cart controllers

router.route("/add-to-cart").post(cartControllers.addToCart);
router.route("/get-cart/:userId").get(cartControllers.getCart);


module.exports = router;