document.addEventListener("DOMContentLoaded", () => {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    generateVisualCalendar(new Date().getFullYear(), new Date().getMonth(), tasks);

    
    function generateVisualCalendar(year, month, tasks) {
        const calendar = document.getElementById("calendar");
        calendar.innerHTML = ""; 

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("day");
            calendar.appendChild(emptyDiv);
        }

       
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
