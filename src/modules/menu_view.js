import { projects } from "./app";
import {UiTasks} from "./tasks_view";

class UiMenu{

    static getMenuTasks = (menuLi) => { //get clicked menu tasks
        let tasks = UiTasks.getMenuActTasks(menuLi); //get array of tasks

        if(!tasks || tasks.length === 0) {
            UiTasks.showEmptyContent();
            return;
        }
        UiTasks.showTasksHTML(tasks);  //show taks per project with content

    }

    static handleMenuClick = (menuItem) => { //funstion to add active menu
        document.querySelector("li.nav-item.active")?.classList.remove("active");
        menuItem.classList.add("active");

    }

    static getMenuItem = (subMenu) => {

        let {id, name} = subMenu;

        const menuLi = document.createElement("li");
        menuLi.classList.add("w-100", "submenu-item", "nav-item");
        menuLi.setAttribute("data-project", id);
        menuLi.addEventListener("click", () => {
            this.handleMenuClick(menuLi);
            this.getMenuTasks(menuLi);
        })


        const link = document.createElement("a");
        link.classList.add("nav-link", "px-3");


        const span = document.createElement("span");
        span.classList.add("d-none", "d-sm-inline");
        span.textContent = name;

        link.appendChild(span);
        menuLi.appendChild(link);

        return menuLi;
    }

    static filterProjects = () => { //filter only favorites submenu
        return projects.filter(item => { return item.favorites === "false"});
    }

    static filterFavorites = () => {// filter only projects submenu
        return  projects.filter(item => { return item.favorites === "true"});
    }



    static refreshSubMenu = (menuName) => { //function to load submenu

        let subMenuCon = '';
        const ulContent = document.querySelector("ul.submenu."+menuName);

        if(localStorage.length !== 0){

            if(menuName == "favorites" && localStorage["projects"]) {
                ulContent.innerHTML = "";
                subMenuCon = this.filterFavorites();
                subMenuCon.forEach(item => {
                    ulContent.appendChild(this.getMenuItem(item));
                })
            }

            if(menuName == "projects" &&  localStorage["projects"]) {
                ulContent.innerHTML = "";
                subMenuCon = this.filterProjects();
                subMenuCon.forEach(item => {
                    ulContent.appendChild(this.getMenuItem(item));
                })
            }

        }

    }

}

export {UiMenu}
