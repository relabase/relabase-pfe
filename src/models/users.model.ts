import { User } from '@interfaces/users.interface';

// password: password123456789
export const UserModel: User[] = [
  {
    id: 1,
    email: 'example1@email.com',
    password: '$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',
    first_name: 'test',
    last_name: '1',
    id_role: 0,
    image: '../img/test-id.jpg',
    last_login: new Date(1632848787000),
  },
  {
    id: 2,
    email: 'example2@email.com',
    password: '$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',
    first_name: 'test',
    last_name: '2',
    id_role: 1,
    image: '../img/test-id.jpg',
    last_login: new Date(1632848787000),
  },
  {
    id: 3,
    email: 'example3@email.com',
    password: '$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',
    first_name: 'test',
    last_name: '3',
    id_role: 1,
    image: '../img/test-id.jpg',
    last_login: new Date(1632848787000),
  },
  {
    id: 4,
    email: 'example4@email.com',
    password: '$2b$10$2YC2ht8x06Yto5VAr08kben8.oxjTPrMn0yJhv8xxSVVltH3bOs4u',
    first_name: 'test',
    last_name: '4',
    id_role: 1,
    image: '../img/test-id.jpg',
    last_login: new Date(1632848787000),
  },
];
