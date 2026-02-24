let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

function saveTasks() {
    window.tasksStorage = JSON.stringify(tasks);
}

function loadTasks() {
    if (window.tasksStorage) {
        tasks = JSON.parse(window.tasksStorage);
        renderTasks();
    }
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("remainingTasks").textContent = total - completed;
}

function renderTasks() {
    todoList.innerHTML = "";

    if (tasks.length === 0) {
        todoList.innerHTML = '<div class="empty">Nessuna attività! Aggiungine una per iniziare.</div>';
        updateStats();
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `todo-item ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
            <span class="todo-text">${task.text}</span>
            <button class="delete-btn">Elimina</button>
        `;

        li.querySelector(".checkbox").onclick = () => toggleTask(index);
        li.querySelector(".delete-btn").onclick = () => deleteTask(index);

        todoList.appendChild(li);
    });

    updateStats();
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

loadTasks();
