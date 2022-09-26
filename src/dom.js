"use strict";

import { masterList } from "./masterList";
import { renderMain, renderSideBar } from "./render";
import { Task } from "./tasks"; 
import { currentSettings } from "./currentSettings";


 // Cache the DOM
 


export function prepareDOM (){
    const addTaskBtn = document.querySelector("#add-a-task");
    const addTaskForm = document.querySelector("#task-form");
    const addTaskModal = document.querySelector("#add-a-task-modal");
    const closeModalButton = document.querySelector("#close-modal-button");
    const newTaskContent = document.querySelector("#task-content");
    const newTaskDate = document.querySelector("#date");
    const newTaskPriority = document.querySelectorAll('input[name=priority]');
    const newTaskProject = document.querySelector('#project');
    const main = document.querySelector('main');
    const body = document.querySelector('body');

    // Callback for create task submit
    const taskSubmit = function(e) {
        console.log('eher')
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
    addTaskForm.addEventListener("submit", taskSubmit);  
}

// Add eventlisteners to sidebar
export const addSideBarEventListeners = (listOfProjects) => {
    const addTaskBtn = document.querySelector("#add-a-task");
 
     const main = document.querySelector('main');

    try {
        const todaysTasks = document.querySelector("#todays-tasks");
        todaysTasks.addEventListener("click", function(){
        currentSettings.update('today', null);
        renderMain(masterList, main, currentSettings.viewBy, currentSettings.whichProject)});

        const weeksTasks = document.querySelector("#this-week");
        weeksTasks.addEventListener("click", function(){
        currentSettings.update('this-week', null);
        renderMain(masterList, main, currentSettings.viewBy, currentSettings.whichProject)});

        const allTasks = document.querySelector("#all-tasks");
        allTasks.addEventListener("click", function(){
        currentSettings.update('all', null);
        renderMain(masterList, main, currentSettings.viewBy, currentSettings.whichProject)});
       
        console.log(listOfProjects);
        listOfProjects.forEach(    (item) => { 
                                            const el =document.getElementById(item);
                                            el.addEventListener('click', () => {
                                                currentSettings.update('byProject', el.id);
                                                renderMain(masterList, main, currentSettings.viewBy, currentSettings.whichProject);
                                            })
         } );
    }
    catch {
        console.log('failed');
    }
};


