// Cache the DOM
const addTaskBtn = document.querySelector("#add-a-task");
const addTaskModal = document.querySelector("#add-a-task-modal");
const closeModalButton = document.querySelector("#close-modal-button");


// Callbacks for eventlisteners

const toggleModal= () => {
    addTaskModal.toggle("show-modal");
}


// Add eventlisteners
closeModalButton.onclick = function() {
    addTaskModal.style.display = "none";
}

addTaskBtn.addEventListener("click", ()=>{ modal.classList.toggle("closed")});
//addBookBtn.addEventListener("click", myLibrary.toggleModal);

closeModalButton.addEventListener("click", ()=>{ modal.classList.toggle("closed")});
