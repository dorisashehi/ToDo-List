import { projects } from "./app";
import { uiTasksModule } from "./tasks_view";

const uiMenuModule = (() =>{

    const getMenuTasks = (menuLi) => { //get clicked menu tasks
        let tasks = uiTasksModule.getMenuActTasks(menuLi); //get array of tasks

        if(!tasks || tasks.length === 0) {
            uiTasksModule.showEmptyContent();
            return;
        }
        uiTasksModule.showTasksHTML(tasks);  //show taks per project with content

    }

    const handleMenuClick = (menuItem) => { //funstion to add active menu
        document.querySelector("li.nav-item.active")?.classList.remove("active");
        menuItem.classList.add("active");
        document.querySelector(".menu-name").innerHTML = menuItem.querySelector("a.nav-link").innerHTML;


    }

    const getMenuItem = (subMenu) => {

        let {id, name} = subMenu;

        const menuLi = document.createElement("li");
        menuLi.classList.add("w-100", "submenu-item", "nav-item");
        menuLi.setAttribute("data-project", id);
        menuLi.addEventListener("click", () => {
            handleMenuClick(menuLi);
            getMenuTasks(menuLi);
        })


        const link = document.createElement("a");
        link.classList.add("nav-link", "px-3");


        const span = document.createElement("span");
        span.textContent = name;

        link.appendChild(span);
        menuLi.appendChild(link);

        return menuLi;
    }

    const filterProjects = () => { //filter only favorites submenu
        return projects.filter(item => { return item.favorites === "false"});
    }

    const filterFavorites = () => {// filter only projects submenu
        return  projects.filter(item => { return item.favorites === "true"});
    }



    const refreshSubMenu = (menuName) => { //function to load submenu

        let subMenuCon = '';
        const ulContent = document.querySelector("ul.submenu."+menuName);

        if(localStorage.length !== 0){

            if(menuName == "favorites" && localStorage["projects"]) {
                ulContent.innerHTML = "";
                subMenuCon = filterFavorites();
                subMenuCon.forEach(item => {
                    ulContent.appendChild(getMenuItem(item));
                })
            }

            if(menuName == "projects" &&  localStorage["projects"]) {
                ulContent.innerHTML = "";
                subMenuCon = filterProjects();
                subMenuCon.forEach(item => {
                    ulContent.appendChild(getMenuItem(item));
                })
            }

        }

    }

    return {
        refreshSubMenu,
        handleMenuClick,
        getMenuTasks
     }

})();

export {uiMenuModule}
