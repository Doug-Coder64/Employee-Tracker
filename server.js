const inquire = require('inquirer');
const mysql = require('mysql2');
const ct = require('console.table');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

