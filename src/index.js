"use strict";

import { Task } from "./tasks";
import { Project } from "./tasks";

// Cache the DOM
const addTaskBtn = document.querySelector("#add-a-task");
const addTaskModal = document.querySelector("#add-a-task-modal");
const closeModalButton = document.querySelector("#close-modal-button");
const modalSubmitButton = document.querySelector("#modal-submit");
const newTaskContent = document.querySelector("#task-content");
const newTaskDate = document.querySelector("#date");
const newTaskPriority = document.querySelectorAll('input[name=priority]');

// Callback for create task submit
const taskSubmit = function(e) {
    e.preventDefault();
   // console.log( newTaskContent.value );
   // console.log( newTaskDate.value );
    let newTaskPriorityValue = null;
    for (const option of newTaskPriority) {
        if (option.checked) {
            newTaskPriorityValue = option.value;
  //          console.log(option.value)
        }
    }
    addTaskModal.classList.toggle("closed");
    const newTask = new Task( newTaskDate.value, newTaskContent.value, newTaskPriorityValue);
    console.log(newTask);
}

// Add eventlisteners
addTaskBtn.addEventListener("click", () => { addTaskModal.classList.toggle("closed")});
closeModalButton.addEventListener("click", ()=>{ addTaskModal.classList.toggle("closed")});
modalSubmitButton.addEventListener("click", taskSubmit);
