import './assets/styles/main.scss'
import { Interface } from './modules/interface';
import { manageProject, manageTask, UiMenu } from './modules/app';



////ALL THESE CODES BELOW ARE EXECUTED ON PAGE LOAD



//ADD DEFAULT PROJECT TO STORAGE ON PAGE LOAD
//manageProject.createProject("inbox", false);

//CREATE PROJECT DIALOD APPEND TO CODE
Interface.projectModule.createProjectDialog();

//CREATE TASK DIALOG  APPENDED
Interface.tasksModule.createTask();


///ALL THESE FUNCTIONS ARE EXECUTED ON PAGE LOAD
// document.querySelectorAll("li.nav-item").forEach((menu) => {//function on click a menu item
//     menu.addEventListener("click", (el)=> {

//         const menuItem = el.currentTarget;
//         if(menuItem.parentNode.id  === "main-menu" || menuItem.classList.contains("submenu-item")){
//             Interface.menuModule.handleMenuClick(menuItem); //add as active
//             Interface.menuModule.getMenuTasks(menuItem);

//         }
//     })
// })

//LOAD SUBMENU ON PAGE LOAD
// Interface.menuModule.refreshSubMenu("projects");
// Interface.menuModule.refreshSubMenu("favorites");

UiMenu.refreshSubMenu("projects");
//UiMenu.refreshSubMenu("favorites");

//DEFAULT ACTIVE MENU TASKS
//Interface.tasksModule.refreshTasks();




//SIDEBAR SHOW HIDE
document.querySelector(".toggle").addEventListener("click", () => { //function to toggle submenu
    document.querySelector(".sidebar-col").classList.toggle('hide');

})

//TOGGLE SUBMENU
document.querySelectorAll("i.expand").forEach((icon) => { //function to rotate icon of submenu
    icon.addEventListener("click", (el) => {
        el.target.classList.toggle("rotate-icon");
        document.querySelector(`ul.${el.target.dataset.menuExpand}`)?.classList.toggle("show");
    })
})




///OPEN DIALOG BOXES

//ADD, CLOSE NEW PROJECT DIALOG OPEN WHEN CLICKING THE PLUS ICON
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


//ADD, CLOSE NEW TASK DIALOG OPEN WHEN CLICKING THE PLUS ICON
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

