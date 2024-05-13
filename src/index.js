import './assets/styles/main.scss'
import { Project } from './modules/app';
import { UiMenu} from './modules/menu_view';
import { UiTasks} from './modules/tasks_view';
import { UiProject} from './modules/project_view';
import { openDialog, closeDialog} from './modules/utils';
import profile from './assets/images/profile.jpg'

////ALL THESE CODES BELOW ARE EXECUTED ON PAGE LOAD

//ADD DEFAULT PROJECT TO STORAGE ON PAGE LOAD
Project.createProject("17845a4b-1fc0-42e2-9084-744fa24f32e5", "inbox", false);

//CREATE PROJECT DIALOD APPEND TO CODE
UiProject.createProjectDialog();

//CREATE TASK DIALOG  APPENDED
UiTasks.createTask();

//ADD IMG TO PROFILE IN MENU TOP
document.querySelector(".profile-img").src = profile;

///ALL THESE FUNCTIONS ARE EXECUTED ON PAGE LOAD
document.querySelectorAll("li.nav-item").forEach((menu) => {//function on click a menu item
    menu.addEventListener("click", (el)=> {

        const menuItem = el.currentTarget;
        if(menuItem.parentNode.id  === "main-menu" || menuItem.classList.contains("submenu-item")){

            UiMenu.handleMenuClick(menuItem); //add as active
            UiMenu.getMenuTasks(menuItem);

        }
    })
})

//LOAD SUBMENU ON PAGE LOAD
UiMenu.refreshSubMenu("projects");
UiMenu.refreshSubMenu("favorites");

//DEFAULT ACTIVE MENU TASKS
UiTasks.refreshTasks();




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
    openDialog("project-dialog");
    UiProject.addToFavorite();

})


const closeProjectDialog = document.querySelector("#project-dialog #close-add-pro");
closeProjectDialog.addEventListener("click", (e) => { //close dialog box
    e.preventDefault();
    closeDialog("project-dialog");
});


//ADD, CLOSE NEW TASK DIALOG OPEN WHEN CLICKING THE PLUS ICON
const openTaskDialog = document.querySelector(".fa-plus-circle");
openTaskDialog.addEventListener("click", () => {
    openDialog("dialog");

})

const closeTaskDialog = dialog.querySelector("#close-add-task");
closeTaskDialog.addEventListener("click", (e) => { //close dialog box
    e.preventDefault();
    closeDialog("dialog");
});


// Get all edit-box elements
const editBoxes = document.querySelectorAll('.edit-box');

// Add event listener to the document body for each edit box
editBoxes.forEach(editBox => {
    document.body.addEventListener('click', (event) => {
        // Check if the click is outside of the current edit box and not on the ellipsis icon
        if (!editBox.contains(event.target) && !event.target.classList.contains("fa-ellipsis-h")) {
            // If outside, hide the current edit box
            editBox.classList.remove("show");
        }
    });
});


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

