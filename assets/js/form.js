
//================================================\\
//== Script permettant au formulaire de s'afficher==\\
//====================================================\\


// Sélectionner le bouton
var newTaskBtn = document.getElementById('newTaskBtn');
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

// Attacher le gestionnaire d'événements de clic au bouton
newTaskBtn.addEventListener('click', formulaire);

// fermer le formulaire
function closeFormulaire() {
    var fCloseBtn = document.getElementById('fCloseBtn');
    if (fCloseBtn) {
        fCloseBtn.addEventListener('click', function () {
            divTaskForm.innerHTML = '<h1>My Planner</h1>'; // Effacer le contenu du conteneur (on replace juste le titre)
        });
    }
}

