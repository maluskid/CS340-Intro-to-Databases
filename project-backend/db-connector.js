// Citation for db-connector.js:
// Date: 04/07/2024
// Adapted from /OR/ Based on
// code provided in Activity-2 assignment page by professor
// https://canvas.oregonstate.edu/courses/1958399/assignments/9589645

const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_maluskid',
  password: '9069',
  database: 'cs340_maluskid'
})

module.exports.pool = pool;

// Initialize database for testing

// Citation for newConnection():
// Date: 05/09/2024
// Adapted from /OR/ Based on
// code provided in MariaDB documentation on DROP TABLE
// https://mariadb.com/kb/en/drop-table/

function newConnection() {
  pool.query('SET FOREIGN_KEY_CHECKS=0;');
  pool.query("SELECT CONCAT('DROP TABLE IF EXISTS `', TABLE_SCHEMA, '`.`', TABLE_NAME, '`;') FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'cs340_maluskid';");
  pool.query('SET FOREIGN_KEY_CHECKS=1;');

}
