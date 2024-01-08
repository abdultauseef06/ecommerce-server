const express = require("express");
const router = express.Router();
const productController = require("../controllers/Product-controller");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.get("/products/query", productController.getProductByQuery);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
