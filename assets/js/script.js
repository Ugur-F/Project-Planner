//import { formatDistance, format, subDays, addDays } from 'node_modules/date-fns';

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
        let arrayTask = JSON.parse(localStorage.getItem('tasks')) || [];
        counter = arrayTask.length;
        return counter;
    }
}

function displayTask(newTask){
    // Create HTML for task; translate to js
}

let editingTask = null;
function submitNewTask() {
    let submitBtn = document.getElementById("submitBtn");
    let taskTitle = document.getElementById("name").value;
    let taskDesc = document.getElementById("desc").value;
    let taskState = document.getElementById("pending").selected; // <=== .selected to confirm
    let taskDueDate = document.getElementById("dueDate").value;
    let taskIsUrgent = document.getElementById("dueDate").value;

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        // if (editingTask) {
        //     let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
        //     let editedTask = tasksArray.find(task => task.id === parseInt(editingTask.id.split('_')[1]));

        //     if (editedTask) {
        //         editedTask.title = taskTitle;
        //         editedTask.description = taskDesc;
        //         editedTask.state = taskState;
        //         editedTask.dueDate = taskDueDate;
        //         /*add urgent checkbox*/

        //         localStorage.setItem('tasks', JSON.stringify(tasksArray));
        //     }

        //     editingTask = null;
        //     location.reload();
        // } else {
            let newTask = new Tasks(taskTitle, taskDesc, taskState, taskDueDate, isUrgent);
            console.log(newTask);
            //saveTaskLocally(newTask);
            // displayTask(newTask);
            
        }
    /*}*/)
}

function editTask(task) {
    let title = task.querySelector(/* to confirm */).textContent; // <=== class list-element-text correspond to ...
    document.getElementById("name").value = taskText; // <=== ... id input form
    let desc = task.querySelector(/* to confirm */).textContent;
    document.getElementById("desc").value = taskText;
    let state = task.querySelector(/* to confirm */).textContent;
    document.getElementById("pending").value = taskText;
    let dueDate = task.querySelector(/* to confirm */).textContent;
    document.getElementById("dueDate").value = taskText;
    let isUrgent = task.querySelector(/* to confirm */).textContent;
    document.getElementById("isUrgent").checked = taskText;

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

// function DistanceDueDate() {
//     let dueDateInput = document.getElementById("dueDate");
//     let dueDateValue = dueDateInput.value;
//     let dueDate = new Date(dueDateValue);
//     let formattedDueDate = format(dueDate, "MM/dd/yyyy");
//     let timeDifference = formatDistance(new Date(), dueDate, { addSuffix: true });
//     console.log("Due Date:", formattedDueDate);
//     console.log("Time Difference:", timeDifference);
// }

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