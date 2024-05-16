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

        const submitBtn = document.querySelector(`#${dialogID} #submit-register`);
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

    return { enableSubmitBTN }


})();

export {validate}