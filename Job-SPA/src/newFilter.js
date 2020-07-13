const selectFieldOne = document.getElementById("selectFieldOne");
const selectFieldTwo = document.getElementById("selectFieldTwo");
const list = document.getElementById("job-list");



function filter() {
  let optOne = selectFieldOne.options[selectFieldOne.selectedIndex].value;
  let optTwo = selectFieldTwo.options[selectFieldTwo.selectedIndex].value;
  const jobs = Store.getJobs();
  if (optOne === "All" && optTwo === "None") {
    UI.clearTable();
    UI.displayJobs();
  } else {
    let count = 0;
    UI.clearTable();
      jobs.forEach((job) => {
        let checkOne = checkImpo(job, optOne);
        let checkTwo =checkState(job, optTwo);
        if(checkOne && checkTwo){
          UI.addJobToList(job);
          count++;
        }
      });
      if(count === 0){
        UI.clearTable();
      }
  }
}


function checkImpo(job, imp){
  let result = false;
  if(imp === "All"){
    result = true;
  } else if(job.impo === String(imp)){
    result = true;
  }
  return result;
}

function checkState(job, state){
  let result = false;
  if(state === "None"){
    result = true;
  }else if(state === "checked"){
    if(job.checked === 1){
      result = true;
    }
  }else if(state === "NotDone"){
    if(job.checked === -1){
      result = true;
    }
  }
  return result;
}

selectFieldOne.addEventListener("change", filter);
selectFieldTwo.addEventListener("change", filter);
