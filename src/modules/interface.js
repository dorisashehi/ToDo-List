import {Project, Task, manageProject, manageTask} from './app.js';
import {profile} from '../assets/images/profile.jpg';

const Interface = (() => {


    const menuModule = (() => {


        //document.querySelector(".profile-img").src = profile;


        const getMenuItem = (subMenu) => {

            return(
                `
                    <li class="w-100 submenu-item nav-item">
                        <a href="#" class="nav-link px-3"> <span class="d-none d-sm-inline">${subMenu.name}</span></a>
                    </li>
                `
            )
        }

        const filterProjects = () => { //filter only favorites submenu
            return JSON.parse(localStorage["projects"])
                    .filter(item => { return item.favorited === "false"})
                    .map(subMenu => getMenuItem(subMenu)).join('');
        }

        const filterFavorites = () => {// filter only projects submenu
            return   JSON.parse(localStorage["projects"])
                        .filter(item => { return item.favorited === "true"})
                        .map(subMenu => getMenuItem(subMenu)).join('');
        }



        const refreshSubMenu = (menuName) => { //function to load submenu

            let subMenuCon = '';
            if(localStorage.length !== 0){

                if(menuName == "favorites") subMenuCon = filterFavorites();
                if(menuName == "projects") subMenuCon = filterProjects();

            }

            document.querySelector("ul.submenu."+menuName).innerHTML = subMenuCon;
        }

        return {refreshSubMenu}

    })();


    //reset form fields
    const resetForm = (form) => {
        form.reset();//clear form inputs
    }

    const projectModule = (() => {



            //create project dialog
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
                            <input class="form-check-input" type="checkbox" id="favorites-box" value="false" name="favorites-box">
                            <label class="form-check-label" for="favorites-boxh">Add to favorites</label>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between form-buttons">
                        <div class="buttons-group">
                            <input type="submit" id="submit" value="Add" class="btn btn-primary" disabled formnovalidate />
                            <input type="submit" class="btn btn-primary" id="js-close" value="Cancel" />
                        </div>

                    </div>

                `;

                projectDialog.appendChild(dialogForm);

                //call below functions
                enableSubmitBtn();
                handleFormSubmit(dialogForm);


            }

            //enable submit button based on input
            const enableSubmitBtn = () => {
                let timer;

                document.getElementById("form-project-name").addEventListener("input", (el) => {

                    clearTimeout(timer);
                    const submitBtn = document.querySelector("#submit");

                    timer = setTimeout(() => {
                        if(el.target.value !== "") {
                            submitBtn.removeAttribute("disabled");
                            return;

                        }
                        submitBtn.setAttribute("disabled","");
                    },500)
                })

            }

            //Open Dialog box
            const openDialog = (dialogID) => {
                const dialog = document.getElementById(dialogID);
                dialog.showModal();

            }

            //close Dialog box
            const closeDialog = (closeBtnID) => {
                const closeDialog = document.getElementById(closeBtnID);
                closeDialog.close();

            }

            //to as favorite project
            const addToFavorite = () => { //add or remove from favorite

                const favCheckbox  = document.getElementById("favorites-box");
                let favoritedProject = false;
                document.getElementById("favorites-box").addEventListener("click", () => {
                    favoritedProject = !favoritedProject;
                    favCheckbox.value = favoritedProject;
                });
            }

            //submit button action
            const handleFormSubmit = (form) => {//after form is submited
                form.addEventListener("submit", function (event) {
                    event.preventDefault(); // Prevent the default form submission behavior

                    // Get the values from form elements
                    let projectName = form.elements["form-project-name"].value;
                    let favoriteValue = form.elements["favorites-box"].value;


                    manageProject.createProject(projectName, favoriteValue);

                    resetForm(form);
                    closeDialog("project-dialog");
                    menuModule.refreshSubMenu("projects");
                    menuModule.refreshSubMenu("favorites");

                })
            }

        return{
            createProjectDialog,
            addToFavorite,
            openDialog,
            closeDialog

        }

    })();


    const tasksModule = (() =>{

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
            const defaultProID = '17845a4b-1fc0-42e2-9084-744fa24f32e5';

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
                            <option class="priority-item">Priority 1</option>
                            <option class="priority-item">Priority 2</option>
                            <option class="priority-item">Priority 3</option>
                        </select>
                    </div>
                </div>

                <div class="d-flex justify-content-between form-buttons">
                    <select class="projects-options" name="project-name" id="task-pro-selection">
                        <option class="project-name d-flex flex-row" value = "${defaultProID}"><span>Inbox</span></option>
                    </select>
                    <div class="buttons-group">
                        <input type="submit" id="submit" value="Add" class="btn btn-primary" formnovalidate />
                        <input type="submit" class="btn btn-primary" id="js-close" value="Cancel" />
                    </div>

                </div>

            `;
            dialog.appendChild(dialogForm);

            projectLists();
            handleFormSubmit(dialogForm);


        }

        //set options to project select field of form
        const projectLists = () => {
            JSON.parse(manageTask.getProjects("projects")).forEach(item => {
                const option = document.createElement("option");
                option.classList.add("project-name", "d-flex","flex-row");
                option.value =item.id;

                const optionSpan = document.createElement("span");
                optionSpan.textContent = item.name;

                option.appendChild(optionSpan);
                document.getElementById("task-pro-selection").appendChild(option);
            })
        }

        //handle form submit
        const handleFormSubmit = (form) => {
            form.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent the default form submission behavior



                // Get the values from form elements
                let taskName = form.elements["form-task-name"].value;
                let taskDescription = form.elements["form-task-description"].value;
                let taskDate = form.elements["form-task-date"].value;
                let taskPriority = form.elements["priority-selection"].value;
                let taskProID = form.elements["project-name"].value;

                manageTask.createTask(taskName, taskDescription, taskProID, taskDate, taskPriority);

                resetForm(form);
                // menuModule.refreshSubMenu("projects");
                // menuModule.refreshSubMenu("favorites");

            })


        }

        return { showTasks, editTask, createTask, showEmptyContent }
    })();



    return {
        projectModule,
        tasksModule,
        menuModule
    }


})()

export {Interface}