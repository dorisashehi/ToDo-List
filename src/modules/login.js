//const bcrypt = require("bcrypt");
import { User } from './app';
import { validate } from './validate';
import { resetForm, setLoggedInSession } from './utils';
import { layoutModule } from './layout';
import { init } from './init';
import signup1 from '../assets/images/signup1.png';
import signup2 from '../assets/images/signup2.png';
import signup3 from '../assets/images/signup3.png';
import signup4 from '../assets/images/signup4.png';

const loginModule = (() => {


    const signUpHTMl = () => {


        const loginForm = document.createElement("div");
        loginForm.setAttribute("id","container-register");
        loginForm.innerHTML = `

            <div class="container-wrapper">
                <div class="col form-container">
                    <form id="register-form" method="POST" novalidate>
                        <h4 class="header">Sign Up</h4>
                        <div class="form-fields">
                            <div class="form-group mb-3">
                                <label for="form-name">Name<em>*</em></label>
                                <input type="text" class="form-control form-register" id="form-register-name" name="name" placeholder="User Name" />
                            </div>
                        </div>
                        <div class="form-fields">
                            <div class="form-group">
                                <label for="form-email">Email<em>*</em></label>
                                <input type="email" class="form-control form-register" id="form-register-email" name="email" placeholder="user.name@example.com" />
                                <span class="error">Please put an email format</spam>
                            </div>
                        </div>
                        <div class="form-fields">
                            <div class="form-group">
                                <label for="form-password">Password<em>*</em></label>
                                <input type="password" class="form-control form-register" id="form-register-password" name="password" placeholder="Password" />
                            </div>
                        </div>
                        <div class="result-message "></div>
                        <div class="d-flex justify-content-between form-buttons">
                            <div class="buttons-group">
                                <input type="submit" id="submit" value="Register" class="btn btn-primary" disabled/>
                            </div>
                        </div>
                        <span class="signup-content">Already signed up? <a class="login-link">Go to login</a></span
                    </form>
                </div>

                <div class="col image-column">
                    <div class="row mb-3">
                        <img src="${signup1}" class="register-img"/>
                        <img  src="${signup2}" " class="register-img"/>
                    </div>
                    <div class="row">
                        <img  src="${signup3}"  class="register-img"/>
                        <img  src="${signup4}"  class="register-img"/>
                    </div>
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

        validate.enableSubmitBTN(formFields, loginForm.getAttribute("id")); //VALIDATE FORM FIELDS
        signupHandlerEvent(); //SUBMIT BUTTON EVENT
        loginLinkEvent();

    }



    const clearErrors = () =>{
        const resultDIV = document.querySelector(".result-message");
        resultDIV.innerHTML = "";
        resultDIV.classList.remove('error');
    }


    const loginLinkEvent = () => { //sign up link event
        document.querySelector('.login-link').addEventListener('click', () => {
            loginHTMl();
        })

    }

    const signupHandlerEvent = () => {

        const loginForm = document.getElementById("register-form");


        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();
            clearErrors(); //CLEAR RESULTS TAKEN FROM STORAGE ERRORS

            const name = loginForm.elements['form-register-name'];
            const password = loginForm.elements['form-register-password'];
            const email = loginForm.elements['form-register-email'];

            validate.validateEmail(email);
            const result = User.createUser(name.value, email.value, password.value); //SAVE INTO STORAGE USER IF DOESNT EXIST
            afterUserSaved(result); //CLEAR FORM REDIRECT


        });
    }

    const afterUserSaved = ( result ) => { //SHOW RESULT IF USER SAVED IN STORAGE OR NOT

        clearErrors();
        const resultDIV = document.querySelector(".result-message");

        if(result.type == 'error') { //IF USER COULDN'T CREATED

            resultDIV.innerHTML = result.message;
            resultDIV.classList.add("error");
            return;
        }

        sessionStorage.setItem('currentloggedin',result.data.id); //PUT IN A SESSION THE USER ID LOGGED IN
        layoutModule.layoutHTMl(); //LOAD LAYOUT
        init();//LOAD ON LOAD JS

    }


    const loginHTMl = () => { //HTML TO LOGIN


        const loginForm = document.createElement("div");
        loginForm.setAttribute("id","container-login");
        loginForm.innerHTML = `

            <div class="container-wrapper">
                <div class="col form-container">
                    <form id="login-form" method="POST" novalidate>
                        <h4 class="header">Log In</h4>
                        <div class="form-fields">
                            <div class="form-group">
                                <label for="form-email">Email<em>*</em></label>
                                <input type="email" class="form-control form-register" id="form-login-email" name="email" placeholder="user.name@example.com" />
                                <span class="error">Please put an email format</spam>
                            </div>
                        </div>
                        <div class="form-fields">
                            <div class="form-group">
                                <label for="form-password">Password<em>*</em></label>
                                <input type="password" class="form-control form-register" id="form-login-password" name="password" placeholder="Password" />
                            </div>
                        </div>
                        <span class="result-message error"></span>
                        <div class="d-flex justify-content-between form-buttons mb-3">
                            <div class="buttons-group">
                                <input type="submit" id="submit" value="LogIn" class="btn btn-primary" disabled/>
                            </div>
                        </div>
                        <span class="signup-content">Don’t have an account? <a class="signup-link">Sign up</a></span
                    </form>
                </div>

                <div class="col image-column">
                    <img src="https://todoist.b-cdn.net/assets/images/7b55dafbc1fe203bd537c738fb1757ed.png" class="login-img"/>
                    <div class="description">
                        Before Todoist, my to-do lists were scattered all around! Now, everything is in order and in one place.

                        <span>– Matt M.</span>
                    </div>
                </div>

            </div>

        `

        const container = document.getElementById("container-fluid");
        container.innerHTML = ''; // Clear any existing content
        container.appendChild(loginForm);

        const formFields = [
            document.getElementById("form-login-password"),
            document.getElementById("form-login-email")
         ];

        validate.enableSubmitBTN(formFields, loginForm.getAttribute("id")); //VALIDATE FORM FIELDS
        loginHandlerEvent(); //login event
        signupLinkEvent(); // if not registered sign up

    }

    const signupLinkEvent = () => { //sign up link event
        document.querySelector('.signup-link').addEventListener('click', () => {
            signUpHTMl();
        })

    }
    const loginHandlerEvent = () => { //login event

        const loginForm = document.getElementById("login-form");


        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();
            clearErrors();


            const password = loginForm.elements['form-login-password'];
            const email = loginForm.elements['form-login-email'];
            const resultDIV = document.querySelector(".result-message");

            if(!validate.validateEmail(email)) return;

            const user = User.checkUsrEmail(email.value); //SAVE INTO STORAGE USER IF DOESNT EXIST

            if(typeof user === 'undefined'){

                resultDIV.innerHTML = "User doesn't exist";
                resultDIV.classList.add('error');

            }else if(password.value === user?.password && email.value === user?.email) {

                setLoggedInSession(user.id); //SET SESSION FOR USER LOGGED IN

                resetForm(loginForm); //CLEAR FORM FIELDS
                layoutModule.layoutHTMl(); //LOAD LAYOUT
                init(); //ON LOAD JS

            }else{

                resultDIV.innerHTML = "Wrong password";
                resultDIV.classList.add('error');
            }

        });


    }

    return { signUpHTMl, loginHTMl }

})();


export { loginModule };