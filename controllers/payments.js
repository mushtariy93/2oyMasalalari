const db = require("../config/db");

const getPayments = (req, res) => {
  db.query("SELECT * FROM payments", (error, result) => {
    if (error) {
      console.log("Xatolik data bazadan malumot olishda", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const addNewPayments = (req, res) => {
  const { contract_id, payment_date, amount, paymentType, remainingBalans } =
    req.body;
  db.query(
    `INSERT INTO payments(contract_id, payment_date, amount, paymentType, remainingBalans)\
    VALUES (?, ?, ?, ?, ?,?,?)`,
    [contract_id, payment_date, amount, paymentType, remainingBalans],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Error adding new flawor",
        });
      }
      res.status(201).json({
        message: "New payments added",
        payments_id: result.insertId,
      });
    }
  );
};

const getPaymentsById = (req, res) => {
  const paymentsid = req.params.id;
  db.query(
    "SELECT * FROM payments WHERE id = ?",
    [paymentsid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length == 0) {
        return res.status(404).json({ message: "Payments not found" });
      }
      res.json(result[0]);
    }
  );
};

const deletePaymentsById = (req, res) => {
  const paymentsid = req.params.id;
  db.query(
    "SELECT * FROM payments WHERE id = ?",
    [paymentsid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        db.query(
          "DELETE FROM payments WHERE id=?",
          [paymentsid],
          (error, result) => {
            if (error) {
              console.error("Error deleting payments by ID:", error);
              return res.status(500).json({
                message: "Error deleting payments by Id",
                error: "Internal Server Error",
              });
            }
            res.json({ message: "Payments deleted successfully!" });
          }
        );
      } else {
        res.status(404).json({
          message: "Payments not found",
        });
      }
    }
  );
};

const editPaymentsById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM payments WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching payments:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const {
        contract_id,
        payment_date,
        amount,
        paymentType,
        remainingBalans,
      } = req.body;
      db.query(
        "UPDATE payments SET contract_id = ?, payment_date= ?,  amount= ?, paymentType = ? , remainingBalans= ?, WHERE id = ?",
        [contract_id, payment_date, amount, paymentType, remainingBalans,id],
        (error) => {
          if (error) {
            console.error("Error updating payments:", error);
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
        .json({ message: "payments not found because this problem You have " });
    }
  });
};




module.exports = {
  getPayments,
  addNewPayments,
  getPaymentsById,
  deletePaymentsById,
  editPaymentsById,
  };
