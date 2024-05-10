const { v4: uuidv4 } = require('uuid');


class Storage{

    static addToStorage = (arr, strName) => {
        let storage = localStorage.setItem(strName, JSON.stringify(arr));
        return storage;

    }

    static getStorage = (strName) => {
        let storage = localStorage.getItem(strName) === null ? [] : JSON.parse(localStorage.getItem(strName));
        return storage;
    }
}

let projects = Storage.getStorage("projects");

let todoArr = Storage.getStorage("tasks");


class Project{

    constructor(name, favorites){
        this.name = name;
        this.favorites = favorites;
    }

    changeName(name){
        this.name = name;
    }

    changeFavorites(favorites){
        this.favorites = favorites;
    }

}

const generateRandomId = () => { //create a random id to use as task id and project id

    const newUuid = uuidv4();
    return newUuid;
}

const getLocalStorage = (strName) => {
    return localStorage.getItem(strName);
}
const getLocalTasks = (strName) => {
    return localStorage.getItem(strName);
}










class UiMenu{

    static getMenuTasks = (menuLi) => { //get clicked menu tasks
        let tasks = tasksModule.getMenuActTasks(menuLi); //get array of tasks

        if(!tasks || tasks.length === 0) {
            tasksModule.showEmptyContent();
            return;
        }
        tasksModule.showTasksHTML(tasks);  //show taks per project with content

    }

    static handleMenuClick = (menuItem) => { //funstion to add active menu
        document.querySelector("li.nav-item.active")?.classList.remove("active");
        menuItem.classList.add("active");

    }

    static getMenuItem = (subMenu) => {

        let {id, name} = subMenu;

        const menuLi = document.createElement("li");
        menuLi.classList.add("w-100", "submenu-item", "nav-item");
        menuLi.setAttribute("data-project", id);
        menuLi.addEventListener("click", () => {
            this.handleMenuClick(menuLi);
            this.getMenuTasks(menuLi);
        })


        const link = document.createElement("a");
        link.classList.add("nav-link", "px-3");


        const span = document.createElement("span");
        span.classList.add("d-none", "d-sm-inline");
        span.textContent = name;

        link.appendChild(span);
        menuLi.appendChild(link);

        return menuLi;
    }

    static filterProjects = () => { //filter only favorites submenu
        return projects.filter(item => { return item.favorites === "false"});
    }

    static filterFavorites = () => {// filter only projects submenu
        return  projects.filter(item => { return item.favorites === "true"});
    }



    static refreshSubMenu = (menuName) => { //function to load submenu

        let subMenuCon = '';
        const ulContent = document.querySelector("ul.submenu."+menuName);

        if(localStorage.length !== 0){

            if(menuName == "favorites" && localStorage["projects"]) {
                ulContent.innerHTML = "";
                subMenuCon = this.filterFavorites();
                subMenuCon.forEach(item => {
                    ulContent.appendChild(this.getMenuItem(item));
                })
            }

            if(menuName == "projects" &&  localStorage["projects"]) {
                ulContent.innerHTML = "";
                subMenuCon = this.filterProjects();
                subMenuCon.forEach(item => {
                    ulContent.appendChild(this.getMenuItem(item));
                })
            }

        }

    }

}

class UiTasks{

    static projectLists = (domEl) => { //SHOW PROJECTS AT PROJECT SELECT OPTIONS
        const projectSelect = document.getElementById(domEl);

        projectSelect.innerHTML = "";

        projects?.forEach(item => {
            const option = document.createElement("option");
            option.classList.add("project-name", "d-flex","flex-row");
            option.value =item.id;

            const optionSpan = document.createElement("span");
            optionSpan.textContent = item.name;

            option.appendChild(optionSpan);
            projectSelect.appendChild(option);
        })
    }



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
        const menuClicked = el.textContent.trim().toLowerCase(); //get project tesxt in lower case
        const pro_id = manageProject.checkProject(menuClicked).id; //get project id from storage based on the name of menu
        const proTasks = manageTask.checkProTasks(pro_id);   //get tasks of the project based on the id of the project

