const { v4: uuidv4 } = require('uuid');
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


const manageProject = (() =>{

    let projects = [];


    const createProject = (name, favorited) => { //create a new ptoject and add it to local storage

        const project = new Project(name, favorited);
        project.id = generateRandomId();

        let newStorage = {
            id: project.id,
            name: project.name,
            favorited: project.favorites
        }


        let localStrPro = getLocalStorage("projects");
        if(localStrPro !== null){
            projects = [...JSON.parse(localStrPro), newStorage]
        }
        else{
            projects = [newStorage];
        }
        localStorage.setItem('projects', JSON.stringify(projects));

    }

    return {createProject}

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
    let tasks = [];

    const createTask = (name, descr, pro_id, due_date, priority) => {
        const task = new Task(name, descr, pro_id, due_date, priority);
        task.id = generateRandomId();

        let newStorage = {
            id: task.id,
            name: task.name,
            descr: task.descr,
            pro_id: task.pro_id,
            due_date: task.due_date,
            priority: task.priority
        }


        let localStrTasks = getLocalStorage("tasks");
        if(localStrTasks !== null){
            tasks = [...JSON.parse(localStrTasks), newStorage]
        }
        else{
            tasks = [newStorage];
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));

    }

    const getProjects = (storageName) => {
        return getLocalStorage(storageName);
    }

    return {getProjects, createTask}

})();



export { Project, Task, manageProject, manageTask }