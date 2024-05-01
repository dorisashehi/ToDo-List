import './assets/styles/main.scss'


//sidebar
document.querySelector(".toggle").addEventListener("click", () => {
    document.querySelector(".sidebar-col").classList.toggle('hide');

})


//add menu as active
const handleMenuClick = (menuItem) => {
    document.querySelector("li.nav-item.active")?.classList.remove("active");
    menuItem.classList.add("active");

}

document.querySelectorAll("li.nav-item").forEach((menu) => {
    menu.addEventListener("click", (el)=> {

        const menuItem = el.currentTarget;
        if(menuItem.parentNode.id  === "main-menu" || menuItem.classList.contains("submenu-item")){
            handleMenuClick(menuItem)
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

//Add new task dialog
const openTaskDialog = document.querySelector(".fa-plus-circle");
openTaskDialog.addEventListener("click", () => {
    openDialog("dialog");
})

const closeTaskDialog = dialog.querySelector("#js-close");
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
const taskItems = document.querySelectorAll(".task-item");
taskItems.forEach((task) => {
    task.addEventListener('click', (e) => {
        console.log("open");
        openDialog("edit-dialog");
    })
})