import './assets/styles/main.scss'



document.querySelector(".toggle").addEventListener("click", () => {
    console.log("hello")
    document.querySelector(".sidebar-col").classList.toggle('show');

})