window.onload = function () {
  var table = document.getElementById("home-table");

  if (table) {
    dateSearchFunction("home-date-from-search", "home-date-to-search", "home-table", 0);
    enforceDateFormat(document.getElementById('home-date-from-search'));
    enforceDateFormat(document.getElementById('home-date-to-search'));

    var tableRows = document.querySelectorAll(`#home-table .table-row`);
    addClickListener(tableRows,
      row => 'R Script generated on ' + row.children[0].textContent.trim()
    );
  }
}
