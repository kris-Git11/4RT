CREATE DATABASE test;

  use test;

  CREATE TABLE customers (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customerName VARCHAR(30) NOT NULL,
    contactLastName VARCHAR(30) NOT NULL,
    contactFirstName VARCHAR(50) NOT NULL,
    phone INT(20),
    addressLine1 VARCHAR(50),
    date TIMESTAMP
  );