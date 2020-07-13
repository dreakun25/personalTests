const selectFieldFirst = document.getElementById("selectFieldOne");
const selectFieldSecond = document.getElementById("selectFieldTwo");
const list = document.getElementById("job-list");

function checkState(r) {
  let result = false;
  let row = list.rows[r].classList.value;
  if (String(row) === "checked") {
    result = true;
  }
  return result;
}

function checkImpo(r, opt) {
  let result = false;
  let row = list.rows[r].cells[2].textContent;
  if (String(row) === String(opt.textContent)) {
    result = true;
  }
  return result;
}

function filter() {
  let optOne = selectFieldFirst.options[selectFieldFirst.selectedIndex];
  let optTwo = selectFieldSecond.options[selectFieldSecond.selectedIndex];
  if (String(optOne.value) === "All" && String(optTwo.value) === "None") {
    for (let i = 0; i < list.rows.length; i++) {
      let y = i + 1;
      let row = document.querySelector(`#job-list tr:nth-child(${y})`);
      row.remove();
      i--;
    }
    UI.displayJobs();
  }
  if (String(optTwo.value) === "Done") {
    for (let i = 0; i < list.rows.length; i++) {
      let y = i + 1;
      let row = document.querySelector(`#job-list tr:nth-child(${y})`);
      row.remove();
      i--;
    }
    UI.displayJobs();
    for (let i = 0; i < list.rows.length; i++) {
      let y = i + 1;
      let row = document.querySelector(`#job-list tr:nth-child(${y})`);
      if (!checkState(i)) {
        row.remove();
        i--;
      }
    }
  } else if (String(optTwo.value) === "NotDone") {
    for (let i = 0; i < list.rows.length; i++) {
      let y = i + 1;
      let row = document.querySelector(`#job-list tr:nth-child(${y})`);
      row.remove();
      i--;
    }
    UI.displayJobs();
    for (let i = 0; i < list.rows.length; i++) {
      let y = i + 1;
      let row = document.querySelector(`#job-list tr:nth-child(${y})`);
      if (checkState(i)) {
        row.remove();
        i--;
      }
    }
  }
  if (String(optOne.value) !== "All") {
    for (let i = 0; i < list.rows.length; i++) {
      let y = i + 1;
      let row = document.querySelector(`#job-list tr:nth-child(${y})`);
      row.remove();
      i--;
    }
    UI.displayJobs();
    for (let i = 0; i < list.rows.length; i++) {
        let y = i + 1;
        let row = document.querySelector(`#job-list tr:nth-child(${y})`);
        if (!checkImpo(i, optOne)) {
          row.remove();
          i--;
        }
      }
  }
}

selectFieldFirst.addEventListener("change", filter);
selectFieldSecond.addEventListener("change", filter);
