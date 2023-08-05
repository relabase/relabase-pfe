# File that contains all necessary functions to analyze an R script.

library(stringr)

# Function to format the script, split by \n and remove all spaces in each line
format_script <- function(script)
{
  splitted_script <- str_trim(str_split(script, "\n", simplify = TRUE))
  formatted_script = str_replace_all(splitted_script, "(?<!\n)\\s", "")
  
  return (formatted_script)
}

# Setup environment to get variables
setup <- function(script)
{
  # Evaluate the script in a new environment without exposing the results
  # to get the variables
  script_env <- new.env()
  # Print statements are still outputted within invisible so we need to capture the output, unfortunately, this doesn't work for graphics
  tryCatch(
    {
        prevent_output <- capture.output(eval(parse(text = script), script_env))
        formatted_script <- format_script(script)
        variables <- ls(envir = script_env)
        setup_list <- list(
          "script_env" = script_env, 
          "vars" = variables,
          "formatted" = formatted_script)

        return (setup_list)
    },
    error = function(error)
    {
      print(paste("There is an error in your script! Please fix it and try again. Your error: ", conditionMessage(error)))
      return (NULL)
    }

  )
}

# Function to find leaks that matches the pattern passed in
# Returns a data frame containing the line number and line with the leak data
find_data_leaks <- function(pattern, script)
{
  found_pattern <- grepl(pattern, script, perl = TRUE)
  line_nums <- which(found_pattern)
  matched_lines <- script[line_nums]
  matches_df <- data.frame(LineNum = line_nums, Line = matched_lines)
  return (matches_df)
}

# Function that formats the regex pattern by inserting a keyword
# and a variable name
# Returns the formatted regex pattern
format_kw_pattern <- function(keyword, var)
{
  # Pattern explanation with example where @@@ is head and ### is data
  # \\b@@@\\(\\b###\\b[^;\\)]+\\)|\\b@@@\\(\\b###\\b\\), there are two parts to this pattern separated by | (or)
  # \\b@@@\\(\\b###\\b[^;\\)]+\\) in this pattern:
  # \\bhead matches the word head, \\b is a word boundary that matches only at the beginning or end of a word
  # \\( escapes the ( character so it can be matched
  # \\bdata\\b matches the word data
  # [^;\\)]+ matches 1 or more character that is not ; or )
  # \\) escapes the ) character so it can be matched
  # \\b@@@\\(\\b###\\b\\) this pattern will only match head(data)
  regex_pattern <- "\\b@@@\\(\\b###\\b[^;\\)]+\\)|\\b@@@\\(\\b###\\b\\)"
  pattern_kw <- str_replace_all(regex_pattern, "@@@", keyword)
  pattern_kw_var <- str_replace_all(pattern_kw, "###", var)
  
  return (pattern_kw_var)
}

# Function to create the data frame for leaks
# Returns an empty data frame if there are no leaks or a data frame binded with
# leaks
create_df_leaks <- function(all_leaks)
{
  if(length(all_leaks) > 0)
  {
    all_leaks <- do.call(rbind, all_leaks)
    # order leaks by line number
    all_leaks <-all_leaks[order(all_leaks$LineNum),]
  } else {
    all_leaks <- data.frame()
  }
}

# Function that gets the data leaks involving keywords and data frame variables
# Format ex: head(data), head(data$StepCount), head(data[6]), etc
# Returns a data frame containing the line number and the line of the leak/s
get_df_kw_direct_exposition <- function(variables, keywords, script)
{
  
  all_leaks <- list()
  
  for(var in variables)
  {
    for(keyword in keywords)
    {
      leak_found <- find_data_leaks(format_kw_pattern(keyword, var), script)
      
      if(nrow(leak_found) > 0)
      {
        all_leaks <- c(all_leaks, list(leak_found))
      }
    }
  }
  
  all_leaks <- create_df_leaks(all_leaks)
  
  return (all_leaks)
}

