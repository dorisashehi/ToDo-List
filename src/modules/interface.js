import {Project, Task, manageProject} from './app.js';

const Interface = (() => {


    const menuModule = (() => {


        const getMenuItem = (subMenu) => {

            return(
                `
                    <li class="w-100 submenu-item nav-item">
                        <a href="#" class="nav-link px-3"> <span class="d-none d-sm-inline">${subMenu.name}</span></a>
                    </li>
                `
            )
        }

        const loadSubMenu = (menuName) => { //function to load submenu

            let subMenuCon = '';
            if(localStorage.length !== 0){
                subMenuCon = JSON.parse(localStorage[menuName.trim()]).map(subMenu => getMenuItem(subMenu)).join('');
            }

            document.querySelector("ul.submenu."+menuName).innerHTML = subMenuCon;

        }

        return {loadSubMenu}

    })();


    const projectModule = (() => {



            const createProjectDialog = () => {

                const projectDialog = document.getElementById("project-dialog");

                const dialogForm = document.createElement('form');
                dialogForm.setAttribute("method", "POST");

                dialogForm.innerHTML =
                `
                    <h4 class="dialog-header">Add Project</h4>
                    <div class="form-fields">
                        <div class="form-group mb-0">
                            <label for="form-project-name">Project Name</label>
                            <input type="text" class="form-control" id="form-project-name" name="form-project-name" placeholder="Project name" required />
                        </div>
                    </div>
                    <div class="form-fields">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="favorites-box" name="favorites-box">
                            <label class="form-check-label" for="favorites-boxh">Add to favorites</label>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between form-buttons">
                        <div class="buttons-group">
                            <input type="submit" id="submit" value="Add" class="btn btn-primary" formnovalidate />
                            <input type="submit" class="btn btn-primary" id="js-close" value="Cancel" />
                        </div>

                    </div>

                `;

                projectDialog.appendChild(dialogForm);

                handleFormSubmit(dialogForm);


            }



            //Open Dialog box
            const openDialog = (dialogID) => {
                const dialog = document.getElementById(dialogID);
                dialog.showModal();

            }

            const closeDialog = (closeBtnID) => {
                const closeDialog = document.getElementById(closeBtnID);
                closeDialog.close();

            }


            const addToFavorite = () => { //add or remove from favorite

                const favCheckbox  = document.getElementById("favorites-box");
                let favoritedProject = false;
                document.getElementById("favorites-box").addEventListener("click", () => {
                    favoritedProject = !favoritedProject;
                    favCheckbox.value = favoritedProject;
                });

            }

            const resetForm = (form) => {
                form.reset();//clear form inputs
                closeDialog("project-dialog");
            }


            const handleFormSubmit = (form) => {//after form is submited
                form.addEventListener("submit", function (event) {
                    event.preventDefault(); // Prevent the default form submission behavior

                    // Get the values from form elements
                    let projectName = form.elements["form-project-name"].value;
                    let favoriteValue = form.elements["favorites-box"].value;

                    manageProject.createProject(projectName, favoriteValue);

                    resetForm(form);
                    menuModule.loadSubMenu("projects");

                })
            }



        return{
            createProjectDialog,
            addToFavorite,
            openDialog,
            closeDialog

        }
    })();



    const showTasks = () => {
        const taskList = document.querySelector(".task-list");

        const taskListContainer = document.createElement("div");
        taskListContainer.classList.add("task", "mb-3");
        taskListContainer.innerHTML =
        `
            <div class="task mb-3">
                <div class="row task-item">
                    <div class="col-1 complete-btn d-flex justify-content-center pt-1">
                        <input type="checkbox" class="completed" id="completed-task-1" name="completed" value="1">
                        <label for="completed-task-1"></label>
                    </div>
                    <div class="col task-content">
                        <div class="row task-name mb-2">
                            Task name
                        </div>
                        <div class="row task-description">
                            Description
                        </div>
                        <div class="row task-date">
                            22 May
                        </div>
                    </div>
                </div>
            </div>
        `;
        taskList.appendChild(taskListContainer);

    }


    const editTask = () => {
        const editDialog = document.getElementById("edit-dialog");

        const editDialogForm = document.createElement('form');
        editDialogForm.setAttribute("method", "POST");
        editDialogForm.innerHTML =
        `

            <h4 class="dialog-header">Update Task</h4>
            <div class="form-fields d-flex">

                <div class="form-group mb-0 col">
                    <input type="text" class="form-control" id="form-task-name" name="form-task-name" value="Task name" placeholder="Task name" required>
                    <textarea class="form-control" rows="5"  id="form-task-description" name="form-task-description"  rows="5" maxlength="100" placeholder="Description" required> Description here.......</textarea>
                </div>

                <div class="form-group mb-0 d-flex flex-row col-5 d-flex flex-column align-items-start">
                    <h6>
                        Project
                    </h6>
                    <select class="projects-options">
                        <option class="project-name d-flex flex-row"><i class="fas fa-inbox"></i><span>Inbox</span></option>
                        <option class="project-name d-flex flex-row"><i class="fas fa-inbox"></i><span>Inbox1</span></option>
                        <option class="project-name d-flex flex-row"><i class="fas fa-inbox"></i><span>Inbox2</span></option>
                    </select>

                    <h6 class="mt-2">Due Date</h6>
                    <input type="date" class="form-control" id="form-task-date" name="form-task-date">

                    <h6 class="mt-2">Priority</h6>
                    <select id="priority-selection">
                        <option class="priority-item">Priority</option>
                        <option class="priority-item">Priority 1</option>
                        <option class="priority-item">Priority 2</option>
                    </select>
                </div>
            </div>

            <div class="col">
                <div class="row comment-btn">
                    <i class="fas fa-plus-circle" id="comment-plus"></i>
                    <label for="comment-plus">Add Comment</label>
                </div>

                <div class="row comment-editor" style="width: 500px;height: 150px;">
                    <div id="editor"></div>

                </div>

            </div>
            <div class="d-flex justify-content-between form-buttons">
                <div class="buttons-group">
                    <input type="submit" id="submit" value="Update" class="btn btn-primary" formnovalidate />
                    <input type="submit" class="btn btn-primary" id="js-close" value="Cancel" />
                </div>

            </div>

        `;
        editDialog.appendChild(editDialogForm);

    }

    const showEmptyContent = () => {
        const emptyContent = document.createElement("div");

        emptyContent.innerHTML = `
            <img src="https://todoist.b-cdn.net/assets/images/9b83bf5d1895df53ed06506fd3cd381c.png" />
            <p><b>What do you need to get done today?</b></p>
            <p>By default, tasks added here will be due today. Click + to add a task.</p>
        `;
        document.querySelector(".empty-content").appendChild(emptyContent);
    }

    const createTask = () => {

        const dialog = document.getElementById("dialog");

        const dialogForm = document.createElement('form');
        dialogForm.setAttribute("method", "POST");
        dialogForm.innerHTML =
        `
            <h4 class="dialog-header">New Task</h4>
            <div class="form-fields">
                <div class="form-group mb-0">
                    <input type="text" class="form-control" id="form-task-name" name="form-task-name" placeholder="Task name" required />
                </div>
                <div class="form-group mb-0">
                    <textarea class="form-control" rows="3"  id="form-task-description" name="form-task-description"  rows="5" maxlength="100" placeholder="Description" required></textarea>

                </div>

                <div class="form-group mb-0 d-flex flex-row gap-3" >
                    <input type="date" class="form-control" id="form-task-date" name="form-task-date">
                    <select id="priority-selection">
                        <option class="priority-item">Priority</option>
                        <option class="priority-item">Priority 1</option>
                        <option class="priority-item">Priority 2</option>
                    </select>
                </div>
            </div>

            <div class="d-flex justify-content-between form-buttons">
                <select class="projects-options">
                    <option class="project-name d-flex flex-row"><i class="fas fa-inbox"></i><span>Inbox</span></option>
                    <option class="project-name d-flex flex-row"><i class="fas fa-inbox"></i><span>Inbox1</span></option>
                    <option class="project-name d-flex flex-row"><i class="fas fa-inbox"></i><span>Inbox2</span></option>
                </select>
                <div class="buttons-group">
                    <input type="submit" id="submit" value="Add" class="btn btn-primary" formnovalidate />
                    <input type="submit" class="btn btn-primary" id="js-close" value="Cancel" />
                </div>

            </div>

        `;
        dialog.appendChild(dialogForm);


    }



    return {
        projectModule,
        showTasks,
        editTask,
        showEmptyContent,
        createTask,
        menuModule
    }


})()

export {Interface}