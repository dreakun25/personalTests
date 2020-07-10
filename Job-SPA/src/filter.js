function showFilter() {
  var opt = selectField.options[selectField.selectedIndex];
  const arr = document.getElementById("job-list");
  if (String(opt.value) === "All") {
    for (let j = 0; j < arr.rows.length; j++) {
      let y = j + 1;
      let row = document.querySelector(`#job-list tr:nth-child(${y})`);
      row.remove();
      j--;
    }
    UI.displayJobs();
  } else {
    for (let j = 0; j < arr.rows.length; j++) {
        let y = j + 1;
        let row = document.querySelector(`#job-list tr:nth-child(${y})`);
        row.remove();
        j--;
      }
      UI.displayJobs();
    let i = 0;
    iteration: for (i; i < arr.rows.length; i++) {
      let y = i + 1;
      if (String(opt.value) !== String(arr.rows[i].cells[2].innerText)) {
        var temp = document.querySelector(`#job-list tr:nth-child(${y})`);
         temp.remove();
         i--;
         continue iteration;
      }
      
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const selectField = document.getElementById("selectField");
  const filterbtn = document.getElementById("filterbtn");

  filterbtn.addEventListener("click", showFilter);
});
