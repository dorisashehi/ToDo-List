//const bcrypt = require("bcrypt");
import { User } from './app';
import { validate } from './validate';
import { resetForm } from './utils';

const loginModule = (() => {

    const loginHTMl = () => {


        const loginForm = document.createElement("div");
        loginForm.setAttribute("id","container-register-login");
        loginForm.innerHTML = `

            <div class="container-register">
                <div class="col form-container">
                    <form id="login-form" method="POST" novalidate>
                        <h4 class="dialog-header">Sign Up</h4>
                        <div class="form-fields">
                            <div class="form-group mb-3">
                                <label for="form-name">Name</label>
                                <input type="text" class="form-control form-register" id="form-register-name" name="name" placeholder="User Name" />
                            </div>
                        </div>
                        <div class="form-fields">
                            <div class="form-group">
                                <label for="form-email">Email</label>
                                <input type="email" class="form-control form-register" id="form-register-email" name="email" placeholder="user.name@example.com" />
                                <span class="error">Please put an email format</spam>
                            </div>
                        </div>
                        <div class="form-fields">
                            <div class="form-group">
                                <label for="form-password">Password</label>
                                <input type="password" class="form-control form-register" id="form-register-password" name="password" placeholder="Password" />
                            </div>
                        </div>
                        <div class="result-message "></div>
                        <div class="d-flex justify-content-between form-buttons">
                            <div class="buttons-group">
                                <input type="submit" id="submit-register" value="Register" class="btn btn-primary" disabled/>
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

        const formFields = [
           document.getElementById("form-register-name"),
           document.getElementById("form-register-password"),
           document.getElementById("form-register-email")
        ];

        validate.enableSubmitBTN(formFields, loginForm.getAttribute("id"));
        loginHandlerEvent();

    }

    const loginHandlerEvent = () => {

        const loginForm = document.getElementById("login-form");

        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const name = loginForm.elements['form-register-name'];
            const password = loginForm.elements['form-register-password'];
            const email = loginForm.elements['form-register-email'];

            validate.validateEmail(email);
            const result = User.createUser(name.value, email.value, password.value); //SAVE INTO STORAGE USER IF DOESNT EXIST
            afterUserSaved(result, loginForm);


        });
    }

    const afterUserSaved = ( result, form ) => { //SHOW RESULT IF USER SAVED IN STORAGE OR NOT

        const resultDIV = document.querySelector(".result-message");
        resultDIV.innerHTML = "";
        resultDIV.classList.remove('error');
        resultDIV.classList.remove('success');

        let resultClass = 'error';
        if (result.success){resultClass = "success"; resetForm(form);}
        if(result) resultDIV.innerHTML = result.message; resultDIV.classList.add(resultClass);

    }


    return { loginHTMl }

})();


export {loginModule};