function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return; 

  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");

  const taskLeft = document.createElement("div");
  taskLeft.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = function () {
    taskSpan.classList.toggle("task-done", this.checked);
  };

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    li.remove();
  };

  taskLeft.appendChild(checkbox);
  taskLeft.appendChild(taskSpan);

  li.appendChild(taskLeft);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("taskInput");

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
deleteBtn.onclick = function () {
  const confirmDelete = confirm("Are you sure you want to delete this todo?");
  if (confirmDelete) {
    li.remove();
  }
};
