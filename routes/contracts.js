const express = require("express");
const { getContracts, getContractsById, addNewContracts, deleteContractsById, editContractsById } = require("../controllers/contracts");

const router = express.Router();



router.get("/", getContracts);
router.get("/:id",getContractsById);
router.post("/", addNewContracts);
router.delete("/:id",deleteContractsById);
router.put("/:id", editContractsById);

module.exports = router;
