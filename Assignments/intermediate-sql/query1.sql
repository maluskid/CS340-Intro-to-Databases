-- Write the query to create the 4 tables below.
create or replace table client (
  id int not null auto_increment,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(255) not null,
  CONSTRAINT full_name UNIQUE(first_name, last_name),
  PRIMARY KEY(id)
);
create or replace table employee (
  id int not null auto_increment,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  start_date DATE not null,
  email varchar(255) not null,
  CONSTRAINT full_name UNIQUE(first_name, last_name),
  PRIMARY KEY(id)
);
create or replace table project (
  id int not null auto_increment,
  title varchar(255) not null,
  comments TEXT,
  cid int, 
  PRIMARY KEY(id),
  FOREIGN KEY(cid) REFERENCES client(id),
  CONSTRAINT UNIQUE(title)
);
create or replace table works_on (
  pid int,
  eid int,
  due_date DATE not null,
  PRIMARY KEY(pid, eid),
  FOREIGN KEY(pid) REFERENCES project(id),
  FOREIGN KEY(eid) REFERENCES employee(id)
);
-- Leave the queries below untouched. These are to test your submission correctly.
-- Test that the tables were created
DESCRIBE client;
DESCRIBE employee;
DESCRIBE project;
DESCRIBE works_on;

-- Test that the correct foreign keys were created 
SELECT TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME,REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME 
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE REFERENCED_TABLE_SCHEMA = 'grade';
