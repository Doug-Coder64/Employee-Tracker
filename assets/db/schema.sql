drop database if exists employees_db;
create database employees_db;

use employees_db;

create table employees (
    id int not null auto_increment primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id int not null,
    manager_id int not null
);