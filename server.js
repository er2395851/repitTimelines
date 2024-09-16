const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost', // Adjust if needed
  user: 'root', // Your MySQL username
  password: 'password', // Your MySQL password
  database: 'Timelines' // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Define a route to get user accounts from the database
app.get('/useraccounts', (req, res) => {
  // Query the database
  connection.query('SELECT * FROM useraccount', (error, results) => {
    if (error) {
      console.error('Error querying the database:', error.stack);
      res.status(500).send('Database query error');
      return;
    }

    // Generate HTML output
    let html = '<!DOCTYPE html><html><head><title>User Accounts</title></head><body>';
    html += '<h1>User Accounts</h1>';
    html += '<table border="1"><tr><th>ID</th><th>Username</th><th>Email</th><th>Created At</th></tr>';

    results.forEach(row => {
      html += `<tr><td>${row.id}</td><td>${row.username}</td><td>${row.email}</td><td>${row.created_at}</td></tr>`;
    });

    html += '</table></body></html>';

    // Send the HTML response
    res.send(html);
  });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://3.17.23.194:${port}`);
});
