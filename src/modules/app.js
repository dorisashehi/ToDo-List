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



    static checkProject = (name) => {



        if(!projects) return false

        let proExist = projects.find(item => item.name === name.trim());
        return proExist;

    }


    static createProject = (name, favorited) => { //create a new ptoject and add it to local storage

        //project exists, STOP executation
        if(this.checkProject(name)) return;

        const project = new Project(name, favorited);
        (name ==="inbox") ? project.id = "17845a4b-1fc0-42e2-9084-744fa24f32e5" : project.id = generateRandomId();
        projects = [...projects, project];
        Storage.addToStorage(projects, "projects");

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

class Task{

    constructor(name, descr, pro_id, due_date, priority){
        this.name = name;
        this.descr = descr;
        this.pro_id = pro_id;
        this.due_date = due_date;
        this.priority = priority;
    }

    static createTask = (name, descr, pro_id, due_date, priority) => {
        const task = new Task(name, descr, pro_id, due_date, priority);
        task.id = generateRandomId();

        todoArr = [...todoArr, task];
        Storage.addToStorage(todoArr, "tasks");
    }


    static editTask = (descr, due_date, id, name, priority, pro_id) => { //EDIT TASK STORADE

        const task = new Task(name,descr,pro_id,due_date,priority);
        task.id = id;
        const taskIndex = todoArr.findIndex(item => item.id === id);
        todoArr[taskIndex] = task;
        Storage.addToStorage(todoArr, "tasks");

    }

    static editPriority = (taskID, priority) => { //EDIT ONLY PRIORITY OF SPECIFIC TASK

        const taskIndex = todoArr.findIndex(item => item.id === taskID);
        todoArr[taskIndex].priority = priority;
        Storage.addToStorage(todoArr, "tasks");

    }

    static getProjects = (storageName) => {
        return getLocalStorage(storageName);
    }

    static checkProTasks = (id) => { //get all tasks of the specific project
        if(!todoArr) return;

        let taksExist = todoArr.filter(item => item.pro_id === id);
        return taksExist;
    }

    static checkTask = (id) => {//find task with specific id
        let taksExist = JSON.parse(getLocalTasks("tasks"))?.find(item => item.id === id);
        return taksExist;
    }

}




export {Project, Task, projects, todoArr}