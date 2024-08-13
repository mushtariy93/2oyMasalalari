const express = require("express");
const { getMarkas, getMarkasById, addNewMarkas, deleteMarkasById, editMarkasById } = require("../controllers/markas");
const { addNewModels } = require("../controllers/models");


const router = express.Router();



router.get("/", getMarkas);
router.get("/:id",getMarkasById);
router.post("/", addNewMarkas);
router.delete("/:id",deleteMarkasById);
router.put("/:id", editMarkasById);

module.exports = router;

