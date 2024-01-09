import * as dateFns from 'https://cdn.jsdelivr.net/npm/date-fns@2.24.0/esm/index.js';

class Tasks {
    constructor(title, description, state, dueDate, isUrgent) {
        this.id = this.getTheID();
        this.creationDate = new Date();
        this.title = title;
        this.description = description;
        this.state = state;
        this.dueDate = dueDate;
        this.isUrgent = isUrgent;
    }

    getTheID() {
        let counter;
        let arrayTask = JSON.parse(localStorage.getItem('Tasks')) || [];
        counter = arrayTask.length;
        return counter;
    }
}

function displayTask(newTask) {
    let ulTask = document.querySelector(".tasksDoing");

    let task = document.createElement('li');
    task.classList.add('card');

    task.innerHTML = `
        <div class="card__icon">
            <i class="fa-solid fa-triangle-exclamation" style="color: #ffffff;"></i>
            <button id="btnEdit"><i class="fa-solid fa-highlighter"></i></button>
            <button id="btnDelete"><i class="fa-regular fa-trash-can"></i></button>
        </div>
        <p class="card__name">${newTask.title}</p>
        <p class="card__desc">${newTask.description}</p>
        <p class="card__timeBox">${newTask.dueDate}</p> 
        <p class="card__timeBox">${newTask.state}</p>
    `;

    ulTask.appendChild(task);
    return task;
}

let editingTask = null;
function submitNewTask() {
    let submitBtn = document.getElementById("btnSubmit");

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        let taskTitle = document.getElementById("name").value;
        let taskDesc = document.getElementById("desc").value;
        let taskState = document.getElementById("pending").value; 
        let taskDueDate = document.getElementById("dueDate").value;
        let taskIsUrgent = document.getElementById("isUrgent").checked;
        console.log("Je suis une variable: " + taskTitle + taskDesc + taskDueDate);
        if (editingTask) {
            let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
            let editedTask = tasksArray.find(task => task.id === parseInt(editingTask.id.split('_')[1]));

            if (editedTask) {
                editedTask.title = taskTitle;
                editedTask.description = taskDesc;
                editedTask.state = taskState;
                editedTask.dueDate = taskDueDate;
                editedTask.isUrgent = taskIsUrgent;

                localStorage.setItem('tasks', JSON.stringify(tasksArray));
            }

            editingTask = null;
            location.reload();
        } else {
            let newTask = new Tasks(taskTitle, taskDesc, taskState, taskDueDate, taskIsUrgent);
            saveTaskLocally(newTask);
            displayTask(newTask);
            
        }
    })
}
submitNewTask()

function editTask(task) {
    let title = task.querySelector(/* to confirm */).textContent; // <=== class list-element-text correspond to ...
    document.getElementById("name").value = title; // <=== ... id input form
    let desc = task.querySelector(/* to confirm */).textContent;
    document.getElementById("desc").value = desc;
    let state = task.querySelector(/* to confirm */).textContent;
    document.getElementById("pending").value = state;
    let dueDate = task.querySelector(/* to confirm */).textContent;
    document.getElementById("dueDate").value = dueDate;
    let isUrgent = task.querySelector(/* to confirm */).textContent;
    document.getElementById("isUrgent").checked = isUrgent;

    let btn = document.getElementById('submitBtn');
    btn.setAttribute("value", "Edit task");
    
    editingTask = task;
}


function saveTaskLocally(task) {
    let tasksArray = JSON.parse(localStorage.getItem('Tasks')) || [];
    tasksArray.push(task);
    localStorage.setItem('Tasks', JSON.stringify(tasksArray));
}

function loadTasksLocally() {
    let tasksArray = JSON.parse(localStorage.getItem('Tasks')) || [];
    tasksArray.forEach(task => {
        displayTask(task);
    });
}
loadTasksLocally();

function deleteTask(taskId) {
    let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksArray = tasksArray.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    let taskElement = document.getElementById('task_' + taskId);
    if (taskElement) {
        taskElement.remove();
    }
}

function DistanceDueDate() {
    let dueDateInput = document.getElementById("dueDate");
    let dueDateValue = dueDateInput.value;
    let dueDate = new Date(dueDateValue);
    let formattedDueDate = format(dueDate, "MM/dd/yyyy");
    let timeDifference = formatDistance(new Date(), dueDate, { addSuffix: true });
    console.log("Due Date:", formattedDueDate);
    console.log("Time Difference:", timeDifference);
    return(timeDifference)
}

function setupStateBtn() {
    /*
    * get de otpion element on card task
    * listen de change
    * on change
    * stwitch state, class, display, ...
    */
}

function setupEditBtn() {
    let editTaskButtons = document.querySelectorAll('.listContainer-listToDo-task-editBtn');
    editTaskButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            let taskId = btn.parentNode.id.split('_')[1];
            let taskElement = document.getElementById('task_' + taskId);
            editTask(taskElement);
        });
    });
}

function setupDeleteBtn() {

}