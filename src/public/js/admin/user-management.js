window.onload = function () {
  var table = document.getElementById("user-table");

  if (table) {
    makeTableSortable("user-table");
    multiColumnSearchFunction("user-management-search", "user-table", [0, 1]);

    var tableRows = document.querySelectorAll(`#user-table .table-row`);
    console.log(tableRows[0].children[1].textContent.trim());
    addClickListener(
    tableRows,
    row => row.children[0].textContent.trim(),
    row => row.children[1].textContent.trim()
);
  }
}