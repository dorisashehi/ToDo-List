import './assets/styles/main.scss'



document.querySelector(".toggle").addEventListener("click", () => {
    console.log("hello")
    document.querySelector(".sidebar-col").classList.toggle('hide');

})

const dialog = document.getElementById("dialog");

document.querySelector(".fa-plus-circle").addEventListener("click", () => {
    dialog.showModal();
})

const closeDialog = dialog.querySelector("#js-close");
closeDialog.addEventListener("click", (e) => { //close dialog box
    e.preventDefault();
    dialog.close();
});