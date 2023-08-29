const addBtn = document.querySelector("#Add_btn");
const newTask = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const errorNode = document.getElementById("error");
const countValue = document.querySelector(".count_value");
const openTask = document.querySelector(".opentask_value");
const completeTask = document.querySelector(".completeTask_value");

let taskcount = 0;
let openTaskCount = 0;
let completeTaskCount = 0;

const displayCount = (taskcount) => {
  countValue.innerText = taskcount;
};

const displayOpenTaskCount = (openTaskCount) => {
  openTask.innerText = openTaskCount;
};

const displayCompleteTaskCount = (completeTaskCount) => {
  completeTask.innerText = completeTaskCount;
};

const updateCounts = () => {
  displayCount(taskcount);
  displayOpenTaskCount(openTaskCount);
  displayCompleteTaskCount(completeTaskCount);
};

const deleteTask = (taskElement) => {
  const completeButton = taskElement.querySelector(".complete");
  if (completeButton.classList.contains("completed")) {
    completeTaskCount -= 1;
  } else {
    openTaskCount -= 1;
  }
  taskcount -= 1;
  updateCounts();
  taskElement.remove();
};

const addTask = () => {
  const taskName = newTask.value.trim();
  errorNode.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      errorNode.style.display = "block";
    }, 200);
    return;
  }
  

  const task = `<div class="task">
    <span class="taskname">${taskName}</span>
    <div class="taskbtn">
      <button class="edit btn">
        <i class="fa-solid fa-pen-to-square fa-xl"></i>
      </button>
      <button class="delete">
        <i class="fa-solid fa-trash-can fa-xl"></i>
      </button>
      <button class="complete">
        <a>Complete</a>
      </button>
    </div>
  </div>`;

  taskContainer.insertAdjacentHTML("beforeend", task);
  const newTaskElement = taskContainer.lastElementChild;

  const deleteButton = newTaskElement.querySelector(".delete");
  deleteButton.onclick = () => {
    deleteTask(newTaskElement);
  };

  const editButton = newTaskElement.querySelector(".edit");
  editButton.onclick = (e) => {
    let targetElement = e.currentTarget.closest(".task");
    const completeButton = targetElement.querySelector(".complete");

    if (!completeButton.classList.contains("completed")) {
      const taskNameElement = targetElement.querySelector(".taskname");
      newTask.value = taskNameElement.innerText;
      deleteTask(targetElement);
    }
  };

  const completeButton = newTaskElement.querySelector(".complete");
  completeButton.onclick = () => {
    const taskNameElement = newTaskElement.querySelector(".taskname");

    if (!completeButton.classList.contains("completed")) {
      completeButton.classList.add("completed");
      taskNameElement.classList.add("completed-taskname");
      openTaskCount -= 1;
      completeTaskCount += 1;
    } else {
      completeButton.classList.remove("completed");
      taskNameElement.classList.remove("completed-taskname");
      openTaskCount += 1;
      completeTaskCount -= 1;
    }
    updateCounts();
  };

  taskcount += 1;
  openTaskCount += 1;
  updateCounts();
  newTask.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
  taskcount = 0;
  openTaskCount = 0;
  completeTaskCount = 0;
  updateCounts();
  newTask.value = "";
};