# Function that gets the data leaks of variables that are exposed directly in the script
# Format ex: data$StepCount, data[6,], data["StepCount"], etc
# Returns a data frame containing the line number and the line of the leak/s
get_df_direct_exposition <- function(variables, regex_pattern, script)
{
  all_leaks <- list()
  print("INSIDE OF get_df_direct_exposition!!!!!!!!!!!!!! print variables")
  print(variables)
  
  for(var in variables)
  {
    pattern_var <- str_replace_all(regex_pattern, "###", var)
    
    leak_found <- find_data_leaks(pattern_var, script)
    
    if(nrow(leak_found) > 0)
    {
      all_leaks <- c(all_leaks, list(leak_found))
    }
  }
  
  all_leaks <- create_df_leaks(all_leaks)
  
  return (all_leaks)
}

# Function to get all of the data frames in the script
get_df_vars_list <- function(variables, env_user)
{
  df_list <- list()
  
  for(var in variables)
  {
    var_val <- get(var, envir = env_user)
    
    if(is.data.frame(var_val))
    {
      df_list[[var]] <- var
    }
  }
  return(df_list)
}

# Function to get assignment lines of data frames that are being reassigned
# Returns a list of variables that are being reassigned
get_assignment_line_vars <- function(variables,regex_pattern, script)
{
  print("************************************************************************")
  print("get_assignment_line_vars====")
  print(variables)
  
  var_assignments <- list()
  vectors <- list()
  patterns_collection <- list()
  inner_line_leaks <- list()
  
  # Go through variables to find if they are being assigned ex user_variable <- data
  # Note: The first batch to come through this for loop are data frames
  # The next batch are the reassigned variables
  for(var in variables)
  {
    # Format the regex pattern with the variable
    pattern_var <- str_replace_all(regex_pattern, "###", var)
    patterns_collection <- append(patterns_collection, pattern_var)
    print("PATTERN_VAR")
    print(pattern_var)
    
    found_pattern <- grepl(pattern_var, script, perl = TRUE)

    if(any(found_pattern))
    {
      print("IN IF found pattern")
      line_nums <- which(found_pattern)
      print(line_nums)
      matched_lines <- script[line_nums]
      print("PRINT MATCHED LINES")
      print(matched_lines)
      
      var_assignments <- append(var_assignments, matched_lines)
    }
  }
  
  print("VAR ASSIGNMENTS AFTER FIRST FOR LOOOP")
  print(var_assignments)
  
  # It's possible that some lines contain multiple instructions separated by a ";"
  indexes = grep(";",var_assignments)
  
  # If there are multiple instructions in a line then we need to split them up and check for leaks
  if(length(indexes)>0)
  {
    for(index in indexes)
    {
      leak <- validate_multiple_instructions(var_assignments[[index]], patterns_collection)
      inner_line_leaks <- append(inner_line_leaks, leak)
    }
  }
  
  # Remove the lines that contained multiple instructions from the list of assignments
  if(length(inner_line_leaks) > 0)
  {
    print("inside if(length(inner_line_leaks) > 0)")
    print(var_assignments)
    var_assignments <- c(var_assignments, inner_line_leaks)
    var_assignments <- var_assignments[-indexes]
    print("AFTER REMOVAL")
    print(var_assignments)
  }
  
  var_assignments <- unique(var_assignments)
  
  print("!!!!!!!!!!!!!!! var_assignments !!!!!!!!!!!!!!!!")
  print(var_assignments)
  # Get the reassigned variables
  if(!(length(var_assignments) == 0))
  {
    # Go through the assignments line we found
    for(var_assign in var_assignments)
    {
      print("VAR_ASSIGN")
      print(var_assign)
      # Get the variable that is being assigned to
      # ^[[:graph:]]+(?=<|=) regex explanation:
      # ^[[:graph:]]+ matches 1 or more characters that are alphanumeric ([A-z0-9]) or punctuation characters
      # (?=<|=) matches the characters < or = but does not include them in the match, just looks for them after the pattern, known as a positive lookahead
      reassigned <- str_extract(var_assign, "^[[:graph:]]+(?=<|=)")
      print("!!REASSIGNED!!")
      print(reassigned)
      print("!!VARIABLES!!")
      print(variables)
      # Check if the reassigned variable is a vector
      if(!(reassigned %in% variables))
      {
        print("IF NOT REASSIGNED IN VARS")
        if(!(reassigned %in% vectors))
        {
          vectors <- append(vectors, reassigned)
        }
      }
    }
  }
  print("VECTS")
  print(vectors)
  
  return (vectors)
}

