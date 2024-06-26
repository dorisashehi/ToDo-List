import { Project, generateRandomId } from './app';
import { uiMenuModule} from './menu_view';
import { uiTasksModule} from './tasks_view';
import { uiProjectModule} from './project_view';
import { openDialog, closeDialog, removeLoggedIn, getLoggedInUser} from './utils';
import profile from '../assets/images/profile.jpg'
import {loginModule } from './login';

const init = (() => {

    ////ALL THESE CODES BELOW ARE EXECUTED ON PAGE LOAD

    //ADD DEFAULT PROJECT TO STORAGE ON PAGE LOAD
    Project.createProject(generateRandomId(), "inbox", false, getLoggedInUser('currentloggedin'));

    //CREATE PROJECT DIALOD APPEND TO CODE
    uiProjectModule.createProjectDialog();

    //CREATE TASK DIALOG  APPENDED
    uiTasksModule.createTask();

    //ADD IMG TO PROFILE IN MENU TOP
    document.querySelector(".profile-img").src = profile;

    ///ALL THESE FUNCTIONS ARE EXECUTED ON PAGE LOAD
    document.querySelectorAll("li.nav-item").forEach((menu) => {//function on click a menu item
        menu.addEventListener("click", (el)=> {

            const menuItem = el.currentTarget;
            if(menuItem.parentNode.id  === "main-menu" || menuItem.classList.contains("submenu-item")){

                uiMenuModule.handleMenuClick(menuItem); //add as active
                uiMenuModule.getMenuTasks(menuItem);

            }
        })
    })

    //LOAD SUBMENU ON PAGE LOAD
    uiMenuModule.refreshSubMenu("projects");
    uiMenuModule.refreshSubMenu("favorites");

    //DEFAULT ACTIVE MENU TASKS
    uiTasksModule.refreshTasks();




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
        uiProjectModule.addToFavorite();

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

    document.querySelector('.logout-btn').addEventListener('click', () => {
        removeLoggedIn();
        loginModule.loginHTMl();
    })


    document.querySelector('.mobile-logout').addEventListener('click', () => {
        removeLoggedIn();
        loginModule.loginHTMl();
    })
});

export { init }