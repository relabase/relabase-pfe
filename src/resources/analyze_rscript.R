
working_directory <- getwd()

print(working_directory)

source(file.path('src','resources','rscript_analyzer_utils.R'))
#source(file.path('resources','rscript_analyzer_utils.R'))

user_cmd_args <- get_user_arguments()
print(user_cmd_args)

script <- "##CSV_DATA##
           ##USER_SCRIPT_INJECTED##
           "

user_script <- set_user_script_data(script, user_cmd_args[["user_script"]], user_cmd_args[["user_data"]])
print(user_script)

cat("Analyzing script... \n")

setup_list <- setup(user_script)

leaks <- check_data_leaks(setup_list[["vars"]], setup_list[["script_env"]], setup_list[["formatted"]])

run_validated_function(leaks, setup_list[["script_env"]], user_script)