import { Log } from '@/interfaces/logs.interface';

export const LogModel: Log[] = [
  {
    "id": 1,
    "create_time": new Date("2023-07-22T20:14:00.000Z"),
    "text": "login",
    "id_user": 3,
    "file_path_input": "/path/to/input/file_1.txt",
    "file_path_result": "/path/to/result/file_1.txt",
    "type": "login"
  },
  {
    "id": 2,
    "create_time": new Date("2023-07-22T20:14:00.000Z"),
    "text": "data <- c(1, 2, 3, 4, 5)\nmean_data <- mean(data)\nprint(mean_data)",
    "id_user": 6,
    "file_path_input": "/path/to/input/file_2.txt",
    "file_path_result": "/path/to/result/file_2.txt",
    "type": "created script"
  },
  {
    "id": 3,
    "create_time": new Date("2023-07-22T20:14:00.000Z"),
    "text": "login",
    "id_user": 9,
    "file_path_input": "/path/to/input/file_3.txt",
    "file_path_result": "/path/to/result/file_3.txt",
    "type": "login"
  },
  {
    "id": 4,
    "create_time": new Date("2023-07-22T20:14:00.000Z"),
    "text": "data <- c(10, 20, 30, 40, 50)\nsum_data <- sum(data)\nprint(sum_data)",
    "id_user": 2,
    "file_path_input": "/path/to/input/file_4.txt",
    "file_path_result": "/path/to/result/file_4.txt",
    "type": "created script"
  },
  {
    "id": 5,
    "create_time": new Date("2023-07-22T20:14:00.000Z"),
    "text": "login",
    "id_user": 5,
    "file_path_input": "/path/to/input/file_5.txt",
    "file_path_result": "/path/to/result/file_5.txt",
    "type": "login"
  },
  {
    "id": 6,
    "create_time": new Date("2023-07-22T20:14:00.000Z"),
    "text": "x <- 1:10\ny <- x^2\nplot(x, y)",
    "id_user": 8,
    "file_path_input": "/path/to/input/file_6.txt",
    "file_path_result": "/path/to/result/file_6.txt",
    "type": "created script"
  },
  {
    "id": 7,
    "create_time": new Date("2023-07-22T20:14:00.000Z"),
    "text": "login",
    "id_user": 1,
    "file_path_input": "/path/to/input/file_7.txt",
    "file_path_result": "/path/to/result/file_7.txt",
    "type": "login"
  },
  {
    "id": 8,
    "create_time": new Date("2023-07-22T20:14:00.000Z"),
    "text": "data <- c(5, 10, 15, 20, 25)\nmedian_data <- median(data)\nprint(median_data)",
    "id_user": 4,
    "file_path_input": "/path/to/input/file_8.txt",
    "file_path_result": "/path/to/result/file_8.txt",
    "type": "created script"
  },
  {
    "id": 9,
    "create_time": new Date("2023-07-22T20:14:00.000Z"),
    "text": "login",
    "id_user": 7,
    "file_path_input": "/path/to/input/file_9.txt",
    "file_path_result": "/path/to/result/file_9.txt",
    "type": "login"
  },
  {
    "id": 10,
    "create_time": new Date("2023-07-22T20:14:00.000Z"),
    "text": "data <- c(100, 200, 300, 400, 500)\nmax_data <- max(data)\nprint(max_data)",
    "id_user": 10,
    "file_path_input": "/path/to/input/file_10.txt",
    "file_path_result": "/path/to/result/file_10.txt",
    "type": "created script"
  }
]
  