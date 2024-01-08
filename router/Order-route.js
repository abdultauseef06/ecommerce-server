const express = require("express");
const router = express.Router();
const orderController = require("../controllers/Order-controller")


router.post("/orders", orderController.addOrder);
router.get("/orders", orderController.getOrders);

module.exports = router;