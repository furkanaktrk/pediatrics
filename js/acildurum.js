
let acilDurumTasks = JSON.parse(localStorage.getItem("acilDurumTasks")) || [];

document.addEventListener("DOMContentLoaded", updateAcilDurumList);

function addTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    if (title && description) {
        
        acilDurumTasks.push({ title, description });
        saveTasks();  // Listeyi güncelle
        document.getElementById("taskForm").reset(); 
    } else {
        alert("Lütfen tüm alanları doldurun!");
    }
}

function updateAcilDurumList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; 

    acilDurumTasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";

        taskDiv.innerHTML = `
            <i class="fas fa-exclamation-circle task-icon"></i>
            <div class="task-content">
              <h4>${task.title}</h4>
              <p>${task.description}</p>
            </div>
            <div class="task-actions">
              <button class="edit-btn" onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
              <button class="delete-btn" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;

        taskList.appendChild(taskDiv);
    });
}

function saveTasks() {
    localStorage.setItem("acilDurumTasks", JSON.stringify(acilDurumTasks));
}

function editTask(index) {
    const newTitle = prompt("Yeni başlığı girin:", acilDurumTasks[index].title);
    const newDescription = prompt("Yeni açıklamayı girin:", acilDurumTasks[index].description);

    if (newTitle && newDescription) {
        acilDurumTasks[index] = { title: newTitle, description: newDescription };
        saveTasks(); 
        updateAcilDurumList();
    }
}

function deleteTask(index) {
    acilDurumTasks.splice(index, 1);
    saveTasks(); 
    updateAcilDurumList();
}
