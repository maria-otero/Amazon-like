DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("t-shirt", "clothes", 15.25, 20),
("shorts", "clothes", 30.5, 32),
("flips flops", "shoes", 10.25, 10),
("sunscreen", "health", 17.25, 20),
("swim suit", "clothes", 23.99, 44), 
("towel", "accesories", 8.55, 12),
("wetsuit", "clothes", 120.99, 9),
("surf board", "toy",259.99, 9), 
("wax", "accesories",1.25, 50),
("energy bar", "food",1.25, 72);


SELECT * FROM products;