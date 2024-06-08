const inputBtn = document.getElementsByClassName("input-button")[0];
// console.log(inputBtn);

// function createList(task, prior)
// transition to pop out task list
const createList = (task, prior) => {
  const taskList = document.getElementsByClassName("ul")[0];
  // console.log(taskList)
  let newLi = document.createElement("li");
  let newDiv = document.createElement("div");
  let newSpanTask = document.createElement("span");
  let newSpanPrior = document.createElement("span");
  let newbtn = document.createElement("button");
  let newImg = document.createElement("img");

  newDiv.className = "describe";
  newSpanTask.className = "output-task";
  newSpanPrior.className = "prior";
  newbtn.className = "tick";
  newImg.src = "https://cdn-icons-png.flaticon.com/512/6711/6711626.png";

  if (prior === "High") {
    newSpanPrior.classList.add("high");
  }
  if (prior === "Medium") {
    newSpanPrior.classList.add("medium");
  }
  if (prior === "Low") {
    newSpanPrior.classList.add("low");
  }

  taskList.appendChild(newLi).appendChild(newDiv);
  taskList.appendChild(newLi).appendChild(newDiv).appendChild(newSpanTask);
  taskList.appendChild(newLi).appendChild(newDiv).appendChild(newSpanPrior);
  taskList.appendChild(newLi).appendChild(newbtn).appendChild(newImg);

  newSpanTask.innerText = task;
  newSpanPrior.innerText = prior;
  // console.log(taskList)
};

// check priority and rearrange order
const rearrange = () => {
  let nodePrior = document.querySelectorAll(".prior");
  let nodeTask = document.querySelectorAll(".output-task");
  let arrPrior = [];
  let arrTask = [];
  let ul = document.getElementsByClassName("ul")[0];
  // console.log(ul)

  for (let i = 0; i < nodeTask.length; i++) {
    if (nodePrior[i].innerText === "High") {
      arrPrior.push(nodePrior[i].innerText);
      arrTask.push(nodeTask[i].innerText);
    }
  }
  for (let i = 0; i < nodeTask.length; i++) {
    if (nodePrior[i].innerText === "Medium") {
      arrPrior.push(nodePrior[i].innerText);
      arrTask.push(nodeTask[i].innerText);
    }
  }
  for (let i = 0; i < nodeTask.length; i++) {
    if (nodePrior[i].innerText === "Low") {
      arrPrior.push(nodePrior[i].innerText);
      arrTask.push(nodeTask[i].innerText);
    }
  }
  // console.log(arrPrior)
  // console.log(arrTask)
  // delete all li & push arranged items to ul
  ul.replaceChildren();
  for (let i = 0; i < arrTask.length; i++) {
    createList(arrTask[i], arrPrior[i]);
  }
};

// click btn
// extract task, priority input fm user
// put input in to the list
// if nothing / select prioriy => do nothing
const inputAction = () => {
  let inputTask = document.getElementById("task").value;
  let inputPrior = document.getElementById("priority").value;
  if (
    inputTask !== "" &&
    inputPrior !== "<Select priority>" &&
    inputTask.length < 89
  ) {
    createList(inputTask, inputPrior);
    rearrange();

    // Delete list item when clicked
    let outputBtn = document.querySelectorAll(".tick");
    outputBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Get the list item (li) that contains the button
        const listItem = e.target.closest("li");

        // Add the fade-out class to the list item
        listItem.classList.add("fade-out");

        // Wait for the animation to complete, then remove the list item
        setTimeout(() => {
          listItem.remove();
          changeFlex();
        }, 500); // Wait for 0.5 seconds (the duration of the animation)
      });
    });
  }

  if (inputTask.length > 88) {
    document.getElementById("task").placeholder = "<Too many words!>";
  } else {
    document.getElementById("task").placeholder = "<Enter your task here>";
  }
  document.getElementById("task").value = "";
  document.getElementById("priority").value = "<Select priority>";
};

// add click action for input
inputBtn.addEventListener("click", function () {
  inputAction();
  changeFlex();
});

// add enter action for input
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("task").focus();
  }
});

const inputElement = document.getElementById("task");
inputElement.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    document.getElementById("priority").focus();
  }
});

const selectElement = document.querySelector("select");
selectElement.addEventListener("keydown", function (e) {
  // Check if the key pressed is the Enter key
  if (e.key === "Enter") {
    // Prevent the default behavior of the Enter key
    e.preventDefault();

    // Call function
    inputAction();
    changeFlex();
    document.getElementById("task").focus();
  }
});

// center whole input board when nothing in the list
const changeFlex = () => {
  let allList = document.querySelectorAll("li");
  let wholeElements = document.getElementsByClassName("whole");
  let outputElements = document.getElementsByClassName("output");

  if (allList.length === 0) {
    // If there are no list items, set the flex direction of the .whole elements to column
    for (let i = 0; i < wholeElements.length; i++) {
      wholeElements[i].style.flexDirection = "column";
      wholeElements[i].style.justifyContent = "flex-start";
      wholeElements[i].style.alignItems = "center";
      outputElements[i].style.top = "0";
      outputElements[i].style.left = "0";
    }
  } else {
    // If there are list items, set the flex direction of the .whole elements to row
    for (let i = 0; i < wholeElements.length; i++) {
      wholeElements[i].style.flexDirection = "row";
      wholeElements[i].style.justifyContent = "center";
      wholeElements[i].style.alignItems = "flex-start";
      outputElements[i].style.top = "15vh";
      outputElements[i].style.left = "3em";
    }
  }
};
