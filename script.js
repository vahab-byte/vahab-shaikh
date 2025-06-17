function showToast(message) {
      const container = document.getElementById("toast-container");

      const existingToast = container.querySelector(".toast");
      if (existingToast) existingToast.remove();

      const toast = document.createElement("div");
      toast.className = "toast";
      toast.textContent = message;
      container.appendChild(toast);

      setTimeout(() => {
        if (toast.parentNode === container) {
          toast.remove();
        }
      }, 3000);
    }

    document.addEventListener("DOMContentLoaded", function () {
      const input = document.getElementById("taskInput");
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") addTask();
      });
      loadTasks();
    });

    function saveTasksToLocalStorage() {
      const tasks = [];
      document.querySelectorAll("#taskList li").forEach(li => {
        const taskText = li.querySelector("span").textContent;
        const completed = li.querySelector("input[type=checkbox]").checked;
        tasks.push({ text: taskText, done: completed });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => addTask(task.text, task.done));
    }

    function addTask(taskText = null, isCompleted = false) {
      const taskInput = document.getElementById("taskInput");
      if (!taskText) taskText = taskInput.value.trim();
      if (taskText === "") return;

      const taskList = document.getElementById("taskList");
      const li = document.createElement("li");
      const taskLeft = document.createElement("div");
      taskLeft.className = "task-left";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isCompleted;

      const taskSpan = document.createElement("span");
      taskSpan.textContent = taskText;
      if (isCompleted) taskSpan.classList.add("task-done");

      checkbox.onchange = function () {
        taskSpan.classList.toggle("task-done", this.checked);
        showToast(this.checked ? "Marked as complete" : "Marked as incomplete");
        saveTasksToLocalStorage();
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = function () {
        showDeletePopup(() => {
          li.remove();
          showToast("Task deleted successfully");
          saveTasksToLocalStorage();
        });
      };

      taskLeft.appendChild(checkbox);
      taskLeft.appendChild(taskSpan);
      li.appendChild(taskLeft);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);

      if (!arguments.length) {
        showToast("Your data saved successfully");
      }

      taskInput.value = "";
      saveTasksToLocalStorage();
    }

    function showDeletePopup(onConfirm) {
      const existingPopup = document.getElementById("custom-confirm");
      if (existingPopup) existingPopup.remove();

      const overlay = document.createElement("div");
      overlay.id = "custom-confirm";
      overlay.innerHTML = `
        <div class="popup-box">
          <p class="popup-message">Delete this task?</p>
          <div class="popup-buttons">
            <button class="popup-btn confirm">Yes, Delete</button>
            <button class="popup-btn cancel">Cancel</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.querySelector(".confirm").onclick = () => {
        onConfirm();
        overlay.remove();
      };
      overlay.querySelector(".cancel").onclick = () => {
        overlay.remove();
      };
    }
