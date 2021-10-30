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
    selectEmployee(); //Prefills Array with employee names
    selectRole(); //prefills Array with current roles
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
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
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
    let query = db.query('SELECT title AS Roles, salary AS Salary FROM role', function(err, res) {
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

//add role to database
function addRole(){
    inquirer.prompt([
        {
            name: "role",
            type: "input",
            message: "Enter new Role:"
        },
        {
            name: "salary",
            type: "input",
            message: "Type salary for this new role"
        }
    ]).then(function(res) {
        let query = db.query(`INSERT INTO role (title, salary) VALUES ('${res.role}', '${res.salary}')`,
        function(err){
            if(err) throw err;
            console.table(res);
            start();
        });
    });
}

//adds employee to db
function addEmployee(){
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter Employees First name'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter Employees Last name'
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Enter employees Manager',
            choices: selectEmployee() //allows any employee to be manager
        }, 
        {
            name: 'role', 
            type: 'list',
            message: 'Enter Role for this Employee',
            choices: selectRole()
        }
    ]).then(function(res){
        db.query("INSERT INTO employee SET ?",
        {
            first_name: res.first_name, 
            last_name: res.last_name,
            manager_id: selectEmployee().indexOf(res.manager)+1,
            role_id: selectRole().indexOf(res.role)+1
        },
        function(err, res) {
            if(err) throw err;
            console.table(res);
            start();
        });
    });
}


function updateEmployeeRole(){
    inquirer.prompt([
        {
            name: 'employee',
            type: 'list',
            message: 'Select employee to update',
            choices: selectEmployee()
        },
        {
            name: 'role',
            type: 'list',
            message: 'Enter employees new Role',
            choices: selectRole()
        }
    ]).then(function(res){
        db.query(`UPDATE employee set employee.role_id = ${selectRole().indexOf(res.role)+1} WHERE ?`,
        {
            last_name: res.employee.split(' ')[1]
        },
        function(err) {
            if(err) throw err;
            start();
        });
    });
}

//allows you to select any employee
let managers = [];
function selectEmployee() {
    db.query("SELECT first_name, last_name FROM employee", function(err,res){
        for(let i=0; i <res.length; i++){
            managers.push(res[i].first_name + " " + res[i].last_name);
        }
    });
    return managers;
}

//lists all the roles available so you can assign them to employee
let roles = [];
function selectRole() {
    db.query("Select title from role", function(err,res){
        if(err) throw err;
        for(let i = 0; i < res.length; i++) {
            roles.push(res[i].title);
        }
    })
    return roles;
}

start();