# Function that gets all of the indirect leaks meaning variables that were reassigned
# The first loop starts by checking if data frames are being reassigned
# Then it continues checking for reassignments for vectors with the next 
get_nonDF_exposition <- function(variables, script)
{
  print("====get_nonDF_exposition====")
  print(script)
  all_possible_leaks <- list()

  # First pass to find leaks
  # regex explanation for regex_first_pass_df:
  # [[:alnum:]]+ matches 1 or more alphanumeric characters
  # <- matches the characters <- or = matches the character =
  # \\b###\\b matches the word ### where ### is the variable name
  # (?=\\s|;|$) matches a whitespace character,; or end of line, but they're not included in the match, just looks for them after the pattern
  # \\$[^;\\)]+ matches the character $ followed by 1 or more characters that are not ; or )
  # \\[\\[?[^;\\)]+\\]\\]? matches the character [, then 0 or 1 of [, followed by 1 or more characters that are not ; or ) followed by 0 or 1 of ] and finally ]
  # | is an or operator so the regex will match any of the patterns separated by |

  regex_first_pass_df <- "[[:alnum:]]+<-\\b###\\b(?=\\s|;|$)|[[:alnum:]]+<-\\b###\\b\\$[^;\\)]+(?=\\s|;|$)|[[:alnum:]]+<-\\b###\\b\\[\\[?[^;\\)]+\\]\\]?(?=\\s|;|$)|[[:alnum:]]+=\\b###\\b(?=\\s|;|$)|[[:alnum:]]+=\\b###\\b\\$[^;\\)]+(?=\\s|;|$)|[[:alnum:]]+=\\b###\\b\\[\\[?[^;\\)]+\\]\\]?(?=\\s|;|$)"
  first_pass_leaks <- get_assignment_line_vars(variables, regex_first_pass_df, script)
  print("FIRST PASS LEAKS!")
  print(first_pass_leaks)
  if(length(first_pass_leaks) > 0)
  {
    print("THERE WERE MORE LEAKS")
    regex_pattern_recursive <- "[[:alnum:]]+<-\\b###\\b(?=\\s|;|$)|[[:alnum:]]+=\\b###\\b(?=\\s|;|$)"
    recursive_leaks <- get_reassignment_possible_leaks(first_pass_leaks, regex_pattern_recursive, script)
    print("Leaks found after get_reassignment_possible_leaks")
    print(recursive_leaks)
    all_possible_leaks <- append(all_possible_leaks, first_pass_leaks)
    all_possible_leaks <- append(all_possible_leaks, recursive_leaks)
  }
  
  return(unique(all_possible_leaks))
}

# Function to find all leaks by variables that were reassigned
# Loop until all of them are found
# Returns a list of variables that were reassigned
get_reassignment_possible_leaks <- function(possible_leaks, regex_pattern, script)
{
  print("In get_reassignment_possible_leaks\n")
  new_leaks <- list()
  
  possible_leak = TRUE
  
  while(possible_leak)
  {
    new_leaks <- get_assignment_line_vars(possible_leaks, regex_pattern, script)
    print("New leaks")
    print(new_leaks)
    print(length(new_leaks))
    
    if(length(new_leaks) > 0)
    {
      possible_leaks <- append(possible_leaks, new_leaks)
      print("Possible leaks")
      print(possible_leaks)
      
    }else{
      print("No more leaks")
      possible_leak = FALSE
    }
  }
  print("Found all leaks")
  return(possible_leaks)
}

