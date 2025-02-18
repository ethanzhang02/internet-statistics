const mysql = require('mysql2');

// Function to create a new MySQL connection
function createConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,       // MySQL username
    password: process.env.DB_PASSWORD,  // MySQL password
    database: process.env.DB_NAME     // Database name
  });
}

// Function to attempt connection with retries
function connectToDatabase(retries = 5, delay = 5000) {  // Retries 5 times, delay 5 seconds
  const connection = createConnection();

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      
      // If retries are left, retry after a delay
      if (retries === 0) {
        console.error('Max retries reached. Could not connect to the database.');
        process.exit(1);  // Exit the application if the connection fails after retries
      } else {
        console.log(`Retrying in ${delay / 1000} seconds... (${retries} attempts left)`);
        setTimeout(() => connectToDatabase(retries - 1, delay), delay);  // Retry after delay
      }
    } else {
      console.log('Connected to MySQL database');
    }
  });

  return connection;
}

// Attempt to connect to the database
connection = connectToDatabase();

module.exports = connection
