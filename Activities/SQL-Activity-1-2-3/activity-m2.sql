-- Citation for activity-m2.sql:
-- Date: 04/16/2024
-- Adapted from /OR/ Based on
-- code provided in Activity-1 Creating A Customer Object Table page by professor
-- https://canvas.oregonstate.edu/courses/1958399/pages/activity-1-creating-a-customer-object-table?module_item_id=24181817

CREATE OR REPLACE TABLE Customers (
    CustomerID int NOT NULL AUTO_INCREMENT,
    CustomerName varchar(50),
    AddressLine1 varchar(50),
    AddressLine2 varchar(50),
    City varchar(50),
    State varchar(50),
    PostalCode varchar(50),
    YTDPurchases decimal(19,2),
    PRIMARY KEY (CustomerID)
);

SHOW TABLES;
DESCRIBE Customers;

INSERT INTO Customers (CustomerName, AddressLine1, City, State, PostalCode)
VALUES ('Bike World', '600025 Bollinger Canyon Road', 'San Ramon', 'California', '94583'),
('Metro Sports', '482505 Warm Springs Blvd.', 'Fremont', 'California', '94536'),
('Mud Skidz Bike Wrld', '400222 Gnarly Ln.', 'Santa Cruz', 'California', '97777');

SELECT * FROM Customers;
SELECT CustomerID, CustomerName FROM Customers WHERE PostalCode = '94536';

CREATE OR REPLACE TABLE TermsCode (
    TermsCodeID varchar(50) NOT NULL,
    Description varchar(50),
    PRIMARY KEY (TermsCodeID)
);

INSERT INTO TermsCode(TermsCodeID, Description)
VALUES ('NET30', 'Payment due in 30 days.'),
('NET15', 'Payment due in 15 days.'),
('210NET30', '2% discount in 10 days Net 30');

CREATE OR REPLACE TABLE Invoices (
    InvoiceID int NOT NULL AUTO_INCREMENT,
    CustomerID int,
    InvoiceDate datetime,
    TermsCodeID varchar(50),
    TotalDue decimal(19,2),
    PRIMARY KEY (InvoiceID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (TermsCodeID) REFERENCES TermsCode(TermsCodeID)
);

INSERT INTO Invoices(CustomerID, InvoiceDate, TotalDue, TermsCodeID)
VALUES (2, 20140207, 2388.98, 'NET30'),
(1, 20140202, 2443.35, '210NET30'),
(1, 20140209, 8752.32, 'NET30');
