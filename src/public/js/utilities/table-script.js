// Table search functions

function makeTableSortable(tableId) {
  var headers = document.querySelectorAll(`#${tableId} th`);
  headers.forEach(function(header, index) {
    header.addEventListener("click", function() { sortTable(tableId, index) });
  });
}

function sortTable(tableId, n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableId);
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      var xContent = x.querySelector('a') ? x.querySelector('a').innerHTML : x.innerHTML;
      var yContent = y.querySelector('a') ? y.querySelector('a').innerHTML : y.innerHTML;
      if (dir == "asc") {
        if (xContent.toLowerCase() > yContent.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (xContent.toLowerCase() < yContent.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;      
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// Table search functions

function searchFunction(inputId, tableId, columnIndex) {
  var input = document.getElementById(inputId);
  input.addEventListener("keyup", function() {
    var filter, table, tr, td, i, txtValue;
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      if (tr[i].classList.contains('table-header')) continue;
      td = tr[i].getElementsByTagName("td")[columnIndex];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  });
}

function multiColumnSearchFunction(inputId, tableId, columnIndexes) {
  var input = document.getElementById(inputId);
  input.addEventListener("keyup", function() {
    var filter = input.value.toUpperCase();
    var table = document.getElementById(tableId);
    var tr = table.getElementsByTagName("tr");

    for (var i = 0; i < tr.length; i++) {
      if (tr[i].classList.contains('table-header')) continue;
      var shouldDisplay = columnIndexes.some(function(columnIndex) {
        var td = tr[i].getElementsByTagName("td")[columnIndex];
        if (td) {
          var txtValue = td.textContent || td.innerText;
          return txtValue.toUpperCase().indexOf(filter) > -1;
        }
        return false;
      });

      tr[i].style.display = shouldDisplay ? "" : "none";
    }
  });
}
