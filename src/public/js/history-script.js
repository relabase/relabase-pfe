window.onload = function() {
    makeTableSortable("history-table");
    dateSearchFunction("history-date-from-search", "history-date-to-search", "history-table", 0);
    searchFunction("history-search-from", "history-table", 1); 
    enforceDateFormat(document.getElementById('history-date-from-search'));
    enforceDateFormat(document.getElementById('history-date-to-search'));
  }