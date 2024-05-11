import {UiProject} from "./project_view";;
import { Task, Project } from './app';
import {resetForm, openDialog, closeDialog} from './utils';
import { format } from 'date-fns';



class UiTasks{

    static showEmptyContent = () => {
        const emptyContent = `
        <div class="empty-content mx-auto mt-5">
            <img src="https://todoist.b-cdn.net/assets/images/9b83bf5d1895df53ed06506fd3cd381c.png" />
            <p><b>What do you need to get done today?</b></p>
            <p>By default, tasks added here will be due today. Click + to add a task.</p>
        </div>
        `;
        document.querySelector(".task-list").innerHTML = emptyContent;
    }

    static getMenuActTasks = (el) => { //GET TASKS OF THE ACTIVE MENU
        const menuClicked = el.dataset.project; //get project tesxt in lower case
        if(menuClicked === "today"){

            const currentDate = new Date();
            const today  = format(currentDate, 'yyyy-MM-dd');
            return  Task.checkTasksByDate(today);

        }
        const pro_id = Project.checkProject(menuClicked).id; //get project id from storage based on the name of menu
        const proTasks = Task.checkProTasks(pro_id);   //get tasks of the project based on the id of the project

        return proTasks; //return tasks

    }

    static handleOpenOptions(dotsDiv){
        dotsDiv.querySelector(".edit-box").classList.toggle("show");

    }

    static onClickPriority(taskID, e){ //ON CLICK OF THE PRIORITY ICON

        let priority = e.target.dataset.value; //GET CALUE OF THE PRIORITY CLICKED
        Task.editPriority(taskID, priority); //EDIT PRIORITY OF THAT TASK
        this.refreshTasks();

    }

    static onDeleteEvent(taskID){

        Task.deleteTask(taskID); //DELETE TASK WITH ID
        this.refreshTasks();
    }

    static getTaskItem = (task) => {

        let {id, name, descr, due_date} = task;

         // Create the main div with class "task mb-3"
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task', 'mb-3');

        // Create the inner div with class "row task-item"
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'task-item');

        // Create the checkbox div with class "col-1 complete-btn d-flex justify-content-center pt-1"
        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('col-1', 'complete-btn', 'd-flex', "flex-column", 'pt-1');

         // Three dots"
         const dotsDiv = document.createElement('div');
         dotsDiv.classList.add('col-1', 'edit-dots', 'd-flex', 'justify-content-center', 'pt-1');

         const dotsIcon = document.createElement("i");
         dotsIcon.classList.add("fas", "fa-ellipsis-h");
         dotsDiv.appendChild(dotsIcon);

         const editDiv = document.createElement("div");
         editDiv.classList.add("edit-box");

         const priorityDiv = document.createElement("div");
         priorityDiv.classList.add("priority-container");

         const priorityRow = document.createElement("div");
         priorityRow.classList.add("priority-row","edit-row");
         priorityRow.textContent = "Priority";

         priorityDiv.appendChild(priorityRow);

         let priorityList = [
            {name: "Priority 1", value: "priority1"},
            {name: "Priority 2", value: "priority2"},
            {name: "Priority 3", value: "priority3"}
        ]

        priorityList.forEach(priority => {

            let prioritIcon = document.createElement("i");
            prioritIcon.classList.add("fas", "fa-flag");
            prioritIcon.setAttribute("data-value", priority.value);
            prioritIcon.title = priority.name;

            prioritIcon.addEventListener("click", (e) => this.onClickPriority(id, e));
            priorityDiv.appendChild(prioritIcon);

        });

         const dateDiv = document.createElement("div");
         dateDiv.classList.add("date-container");

         const dateRow = document.createElement("div");
         dateRow.classList.add("date-row","edit-row");
         dateRow.textContent = "Due Date";

         const weekDiv = document.createElement("i");
         weekDiv.classList.add("week-item", "fas" ,"fa-calendar-week");
         weekDiv.title = "This Week"
         const todayDiv = document.createElement("i");
         todayDiv.classList.add("today-item", "fas", "fa-calendar-day");
         todayDiv.title = "Today"

         dateDiv.appendChild(dateRow);
         dateDiv.appendChild(todayDiv);
         dateDiv.appendChild(weekDiv);

