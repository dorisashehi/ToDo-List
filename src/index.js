import './assets/styles/main.scss'
import { Interface } from './modules/interface';
import { manageProject, manageTask } from './modules/app';


//add default project to storage on page load
manageProject.createProject("inbox", false);

//load submenu on page load
Interface.menuModule.refreshSubMenu("projects");
Interface.menuModule.refreshSubMenu("favorites");

//create project functionality
Interface.projectModule.createProjectDialog();
//show create task diclog
Interface.tasksModule.createTask();


//sidebar
document.querySelector(".toggle").addEventListener("click", () => { //function to toggle submenu
    document.querySelector(".sidebar-col").classList.toggle('hide');

})


//add menu as active
const handleMenuClick = (menuItem) => { //funstion to add active menu
    document.querySelector("li.nav-item.active")?.classList.remove("active");
    menuItem.classList.add("active");

}






////TASKS FUNCTIONS

document.querySelectorAll("li.nav-item").forEach((menu) => {//function on click a menu item
    menu.addEventListener("click", (el)=> {

        const menuItem = el.currentTarget;
        if(menuItem.parentNode.id  === "main-menu" || menuItem.classList.contains("submenu-item")){
            handleMenuClick(menuItem); //add as active
            let tasks = Interface.tasksModule.getMenuActTasks(menuItem); //get array of tasks
            if(!tasks) {
                Interface.tasksModule.showEmptyContent();
                return;
            }
            Interface.tasksModule.showTasksHTML(tasks);  //show taks per project with content

        }
    })
})

//show tasks of default menu avtive
Interface.tasksModule.refreshTasks();











//toggle submenu
document.querySelectorAll("i.expand").forEach((icon) => { //function to rotate icon of submenu
    icon.addEventListener("click", (el) => {
        el.target.classList.toggle("rotate-icon");
        document.querySelector(`ul.${el.target.dataset.menuExpand}`)?.classList.toggle("show");
    })
})




///OPEN DIALOG BOXES


//Add new task dialog functionality
const openProjectDialog = document.querySelector(".new-project");
openProjectDialog.addEventListener("click", () => {

    Interface.projectModule.openDialog("project-dialog");
    Interface.projectModule.addToFavorite();

})


const closeProjectDialog = document.querySelector("#project-dialog #close-add-pro");
closeProjectDialog.addEventListener("click", (e) => { //close dialog box
    e.preventDefault();
    Interface.projectModule.closeDialog("project-dialog");
});


//Add new task dialog
const openTaskDialog = document.querySelector(".fa-plus-circle");
openTaskDialog.addEventListener("click", () => {
    Interface.tasksModule.openDialog("dialog");
    console.log("helooo");

})

const closeTaskDialog = dialog.querySelector("#close-add-task");
closeTaskDialog.addEventListener("click", (e) => { //close dialog box
    e.preventDefault();
    Interface.tasksModule.closeDialog("dialog");
});


//on task click edit task
// const taskItems = document.querySelectorAll(".task-content");
// taskItems.forEach((task) => {
//     task.addEventListener('click', (e) => {
//         Interface.tasksModule.editTask(task.dataset.task);
//         Interface.tasksModule.openDialog("edit-dialog");
//     })
// })

// const closeEditTaskDialog = dialog.querySelector("#edit-dialog #close-edit-dialog");
// closeEditTaskDialog.addEventListener("click", (e) => { //close dialog box

//     e.preventDefault();
//     Interface.tasksModule.closeDialog("edit-dialog");
// });



//cpomments


// document.querySelector(".comment-plus").addEventListener("click", () => {
//     document.querySelector(".comment-btn").classList.toggle("show");

// })
// var container = document.getElementById('editor'); // The container for Quill
// console.log(container);
//     var editor = new Quill(container, {
//       theme: 'snow', // Theme for the Quill editor
//       modules: {
//         toolbar: [
//           [{ 'header': [1, 2, false] }], // Header formatting
//           ['bold', 'italic', 'underline'], // Text formatting
//           [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
//           ['link', 'image'], // Adding links and images
//           ['clean'] // Removing formatting
//         ]
//       }
//     });

