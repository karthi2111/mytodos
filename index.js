

// Get elements from the DOM
const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add");
const clearBtn = document.getElementById("clear");
const taskList = document.getElementById("task-list");

// Check if there are tasks in localStorage and load them
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${task} <button class="edit-btn" onclick="editTask(${index})">Edit</button> <button class="del-btn" onclick="deleteTask(${index})">Delete</button>`;
    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText !== "") {
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    inputBox.value = "";
    renderTasks();
  }
}

// Function to edit a task
function editTask(index) {
  const newTaskText = prompt("Edit task:", tasks[index]);
  if (newTaskText !== null) {
    tasks[index] = newTaskText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

// Function to clear all tasks
function clearTasks() {
  const confirmClear = confirm("Are you sure you want to clear all tasks?");
  if (confirmClear) {
    tasks = [];
    localStorage.removeItem("tasks");
    renderTasks();
  }
}

// Event listeners
addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearTasks);

// Initial rendering of tasks
renderTasks();

