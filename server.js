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
                    "View All Departments", 
                    "View All Roles",
                    "Add Departments",
                    "Add Role",
                    "Add Employee",
                    "Update Employee Role",
            ]
        }
    ]).then(function(result) {
        
        //Function is ran depending on selection
        switch(result.option){
            case "View All Employees":
                console.log("Viewing employees");
                viewAllEmployees();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Departments":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                break;
            case "Update Employee Role":
                break;
        }
    })
}

//lists employees, their role, department and and manager
function viewAllEmployees(){
    let query =  db.query(`SELECT employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title, role.salary, department.name AS Department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;`, 
    function(err, res) {
        if(err) throw err;
        console.table(res);
        start();
    });
}

//lists table of departments
function viewAllDepartments() {
    let query = db.query(`SELECT name AS Department FROM department`, function(err, res) {
        if(err) throw err;
        console.table(res);
        start();
    });
}

//Lists table of roles 
function viewAllRoles() {
    let query = db.query('SELECT title AS Roles FROM role', function(err, res) {
        if(err) throw err;
        console.table(res);
        start();
    });
}

//Adds department to sql
function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter new Departments name:"
        }
    ]).then(function(res) {
        let query = db.query(`INSERT INTO department (name) VALUES ('${res.name}')`, 
        function(err){
            if(err) throw err;
            console.table(res);
            start();
        });
    });
}

function addRole(){
    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "Enter new Role:"
        }
    ]).then(function(res) {
        let query = db.query(`INSERT INTO role (title) VALUES ('${res.role}')`, 
        function(err){
            if(err) throw err;
            console.table(res);
            start();
        });
    });
}

start();