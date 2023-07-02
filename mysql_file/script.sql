use db;

insert user(email,password) value('example1@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u');
insert user(email,password) value('example2@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u');
insert user(email,password) value('example3@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u');
insert user(email,password) value('example4@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u');

INSERT INTO user(email,password) VALUE('test@test.com','sdasaasda');



insert into log(text) value('a text'); 
insert log(text) value('a text'); 
insert log(text) value('a text');

INSERT INTO log(text) VALUE('aaaa'); 

INSERT INTO role(nom_role) VALUE('testingrole');

UPDATE user SET password = 'dwqwddqwd' WHERE id_user = 6;



select * from log;
select * from user;
select * from role;
