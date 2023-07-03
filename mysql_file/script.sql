use db;
INSERT INTO role(nom_role) VALUE('admin');
INSERT INTO role(nom_role) VALUE('user');

insert user(email,password,id_role) value('example1@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',1);
insert user(email,password,id_role) value('example2@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',1);
insert user(email,password,id_role) value('example3@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',1);
insert user(email,password,id_role) value('example4@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',1);

INSERT INTO user(email,password,id_role) VALUE('test@test.com','sdasaasda',1);



insert into log(text) value('a text'); 
insert log(text) value('a text'); 
insert log(text) value('a text');

INSERT INTO log(text) VALUE('aaaa'); 

-- UPDATE user SET password = 'dwqwddqwd' WHERE id_user = 4;



select * from log;
select * from user;
select * from role;
