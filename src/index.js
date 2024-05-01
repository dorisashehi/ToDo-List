import './assets/styles/main.scss'


//sidebar
document.querySelector(".toggle").addEventListener("click", () => {
    document.querySelector(".sidebar-col").classList.toggle('hide');

})


//add menu as active

const handleMenuClick = (el) => {

    const menuItem = el.currentTarget;
    document.querySelector("li.nav-item.active")?.classList.remove("active");

    if(menuItem.parentNode.id  === "main-menu" || menuItem.classList.contains("submenu-item"))
        menuItem.classList.add("active");
}

document.querySelectorAll("li.nav-item").forEach((menu) => {
    menu.addEventListener("click", handleMenuClick)
})


//toggle submenu
document.querySelectorAll("i.expand").forEach((icon) => {
    icon.addEventListener("click", (el) => {
        el.target.classList.toggle("rotate-icon");
        document.querySelector(`ul.${el.target.dataset.menuExpand}`)?.classList.toggle("show");
    })
})



//dialog
const dialog = document.getElementById("dialog");

document.querySelector(".fa-plus-circle").addEventListener("click", () => {
    dialog.showModal();
})

const closeDialog = dialog.querySelector("#js-close");
closeDialog.addEventListener("click", (e) => { //close dialog box
    e.preventDefault();
    dialog.close();
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


//on task click
const taskItems = document.querySelectorAll(".task-item");
taskItems.forEach((task) => {
    task.addEventListener('click', (e) => {
        console.log("open")
        document.getElementById("edit-dialog").showModal();
    })
})