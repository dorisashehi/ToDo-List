import { Project } from "./app";

const layoutModule = (() => {


    const layoutHTMl = () => {
        const layout = document.createElement("div");
        layout.classList.add("row", "flex-nowrap", "px-0");
        layout.innerHTML = `

            <div class="col-auto col-md-3 col-xl-2 px-0 sidebar-col">
                <div class="d-flex flex-column align-items-center align-items-sm-start">

                    <div class="title py-3 d-flex justify-content-between px-2">
                        <a href="/" class="d-flex align-items-baseline justify-content-center logo text-decoration-none">
                            <span class="px-2">To Do</span>
                        </a>

                    </div>
                    <div class="sidebar-content col px-0">

                        <ul class="nav flex-column" id="main-menu">
                            <li class="nav-item active" data-project="inbox">
                                <a href="#" class="nav-link px-0 d-flex align-items-center">
                                    <i class="fas fa-inbox"></i><span class="px-3">Inbox</span>
                                </a>
                            </li>
                            <li class="nav-item" data-project="today">
                                <a href="#" class="nav-link px-0 d-flex align-items-center">
                                    <i class="fas fa-calendar-day"></i><span class="px-3">Today</span></a>
                            </li>
                            <li class="nav-item" data-project="week">
                                <a href="#" class="nav-link px-0 d-flex align-items-center">
                                    <i class="fas fa-calendar-week"></i><span class="px-3">This Week</span> </a>
                            </li>

                            <li class="nav-item" data-project="completed">
                                <a href="#" class="nav-link px-0 d-flex align-items-center">
                                    <i class="fas fa-check-square"></i><span class="px-3">Completed</span> </a>
                            </li>

                        </ul>


                        <ul class="nav flex-column" id="second-menu">

                            <li class="nav-item">
                                <a class="nav-link px-0 d-flex align-items-center justify-content-between">
                                    <span class="">Favorites</span><i class="fas fa-angle-down expand" data-menu-expand="favorites"></i>
                                </a>
                            </li>

                            <ul class="collapse nav flex-column ms-1 favorites submenu"></ul>

                            <li class="nav-item" id="projects">
                                <a class="nav-link px-0 d-flex align-items-center justify-content-between">
                                    <span class="">Projects</span>
                                    <div class="d-flex gap-2 align-items-center">
                                        <i class="fas fa-plus new-project"></i>
                                        <i class="fas fa-angle-down expand" data-menu-expand="projects"></i>
                                    </div>
                                </a>

                            </li>

                            <ul class="collapse nav flex-column ms-1 projects submenu"></ul>

                        </ul>
                        <dialog id="project-dialog"></dialog>
                    </div>

                </div>
            </div>
            <div class="col px-0 content-col">

                <div class="navbar-top container-fluid py-3 d-flex align-items-center">
                    <i class="fas fa-align-left toggle"></i>
                    <div class="menu-name"><i class="fas fa-calendar-day pr-2"></i>Inbox</div>

                    <div class="user d-flex gap-3 align-items-center justify-content-center ">
                        <img  class="profile-img"/>
                        <i class="fas fa-sign-out-alt only-mobile"></i>
                        <button class="btn btn-primary logout-btn" alt="Logout">Logout</button>
                    </div>

                </div>

                <div class="content">
                    <div class="container-fluid content-title">
                        <p class="my-auto">
                            Task List
                        </p>
                    </div>
                    <div class="container text-center">

                        <i class="fas fa-plus-circle py-3" id="task-plus"></i>
                        <label for="task-plus">Add task</label>


                        <div class="task-list"></div>
                        <dialog id="edit-dialog"></dialog>

                    </div>
                    <dialog id="dialog"></dialog>
                </div>

            </div>

        `

        const container = document.getElementById("container-fluid");
        container.innerHTML = ''; // Clear any existing content
        container.appendChild(layout);
    }

    return { layoutHTMl }


})();

export { layoutModule }