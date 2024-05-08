import './assets/styles/main.scss'
import { Interface } from './modules/interface';
import { manageProject, manageTask } from './modules/app';


//add default project to storage on page load
manageProject.createProject("inbox", false);

//load submenu on page load
Interface.menuModule.refreshSubMenu("projects");
//Interface.menuModule.refreshSubMenu("favorites");

//create project functionality
Interface.projectModule.createProjectDialog();


//show list of tasks in container
//Interface.tasksModule.showTasks();

//show edit task
Interface.tasksModule.editTask();

//show empty content
//Interface.tasksModule.showEmptyContent();

//show create task diclog

Interface.tasksModule.createTask();


//sidebar
document.querySelector(".toggle").addEventListener("click", () => {
    document.querySelector(".sidebar-col").classList.toggle('hide');

})


//add menu as active
const handleMenuClick = (menuItem) => {
    document.querySelector("li.nav-item.active")?.classList.remove("active");
    menuItem.classList.add("active");

}

const handleShowTasks = (el) => {


    const menuClicked = el.target.textContent.trim().toLowerCase();
    const pro_id = manageProject.checkProject(menuClicked).id;
    const proTasks = manageTask.checkProTasks(pro_id);

    return proTasks;

}
document.querySelectorAll("li.nav-item").forEach((menu) => {
    menu.addEventListener("click", (el)=> {

        const menuItem = el.currentTarget;
        if(menuItem.parentNode.id  === "main-menu" || menuItem.classList.contains("submenu-item")){
            handleMenuClick(menuItem);
            let tasks = handleShowTasks(el);
            Interface.tasksModule.showTasks(tasks);
        }
    })
})


//toggle submenu
document.querySelectorAll("i.expand").forEach((icon) => {
    icon.addEventListener("click", (el) => {
        el.target.classList.toggle("rotate-icon");
        document.querySelector(`ul.${el.target.dataset.menuExpand}`)?.classList.toggle("show");
    })
})









//Open Dialog box
const openDialog = (dialogID) => {
    const dialog = document.getElementById(dialogID);
    dialog.showModal();

}

const closeDialog = (closeBtnID) => {
    const closeDialog = document.getElementById(closeBtnID);
    closeDialog.close();

}


//Add new task dialog functionality
const openProjectDialog = document.querySelector(".new-project");
openProjectDialog.addEventListener("click", () => {

    Interface.projectModule.openDialog("project-dialog");
    Interface.projectModule.addToFavorite();

})






const closeProjectDialog = document.querySelector("#project-dialog #js-close");
closeProjectDialog.addEventListener("click", (e) => { //close dialog box
    e.preventDefault();
    closeDialog("project-dialog");
});


//Add new task dialog
const openTaskDialog = document.querySelector(".fa-plus-circle");
openTaskDialog.addEventListener("click", () => {
    openDialog("dialog");
})

const closeTaskDialog = dialog.querySelector("#dialog #js-close");
closeTaskDialog.addEventListener("click", (e) => { //close dialog box
    e.preventDefault();
    closeDialog("dialog");
});

//priority

// const priorityBtn = document.querySelector(".priority-btn");
// priorityBtn.addEventListener("click", (button) => { //close dialog box

//     button.preventDefault();

//     document.querySelector(".dropdown-menu").classList.toggle("show-dropdown");

//     document.querySelectorAll(".dropdown-item").forEach((item) => {
//         item.addEventListener('click', (e) => {
//             button.target.innerText =  e.target.innerText;
//         })
//     })
// });


//on task click edit task
const taskItems = document.querySelectorAll(".task-content");
taskItems.forEach((task) => {
    task.addEventListener('click', (e) => {
        console.log("open");
        openDialog("edit-dialog");
    })
})


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

