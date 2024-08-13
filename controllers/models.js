const db = require("../config/db");

const getModels = (req, res) => {
  db.query("SELECT * FROM models", (error, result) => {
    if (error) {
      console.log("Xatolik data bazadan malumot olishda", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const addNewModels = (req, res) => {
  const { name, marka_id } = req.body;
  db.query(
    `INSERT INTO models(name, marka_id)\
    VALUES (?,?)`,
    [name, marka_id],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Error adding new flawor",
        });
      }
      res.status(201).json({
        message: "New models added",
        models_id: result.insertId,
      });
    }
  );
};

const getModelsById = (req, res) => {
  const modelsid = req.params.id;
  db.query(
    "SELECT * FROM models WHERE id = ?",
    [modelsid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length == 0) {
        return res.status(404).json({ message: "models not found" });
      }
      res.json(result[0]);
    }
  );
};

const deleteModelsById = (req, res) => {
  const modelsid = req.params.id;
  db.query(
    "SELECT * FROM models WHERE id = ?",
    [modelsid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        db.query(
          "DELETE FROM models WHERE id=?",
          [modelsid],
          (error, result) => {
            if (error) {
              console.error("Error deleting models by ID:", error);
              return res.status(500).json({
                message: "Error deleting models by Id",
                error: "Internal Server Error",
              });
            }
            res.json({ message: "models deleted successfully!" });
          }
        );
      } else {
        res.status(404).json({
          message: "models not found",
        });
      }
    }
  );
};


    

const editModelsById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM models WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching models:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const { name, marka_id } = req.body;
      db.query(
        "UPDATE Model SET name = ?, marka_id WHERE id = ?",
        [name, marka_id,id],
        (error) => {
          if (error) {
            console.error("Error updating models:", error);
            return res.status(500).json({ message: "Internal Server Error" });
          }
          res.json({
            message: "OK",
            title: "Successfully updated",
          });
        }
      );
    } else {
      res
        .status(404)
        .json({ message: "models not found because this problem You have " });
    }
  });
};




module.exports = {
  getModels,
  addNewModels,
  getModelsById,
  deleteModelsById,
  editModelsById,
  };
