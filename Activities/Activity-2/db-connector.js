// Citation for db-connector.mjs:
// Date: 04/07/2024
// Adapted from /OR/ Based on
// code provided in Activity-2 assignment page by professor
// https://canvas.oregonstate.edu/courses/1958399/assignments/9589645

const mysql =require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_maluskid',
  password: '9069',
  database: 'cs340_maluskid'
})

module.exports.pool = pool;