         const deleteDiv = document.createElement("div");
         deleteDiv.classList.add("delete-container");

         const deleteRow = document.createElement("div");
         deleteRow.classList.add("delete-row");
         deleteRow.textContent = "Delete";

         const deleteIcon = document.createElement("i");
         deleteIcon.classList.add("fas", "fa-trash");

         deleteIcon.addEventListener("click", () => this.onDeleteEvent(id));

         deleteDiv.appendChild(deleteRow);
         deleteDiv.appendChild(deleteIcon);

         editDiv.appendChild(priorityDiv);
         editDiv.appendChild(dateDiv);
         editDiv.appendChild(deleteDiv);
         dotsDiv.appendChild(editDiv);

         dotsDiv.addEventListener("click", () => this.handleOpenOptions(dotsDiv));

        // Create the checkbox input
        const checkboxInput = document.createElement('input');
        checkboxInput.setAttribute('type', 'checkbox');
        checkboxInput.classList.add('completed');
        checkboxInput.setAttribute('id', `completed-task-${id}`);
        checkboxInput.setAttribute('name', 'completed');
        checkboxInput.setAttribute('value', id);

        // Create the checkbox label
        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', `completed-task-${id}`);

        // Append input and label to checkbox div
        checkboxDiv.appendChild(checkboxInput);
        checkboxDiv.appendChild(checkboxLabel);

        // Create the task content div with class "col task-content" and data-task attribute
        const taskContentDiv = document.createElement('div');
        taskContentDiv.classList.add('col', 'task-content');
        taskContentDiv.addEventListener("click", () => {
            this.editTask(id); //pass info of the task to the edit dialog
            openDialog("edit-dialog");
        } );
        taskContentDiv.setAttribute('data-task', id);

        // Create the inner div with class "row task-name mb-2" for task name
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('row', 'task-name', 'mb-3');
        nameDiv.textContent = name;

        // Create the inner div with class "row task-description" for task description
        const descrDiv = document.createElement('div');
        descrDiv.classList.add('row', 'task-description',"mb-3");
        descrDiv.textContent = descr;

        //Container for date icon and text
        const dateCon = document.createElement("div");
        dateCon.classList.add("row", "task-date", "align-items-center");

        //Create date icon
        const dateIcon = document.createElement("i");
        dateIcon.classList.add("fas", "fa-calendar", "px-0");


        // Create the inner div with class "row task-date" for task due date
        const dueDateDiv = document.createElement('div');
        dueDateDiv.classList.add('date-text',"px-2");
        dueDateDiv.textContent = format(due_date, 'MMMM d');

        dateCon.appendChild(dateIcon);
        dateCon.appendChild(dueDateDiv);

        // Append name, description, and due date to task content div
        taskContentDiv.appendChild(nameDiv);
        taskContentDiv.appendChild(descrDiv);
        taskContentDiv.appendChild(dateCon);

        // Append checkbox and task content to row div
        rowDiv.appendChild(checkboxDiv);
        rowDiv.appendChild(taskContentDiv);
        rowDiv.appendChild(dotsDiv);

        // Append row div to task div
        taskDiv.appendChild(rowDiv);

