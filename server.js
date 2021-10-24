const inquire = require('inquirer');
const mysql = require('mysql2');
const ct = require('console.table');

//database connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        
        //MySQL Username 
        user: 'root',

        //MySQL Password
        password: '',
        database: 'employees_db'
    }
);

db.query