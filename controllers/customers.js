const db = require("../config/db");

const getCustomers = (req, res) => {
  db.query("SELECT * FROM customers", (error, result) => {
    if (error) {
      console.log("Xatolik data bazadan malumot olishda", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const addNewCustomers = (req, res) => {
  const {
    fname,
    lname,
    email,
    phone,
    passport_information,
    credit_information,
  } = req.body;
  db.query(
    `INSERT INTO customers(fname, lname, email, phone, passport_information, credit_information)\
    VALUES (?, ?, ?, ?, ?, ?)`,
    [fname, lname, email, phone, passport_information, credit_information],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Error adding new flawor",
        });
      }
      res.status(201).json({
        message: "New customer aded",
        customer_id: result.insertId,
      });
    }
  );
};

const getCustomersById = (req, res) => {
  const customerid = req.params.id;
  db.query(
    "SELECT * FROM customers WHERE id = ?",
    [customerid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length == 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json(result[0]);
    }
  );
};

const deleteCustomersById = (req, res) => {
  const customerid = req.params.id;

  // Mijoz mavjudligini tekshirish
  db.query(
    "SELECT * FROM customers WHERE id = ?",
    [customerid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan ma'lumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        // Avval contracts jadvalidan bog'langan yozuvlarni o'chirish
        db.query(
          "DELETE FROM contracts WHERE customer_id = ?",
          [customerid],
          (error) => {
            if (error) {
              console.error("Error deleting related contracts:", error);
              return res.status(500).json({
                message: "Error deleting related contracts",
                error: "Internal Server Error",
              });
            }

            // Keyin customers jadvalidan yozuvni o'chirish
            db.query(
              "DELETE FROM customers WHERE id = ?",
              [customerid],
              (error, result) => {
                if (error) {
                  if (error.code === "ER_ROW_IS_REFERENCED_2") {
                    return res.status(400).json({
                      message:
                        "Customer cannot be deleted because they have related contracts",
                      error: "Conflict",
                    });
                  }
                  console.error("Error deleting customer by ID:", error);
                  return res.status(500).json({
                    message: "Error deleting customer by Id",
                    error: "Internal Server Error",
                  });
                }
                res.json({ message: "Customer deleted successfully!" });
              }
            );
          }
        );
      } else {
        res.status(404).json({
          message: "Customer not found",
        });
      }
    }
  );
};


    

const editCustomersById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM customers WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching customer:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const {
        fname,
        lname,
        email,
        phone,
        passport_information,
        credit_information,
      } = req.body;
      db.query(
        "UPDATE customers SET fname = ?, lname= ?, email = ?, phone = ? , passport_information= ?, credit_information = ? WHERE id = ?",
        [fname, lname, email, phone, passport_information, credit_information, id],
        (error) => {
          if (error) {
            console.error("Error updating customer:", error);
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
        .json({ message: "Customer not found because this problem You have " });
    }
  });
};




module.exports = {
  getCustomers,
  addNewCustomers,
  getCustomersById,
  deleteCustomersById,
  editCustomersById,
  };
