document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", manageTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = createTaskElement(taskText);
    taskList.appendChild(task);
    saveTasks();

    taskInput.value = "";
}

function createTaskElement(taskText) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", toggleComplete);

    const span = document.createElement("span");
    span.textContent = taskText;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(span));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(li));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

function toggleComplete(event) {
    const task = event.target.parentElement;
    task.classList.toggle("completed");
    saveTasks();
}

function editTask(taskSpan) {
    const newTask = prompt("Edit task:", taskSpan.textContent);
    if (newTask !== null) {
        taskSpan.textContent = newTask.trim();
        saveTasks();
    }
}

function deleteTask(task) {
    task.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskElement = createTaskElement(task.text);
        if (task.completed) taskElement.classList.add("completed");
        taskElement.querySelector("input").checked = task.completed;
        taskList.appendChild(taskElement);
    });
}
