//const bcrypt = require("bcrypt");

const loginModule = (() => {

    const loginHTMl = () => {


        const loginForm = document.createElement("div");
        loginForm.classList.add("container-register-login");
        loginForm.innerHTML = `

            <div class="container-register">
                <div class="col form-container">
                    <form id="login-form" method="POST" novalidate>
                        <h4 class="dialog-header mb-3">Sign Up</h4>
                        <div class="form-fields">
                            <div class="form-group mb-3">
                                <label for="form-name">Name</label>
                                <input type="text" class="form-control form-register" id="form-register-name" name="form-register-name" placeholder="User Name" />
                            </div>
                        </div>
                        <div class="form-fields">
                            <div class="form-group mb-3">
                                <label for="form-email">Email</label>
                                <input type="text" class="form-control form-register" id="form-register-email" name="form-register-email" placeholder="User Email" />
                            </div>
                        </div>
                        <div class="form-fields">
                            <div class="form-group mb-3">
                                <label for="form-password">Password</label>
                                <input type="text" class="form-control form-register" id="form-register-password" name="form-register-password" placeholder="Password" />
                            </div>
                        </div>
                        <div class="d-flex justify-content-between form-buttons">
                            <div class="buttons-group">
                                <input type="submit" id="submit-register" value="Register" class="btn btn-primary"/>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="col">
                    <img src="https://todoist.b-cdn.net/assets/images/7b55dafbc1fe203bd537c738fb1757ed.png" class="register-img"/>
                </div>

            </div>

        `

        const container = document.getElementById("container-fluid");
        container.innerHTML = ''; // Clear any existing content
        container.appendChild(loginForm);
        loginHandlerEvent();

    }

    const loginHandlerEvent = () => {

        const loginForm = document.getElementById("login-form");
        console.log(loginForm);
        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const name = loginForm.elements['form-register-name'].value;
            const password = loginForm.elements['form-register-password'].value;
            const email = loginForm.elements['form-register-email'].value;

            console.log({name, password, email});

        });
    }

    return { loginHTMl }

})();


export {loginModule};