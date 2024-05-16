const { v4: uuidv4 } = require('uuid');
import { isEqual, eachDayOfInterval, format } from 'date-fns';

class Storage{

    static addToStorage = (arr, strName) => { //SAVE ITO STORAGE
        let storage = localStorage.setItem(strName, JSON.stringify(arr));
        return storage;

    }

    static getStorage = (strName) => { //GET FROM STORAGE
        let storage = localStorage.getItem(strName) === null ? [] : JSON.parse(localStorage.getItem(strName));
        return storage;
    }
}

let projects = Storage.getStorage("projects"); //BY DEFAULT GET STORAGE PROJECTS

let todoArr = Storage.getStorage("tasks"); //BY DEFAULT GET TASKS FOM STORAGE

let users = Storage.getStorage("users");
class Project{

    constructor(id, name, favorites){
        this.id = id;
        this.name = name;
        this.favorites = favorites;
    }

    static checkProject = (id) => { //CHECK IF THE PROJECT EXISTS

        if(!projects) return false

        let proExist = projects.find(item => item.id === id);
        return proExist;

    }

    static createProject = (id, name, favorited) => { //create a new ptoject and add it to local storage

        //project exists, STOP executation
        if(this.checkProject(id)) return;

        const project = new Project(id, name, favorited);
        projects = [...projects, project];
        Storage.addToStorage(projects, "projects");

    }

}

const generateRandomId = () => { //create a random id to use as task id and project id

    const newUuid = uuidv4();
    return newUuid;
}

class Task{

    constructor(name, descr, pro_id, due_date, priority, completed = false){
        this.name = name;
        this.descr = descr;
        this.pro_id = pro_id;
        this.due_date = due_date;
        this.priority = priority;
        this.completed = completed;
    }

    static createTask = (name, descr, pro_id, due_date, priority) => { //CREATE TASK AND SAVE INTO STORAGE
        const task = new Task(name, descr, pro_id, due_date, priority);
        task.id = generateRandomId();

        todoArr = [...todoArr, task];
        Storage.addToStorage(todoArr, "tasks");
    }

    static findTaskInx = (id) => { //FIND INDEX OF THE TASK IN THE STORAGE ARRAY

        return todoArr.findIndex(item => item.id === id);

    }


    static editTask = (descr, due_date, id, name, priority, pro_id) => { //EDIT TASK STORADE

        const task = new Task(name,descr,pro_id,due_date,priority);
        task.id = id;
        const taskIndex = this.findTaskInx(id);
        todoArr[taskIndex] = task;
        Storage.addToStorage(todoArr, "tasks");

    }

    static editPriority = (id, priority) => { //EDIT ONLY PRIORITY OF SPECIFIC TASK

        const taskIndex = this.findTaskInx(id);
        todoArr[taskIndex].priority = priority;
        Storage.addToStorage(todoArr, "tasks");

    }

    static deleteTask = (id) => { //EDIT ONLY PRIORITY OF SPECIFIC TASK

        const taskIndex = this.findTaskInx(id);
        todoArr.splice(taskIndex, 1);
        Storage.addToStorage(todoArr, "tasks");

    }

    static editCompleted = (id) => { //EDIT ONLY COMPLETED OF SPECIFIC TASK

        const taskIndex = this.findTaskInx(id);
        todoArr[taskIndex].completed = !todoArr[taskIndex].completed;
        Storage.addToStorage(todoArr, "tasks");

        return todoArr[taskIndex].completed;
    }

    static getComplited = (id) => { //CHECK IF TTASK IS COMPLETED OR NOT
        return todoArr.find(item => item.id === id).completed;
    }

    static checkProTasks = (id) => { //get all tasks of the specific project and which are not completed yet
        if(!todoArr) return;

        let taksExist = todoArr.filter(item => item.pro_id === id && item.completed === false);
        return taksExist;
    }

    static checkTasksByDate = (date) => { //GET TASKS BASED ON TODAY DATE
        if(!todoArr) return;

        let taksExist = todoArr.filter(item => isEqual(item.due_date, date) && item.completed === false);
        return taksExist;

    }

    static checkTasksByWeek = () => {
        if(!todoArr) return;

        const daysOfWeek = eachDayOfInterval({ start: new Date(), end: new Date(new
            Date().setDate(new Date().getDate() + 6)) });
        const weekdays = daysOfWeek.map((day) => format(day, 'yyyy-MM-dd'));

        let taksExist = todoArr.filter(item => {
            return (weekdays.includes(item.due_date) && item.completed === false);

        });

        return taksExist;
    }

    static checkTasksByStatus = () => {

        if(!todoArr) return;

        let taksExist = todoArr.filter(item => item.completed === true);
        return taksExist;

    }

    static checkTask = (id) => {//find task with specific id
        let taksExist = Storage.getStorage("tasks")?.find(item => item.id === id);
        return taksExist;
    }

}

class User{

    constructor(name, email, password){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static createUser(name, email, password){

        let user = new User(name, email, password);
        user.id = generateRandomId();

        if (this.checkUsrEmail(email)){ //user with that email already registered
            return (
                {
                    "message": `Email ${email} already registered`,
                    "error": true
                }
            )
        }

        users = [...users, user];
        Storage.addToStorage(users, "users");
        return (
            {
                "message": `Success! Email ${email} registered`,
                "success": true
            }
        )

    }

    static checkUsrEmail = (email) => {//find task with specific id
        let emailExist = Storage.getStorage("users")?.find(item => item.email === email);
        return emailExist;
    }

    static checkUsr = (email, password) => {//find task with specific id
        let user = Storage.getStorage("users")?.find(item => item.email === email && item.password === password);
        return user;
    }
}




export {Project, Task, User, projects, todoArr, users, generateRandomId}