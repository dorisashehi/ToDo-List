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


export {resetForm, openDialog, closeDialog};