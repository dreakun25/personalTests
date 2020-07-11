// Job Class: Represents a Job
class Job {
  constructor(title, when, impo, number, checked) {
    this.title = title;
    let temp = when.toString();
    temp = temp.replace("T", " ");
    this.when = temp;
    if (number === undefined) {
      if (document.querySelector("#job-list").childElementCount < 1) {
        this.number = 1;
      } else {
        this.number = parseInt(max()) + 1;
      }
    } else {
      this.number = number;
    }
    this.impo = impo;

    if (checked === undefined) {
      this.checked = -1;
    } else {
      this.checked = checked;
    }
  }
}

// Store Class: Handles Storage
class Store {
  static getJobs() {
    let jobs;
    if (localStorage.getItem("jobs") === null) {
      jobs = [];
    } else {
      jobs = JSON.parse(localStorage.getItem("jobs"));
    }

    return jobs;
  }

  static addJob(job) {
    const jobs = Store.getJobs();
    jobs.push(job);
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }

  static removeJob(number) {
    const jobs = Store.getJobs();

    jobs.forEach((job, index) => {
      if (job.number === number) {
        jobs.splice(index, 1);
      }
    });

    localStorage.setItem("jobs", JSON.stringify(jobs));
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayJobs() {
    const StoredJobs = Store.getJobs();

    const jobs = StoredJobs;

    jobs.forEach((job) => UI.addJobToList(job));
  }

  static addJobToList(job) {
    const list = document.querySelector("#job-list");

    const row = document.createElement("tr");

    if (job.checked === 1) {
      row.setAttribute("class", "checked");
    }

    if (job.impo === "High") {
      row.innerHTML = `
            <td>${job.title}</td>
            <td>${job.when}</td>
            <td class="text-high">${job.impo}</td>
            <td id="number">${job.number}</td>
            <td><button class="btn btn-success btn-sm done"><i class="fas fa-check"></i></button><br><br><button class="btn btn-danger btn-sm delete"><i class="fas fa-minus"></i></button></td>
            `;
    }
    if (job.impo === "Medium") {
      row.innerHTML = `
            <td>${job.title}</td>
            <td>${job.when}</td>
            <td class="text-middle">${job.impo}</td>
            <td id="number">${job.number}</td>
            <td><button class="btn btn-success btn-sm done"><i class="fas fa-check"></i></button><br><br><button class="btn btn-danger btn-sm delete"><i class="fas fa-minus"></i></button></td>
            `;
    }
    if (job.impo === "Low") {
      row.innerHTML = `
            <td>${job.title}</td>
            <td>${job.when}</td>
            <td class="text-low">${job.impo}</td>
            <td id="number">${job.number}</td>
            <td><button class="btn btn-success btn-sm done"><i class="fas fa-check"></i></button><br><br><button class="btn btn-danger btn-sm delete"><i class="fas fa-minus"></i></button></td>
            `;
    }

    list.appendChild(row);
  }

  static deleteJob(el) {
    el.parentElement.parentElement.remove();
    // Remove job from store
    Store.removeJob(
      parseInt(el.parentElement.previousElementSibling.textContent)
    );

    //  Show success message
    UI.showAlert("ToDo removed", "success");
  }

  // Done Job
  static doneJob(el) {
    const table = document.querySelector("table");
    const tBody = table.tBodies[0];
    if (el.matches(".done")) {
      if (el.parentElement.parentElement.classList.contains("checked")) {
        let newNumber = parseInt(
          el.parentElement.previousElementSibling.textContent
        );
        let newImpo =
          el.parentElement.previousElementSibling.previousElementSibling
            .textContent;
        let newWhen =
          el.parentElement.previousElementSibling.previousElementSibling
            .previousElementSibling.textContent;
        let newTitle =
          el.parentElement.previousElementSibling.previousElementSibling
            .previousElementSibling.previousElementSibling.textContent;
        el.parentElement.parentElement.remove();
        let doneJob = new Job(newTitle, newWhen, newImpo, newNumber, -1);
        Store.removeJob(
          parseInt(el.parentElement.previousElementSibling.textContent)
        );
        Store.addJob(doneJob);
        while (tBody.firstChild) {
          tBody.removeChild(tBody.firstChild);
        }
        UI.displayJobs();
      } else {
        let newNumber = parseInt(
          el.parentElement.previousElementSibling.textContent
        );
        let newImpo =
          el.parentElement.previousElementSibling.previousElementSibling
            .textContent;
        let newWhen =
          el.parentElement.previousElementSibling.previousElementSibling
            .previousElementSibling.textContent;
        let newTitle =
          el.parentElement.previousElementSibling.previousElementSibling
            .previousElementSibling.previousElementSibling.textContent;
        el.parentElement.parentElement.remove();
        let doneJob = new Job(newTitle, newWhen, newImpo, newNumber, 1);
        Store.removeJob(
          parseInt(el.parentElement.previousElementSibling.textContent)
        );
        Store.addJob(doneJob);
        while (tBody.firstChild) {
          tBody.removeChild(tBody.firstChild);
        }
        UI.displayJobs();
      }
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className} custom-alert-start`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#job-form");
    container.insertBefore(div, form);
    setTimeout(() => {
      div.classList.remove("custom-alert-start");
      div.classList.add("custom-alert-middle");
    }, 200);
    setTimeout(() => {
      div.classList.remove("custom-alert-middle");
      div.classList.add("custom-alert-start");
    }, 2800);

    //  Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#when").value = "";
  }
}

class CustomAlert {
  constructor(message) {
    this.dialog = message;
  }

  render = function (dialog) {
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const dialogoverlay = document.getElementById("dialogboxoverlay");
    const dialogbox = document.getElementById("dialogbox");
    const message = dialog;

    dialogoverlay.style.display = "block";
    dialogoverlay.style.height = winH + "px";
    dialogbox.style.left = winW / 2 - 550 * 0.5 + "px";
    dialogbox.style.top = "100px";
    dialogbox.style.display = "block";

    document.getElementById("dialogboxheader").innerHTML = "Are you sure?";
    document.getElementById("dialogboxbody").innerHTML = message;
    document.getElementById("dialogboxfooter").innerHTML =
      '<button class="btn btn-sm btn-success" id="yes">Yes</button> <button class="btn btn-sm btn-danger" id="no">No</button>';
  };
}
// Event: Display Jobs
window.addEventListener("DOMContentLoaded", UI.displayJobs);

// Event: Add a Job
document.querySelector(".btn-parent").addEventListener("click", (event) => {
  // Prevent actual submit
  event.preventDefault();
  // Get form values
  const title = document.querySelector("#title").value;
  const when = document.querySelector("#when").value;
  function Impo() {
    const rbs = document.querySelectorAll('input[name="impo"]');
    let selectedValue;
    for (const rb of rbs) {
      if (rb.checked) {
        selectedValue = rb.value;
        break;
      }
    }
    return selectedValue;
  }

  const impo = Impo();
  let numb;
  let checked;

  // Validate
  if (title === "" || when === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate job
    const job = new Job(title, when, impo, numb, checked);

    // Add Job to UI
    UI.addJobToList(job);
    // sortTableByColumn(document.querySelector("table"), 1);

    // Add job to store

    Store.addJob(job);

    //  Show success message
    UI.showAlert("ToDo added", "success");

    // Clear fields
    UI.clearFields();

    // Test
  }
});

// Event: Remove a Job
document.querySelector("#job-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    //   Remove job from UI
    let confirm = new CustomAlert();
    confirm.render("Do you want to delete ToDo?");
    document.getElementById("yes").addEventListener("click", () => {
      ok();
      UI.deleteJob(e.target);
    });
    document.getElementById("no").addEventListener("click", () => {
      ok();
    });
  }
});

// Event: Done Job
document.querySelector("#job-list").addEventListener("click", (e) => {
  //   Done Job
  UI.doneJob(e.target);
});

document.querySelectorAll(".table-sortable th").forEach((headerCell) => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(
      headerCell.parentElement.children,
      headerCell
    );
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});

// calculating max number
function max() {
  let max = 0;
  let arr = document.querySelector("#job-list");
  for (let i = 0; i < arr.rows.length; i++) {
    if (max < parseInt(arr.rows[i].cells[3].innerHTML)) {
      max = parseInt(arr.rows[i].cells[3].innerHTML);
    }
  }
  return max;
}

// clear local storage

document.querySelector("#clear").addEventListener("click", (e) => {
  let confirm = new CustomAlert();
    confirm.render("Do you want to clear all app data?");
    document.getElementById("yes").addEventListener("click", () => {
      ok();
      localStorage.clear();
      location.reload(true);
    });
    document.getElementById("no").addEventListener("click", () => {
      ok();
    });
    
});



function ok() {
  document.getElementById("dialogboxoverlay").style.display = "none";
  document.getElementById("dialogbox").style.display = "none";
}
