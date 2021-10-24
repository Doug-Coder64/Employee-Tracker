const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const e = require('express');

//database connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        //MySQL Username 
        user: 'root',

        //MySQL Password
        password: '',
        database: 'employees_db'
    }
);

function start() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?', 
            name: "option", 
            choices: [
                    "View All Employees", 
                    "View All Employees by Manager", 
                    "View All Employees by Department",
                    "Add Employee",
                    "Remove Employee",
                    "Update Employee Role",
                    "Update Employee Manager"
            ]
        }
    ]).then(function(result) {
        
        //Function is ran depending on selection
        switch(result.option){
            case "View All Employees":
                console.log("Viewing employees");
                viewAllEmployees();
                break;
            case "View All Employees by Manager":
                break;
            case "View All Employees by Department":
                break;
            case "Add Employee":
                break;
            case "Remove Employee":
                break;
            case "Update Employee Role":
                break;
            case "Update Employee Manager":
                break;
        }
    })
}

function viewAllEmployees(){
    
    let query =  db.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;`, function(err, res) {
        if(err) throw err;
        console.table(res);
        start();
    });
}

start();