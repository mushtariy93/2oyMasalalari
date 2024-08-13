const db = require("../config/db");

const getMarkas = (req, res) => {
  db.query("SELECT * FROM markas", (error, result) => {
    if (error) {
      console.log("Xatolik data bazadan malumot olishda", error);
      return res.markas(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const addNewMarkas = (req, res) => {
  const {
   name
  } = req.body;
  db.query(
    `INSERT INTO markas(name)\
    VALUES (?)`,
    [name],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.markas(500).json({
          error: "Internal Server Error",
          message: "Error adding new flawor",
        });
      }
      res.markas(201).json({
        message: "New markas added",
        markas_id: result.insertId,
      });
    }
  );
};

const getMarkasById = (req, res) => {
  const markasid = req.params.id;
  db.query(
    "SELECT * FROM markas WHERE id = ?",
    [markasid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.markas(500).json({ error: "Internal Server Error" });
      }
      if (result.length == 0) {
        return res.markas(404).json({ message: "markas not found" });
      }
      res.json(result[0]);
    }
  );
};

const deleteMarkasById = (req, res) => {
  const markasid = req.params.id;
  db.query(
    "SELECT * FROM markas WHERE id = ?",
    [markasid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.markas(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        db.query(
          "DELETE FROM markas WHERE id=?",
          [markasid],
          (error, result) => {
            if (error) {
              console.error("Error deleting markas by ID:", error);
              return res.markas(500).json({
                message: "Error deleting markas by Id",
                error: "Internal Server Error",
              });
            }
            res.json({ message: "markas deleted successfully!" });
          }
        );
      } else {
        res.markas(404).json({
          message: "markas not found",
        });
      }
    }
  );
};


    

const editMarkasById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM markas WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching markas:", error);
      return res.markas(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const {
       name
      } = req.body;
      db.query(
        "UPDATE markas SET name = ? WHERE id = ?",
        [name,id],
        (error) => {
          if (error) {
            console.error("Error updating markas:", error);
            return res.markas(500).json({ message: "Internal Server Error" });
          }
          res.json({
            message: "OK",
            title: "Successfully updated",
          });
        }
      );
    } else {
      res
        .markas(404)
        .json({ message: "markas not found because this problem You have " });
    }
  });
};




module.exports = {
  getMarkas,
  addNewMarkas,
  getMarkasById,
  deleteMarkasById,
  editMarkasById,
  };
