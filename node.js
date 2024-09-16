const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'timelines'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', connection.threadId);
});

app.get('/useraccounts', (req, res) => {
    const query = 'select * from useraccount;';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send(`Database query error: ${error.message}`);
            return;
        }

        let html = '<html><head><title>User Accounts</title></head><body>';
        html += '<h1>User Accounts</h1>';
        html += '<table border="1"><tr><th>ID</th><th>Username</th><th>Email</th></tr>';

        results.forEach(row => {
            html += `<tr><td>${row.id}</td><td>${row.username}</td><td>${row.email}</td></tr>`;
        });

        html += '</table></body></html>';

        res.send(html);
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
