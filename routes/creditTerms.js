const express = require("express");
const { getCreditTerms, getCreditTermsById, addNewCreditTerms, deleteCreditTermsById, editCreditTermsById } = require("../controllers/creditTerms");


const router = express.Router();



router.get("/", getCreditTerms);
router.get("/:id",getCreditTermsById);
router.post("/", addNewCreditTerms);
router.delete("/:id",deleteCreditTermsById);
router.put("/:id", editCreditTermsById);

module.exports = router;

