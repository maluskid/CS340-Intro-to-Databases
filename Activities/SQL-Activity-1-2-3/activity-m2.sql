-- Citation for activity-m2.sql:
-- Date: 04/16/2024
-- Adapted from /OR/ Based on
-- code provided in Activity-1 Creating A Customer Object Table page by professor
-- https://canvas.oregonstate.edu/courses/1958399/pages/activity-1-creating-a-customer-object-table?module_item_id=24181817

use cs340_maluskid

CREATE OR REPLACE TABLE Customers (
    CustomerID int NOT NULL AUTO_INCREMENT,
    CustomerName varchar(50),
    AddressLine1 varchar(50),
    AddressLine2 varchar(50),
    City varchar(50),
    State varchar(50),
    PostalCode varchar(50),
    YTDPurchases decimal(19,2)
);

SHOW TABLES;
DESCRIBE Customers;

INSERT INTO Customers (CustomerName, AddressLine1, City, State, PostalCode)
VALUES ('Bike World', '600025 Bollinger Canyon Road', 'San Ramon', 'California', '94583'),
('Metro Sports', '482505 Warm Springs Blvd.', 'Fremont', 'California', '94536'),
('Mud Skidz Bike Wrld', '400222 Gnarly Ln.', 'Santa Cruz', 'California', '97777');

SELECT * FROM Customers;