        return proTasks; //return tasks

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
        checkboxDiv.classList.add('col-1', 'complete-btn', 'd-flex', 'justify-content-center', 'pt-1');

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
            editTask(id); //pass info of the task to the edit dialog
            openDialog("edit-dialog");
        } );
        taskContentDiv.setAttribute('data-task', id);

        // Create the inner div with class "row task-name mb-2" for task name
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('row', 'task-name', 'mb-2');
        nameDiv.textContent = name;

        // Create the inner div with class "row task-description" for task description
        const descrDiv = document.createElement('div');
        descrDiv.classList.add('row', 'task-description');
        descrDiv.textContent = descr;

        // Create the inner div with class "row task-date" for task due date
        const dueDateDiv = document.createElement('div');
        dueDateDiv.classList.add('row', 'task-date');
        dueDateDiv.textContent = due_date;

        // Append name, description, and due date to task content div
        taskContentDiv.appendChild(nameDiv);
        taskContentDiv.appendChild(descrDiv);
        taskContentDiv.appendChild(dueDateDiv);

        // Append checkbox and task content to row div
        rowDiv.appendChild(checkboxDiv);
        rowDiv.appendChild(taskContentDiv);

        // Append row div to task div
        taskDiv.appendChild(rowDiv);

        // Return the created task div
        return taskDiv;

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
        `

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


}

const manageProject = (() =>{



    const checkProject = (name) => {

        if(!projects) return false

        let proExist = projects.find(item => item.name === name);
        return proExist;

    }


    const createProject = (name, favorited) => { //create a new ptoject and add it to local storage

        //project exists, STOP executation
        if(checkProject(name)) return;


        const project = new Project(name, favorited);

        (name ==="inbox") ? project.id = "17845a4b-1fc0-42e2-9084-744fa24f32e5" : project.id = generateRandomId();

        projects = [...projects, project];

        Storage.addToStorage(projects, "projects");
        console.log(projects);

        // let newStorage = {
        //     id: project.id,
        //     name: project.name,
        //     favorited: project.favorites
        // }

        // let localStrPro = getLocalStorage("projects");
        // if(localStrPro !== null && name !== "inbox"){
        //     projects = [...JSON.parse(localStrPro), newStorage]
        // }
        // else{

        //     projects = [newStorage];
        // }
        // localStorage.setItem('projects', JSON.stringify(projects));

    }

    return {createProject, checkProject}

})()






class Task{

    constructor(name, descr, pro_id, due_date, priority){
        this.name = name;
        this.descr = descr;
        this.pro_id = pro_id;
        this.due_date = due_date;
        this.priority = priority;
    }

    changeName(newName){
        this.name = newName;
    }

    changeDescr(newDescr){
        this.descr = newDescr;
    }

    changeProID(newProID){
        this.pro_id = newProID;
    }

    changeDueDate(newDueDate){
        this.due_date = newDueDate;
    }

    changePriority(newPriority){
        this.priority = newPriority;
    }

}



const manageTask = (() => {


    const createTask = (name, descr, pro_id, due_date, priority) => {
        const task = new Task(name, descr, pro_id, due_date, priority);
        task.id = generateRandomId();

        todoArr = [...todoArr, task];

        Storage.addToStorage(todoArr, "tasks");

        console.log(todoArr);

        // let newStorage = {
        //     id: task.id,
        //     name: task.name,
        //     descr: task.descr,
        //     pro_id: task.pro_id,
        //     due_date: task.due_date,
        //     priority: task.priority
        // }


        // let localStrTasks = getLocalStorage("tasks");
        // if(localStrTasks !== null){
        //     tasks = [...JSON.parse(localStrTasks), newStorage]
        // }
        // else{
        //     tasks = [newStorage];
        // }
        // localStorage.setItem('tasks', JSON.stringify(tasks));

    }


    const editTask = (descr, due_date, id, name, priority, pro_id) => {

        const taskIndex = JSON.parse(localStorage.getItem("tasks")).findIndex(item => item.id === id);

        var obj = {
            id : id,
            name: name,
            descr:descr,
            pro_id:pro_id,
            due_date: due_date,
            priority: priority
        }

        let localStrTasks = JSON.parse(getLocalTasks("tasks"));
        localStrTasks[taskIndex] = obj;

        localStorage.setItem('tasks', JSON.stringify(localStrTasks));

    }

    const getProjects = (storageName) => {
        return getLocalStorage(storageName);
    }

    const checkProTasks = (id) => { //get all tasks of the specific project
        if(!todoArr) return;

        let taksExist = todoArr.filter(item => item.pro_id === id);
        return taksExist;
    }

    const checkTask = (id) => {//find task with specific id
        let taksExist = JSON.parse(getLocalTasks("tasks"))?.find(item => item.id === id);
        return taksExist;
    }
    return {getProjects, createTask, checkProTasks, checkTask, editTask}

})();



export { Project, Task, manageProject, manageTask,UiMenu, UiTasks }