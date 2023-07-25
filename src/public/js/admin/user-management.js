window.onload = function() {
  makeTableSortable("user-table");
  multiColumnSearchFunction("user-management-search", "user-table", [0, 1]);
}