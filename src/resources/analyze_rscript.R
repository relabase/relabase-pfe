
# Analyze user r script process
source(file.path('..','resources','rscript_analyzer_utils.R'))

script <- "##CSV_DATA##
            ##USER_SCRIPT_INJECTED##
           "

setup_list <- setup(script)

if(is.null(setup_list)){
    stop("Error: Script setup failed")
}else{
    leaks <- check_data_leaks(setup_list[["vars"]], setup_list[["script_env"]], setup_list[["formatted"]])

    run_validated_function(leaks, setup_list[["script_env"]], script)
}