import mysql from 'mysql';

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_maluskid',
  password: '9069',
  database: 'cs340_maluskid'
})

export default db;
