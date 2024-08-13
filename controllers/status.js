const db = require("../config/db");

const getStatus = (req, res) => {
  db.query("SELECT * FROM Status", (error, result) => {
    if (error) {
      console.log("Xatolik data bazadan malumot olishda", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const addNewStatus = (req, res) => {
  const {
   name
  } = req.body;
  db.query(
    `INSERT INTO Status(name)\
    VALUES (?)`,
    [name],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Error adding new flawor",
        });
      }
      res.status(201).json({
        message: "New status added",
        status_id: result.insertId,
      });
    }
  );
};

const getStatusById = (req, res) => {
  const statusid = req.params.id;
  db.query(
    "SELECT * FROM Status WHERE id = ?",
    [statusid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length == 0) {
        return res.status(404).json({ message: "status not found" });
      }
      res.json(result[0]);
    }
  );
};

const deleteStatusById = (req, res) => {
  const statusid = req.params.id;
  db.query(
    "SELECT * FROM status WHERE id = ?",
    [statusid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        db.query(
          "DELETE FROM status WHERE id=?",
          [statusid],
          (error, result) => {
            if (error) {
              console.error("Error deleting status by ID:", error);
              return res.status(500).json({
                message: "Error deleting status by Id",
                error: "Internal Server Error",
              });
            }
            res.json({ message: "status deleted successfully!" });
          }
        );
      } else {
        res.status(404).json({
          message: "status not found",
        });
      }
    }
  );
};


    

const editStatusById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM status WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching status:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const {
       name
      } = req.body;
      db.query(
        "UPDATE Status SET name = ? WHERE id = ?",
        [name,id],
        (error) => {
          if (error) {
            console.error("Error updating status:", error);
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
        .json({ message: "status not found because this problem You have " });
    }
  });
};




module.exports = {
  getStatus,
  addNewStatus,
  getStatusById,
  deleteStatusById,
  editStatusById,
  };
