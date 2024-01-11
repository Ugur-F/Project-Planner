import { add, parse, differenceInDays } from 'https://cdn.jsdelivr.net/npm/date-fns@2.24.0/esm/index.js';
let newTaskBtn = document.getElementById('newTaskBtn');
let divTaskForm = document.querySelector('header');

function formulaire() {
    var htmlContent = `
    <div class="overlay"></div>
            <form id="taskForm">
                <div>
                    <button id="fCloseBtn">X</button>
                </div>
                <div>
                    <input name="name" type="text" id="name" placeholder="Name" minlength="3" maxlength="256" required>
                </div>

                <div>
                    <textarea name="description" type="text" id="desc" placeholder="Description" minlength="5"
                    maxlength="1024"></textarea>
                </div>

                <div>
                    <label for="pending"></label>
                    <select name="pending" id="pending" class="pending">
                        <option value="none">-- Choose an option --</option>
                        <option value="To do" selected>To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div>
                    <input name="date" type="date" id="dueDate">
                </div>

                <div class="isUrgentForm">
                    <label for="urgentCheckbox">Urgent :</label>
                    <input type="checkbox" id="isUrgent" name="urgentCheckbox">
                </div>

                <div>
                    <button id="btnSubmit" type="submit">+</button>
                </div>
            </form>
       
    `;

    divTaskForm.innerHTML = htmlContent;
    submitNewTask();
    closeFormulaire();
    return htmlContent;
}
newTaskBtn.addEventListener('click', formulaire);

function closeFormulaire() {
    var fCloseBtn = document.getElementById('fCloseBtn');
    if (fCloseBtn) {
        fCloseBtn.addEventListener('click', function () {
            divTaskForm.innerHTML = '<h1>My Planner</h1>'; // Effacer le contenu du conteneur (on replace juste le titre)
        });
    }
}


// Mon fichier d'origine
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
    let cardIcon = document.createElement('div');
    cardIcon.classList.add('card__icon');

    let urgentIcon = document.createElement("i")
    urgentIcon.classList.add("fa-solid", "fa-triangle-exclamation")
    urgentIcon.style.color = "#ffffff";
    if (newTask.isUrgent === true) {
        cardIcon.appendChild(urgentIcon)
    } else {
        cardIcon.remove(urgentIcon)
    }

    let editButton = document.createElement('button');
    editButton.classList.add('btnEdit');
    let editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-highlighter');
    editButton.appendChild(editIcon);

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('btnDelete');
    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-regular', 'fa-trash-can');
    deleteButton.appendChild(deleteIcon);

    cardIcon.appendChild(editButton);
    cardIcon.appendChild(deleteButton);

    let cardName = document.createElement('p');
    cardName.classList.add('card__name');
    cardName.appendChild(document.createTextNode(newTask.title));

    let cardDesc = document.createElement('p');
    cardDesc.classList.add('card__desc');
    cardDesc.appendChild(document.createTextNode(newTask.description));

    let cardTimeBox = document.createElement('p');
    cardTimeBox.classList.add('card__timeBox');
    cardTimeBox.appendChild(document.createTextNode(newTask.dueDate));
    // cardTimeBox.appendChild(document.createTextNode(DistanceDueDate(newTask)));

    let cardPending = document.createElement('p');
    cardPending.classList.add('card__pending');
    cardPending.appendChild(document.createTextNode(newTask.state));

    // Append elements

    task.appendChild(cardIcon);
    task.appendChild(cardName);
    task.appendChild(cardDesc);
    task.appendChild(cardTimeBox);
    task.appendChild(cardPending);

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
}

let editingTask = null;
function submitNewTask() {
    let form = document.getElementById("taskForm");
    let submitBtn = form.querySelector("#btnSubmit");

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

            //editingTask = null;
            location.reload();
        } else {
            let newTask = new Tasks(taskTitle, taskDesc, taskState, taskDueDate, taskIsUrgent);
            saveTaskLocally(newTask);
            displayTask(newTask);
        }
        closeFormulaire();
    })
}


function editTask(task) {
    formulaire();
    let form = document.getElementById("taskForm");
    let title = task.querySelector('.card__name').textContent;
    form.querySelector("#name").value = title;

    let desc = task.querySelector('.card__desc').textContent;
    form.querySelector("#desc").value = desc;

    console.log("task id = " + task.id);
    let state = task.querySelector(".card__pending").textContent;
    form.querySelector("#pending").value = state;

    let dueDate = task.querySelector('.card__timeBox').textContent;
    // let dueDate = Tasks.task.dueDate
    console.log(dueDate);
    form.querySelector("#dueDate").value = dueDate;

    let isUrgentElement = task.querySelector('.fa-triangle-exclamation');
    let isUrgent = isUrgentElement ? true : false;
    form.querySelector("#isUrgent").checked = isUrgent;

    let btn = form.querySelector('#btnSubmit');
    btn.textContent = "Edit task";

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

// function DistanceDueDate(task) {
//     let dueDateStr = task.dueDate;
//     let today = new Date();
    
//     let dueDate = parse(dueDateStr, "yyyy-MM-dd", new Date());
//     let daysDifference = differenceInDays(dueDate, today);
//     return(daysDifference)
// }

// function DueDateFromDistance(distanceDueDate) {
//     let distanceArray = distanceDueDate.split(' '); 
//     let distanceValue = parseInt(distanceArray[0]);

//     // Obtenir la date actuelle et soustraire le nombre d'heures spécifié
//     let now = new Date();
//     let dueDate = add(now, { days: +distanceValue });

//     return dueDate;
// }


function setupEditBtn() {
    let editTaskButtons = document.querySelectorAll('.btnEdit');
    editTaskButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            formulaire();
            console.log("Setting up Edit button");
            let taskId = btn.parentNode.parentNode.id.split('_')[1];
            let taskElement = document.getElementById('task_' + taskId);
            editTask(taskElement);
        });
    });
}


function setupDeleteBtn() {
    console.log("Setting up delete fct");
    let deleteTasksBtn = document.querySelectorAll('.btnDelete');
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