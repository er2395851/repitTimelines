const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const { exec } = require('child_process');

// Load SSL certificates
const options = {
  key: fs.readFileSync('/etc/ssl/private/private.key'),  // Replace with the path to your private key
  cert: fs.readFileSync('/etc/ssl/certs/certificate.crt'),  // Replace with the path to your certificate
};

const app = express();
const port = 3000;
const sslPort = 443; // Use port 443 for HTTPS

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',  // or your AWS IP
  user: 'root',       // Your MySQL username
  password: 'password',  // Your MySQL password
  database: 'Timelines'  // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Serve the login form
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Handle login request
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = 'SELECT * FROM useraccount WHERE username = ? AND password = ?';
  
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error querying the database:', error.stack);
      res.status(500).send('Database query error');
      return;
    }

    if (results.length > 0) {
      res.send('Login successful! Welcome, ' + username + '!');
    } else {
      res.send('Login failed. Incorrect username or password.');
    }
  });
});

// Function to check if port 443 is in use and kill the process if needed
const checkAndKillPort443 = (callback) => {
  exec('sudo lsof -i :443', (err, stdout, stderr) => {
    if (err || stderr) {
      console.log('Port 443 is free to use.');
      callback();
    } else if (stdout) {
      // Get the process ID (PID) of the process using port 443
      const lines = stdout.trim().split('\n');
      const pid = lines[1].split(/\s+/)[1];

      console.log(`Port 443 is being used by process with PID: ${pid}. Killing the process...`);

      exec(`sudo kill -9 ${pid}`, (killErr) => {
        if (killErr) {
          console.error('Error killing the process:', killErr.message);
          return;
        }
        console.log('Process using port 443 has been killed.');
        callback();
      });
    }
  });
};

// Start the server on port 443 if it's available
checkAndKillPort443(() => {
  https.createServer(options, app).listen(sslPort, () => {
    console.log(`Server is running securely at https://localhost:${sslPort}`);
  });
});
