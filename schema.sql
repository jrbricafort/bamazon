-- Checked to see if bamazon database exists and deletes it if it does.
DROP DATABASE IF EXISTS bamazon;

-- Creates MySQL Database called bamazon.
CREATE DATABASE bamazon;

-- Uses bamazon db
use bamazon;

-- Created a Table inside bamazon database called products.
CREATE TABLE products
(
    -- item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (50) NULL,
    department_name VARCHAR (50) NULL,
    price DECIMAL (10, 2) default 0,
    stock_quantity INT (50) default 0,
    PRIMARY KEY (item_id)
);

-- Products:
-- #1
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GI Joe", "Toy", 25, 3);

-- #2
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ultraboost", "Shoes", 180, 25);

-- #3
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Joel Embiid Jersey", "Clothing", 45, 50);

-- #4
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Bowl", "Pets", 9.99, 10);

-- #5
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples", "Fruits", .89, 30);

-- #6
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mouse and Keyboard", "Tech", 100, 5);

-- #7
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Tech", 1000, 3);

-- #8
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Golf Clubs", "Sports", 800, 3);

-- #9
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Gaming", 299.99, 7);

-- #10
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Water Bottle", "Lifestyle", 10, 6);