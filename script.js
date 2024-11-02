let input = document.getElementById("input-task");
let add = document.getElementById("add-task");
let taskList = document.getElementById("tasks-list");

input.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        add.click();
    }
});

// Add task to task list when add task button is clicked
add.addEventListener('click', () => {
    let inputText = input.value.trim();
    if (inputText === "") {
        alert("Please Enter a Task");
    } else {
        addTaskToList(inputText, false); // New tasks are not completed by default
        saveTasks();
    }
    input.value = "";
});

 addTaskToList=(inputText, isCompleted = false)=> {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = inputText;
    if (isCompleted) {
        span.classList.add("completed");
    }

    // Toggle completed class when clicked
    span.addEventListener('click', () => {
        span.classList.toggle("completed");
        saveTasks();
    });

    // Delete button
    let deleteButton = document.createElement("img");
    deleteButton.src = "images/delete.svg";
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    // Edit button
    let editButton = document.createElement("img");
    editButton.src = "images/editbutton.svg";
    editButton.addEventListener('click', () => {
        let div = document.createElement("div");
        div.classList = "editbox";
        let textarea = document.createElement("input");
        textarea.value = span.textContent;

        textarea.addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                updateButton.click();
            }
        });

        let updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.id = "update-task";
        updateButton.addEventListener('click', () => {
            span.textContent = textarea.value;
            div.remove();
            saveTasks();
        });

        div.appendChild(textarea);
        div.appendChild(updateButton);
        li.appendChild(div);
    });

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Save tasks to local storage with completion status
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#tasks-list li").forEach((task) => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage with completion status
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToList(task.text, task.completed));
}

// Initial load
loadTasks();
