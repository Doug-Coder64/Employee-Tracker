drop database if exists employees_db;
create database employees_db;

use employees_db;

create table department (
    id int auto_increment primary key,
    name varchar(30)
);

create table roles (
    id int auto_increment primary key,
    title varchar(30),
    salary decimal,
    department_id int,
    foreign key (department_id) references department(id)
)

create table employee (
    id int not null auto_increment primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    foreign key (role_id) references roles(id),
    foreign key (manager_id) references employee(id)
);
