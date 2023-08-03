library(stringr)

# the source folder is in resources and called rscript_analyzer_utils.R
source(file.path('P:','Programming','ETS','ETSETES14','PFE','relabase-pfe','src','resources','rscript_analyzer_utils.R'))

script <- "
            ##CSV_DATA##
            ##USER_SCRIPT_INJECTED##
          "

cat("Analyzing script... \n")

setup_list <- setup(script)
print(setup_list)
leaks <- check_data_leaks(setup_list[["vars"]], setup_list[["script_env"]], setup_list[["script"]])

run_validated_function(leaks, setup_list[["script_env"]], script)