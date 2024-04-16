-- Citation for activity-m2.sql:
-- Date: 04/16/2024
-- Adapted from /OR/ Based on
-- code provided in Activity-1 Creating A Customer Object Table page by professor
-- https://canvas.oregonstate.edu/courses/1958399/pages/activity-1-creating-a-customer-object-table?module_item_id=24181817

-- If we just want to create the table
CREATE TABLE TableName (
    ColumnName DataType Constraints,
    ...
);

-- If we want to create the table if it doesn't exist, or replace an existing
-- table with the same name
CREATE OR REPLACE TABLE TableName (
    ColumnName DataType Constraints,
    ...
);

-- If we want to create a table with Column1 as the Primary Key
CREATE TABLE TableName (
    Column1 int NOT NULL AUTO_INCREMENT,
    Column2 varchar(255),
    Column3 varchar(30),
    PRIMARY KEY (Column1)
);

-- Example Query

-- Creates a table Colors (or makes a new one if it already exists, deleting the old one)
-- Creates 6 columns, colorID, colorName, colorHex, red, green and blue.
-- Sets the primary key to be the colorID
CREATE OR REPLACE TABLE Colors (
    colorID int NOT NULL AUTO_INCREMENT,
    colorName varchar(255),
    colorHex varchar(255),
    red int,
    green int,
    blue int,
    PRIMARY KEY (colorID)
);

