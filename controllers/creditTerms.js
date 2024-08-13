const db = require("../config/db");

const getCreditTerms = (req, res) => {
  db.query("SELECT * FROM creditTerms ", (error, result) => {
    if (error) {
      console.log("Xatolik data bazadan malumot olishda", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const addNewCreditTerms = (req, res) => {
  const { ctermDuration, interestPercentage } = req.body;
  db.query(
    `INSERT INTO creditTerms(ctermDuration, interestPercentage)\
    VALUES (?, ?)`,
    [ctermDuration, interestPercentage],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Error adding new flawor",
        });
      }
      res.status(201).json({
        message: "New creditTerms aded",
        creditTerms_id: result.insertId,
      });
    }
  );
};

const getCreditTermsById = (req, res) => {
  const creditTermsid = req.params.id;
  db.query(
    "SELECT * FROM CreditTerms WHERE id = ?",
    [creditTermsid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length == 0) {
        return res.status(404).json({ message: "creditTerms not found" });
      }
      res.json(result[0]);
    }
  );
};

const deleteCreditTermsById = (req, res) => {
  const creditTermsId = req.params.id;

  // Credit terms mavjudligini tekshirish
  db.query(
    "SELECT * FROM creditTerms WHERE id = ?",
    [creditTermsId],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan ma'lumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        // Credit termsni o'chirish
        db.query(
          "DELETE FROM creditTerms WHERE id = ?",
          [creditTermsId],
          (error) => {
            if (error) {
              console.error("Error deleting credit terms by ID:", error);
              if (error.code === "ER_ROW_IS_REFERENCED_2") {
                // Agar xorijiy kalit bo'yicha cheklov bo'lsa
                return res.status(400).json({
                  message:
                    "Credit terms cannot be deleted because they are referenced by another table",
                  error: "Conflict",
                });
              }
              return res.status(500).json({
                message: "Error deleting credit terms by ID",
                error: "Internal Server Error",
              });
            }
            res.json({ message: "Credit terms deleted successfully!" });
          }
        );
      } else {
        res.status(404).json({
          message: "Credit terms not found",
        });
      }
    }
  );
};



    

const editCreditTermsById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM CreditTerms WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching creditTerms:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const { termDuration, interestPercentage } = req.body;
      db.query(
        "UPDATE CreditTerms SET termDuration=?, interestPercentage= ? WHERE id = ?",
        [termDuration, interestPercentage, id],
        (error) => {
          if (error) {
            console.error("Error updating creditTerms:", error);
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
        .json({ message: "creditTerms not found because this problem You have " });
    }
  });
};




module.exports = {
  getCreditTerms,
  addNewCreditTerms,
  getCreditTermsById,
  deleteCreditTermsById,
  editCreditTermsById,
  };
