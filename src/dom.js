"use strict";

import { masterList } from "./masterList";
import { renderMain, renderSideBar } from "./render";
import { Task } from "./tasks"; 
import { currentSettings } from "./currentSettings";

export function prepareDOM (){
    // Cache the DOM
    const addTaskBtn = document.querySelector("#add-a-task");
    const addTaskModal = document.querySelector("#add-a-task-modal");
    const closeModalButton = document.querySelector("#close-modal-button");
    const modalSubmitButton = document.querySelector("#modal-submit");
    const newTaskContent = document.querySelector("#task-content");
    const newTaskDate = document.querySelector("#date");
    const newTaskPriority = document.querySelectorAll('input[name=priority]');
    const newTaskProject = document.querySelector('#project');
    const main = document.querySelector('main');
    const body = document.querySelector('body');

    // Arrays for events
    const taskList = [];

    // Callback for create task submit
    const taskSubmit = function(e) {
        e.preventDefault();
        addTaskModal.classList.toggle("closed");
        let newTaskPriorityValue = null;
        for (const option of newTaskPriority) {
            if (option.checked) {
                newTaskPriorityValue = option.value;
            }
        }
        const newTask = new Task( newTaskDate.value, newTaskContent.value, newTaskPriorityValue, newTaskProject.value);
        masterList.addTask(newTask);
        masterList.sortByDate();
        newTaskContent.value = null;
        newTaskDate.value = null;
        for (const option of newTaskPriority) {
            newTaskPriorityValue = null;            
        }
        newTaskProject.value = null;
        renderMain(masterList, main, currentSettings.viewBy, currentSettings.whichProject);
        renderSideBar(body, masterList, masterList.getListOfProjects());
    }

    // Add eventlisteners
    addTaskBtn.addEventListener("click", () => { addTaskModal.classList.toggle("closed") });
    closeModalButton.addEventListener("click", () => { addTaskModal.classList.toggle("closed") });
    modalSubmitButton.addEventListener("click", taskSubmit);
    return 'done'
   
}
