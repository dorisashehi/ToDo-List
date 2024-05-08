import {Project, Task, manageProject, manageTask} from './app.js';
import {profile} from '../assets/images/profile.jpg';

const Interface = (() => {


    const menuModule = (() => {


        const getMenuItem = (subMenu) => {

            return(
                `
                    <li class="w-100 submenu-item nav-item" data-project= "${subMenu.id}">
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
            return  JSON.parse(localStorage["projects"])
                        .filter(item => { return item.favorited === "true"})
                        .map(subMenu => getMenuItem(subMenu)).join('');
        }



        const refreshSubMenu = (menuName) => { //function to load submenu

            let subMenuCon = '';

            if(localStorage.length !== 0){

                if(menuName == "favorites" && localStorage["projects"]) subMenuCon = filterFavorites();
                if(menuName == "projects" &&  localStorage["projects"]) subMenuCon = filterProjects();

            }

            document.querySelector("ul.submenu."+menuName).innerHTML = subMenuCon;
        }

        return {refreshSubMenu}

    })();


    //reset form fields
    const resetForm = (form) => {
        form.reset();//clear form inputs
    }

    //Open Dialog box
    const openDialog = (dialogID) => {
        console.log("hello");
        const dialog = document.getElementById(dialogID);
        dialog.showModal();

    }

    //close Dialog box
    const closeDialog = (closeBtnID) => {
        const closeDialog = document.getElementById(closeBtnID);
        closeDialog.close();

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
                            <input type="text" class="form-control form-project-name" id="form-project-name" name="form-project-name" placeholder="Project name" required />
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
                            <input type="submit" class="btn btn-primary" id="close-add-pro" value="Cancel" />
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
                    menuModule.refreshSubMenu("projects"); //show project to projects submenu
                    menuModule.refreshSubMenu("favorites");//show thta project at favorites submenu
                    tasksModule.projectLists(); //add new project to task project select

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

        const getTaskItem = (task) => {

            let {id, name, descr, due_date} = task;
            return(
            `
                <div class="task mb-3">
                    <div class="row task-item">
                        <div class="col-1 complete-btn d-flex justify-content-center pt-1">
                            <input type="checkbox" class="completed" id="completed-task-1" name="completed" value="1">
                            <label for="completed-task-1"></label>
                        </div>
                        <div class="col task-content" data-task="${id}">
                            <div class="row task-name mb-2">
                                ${name}
                            </div>
                            <div class="row task-description">
                                ${descr}
                            </div>
                            <div class="row task-date">
                                ${due_date}
                            </div>
                        </div>
                    </div>
                </div>
            `);

        }

        const showTasks = (tasks) => {
            //debugger
            const taskList = document.querySelector(".task-list");

            const taskContent = tasks.map(task => getTaskItem(task)).join('');
            taskList.innerHTML = taskContent;

        }


        const handleShowTasks = (el) => { //function to get the array of tasks of the project.
            const menuClicked = el.textContent.trim().toLowerCase();
            const pro_id = manageProject.checkProject(menuClicked).id;
            const proTasks = manageTask.checkProTasks(pro_id);

            return proTasks;

        }


        const editTask = (taskID) => {
            const editDialog = document.getElementById("edit-dialog");

            let {id, name, descr, priority, due_date, pro_id} = manageTask.checkTask(taskID);
            const editDialogForm = document.createElement('form');
            editDialogForm.setAttribute("method", "POST");
            editDialogForm.innerHTML =
            `

                <h4 class="dialog-header">Update Task</h4>
                <div class="form-fields d-flex">

                    <div class="form-group mb-0 col">
                        <input type="text" class="form-control form-task-name" id="edit-task-name" name="add-task-name" value="${name}" placeholder="Task name" required>
                        <textarea class="form-control form-task-description" rows="5"  id="edit-task-description" name="edit-task-description"  rows="5" maxlength="100" placeholder="Description" required>${descr}</textarea>
                    </div>

                    <div class="form-group mb-0 d-flex flex-row col-5 d-flex flex-column align-items-start">
                        <h6>
                            Project
                        </h6>

                        <select class="projects-options task-pro-selection" name="project-name" id="edit-pro-selection"></select>

                        <h6 class="mt-2">Due Date</h6>
                        <input type="date" class="form-control form-task-date" id="edit-task-date" name="add-task-date" value="${due_date}">

                        <h6 class="mt-2">Priority</h6>
                        <select class="priority-selection" id="edit-priority-selection" name="add-priority-selection">
                            <option class="priority-item" value="priority1">Priority 1</option>
                            <option class="priority-item" value="priority2">Priority 2</option>
                            <option class="priority-item" value="priority3">Priority 3</option>
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
                        <input type="submit" id="submit-edit" value="Update" class="btn btn-primary" formnovalidate />
                        <input type="submit" class="btn btn-primary" id="close-edit-dialog" value="Cancel" />
                    </div>

                </div>

            `;
            editDialog.appendChild(editDialogForm);

            //set selected priority
            document.querySelector(`[value= "${priority}"]`).setAttribute("selected", "");
            projectLists("edit-pro-selection");
            document.querySelector(`[value= "${pro_id}"]`).setAttribute("selected", "");


            enableSubmitBtn1(editDialogForm);
            //handleFormSubmit(editDialogForm);

        }


         //enable submit button based on input
         const enableSubmitBtn1 = (form) => {


            const formFields = [
                document.getElementById("edit-task-name"),
                document.getElementById("edit-task-description"),
                document.getElementById("edit-priority-selection"),
                document.getElementById("edit-pro-selection"),
                document.getElementById("edit-task-date")

            ];


            formFields.forEach(field => {
                field.addEventListener("change", () => {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        toogleSubmitButton1(formFields);
                    },500)
                })

            })

        }

        const toogleSubmitButton1  = (formFields) => {
            const submitBtn = document.querySelector("#submit-edit");
            if(validateFields(formFields)){
                submitBtn.removeAttribute("disabled");

            }else{
                submitBtn.setAttribute("disabled","");
            }

        }


        const showEmptyContent = () => {
            const emptyContent = `
            <div class="empty-content mx-auto mt-5">
                <img src="https://todoist.b-cdn.net/assets/images/9b83bf5d1895df53ed06506fd3cd381c.png" />
                <p><b>What do you need to get done today?</b></p>
                <p>By default, tasks added here will be due today. Click + to add a task.</p>
            </div>
            `;
            document.querySelector(".task-list").innerHTML = emptyContent;
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
                        <input type="text" class="form-control form-task-name" id="add-task-name" name="add-task-name" placeholder="Task name" required />
                    </div>
                    <div class="form-group mb-0">
                        <textarea class="form-control form-task-description" rows="3"  id="add-task-description" name="add-task-description"  rows="5" maxlength="100" placeholder="Description" required></textarea>

                    </div>

                    <div class="form-group mb-0 d-flex flex-row gap-3" >
                        <input type="date" class="form-control form-task-date" id="add-task-date" name="add-task-date">
                        <select class="priority-selection" id="add-priority-selection" name="priority-selection">
                            <option class="priority-item" value="default" selected disabled>Priority</option>
                            <option class="priority-item" value="priority1">Priority 1</option>
                            <option class="priority-item" value="priority2">Priority 2</option>
                            <option class="priority-item" value="priority3">Priority 3</option>
                        </select>
                    </div>
                </div>

                <div class="d-flex justify-content-between form-buttons">
                    <select class="projects-options task-pro-selection" name="project-name" id="add-pro-selection">
                        <option class="project-name d-flex flex-row" value = "default" selected disabled><span>No project choosen</span></option>
                    </select>
                    <div class="buttons-group">
                        <input type="submit" id="submit-task" value="Add" class="btn btn-primary" disabled formnovalidate />
                        <input type="submit" class="btn btn-primary" id="close-add-task" value="Cancel" />
                    </div>

                </div>

            `;
            dialog.appendChild(dialogForm);

            projectLists("add-pro-selection");
            enableSubmitBtn(dialogForm);
            handleFormSubmit(dialogForm);


        }

        let timer;

         //enable submit button based on input
         const enableSubmitBtn = (form) => {

            const formFields = [
                document.getElementById("add-task-name"),
                document.getElementById("add-task-description"),
                document.getElementById("add-priority-selection"),
                document.getElementById("add-pro-selection"),
                document.getElementById("add-task-date")
            ];


            formFields.forEach(field => {
                field.addEventListener("change", () => {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        toogleSubmitButton(formFields);
                    },500)
                })

            })

        }

        const toogleSubmitButton  = (formFields) => {
            const submitBtn = document.querySelector("#submit-task");
            if(validateFields(formFields)){
                submitBtn.removeAttribute("disabled");

            }else{
                submitBtn.setAttribute("disabled","");
            }

        }

        const validateFields = (formFields) => {
            let allFilled = true;

            formFields.forEach(item => {
                if(item.value === "" || item.value === "default"){
                    allFilled = false;
                }
            })
            return allFilled;
        }


        //set options to project select field of form
        const projectLists = (domEl) => {
            JSON.parse(manageTask.getProjects("projects"))?.forEach(item => {
                const option = document.createElement("option");
                option.classList.add("project-name", "d-flex","flex-row");
                option.value =item.id;

                const optionSpan = document.createElement("span");
                optionSpan.textContent = item.name;

                option.appendChild(optionSpan);
                document.getElementById(domEl).appendChild(option);
            })
        }



        //handle form submit
        const handleFormSubmit = (form) => {
            form.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent the default form submission behavior

                // Get the values from form elements
                let taskName = form.elements["add-task-name"].value;
                let taskDescription = form.elements["add-task-description"].value;
                let taskDate = form.elements["add-task-date"].value;
                let taskPriority = form.elements["add-priority-selection"].value;
                let taskProID = form.elements["project-name"].value;

                manageTask.createTask(taskName, taskDescription, taskProID, taskDate, taskPriority);

                resetForm(form);
                closeDialog("dialog");
                // menuModule.refreshSubMenu("projects");
                // menuModule.refreshSubMenu("favorites");

            })
        }

        const refreshTasks = () => {

        }

        return { showTasks, editTask, createTask, showEmptyContent,  openDialog, closeDialog, projectLists, handleShowTasks }
    })();



    return {
        projectModule,
        tasksModule,
        menuModule
    }


})()

export {Interface}