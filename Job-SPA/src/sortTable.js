/**
 * Sorts a HTML table
 *
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column
 * @param {boolean} asc Determines the sorting order
 */
function sortTableByColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  // Sort each row
  const sortedRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .innerHTML.trim();

    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });

//   Remove all exisitng TRs

  while(tBody.firstChild){
      tBody.removeChild(tBody.firstChild);
  }

//   Readd sorted rows

tBody.append(...sortedRows);

// Remembber how the column is sorted

table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}
