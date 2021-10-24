INSERT INTO department(name) Values ("Deposits"), ("New Accounts"), ("Loans"), ("Investing");

insert into role(title, salary, department_id) 
VALUES  ("Branch Supervisor", 50000, 1),
        ("Senior New Account agent", 40000, 2),
        ("Vice President", 60000, 3),
        ("Lead Investor", 70000, 4),
        ("Teller", 15000, 1),
        ("New Accounts Agent", 20000, 2),
        ("Loan Officer", 50000, 3),
        ("Apprentice Investor", 60000, 4);

insert into employee (first_name, last_name, manager_id, role_id)
Values  ("Kathy", "Quarter", 3, 1),
        ("Pat", "Dime", 1, 2),
        ("Bruce", "Dollar", Null, 3),
        ("Tom", "Lincoln", Null, 4),
        ("Robin", "Penny", 1, 5),
        ("Alix", "Nickle", 2, 6),
        ("Kyle", "Quarter", 3, 7),
        ("Grant", "Jefferson", 4, 8);
