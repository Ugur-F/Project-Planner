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
    let ulDoing = document.querySelector(".tasksDoing");
    let ulToDo = document.querySelector(".tasksToDo");
    let ulDone = document.querySelector(".tasksDone");

    let task = document.createElement('li');
    task.id = 'task_' + newTask.id
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
        <p class="card__pending">${newTask.state}</p> 
    `;
    switch (newTask.state) {
        case "To Do":
            ulToDo.appendChild(task)
            break;
        case "Doing":
            ulDoing.appendChild(task)
            break; 
        case "Done":
            ulDone.appendChild(task)
            break;   
        default:
            ulToDo.appendChild(task)
            break;
    }
    // ulTask.appendChild(newTask.state);
    // let btnEdit = task.querySelector('#btnEdit');
    // let btnDelete = task.querySelector('#btnDelete');
    // if (btnEdit && btnDelete) {
    //     console.log("Boutons correctement définis dans la carte.");
    // } else {
    //     console.log("Erreur: Boutons non définis correctement dans la carte.");
    // }   
    // return task;
}

let editingTask = null;
function submitNewTask() {
    let submitBtn = document.getElementById("btnSubmit");

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        let taskTitle = document.getElementById("name").value;
        let taskDesc = document.getElementById("desc").value;
        let taskState = document.getElementById("pending").value;
        let taskDueDate = document.getElementById("dueDate").value; // Utilisez la valeur de la boîte de texte

        let taskIsUrgent = document.getElementById("isUrgent").checked;
        console.log("Je suis une variable: " + taskTitle + taskDesc + taskDueDate);

        if (editingTask) {
            let tasksArray = JSON.parse(localStorage.getItem('Tasks')) || [];
            let editedTask = tasksArray.find(task => task.id === parseInt(editingTask.id.split('_')[1]));

            if (editedTask) {
                editedTask.title = taskTitle;
                editedTask.description = taskDesc;
                editedTask.state = taskState;
                editedTask.dueDate = taskDueDate; // Utilisez la valeur de la boîte de texte
                editedTask.isUrgent = taskIsUrgent;

                localStorage.setItem('Tasks', JSON.stringify(tasksArray));
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
    let title = task.querySelector('.card__name').textContent;
    document.getElementById("name").value = title;

    let desc = task.querySelector('.card__desc').textContent;
    document.getElementById("desc").value = desc;

    console.log("task id = " + task.id);
    let state = task.querySelector(`#pending_${task.id.split('_')[1]}`).textContent;

    let selects = document.getElementById("pending");

    for(let select of selects){

        if(select.textContent === state){
            console.log(select);
            select.selected = true
        }
        
    }
    document.getElementById("pending").value = state;

    let dueDate = task.querySelector('.card__timeBox').textContent;
    console.log(dueDate);
    document.getElementById("dueDate").value = dueDate;

    let isUrgentElement = task.querySelector('.fa-triangle-exclamation');
    let isUrgent = isUrgentElement ? true : false;
    document.getElementById("isUrgent").checked = isUrgent;

    let btn = document.getElementById('btnSubmit');
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


function deleteTask(taskId) {
    let tasksArray = JSON.parse(localStorage.getItem('Tasks')) || [];
    tasksArray = tasksArray.filter(task => task.id !== taskId);
    localStorage.setItem('Tasks', JSON.stringify(tasksArray));

    let taskElement = document.getElementById('task_' + taskId);
    if (taskElement) {
        taskElement.remove();
    }
}

// function DistanceDueDate() {
//     let dueDateInput = document.getElementById("dueDate");
//     let dueDateValue = dueDateInput.value;
//     let dueDate = new Date(dueDateValue);
//     let formattedDueDate = format(dueDate, "MM/dd/yyyy");
//     let timeDifference = formatDistance(new Date(), dueDate, { addSuffix: true });
//     console.log("Due Date:", formattedDueDate);
//     console.log("Time Difference:", timeDifference);
//     return (timeDifference)
// }


function setupEditBtn() {
    let editTaskButtons = document.querySelectorAll('#btnEdit');
    editTaskButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Setting up Edit button");
            let taskId = btn.parentNode.parentNode.id.split('_')[1];
            let taskElement = document.getElementById('task_' + taskId);
            editTask(taskElement);
        });
    });
}


function setupDeleteBtn() {
    console.log("Setting up delete fct");
    let deleteTasksBtn = document.querySelectorAll('#btnDelete');
    deleteTasksBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Setting up delete btn");
            // Trouver l'élément de la tâche
            let taskElement = btn.closest('.card');
            if (taskElement) {
                // Extraire l'ID de la tâche
                let taskId = taskElement.id.split('_')[1];
                console.log(taskId);
                // Appeler la fonction de suppression
                deleteTask(taskId);
            }
        });
    });
}
loadTasksLocally();
setupEditBtn();
setupDeleteBtn();