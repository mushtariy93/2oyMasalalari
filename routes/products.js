const express = require("express");
const { getProducts, getProductsById, addNewProducts, deleteProductsById, editProductsById, getProductsByDateRange } = require("../controllers/products");


const router = express.Router();



router.get("/", getProducts);
router.get("/:id",getProductsById);
router.post("/", addNewProducts);
router.delete("/:id",deleteProductsById);
router.put("/:id", editProductsById);
router.get("/:startDate/:endDate", getProductsByDateRange);


module.exports = router;

