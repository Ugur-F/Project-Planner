import { format, addDays } from 'date-fns';

class Tasks {
    constructor(title, state, dueDate) {
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
        let arrayTask = localStorage.tasks;
        if (localStorage.getItem('tasks') !== null) {
            counter = parseInt(arrayTask.length);
        } else {
            counter = 0;
        }
        return counter;
    }
}

function displayTask(newTask){
    // Create HTML for task; translate to js
}

function submitNewTask() {
    let submitBtn = document.getElementById("submitBtn");
    let taskTitle = document.getElementById("name").value;
    let taskDesc = document.getElementById("desc").value;
    let taskState = document.getElementById("pending").value; // <=== .value to confirm
    let taskDueDate = document.getElementById("date").value;

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (editingTask) {
            let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
            let editedTask = tasksArray.find(task => task.id === parseInt(editingTask.id.split('_')[1]));

            if (editedTask) {
                editedTask.title = taskTitle;
                editedTask.description = taskDesc;
                editedTask.state = taskState;
                editedTask.dueDate = taskDueDate;
                /*add urgent checkbox*/

                localStorage.setItem('tasks', JSON.stringify(tasksArray));
            }

            editingTask = null;
            location.reload();
        } else {
            let newTask = new Tasks(taskTitle, taskDesc, taskState, taskDueDate, /* isUrgent*/); // <=== add input type checkbox
            saveTaskLocally(newTask);
            displayTask(newTask);
        }
    })
}

let editingTask = null;
function editTask(task) {
    let taskText = task.querySelector(/* to confirm */).textContent; // <=== class list-element-text correspond to ...
    document.getElementById(/* to confirm */).value = taskText; // <=== ... id input form
    /*add all champ form */

    let btn = document.getElementById('submitBtn');
    btn.setAttribute("value", "Edit task");
    
    editingTask = task;
}


function saveTaskLocally(task) {
    let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function loadTasksLocally() {
    let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
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


function setupStateBtn() {
    /*
    * get de otpion element
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