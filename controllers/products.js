const db = require("../config/db");

const getProducts = (req, res) => {
  db.query("SELECT * FROM product", (error, result) => {
    if (error) {
      console.log("Xatolik data bazadan malumot olishda", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const addNewProducts = (req, res) => {
  const { model_id, cpu, ram, storage, gpu, price } = req.body;
  db.query(
    `INSERT INTO product(model_id, cpu, ram,storage,gpu, price)\
    VALUES (?, ?, ?, ?, ?,?,?)`,
    [model_id, cpu, ram, storage, gpu, price],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "Error adding new flawor",
        });
      }
      res.status(201).json({
        message: "New product added",
        product_id: result.insertId,
      });
    }
  );
};

const getProductsById = (req, res) => {
  const productid = req.params.id;
  db.query(
    "SELECT * FROM product WHERE id = ?",
    [productid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length == 0) {
        return res.status(404).json({ message: "product not found" });
      }
      res.json(result[0]);
    }
  );
};

const deleteProductsById = (req, res) => {
  const productid = req.params.id;
  db.query(
    "SELECT * FROM product WHERE id = ?",
    [productid],
    (error, result) => {
      if (error) {
        console.log("Xatolik data bazadan malumot olishda", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        db.query(
          "DELETE FROM product WHERE id=?",
          [productid],
          (error, result) => {
            if (error) {
              console.error("Error deleting product by ID:", error);
              return res.status(500).json({
                message: "Error deleting product by Id",
                error: "Internal Server Error",
              });
            }
            res.json({ message: "product deleted successfully!" });
          }
        );
      } else {
        res.status(404).json({
          message: "Product not found",
        });
      }
    }
  );
};

const editProductsById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM product WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const { model_id, cpu, ram, storage, gpu, price } = req.body;
      db.query(
        "UPDATE product SET model_id = ?, cpu= ?,  ram = ?, storage, = ? , gpu= ?, price= ? WHERE id = ?",
        [model_id, cpu, ram, storage, gpu, price,id],
        (error) => {
          if (error) {
            console.error("Error updating product:", error);
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
        .json({ message: "product not found because this problem You have " });
    }
  });
};

const getProductsByDateRange = (req, res) => {
  const { startDate, endDate } = req.params;

  const query = `
    SELECT 
      p.id AS product_id, 
      p.model_id, 
      p.cpu, 
      p.ram, 
      p.storage, 
      p.gpu, 
      p.price, 
      m.name AS model_name, 
      mk.name AS marka_name
    FROM 
      products p
    JOIN 
      contracts c ON p.id = c.product_id
    JOIN 
      models m ON p.model_id = m.id
    JOIN 
      markas mk ON m.marka_id = mk.id
    WHERE 
      c.contract_date BETWEEN ? AND ?;
  `;

  db.query(query, [startDate, endDate], (error, results) => {
    if (error) {
      console.error("Error fetching products by date range:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in the given date range" });
    }

    res.json(results);
  });
};

module.exports = {
  getProducts,
  addNewProducts,
  getProductsById,
  deleteProductsById,
  editProductsById,
  getProductsByDateRange,
};





