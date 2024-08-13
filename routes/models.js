const express = require("express");
const { getModels, getModelsById, addNewModels, deleteModelsById, editModelsById } = require("../controllers/models");


const router = express.Router();



router.get("/", getModels);
router.get("/:id",getModelsById);
router.post("/", addNewModels);
router.delete("/:id",deleteModelsById);
router.put("/:id", editModelsById);

module.exports = router;

