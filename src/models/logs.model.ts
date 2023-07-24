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
    "create_time": new Date("2023-08-22T20:14:00.000Z"),
    "text": "########## Exploratory Data Analysis ##########\n\
    \n\
    # Load necessary libraries\n\
    library(ggplot2)\n\
    library(dplyr)\n\
    library(tidyr)\n\
    \n\
    # Read the data from a CSV file\n\
    data <- read.csv('data.csv')\n\
    \n\
    # Check the structure of the data\n\
    str(data)\n\
    \n\
    # Summary statistics\n\
    summary(data)\n\
    \n\
    # Check for missing values\n\
    missing_values <- data %>%\n\
      summarize_all(.funs = list(~sum(is.na(.)))) %>%\n\
      gather() %>%\n\
      arrange(desc(value))\n\
    \n\
    # Plot missing value counts\n\
    ggplot(missing_values, aes(x = key, y = value)) +\n\
      geom_bar(stat = 'identity', fill = 'steelblue') +\n\
      labs(title = 'Missing Value Counts', x = 'Variables', y = 'Count') +\n\
      theme_minimal()\n\
    \n\
    # Data Visualization\n\
    # Scatter plot of two numeric variables\n\
    ggplot(data, aes(x = column1, y = column2)) +\n\
      geom_point(size = 3, color = 'darkorange') +\n\
      labs(title = 'Scatter Plot', x = 'Column 1', y = 'Column 2') +\n\
      theme_minimal()\n\
    \n\
    # Boxplot to compare categories\n\
    ggplot(data, aes(x = category_column, y = numeric_column)) +\n\
      geom_boxplot(fill = 'cadetblue') +\n\
      labs(title = 'Boxplot by Category', x = 'Category Column', y = 'Numeric Column') +\n\
      theme_minimal()\n\
    \n\
    # Histogram of a numeric variable\n\
    ggplot(data, aes(x = numeric_column)) +\n\
      geom_histogram(binwidth = 5, fill = 'coral') +\n\
      labs(title = 'Histogram of Numeric Column', x = 'Numeric Column', y = 'Frequency') +\n\
      theme_minimal()\n\
    \n\
    # Correlation matrix heatmap\n\
    correlation_matrix <- cor(data[, sapply(data, is.numeric)], use = 'pairwise.complete.obs')\n\
    ggplot(data = melt(correlation_matrix), aes(x = Var1, y = Var2, fill = value)) +\n\
      geom_tile() +\n\
      labs(title = 'Correlation Matrix Heatmap', x = 'Variables', y = 'Variables') +\n\
      theme_minimal()\n\
    \n\
    # Data Preprocessing\n\
    # Handling missing values\n\
    data <- data %>%\n\
      mutate_all(.funs = list(~ifelse(is.na(.), mean(., na.rm = TRUE), .)))\n\
    \n\
    # Standardize numeric columns\n\
    data[, sapply(data, is.numeric)] <- scale(data[, sapply(data, is.numeric)])\n\
    \n\
    # Feature engineering\n\
    data <- data %>%\n\
      mutate(new_column = column1 * column2 - column3)\n\
    \n\
    # Model Building\n\
    # Split the data into training and testing sets\n\
    set.seed(42)\n\
    train_indices <- sample(1:nrow(data), 0.7 * nrow(data))\n\
    train_data <- data[train_indices, ]\n\
    test_data <- data[-train_indices, ]\n\
    \n\
    # Fit a linear regression model\n\
    model <- lm(target_variable ~ ., data = train_data)\n\
    \n\
    # Model evaluation\n\
    predictions <- predict(model, newdata = test_data)\n\
    rmse <- sqrt(mean((test_data$target_variable - predictions)^2))\n\
    r_squared <- summary(model)$r.squared\n\
    \n\
    # Print evaluation metrics\n\
    cat('Root Mean Squared Error:', rmse, '\\n')\n\
    cat('R-squared:', r_squared, '\\n')\n\
    \n\
    # Save the model\n\
    saveRDS(model, 'model.rds')\n\
    ",
    "id_user": 6,
    "file_path_input": "/path/to/input/file_2.txt",
    "file_path_result": "/path/to/result/file_2.txt",
    "type": "created script"
  },
  {
    "id": 3,
    "create_time": new Date("2023-09-22T20:14:00.000Z"),
    "text": "login",
    "id_user": 9,
    "file_path_input": "/path/to/input/file_3.txt",
    "file_path_result": "/path/to/result/file_3.txt",
    "type": "login"
  },
  {
    "id": 4,
    "create_time": new Date("2023-10-22T20:14:00.000Z"),
    "text": "data <- c(10, 20, 30, 40, 50)\nsum_data <- sum(data)\nprint(sum_data)",
    "id_user": 2,
    "file_path_input": "/path/to/input/file_4.txt",
    "file_path_result": "/path/to/result/file_4.txt",
    "type": "created script"
  },
  {
    "id": 5,
    "create_time": new Date("2022-07-22T20:14:00.000Z"),
    "text": "login",
    "id_user": 5,
    "file_path_input": "/path/to/input/file_5.txt",
    "file_path_result": "/path/to/result/file_5.txt",
    "type": "login"
  },
  {
    "id": 6,
    "create_time": new Date("2022-07-22T20:14:00.000Z"),
    "text": "x <- 1:10\ny <- x^2\nplot(x, y)",
    "id_user": 8,
    "file_path_input": "/path/to/input/file_6.txt",
    "file_path_result": "/path/to/result/file_6.txt",
    "type": "created script"
  },
  {
    "id": 7,
    "create_time": new Date("2023-05-22T20:14:00.000Z"),
    "text": "login",
    "id_user": 1,
    "file_path_input": "/path/to/input/file_7.txt",
    "file_path_result": "/path/to/result/file_7.txt",
    "type": "login"
  },
  {
    "id": 8,
    "create_time": new Date("2021-06-22T20:14:00.000Z"),
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
    "create_time": new Date("2023-07-22T20:15:00.000Z"),
    "text": "data <- c(100, 200, 300, 400, 500)\nmax_data <- max(data)\nprint(max_data)",
    "id_user": 10,
    "file_path_input": "/path/to/input/file_10.txt",
    "file_path_result": "/path/to/result/file_10.txt",
    "type": "created script"
  }
]
  