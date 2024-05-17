//reset form fields
const resetForm = (form) => {
    form.reset();//clear form inputs
}

//Open Dialog box
const openDialog = (dialogID) => {
    const dialog = document.getElementById(dialogID);
    dialog.showModal();

}

//close Dialog box
const closeDialog = (closeBtnID) => {
    const closeDialog = document.getElementById(closeBtnID);
    closeDialog.close();

}

const setLoggedInSession = (userID) => {

    sessionStorage.setItem('currentloggedin', userID);

}

const getLoggedInUser = (sessionName) => {

    return sessionStorage.getItem(sessionName);

}

const removeLoggedIn = () => {

    sessionStorage.removeItem('currentloggedin');


}

export {resetForm, openDialog, closeDialog, setLoggedInSession, getLoggedInUser, removeLoggedIn};