use db;
INSERT INTO role(name_role) VALUE('admin');
INSERT INTO role(name_role) VALUE('user');


INSERT INTO status(name_status) VALUE('in progress');
INSERT INTO status(name_status) VALUE('approved');
INSERT INTO status(name_status) VALUE('rejected');
INSERT INTO type(name_type) VALUE('success');
INSERT INTO type(name_type) VALUE('failure');

insert user(email,password,id_role,image,google_id) value('example1@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',1,"img.png","empty1");
insert user(email,password,id_role,image,google_id) value('example2@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',1,"img.png","empty2");
insert user(email,password,id_role,image,google_id) value('example3@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',2,"img.png","empty3");
insert user(email,password,id_role,image,google_id) value('example4@email.com','$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',2,"img.png","empty4");


INSERT INTO user_request(email,message,image,first_name,last_name,id_status,google_id) VALUE("dan@dan.com","hello","da/e.png","uuu","dada",1,"empty5");
INSERT INTO package_request(name_package,message,id_user,link,id_status) VALUE("a package","lllllll",1,"httplink",1);


INSERT INTO log(text,id_user,file_path_input,file_path_result,id_type) value('testType',1,'yu/yu','tu/ih',1);