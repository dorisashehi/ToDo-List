const validate = (() => {

    const enableSubmitBTN = (formFields, dialogID) => {

        let timer;

        formFields.forEach(field => {
            field.addEventListener("input", () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    toogleSubmitButton(formFields, dialogID);
                },100)
            })

        })

    }

    const toogleSubmitButton  = (formFields, dialogID) => {

        const submitBtn = document.querySelector(`#${dialogID} #submit`);
        if(validateFields(formFields)){
            submitBtn.removeAttribute("disabled");

        }else{
            submitBtn.setAttribute("disabled","");
        }
    }

    const validateFields = (formFields) => {

        let allFilled = true;

        formFields.forEach(item => {


            if(item.value === "" || item.value === "default"){
                allFilled = false;
            }
        })
        return allFilled;
    }

    const validateEmail = (email) => { //VALIDATE EMAIL MATCH REGEX

        let emailRegEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorDIV =  email.nextElementSibling;
        if(email.value ==="" || !emailRegEX.test(email.value)){
            errorDIV.classList.add('active');
            return false;
        }else{
            errorDIV.classList.remove('active');
            return true;
        }

    }

    return { enableSubmitBTN, validateEmail }


})();

export {validate}