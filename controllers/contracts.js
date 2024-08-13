const db = require("../config/db");

const getContracts = (req, res) => {
  db.query("SELECT * FROM contracts", (error, result) => {
    if (error) {
      console.log("Xatolik data bazadan malumot olishda", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const addNewContracts = (req, res) => {
  const {
    contracts_id,
    product_id,
    contract_date,
    status_id,
    totalAmout,
    credit_terms_id,
    monthlyPayment,
  } = req.body;
  db.query(
    `INSERT INTO contracts(contracts_id, product_id, contract_date, status_id, totalAmout, credit_terms_id, monthlyPayment)\
    VALUES (?, ?, ?, ?, ?,?,?)`,
    [
      contracts_id,
      product_id,
      contract_date,
      status_id,
      totalAmout,
      credit_terms_id,
      monthlyPayment,
    ],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Error adding new flawor",
        });
      }
      res.status(201).json({
        message: "New contracts added",
        contracts_id: result.insertId,
      });
    }
  );
};

const getContractsById = (req, res) => {
  const contractsid = req.params.id;
  db.query(
    "SELECT * FROM contracts WHERE id = ?",
    [contractsid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length == 0) {
        return res.status(404).json({ message: "contracts not found" });
      }
      res.json(result[0]);
    }
  );
};

const deleteContractsById = (req, res) => {
  const contractId = req.params.id;

  // Kontrakt mavjudligini tekshirish
  db.query(
    "SELECT * FROM contracts WHERE id = ?",
    [contractId],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan ma'lumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        // Kontraktni o'chirish
        db.query(
          "DELETE FROM contracts WHERE id = ?",
          [contractId],
          (error) => {
            if (error) {
              console.error("Error deleting contract by ID:", error);
              if (error.code === "ER_ROW_IS_REFERENCED_2") {
                // Agar xorijiy kalit bo'yicha cheklov bo'lsa
                return res.status(400).json({
                  message:
                    "Contract cannot be deleted because it is referenced by another table",
                  error: "Conflict",
                });
              }
              return res.status(500).json({
                message: "Error deleting contract by ID",
                error: "Internal Server Error",
              });
            }
            res.json({ message: "Contract deleted successfully!" });
          }
        );
      } else {
        res.status(404).json({
          message: "Contract not found",
        });
      }
    }
  );
};


const editContractsById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM contracts WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching contracts:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const {
        contracts_id,
        product_id,
        contract_date,
        status_id,
        totalAmout,
        credit_terms_id,
        monthlyPayment,
      } = req.body;
      db.query(
        "UPDATE contracts SET contracts_id = ?, product_id= ?,  contract_date = ?, status_id, = ? , totalAmout= ?, credit_terms_id= ?   monthlyPayment =? WHERE id = ?",
        [
          contracts_id,
          product_id,
          contract_date,
          status_id,
          totalAmout,
          credit_terms_id,
          monthlyPayment,
          id
        ],
        (error) => {
          if (error) {
            console.error("Error updating contracts:", error);
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
        .json({ message: "Contracts not found because this problem You have " });
    }
  });
};




module.exports = {
  getContracts,
  addNewContracts,
  getContractsById,
  deleteContractsById,
  editContractsById,
  };
