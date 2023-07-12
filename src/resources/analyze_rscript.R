library(stringr)

script <- "
            ##CSV_DATA##
            ##USER_SCRIPT_INJECTED##
          "

cat("Analyzing script... \n")

# Evaluate the script in a new environment without exposing the results
# to get the variables
script_env <- new.env()
# Print statements are still outputted within invisible so we need to capture the output
prevent_output <- capture.output(eval(parse(text = script), script_env)) 
variables <- ls(envir = script_env)


# Get blacklist keywords
keywords <- as.list(read.delim(file.path('C:', 'Users', 'Roach', 'Documents', 'blackListKeywords.txt'), sep = "\n", header = FALSE)$V1)


# Function to find keywords being used
find_data_leaks_kw <- function(script, pattern)
{
  lines <- str_split(script, "\n", simplify = TRUE)
  print(lines)
  found_pattern <- str_detect(lines, pattern)
  print(found_pattern)
  line_nums <- which(found_pattern)
  matched_lines <- lines[line_nums]
  matches_df <- data.frame(LineNum = line_nums, Line = matched_lines)
  return (matches_df)
}


# Function to insert the variable in a keyword and escape ()
prep_kw_pattern <- function(keyword, var)
{
  escape_kw <- str_replace(keyword, fixed("("),"\\(")
  start_paren_index <- unlist(gregexpr('\\(', escape_kw))[1]
  kw_start <- str_sub(escape_kw, 1, start_paren_index)
  kw_var <- paste0(kw_start,var,"\\)")
  
  return (kw_var)
}


all_leaks <- data.frame()
# Loop through variables that contain a dataframe
for(var in variables)
{
  var_val <- get(var, envir = script_env)
  if(is.data.frame(var_val))
  {
    # Loop through blacklisted keywords to check if they are being used
    for(keyword in keywords)
    {
      leak_found <- find_data_leaks_kw(script,prep_kw_pattern(keyword,var))
      print(leak_found)
      all_leaks <- rbind(all_leaks, leak_found)
    }
  }
}

print(all_leaks)

if(nrow(all_leaks) == 0)
{
  cat("Running script...\n")
  eval(parse(text = script), script_env)
  cat("\nRan script successfully.\n")
}else
{
  cat("Cannot run script! There are data leak issues! \n")
  cat("Here are the issues: \n")
  print(all_leaks)
  stop("Stopped.")
}
