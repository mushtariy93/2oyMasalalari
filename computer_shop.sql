show DATABASES


DROP DATABASE IF EXISTS Computer_shop;

CREATE DATABASE IF NOT EXISTS Computer_shop;

USE Computer_shop;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    passport_information VARCHAR (255) NOT NULL,
    credit_information INT
);

CREATE TABLE contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    contract_date DATE,
    status_id INT,
    totalAmout INT NOT NULL,
    credit_terms_id INT ,
    monthlyPayment INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id) ,
    FOREIGN KEY (credit_terms_id) REFERENCES creditTerms(id) ,
    FOREIGN KEY (status_id) REFERENCES status(id) ON DELETE SET NULL
);

drop table products

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model_id INT,
    cpu VARCHAR(50) NOT NULL,
    ram VARCHAR(20) NOT NULL,
    storage VARCHAR(50) NOT NULL,
    gpu VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE CASCADE
);


CREATE TABLE models(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    marka_id INT,
    FOREIGN KEY (marka_id) REFERENCES markas(id) ON DELETE CASCADE
);


CREATE TABLE markas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE status(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

show TABLES

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT,
    payment_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    paymentType VARCHAR (255) NOT NULL,
    remainingBalans int NOT NULL,
    FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE
);

show TABLES

select *from products


CREATE TABLE creditTerms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ctermDuration INT NOT NULL, 
    interestPercentage INT NOT NULL
);

drop table contracts 

INSERT INTO markas (name) VALUES
('Dell'),
('HP'),
('Apple'),
('Lenovo'),
('Acer');


INSERT INTO models (name, marka_id) VALUES
('XPS 13', 1),
('Spectre x360', 2),
('MacBook Pro', 3),
('ThinkPad X1', 4),
('Swift 3', 5);


INSERT INTO products (model_id, cpu, ram, storage, gpu, price) VALUES
(1, 'Intel Core i7', '16GB', '512GB SSD', 'NVIDIA GTX 1660', 1200.00),
(2, 'AMD Ryzen 5', '8GB', '1TB HDD', 'AMD Radeon RX 5700', 900.00),
(3, 'Intel Core i5', '8GB', '256GB SSD', 'NVIDIA GTX 1050', 750.00),
(4, 'Intel Core i3', '4GB', '500GB HDD', NULL, 450.00),
(5, 'AMD Ryzen 7', '16GB', '1TB SSD', 'NVIDIA RTX 2070', 1400.00);


INSERT INTO status (name) VALUES
('Active'),
('Completed'),
('Paid'),
('Unpaid'),
('Cancelled');


INSERT INTO creditTerms (ctermDuration, interestPercentage) VALUES
(6, 30),
(12, 40),
(18, 30),
(24, 25),
(36, 20);


INSERT INTO customers (fname, lname, email, phone, passport_information, credit_information) VALUES
('John', 'Doe', 'john.doe@example.com', '+1234567890', 'Passport No. 123456789', 700),
('Jane', 'Smith', 'jane.smith@example.com', '+9876543210', 'Passport No. 987654321', 800),
('Michael', 'Johnson', 'michael.j@example.com', '+1122334455', 'Passport No. 112233445', 750),
('Emily', 'Brown', 'emily.b@example.com', '+9988776655', 'Passport No. 998877665', 850),
('David', 'Williams', 'david.w@example.com', '+6677889900', 'Passport No. 667788990', 900);



INSERT INTO contracts (customer_id, product_id, contract_date, status_id, totalAmout, credit_terms_id, monthlyPayment) VALUES
(1, 1, '2024-08-01', 1, 1200, 1, 200),
(2, 2, '2024-08-02', 2, 900, 2, 150),
(3, 3, '2024-08-03', 3, 750, 3, 125),
(4, 4, '2024-08-04', 4, 450, 4, 75),
(5, 5, '2024-08-05', 1, 1400, 5, 233);

SELECT *FROM contracts


INSERT INTO payments (contract_id, payment_date, amount, paymentType, remainingBalans) VALUES
(1, '2024-08-01', 200.00, 'Credit Card', 1000),
(2, '2024-08-05', 150.00, 'Bank Transfer', 750),
(3, '2024-08-10', 125.00, 'Cash', 625),
(4, '2024-08-15', 75.00, 'Credit Card', 375),
(5, '2024-08-20', 233.00, 'Bank Transfer', 1167);


select *from payments




SELECT p.id AS product_id, p.model_id, p.cpu, p.ram, p.storage, p.gpu, p.price, m.name AS model_name, mk.name AS marka_name
FROM products p
JOIN contracts c ON p.id = c.product_id
JOIN models m ON p.model_id = m.id
JOIN markas mk ON m.marka_id = mk.id
WHERE c.contract_date BETWEEN '2024-08-01' AND '2024-08-15';