        // Return the created task div
        return taskDiv;
    }

    static showTasksHTML = (tasks) => {  //get html of each task of the active menu

        const taskList = document.querySelector(".task-list"); //that is the container where tasks have to stay
        taskList.innerHTML = ""; //clear content
        tasks.forEach(task => { //add list of the tasks
            taskList.appendChild(this.getTaskItem(task));
        })

    }

    static refreshTasks = () => { //GET ACTIVE MENU TASKS

        const menuActive = document.querySelector("li.nav-item.active");
        let tasks = this.getMenuActTasks(menuActive); //get array of tasks

        if(!tasks || tasks.length === 0) {this.showEmptyContent(); return;}  //if not tasks for menu active , show empty content
        this.showTasksHTML(tasks);
    }

    static editTask = (taskID) => {

        const editDialog = document.getElementById("edit-dialog");
        let {descr, due_date, id, name, priority, pro_id} = Task.checkTask(taskID);

        const editDialogForm = document.createElement('form');
        editDialogForm.setAttribute("method", "POST");
        editDialogForm.innerHTML =
        `

            <h4 class="dialog-header">Update Task</h4>
            <div class="form-fields d-flex">

                <div class="form-group mb-0 col">
                    <input type="text" class="form-control form-task-name" id="edit-task-name" name="add-task-name" value="${name}" placeholder="Task name" required>
                    <textarea class="form-control form-task-description" rows="5"  id="edit-task-description" name="edit-task-description"  rows="5" maxlength="100" placeholder="Description" required>${descr}</textarea>
                    <input type="hidden"  name="edit-task-id" id="edit-task-id" value="${id}">

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

                    <input type="submit" id="submit-task" value="Update" class="btn btn-primary"  formnovalidate />
                    <input type="submit" class="btn btn-primary" id="close-edit-dialog" value="Cancel" />

                </div>

            </div>

        `;
        editDialog.innerHTML = editDialogForm.outerHTML;

        //set selected priority
        document.querySelector(`[value= "${priority}"]`).setAttribute("selected", "");
        UiProject.projectLists("edit-pro-selection");
        document.querySelector(`[value= "${pro_id}"]`).setAttribute("selected", "");


        const formFields = [
            document.getElementById("edit-task-description"),
            document.getElementById("edit-task-date"),
            document.getElementById("edit-task-id"),
            document.getElementById("edit-task-name"),
            document.getElementById("edit-priority-selection"),
            document.getElementById("edit-pro-selection")
        ];

        this.enableSubmitBtn(formFields , "edit-dialog");

        document.querySelector("#edit-dialog #submit-task").addEventListener("click", (e) => {
            e.preventDefault();
            this.handleFormUpdate(formFields); //submit form
            resetForm(editDialogForm);  //clear form fields
            this.refreshTasks(); //load task is container from storage
            closeDialog("edit-dialog"); //close edit form
        });

        document.querySelector("#close-edit-dialog").addEventListener("click", (e) => {
            e.preventDefault();
            closeDialog("edit-dialog");
            return;
        });



    }

    //handle form submit
    static handleFormUpdate = (formFields) => { //update to storage

        let [descr, taskDate, id, name, taskPriority, taskProID] = formFields;
        Task.editTask(descr.value, taskDate.value, id.value, name.value, taskPriority.value, taskProID.value);

    }

    //enable submit button based on input
    static enableSubmitBtn = (formFields, dialogID) => {
        let timer;

       formFields.forEach(field => {
           field.addEventListener("input", () => {
               clearTimeout(timer);
               timer = setTimeout(() => {
                   this.toogleSubmitButton(formFields, dialogID);
               },100)
           })

       })
   }

   static toogleSubmitButton  = (formFields, dialogID) => {

        const submitBtn = document.querySelector(`#${dialogID} #submit-task`);
        if(this.validateFields(formFields)){
            submitBtn.removeAttribute("disabled");

        }else{
            submitBtn.setAttribute("disabled","");
        }

    }

    static validateFields = (formFields) => {
        let allFilled = true;

        formFields.forEach(item => {
            if(item.value === "" || item.value === "default"){
                allFilled = false;
            }
        })
        return allFilled;
    }

    static createTask = () => {

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

        UiProject.projectLists("add-pro-selection");

        const formFields = [
            document.getElementById("add-task-name"),
            document.getElementById("add-task-description"),
            document.getElementById("add-priority-selection"),
            document.getElementById("add-pro-selection"),
            document.getElementById("add-task-date")
        ];
        this.enableSubmitBtn(formFields , "dialog");
        this.handleFormSubmit(dialogForm);



    }

    //handle form submit
    static handleFormSubmit = (form) => {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission behavior

            // Get the values from form elements
            let taskName = form.elements["add-task-name"].value;
            let taskDescription = form.elements["add-task-description"].value;
            let taskDate = form.elements["add-task-date"].value;
            let taskPriority = form.elements["add-priority-selection"].value;
            let taskProID = form.elements["project-name"].value;

            Task.createTask(taskName, taskDescription, taskProID, taskDate, taskPriority);

            resetForm(form);
            UiTasks.refreshTasks(); //load again tasks to see the new task added
            closeDialog("dialog");

        })
    }

}


export {UiTasks}