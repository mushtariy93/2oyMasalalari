const express = require("express");
const { getPayments, getPaymentsById, addNewPayments, deletePaymentsById, editPaymentsById } = require("../controllers/payments");

const router = express.Router();



router.get("/", getPayments);
router.get("/:id",getPaymentsById);
router.post("/", addNewPayments);
router.delete("/:id",deletePaymentsById);
router.put("/:id", editPaymentsById);

module.exports = router;
