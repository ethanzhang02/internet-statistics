require('dotenv').config({ path: '../.env' }); // Load environment variables from .env file
const mysql = require('mysql2'); // Use mysql2 instead of mysql

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,       // Replace with your MySQL username
  password: process.env.DB_PASSWORD,  // Replace with your MySQL password
  database: process.env.DB_NAME
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;