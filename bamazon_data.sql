DROP DATABASE IF EXISTS  bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;


DROP TABLE products;
CREATE TABLE products (
id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR (30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INTEGER (10) NOT NULL,
primary key (id)
);

select * from products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Xbox One', 'Electronics/Videogames', 400, 50),
	   ('Playstation 4', 'Electronics/Videogames', 400, 35),
       ('Nintendo Switch', 'Electronics/Videogames', 300, 13),
       ('Hitchhikers Guide', 'Books', 8, 25),
       ('The Dresden Files: Changes', 'Books', 10, 27), 
       ('Redbull Case', 'Food & Beverage', 29.99, 100), 
       ('Deoderant', 'Home & Bath', 5.99, 60), 
       ('Tooth Brush 4pk', 'Home & Bath', 9.99, 42),
       ('42 inch Roku TV', 'Electronics', 250, 22),
       ('Spiral Notebook 3pk', 'Office/School', 14.99, 34)
       