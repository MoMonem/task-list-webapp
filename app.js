// UI variables
const form = document.querySelector("#task-form"),
  taskList = document.querySelector(".collection"),
  clearBtn = document.querySelector(".clear-tasks"),
  filter = document.querySelector("#filter"),
  taskInput = document.querySelector("#task");

form.addEventListener("submit", addTask);
clearBtn.addEventListener("click", deleteTasks);
taskList.addEventListener("click", deleteSingleTask);
filter.addEventListener("keyup", filterTasks);
document.addEventListener("DOMContentLoaded", displayAllTasksFromLocalStorage);

// add task function
function addTask(e) {
  createListItem(taskInput.value);

  addTaskToLocalStorage(taskInput.value);

  taskInput.value = "";
  e.preventDefault();
}

// Create and append a list item
function createListItem(liContent) {
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(liContent));

  const link = document.createElement("a");
  link.className = "delete-item secondery-content";
  link.innerHTML = "<i class='fa-solid fa-x'></i>";

  li.appendChild(link);
  taskList.appendChild(li);
}

// add task to local storage function
function addTaskToLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display stored tasks from local storage
function displayAllTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    createListItem(task);
  });
}

// delete all tasks
function deleteTasks(e) {
  const taskItems = document.querySelectorAll(".collection-item");
  if (confirm("Are you sure?")) {
    taskItems.forEach((item) => {
      item.remove();
    });
  }

  deleteTasksFromLocalStorage();
}

// clear all tasks from local storage
function deleteTasksFromLocalStorage() {
  localStorage.clear();
}

// delete a single task
function deleteSingleTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
  deleteSingleTaskFromLocalStorage(
    e.target.parentElement.parentElement.textContent
  );
}

// delete a single task from local storage
function deleteSingleTaskFromLocalStorage(liContent) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task, index) => {
    if (task === liContent) {
      tasks.splice(index, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

// filter through tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}
