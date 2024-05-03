-- write your queries to insert data here

insert into client(first_name, last_name, email)
values ('Sara', 'Smith', 'smiths@hello.com'),
('Miguel', 'Cabrera', 'mc@hello.com'),
('Bo', "Chan'g", 'bochang@hello.com');

insert into employee(first_name, last_name, start_date, email)
values ('Ananya', 'Jaiswal', '2008-4-10', 'ajaiswal@hello.com'),
('Michael', 'Fern', '2015-7-19', 'michaelf@hello.com'),
('Abdul', 'Rehman', '2018-2-27', 'rehman@hello.com');

insert into project(cid, title, comments)
values 
(
  (select id from client where first_name = 'Sara' and last_name = 'Smith'),
  'Diamond',
  'Should be done by Jan 2019'
),
(
  (select id from client where first_name = 'Bo' and last_name = "Chan'g"),
  "Chan'g",
  'Ongoing maintenance'
),
(
  (select id from client where first_name = 'Miguel' and last_name = 'Cabrera'),
  'The Robinson Project',
  NULL
)
;

insert into works_on(eid, pid, due_date)
values
(
  (select id from employee where first_name = 'Ananya' and last_name = 'Jaiswal'),
  (select id from project where title = "Chan'g"),
  '2020-11-19'
),
(
  (select id from employee where first_name = 'Michael' and last_name = 'Fern'),
  (select id from project where title = 'The Robinson Project'),
  '2020-12-05'
),
(
  (select id from employee where first_name = 'Abdul' and last_name = 'Rehman'),
  (select id from project where title = 'Diamond'),
  '2021-1-1'
);


-- Leave the queries below untouched. These are to test your submission correctly.
select * from project;
select * from client;
select * from employee;
select * from works_on;
