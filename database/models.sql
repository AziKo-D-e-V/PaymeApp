
insert into users 
(username, creditcard, cashbackcard)
values
('John', 5000, 0),
('Bob', 4500, 0),
('Taylor', 8000, 0);

create table users(
    id serial primary key not null,
    username varchar(255),
    creditcard int,
    cashbackcard int
);

create table stores(
    id serial primary key not null,
    username varchar(255),
    balance int
);
