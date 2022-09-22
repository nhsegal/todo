"use strict";


const addTaskBtn = document.querySelector("#add-a-task");
const addTaskModal = document.querySelector("#add-a-task-modal");
const closeModalButton = document.querySelectorAll(".close-modal-button");


const toggleModal= () => {
    /*
    let title = document.getElementById('title');
    title.value = '';
    let author = document.getElementById('author');
    author.value = '';
    let pages = document.getElementById('pages');
    pages.value = '';
    let no = document.getElementById('no');
    no.checked = false;
    let reading = document.getElementById('reading');
    reading.checked = false;
    let yes = document.getElementById('yes');
    yes.checked = false;
    */
    addTaskModal.toggle("show-modal");
}




addTaskBtn.addEventListener("click", toggleModal);
//addBookBtn.addEventListener("click", myLibrary.toggleModal);
//closeModalButton.addEventListener("click", myLibrary.toggleModal);
