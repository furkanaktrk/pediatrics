document.addEventListener("DOMContentLoaded", () => {

    const assistants = [
        "Asistan Dr. Ercan Ergün",
        "Asistan Dr. Erdem Ergin",
        "Asistan Dr. Enise Bacak"
    ];


    const assistantSelect = document.getElementById("assistant");
    assistants.forEach((assistant) => {
        const option = document.createElement("option");
        option.value = assistant;
        option.textContent = assistant;
        assistantSelect.appendChild(option);
    });


    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


    updateCalendarTable();
    generateVisualCalendar(new Date().getFullYear(), new Date().getMonth());


    document.getElementById("addTaskBtn").addEventListener("click", () => {
        const date = document.getElementById("date").value;
        const section = document.getElementById("section").value;
        const assistant = document.getElementById("assistant").value;

        if (date && section && assistant) {
            tasks.push({ date, section, assistant });
            localStorage.setItem("tasks", JSON.stringify(tasks)); // Veriyi localStorage'a kaydet
            updateCalendarTable();
            generateVisualCalendar(new Date().getFullYear(), new Date().getMonth());
        } else {
            alert("Lütfen tüm alanları doldurun!");
        }
    });


    function updateCalendarTable() {
        const calendarTable = document.querySelector("#calendarTable tbody");
        calendarTable.innerHTML = "";

        tasks.forEach((task, index) => {
            const formattedDate = `${task.date} (00:00-23:59)`;
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${task.section}</td>
                <td>${task.assistant}</td>
                <td><button class="delete-btn" data-index="${index}">Sil</button></td>
            `;

            calendarTable.appendChild(row);
        });

        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                deleteTask(index);
            });
        });
    }


    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Silinen veriyi kaydet
        updateCalendarTable();
        generateVisualCalendar(new Date().getFullYear(), new Date().getMonth());
    }


    function generateVisualCalendar(year, month) {
        const calendar = document.getElementById("calendar");
        calendar.innerHTML = ""; 

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");


            dayDiv.innerHTML = `<span>${day}</span>`;

            const dayTasks = tasks.filter(task => task.date === date);
            dayTasks.forEach(task => {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");
                taskDiv.textContent = `${task.section}: ${task.assistant}`;
                dayDiv.appendChild(taskDiv);
            });

            calendar.appendChild(dayDiv);
        }
    }
});
