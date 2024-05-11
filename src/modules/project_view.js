import { Project, projects } from "./app";
import { UiMenu } from "./menu_view";
import {resetForm, closeDialog} from './utils';

class UiProject{

    static projectLists = (domEl) => { //SHOW PROJECTS AT PROJECT SELECT OPTIONS
        const projectSelect = document.getElementById(domEl);

        projectSelect.innerHTML = "";

        projects?.forEach(item => {
            const option = document.createElement("option");
            option.classList.add("project-name", "d-flex","flex-row");
            option.value =item.id;

            const optionSpan = document.createElement("span");
            optionSpan.textContent = item.name;

            option.appendChild(optionSpan);
            projectSelect.appendChild(option);
        })
    }

    //create project dialog
    static createProjectDialog = () => {

        const projectDialog = document.getElementById("project-dialog");

        const dialogForm = document.createElement('form');
        dialogForm.setAttribute("method", "POST");

        dialogForm.innerHTML =
        `
            <h4 class="dialog-header">Add Project</h4>
            <div class="form-fields">
                <div class="form-group mb-0">
                    <label for="form-project-name">Project Name</label>
                    <input type="text" class="form-control form-project-name" id="form-project-name" name="form-project-name" placeholder="Project name" required />
                </div>
            </div>
            <div class="form-fields">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="favorites-box" value="false" name="favorites-box">
                    <label class="form-check-label" for="favorites-boxh">Add to favorites</label>
                </div>
            </div>

            <div class="d-flex justify-content-between form-buttons">
                <div class="buttons-group">
                    <input type="submit" id="submit" value="Add" class="btn btn-primary" disabled formnovalidate />
                    <input type="submit" class="btn btn-primary" id="close-add-pro" value="Cancel" />
                </div>

            </div>

        `;

        projectDialog.appendChild(dialogForm);

        //call below functions
        this.enableSubmitBtn();
        this.handleFormSubmit(dialogForm);

    }

    //to as favorite project
    static addToFavorite = () => { //add or remove from favorite

        const favCheckbox  = document.getElementById("favorites-box");
        let favoritedProject = false;
        favCheckbox.value = false;
        document.getElementById("favorites-box").addEventListener("click", () => {
            favoritedProject = !favoritedProject;
            favCheckbox.value = favoritedProject;
        });
    }

    //enable submit button based on input
    static enableSubmitBtn = () => {
        let timer;

        document.getElementById("form-project-name").addEventListener("input", (el) => {

            clearTimeout(timer);
            const submitBtn = document.querySelector("#submit");

            timer = setTimeout(() => {
                if(el.target.value !== "") {
                    submitBtn.removeAttribute("disabled");
                    return;

                }
                submitBtn.setAttribute("disabled","");
            },500)
        })

    }

    //submit button action
     static handleFormSubmit = (form) => {//after form is submited

        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission behavior

            // Get the values from form elements
            let projectName = form.elements["form-project-name"].value;
            let favoriteValue = form.elements["favorites-box"].value;


            Project.createProject(projectName, favoriteValue);

            resetForm(form);
            UiMenu.refreshSubMenu("projects"); //show project to projects submenu
            UiMenu.refreshSubMenu("favorites");//show thta project at favorites submenu
            UiProject.projectLists("add-pro-selection"); //add new project to task project select
            closeDialog("project-dialog");


        })
    }

}
export {UiProject}