# Function to split lines that contain multiple instructions
validate_multiple_instructions <- function(possible_lines, patterns_collection)
{
  inner_line_expositions <- list()
  print("In validate_multiple_instructions")
  
  splitted_lines <- str_split(possible_lines,";")
  
  print(splitted_lines)
  print(class(splitted_lines))
  expo_list <- unlist(splitted_lines)
  # Validate if this list contain any leaks
  for(pattern in patterns_collection )
  {
    for(expo in expo_list)
    {
      print(pattern)
      print("LINE_EXPSOED")
      print(expo)
      exposed <- grepl(pattern, expo, perl = TRUE)
      print("EXPOSED")
      print(exposed)
      print("LINE")
      
      if(exposed)
      {
        inner_line_expositions <- append(inner_line_expositions, expo)
        print(inner_line_expositions)
      }
    }
  }
  return(inner_line_expositions)
}

# Function to find leaks in the script, both direct and indirect
check_data_leaks <- function(variables, env_user, script)
{
  all_leaks <- list()
  # Get blacklist keywords
  keywords <- as.list(read.delim(file.path('..','resources','blacklistKeywords.txt'), sep = "\n", header = FALSE)$V1)

  # Get all data frame variables
  df_vars <- get_df_vars_list(variables, env_user)
  
  if(length(df_vars) > 0)
  {
    # Regex pattern explanation piece by piece:
    # (?<!<-|=) is a negative lookbehind that matches if the pattern is not preceded by <- or =
    # \\b###\\b matches the word ### where ### is the variable name
    # (?=\\s|;|$) matches a whitespace character,; or end of line, but they're not included in the match, just looks for them after the pattern
    # | is an or operator so the regex will match any of the patterns separated by |
    # \\$[^;\\)]+ matches the character $ followed by 1 or more characters that are not ; or )
    # \\[\\[?[^;\\)]+\\]\\]? matches the character [, then 0 or 1 of [, followed by 1 or more characters that are not ; or ) followed by 0 or 1 of ] and finally ]

    regex_pattern_var <- "(?<!<-|=)\\b###\\b(?=\\s|;|$)|(?<!<-|=)\\b###\\b\\$[^;\\)]+(?=\\s|;|$)|(?<!<-|=)\\b###\\b\\[\\[?[^;\\)]+\\]\\]?(?=\\s|;|$)"
    direct_df_leaks <- get_df_direct_exposition(df_vars, regex_pattern_var, script)
    
    print("DF EXPOSITION VARS")
    print(direct_df_leaks)
    
    direct_df_kw_leaks <- get_df_kw_direct_exposition(df_vars, keywords, script)
    
    print("DF EXPOSITION KWVARS")
    print(direct_df_kw_leaks)
    
    all_leaks <- rbind(direct_df_leaks, direct_df_kw_leaks)
    
    nonDF_expo <- get_nonDF_exposition(df_vars, script)
    
    print("NON DF EXPOSITION  VARS")
    print(nonDF_expo)
    
    regex_pattern_indirect_var <- "(?<!<-|=)\\b###\\b(?=\\s|;|$)|(?<!<-|=)\\b###\\b\\[\\[?[^;\\)]+\\]\\]?(?=\\s|;|$)"
    indirect_var_leaks <- get_df_direct_exposition(nonDF_expo, regex_pattern_indirect_var, script)
    print("INDIRECT_VAR_LEAKS")
    print(indirect_var_leaks)
    
    indirect_var_kw_leaks <- get_df_kw_direct_exposition(nonDF_expo, keywords, script)
    print(indirect_var_kw_leaks)
    
    all_leaks <- do.call("rbind", list(direct_df_leaks, direct_df_kw_leaks, indirect_var_leaks, indirect_var_kw_leaks))
    if(nrow(all_leaks)>0)
    {
      all_leaks <-all_leaks[order(all_leaks$LineNum),]
    }
    
  }else
  {
    all_leaks <- data.frame()
  }
  return (all_leaks)
}

# Run script if they're no leaks
run_validated_function <- function(leaks, script_env, script)
{
  if(nrow(leaks) == 0)
  {
    cat("Running script...\n")
    eval(parse(text = script), script_env)
    cat("Ran script successfully.")
  }else
  {
    cat("Cannot run script! There're data leak issues! \n")
    cat("Here are the issues: \n")
    print(unique(leaks))
    stop("The script will not be run.")
  }
}
