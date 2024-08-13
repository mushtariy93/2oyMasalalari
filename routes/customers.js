const express = require("express");
const { getCustomers, addNewCustomers, deleteCustomersById,editCustomersById, getCustomersById } = require("../controllers/customers");


const router = express.Router();



router.get("/", getCustomers);
router.get("/:id",getCustomersById);
router.post("/", addNewCustomers);
router.delete("/:id",deleteCustomersById);
router.put("/:id", editCustomersById);

module.exports = router;

