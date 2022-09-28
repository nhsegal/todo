"use strict";

import { masterList } from "./masterList";
import { renderMain, renderSideBar } from "./render";
import { Task } from "./tasks"; 
import { currentSettings } from "./currentSettings";
import { DOM } from "./DOMCache";

export function addInitialEventListeners(){ 
//  *** AddTaskModal open, submit, and close btn ELs ***

    // callback for submit
    const taskSubmit = function(e) {
        e.preventDefault();
        DOM.addTaskModal.classList.toggle("closed");
        let newTaskPriorityValue = null;
        for (const option of DOM.newTaskPriority) {
            if (option.checked) {
                DOM.newTaskPriorityValue = option.value;
            }
        }
        console.log(DOM.newTaskProject.value);
        const newTask = new Task( DOM.newTaskDate.value, DOM.newTaskContent.value, DOM.newTaskPriorityValue, DOM.newTaskProject.value);
        masterList.addTask(newTask);
        masterList.sortByDate();
        // Clear the modal input fields 
        DOM.newTaskContent.value = null;
        DOM.newTaskDate.value = null;
        for (const option of DOM.newTaskPriority) {
            newTaskPriorityValue = null;            
        }
        DOM.newTaskProject.value = null;
        
        renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject);
        renderSideBar(DOM.body, masterList, masterList.getListOfProjects()); 
    }
    
    DOM.addTaskBtn.addEventListener("click", () => { DOM.addTaskModal.classList.toggle("closed") });
    DOM.closeModalButton.addEventListener("click", () => { DOM.addTaskModal.classList.toggle("closed") });
    DOM.addTaskForm.addEventListener("submit", taskSubmit);  
    
    //Today, Week, and All sideBar ELs
    try {
        DOM.todaysTasksSideBar.addEventListener("click", function(){ 
            currentSettings.update('today', null);
            renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject)});
         
        DOM.thisWeekSideBar.addEventListener("click", function(){
            currentSettings.update('this-week', null);
            renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject)});
      
        DOM.allTasksSideBar.addEventListener("click", function(){
            currentSettings.update('all', null);
            renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject)});
           
    }
    catch {
        console.log('failed to add event listeners');
    }

}

function addCardEventListeners(task){
    const checkbox = document.querySelectorAll(`[data-id="${task.id}"] input`);
    checkbox[0].addEventListener('change', function() {
        if (this.checked) {
            console.log("Checkbox is checked..");
        } else {
            console.log("Checkbox is not checked..");
        }
    });

    const editTask = function(e) {
        console.log(e.target.parentElement.getAttribute("data-id"));
    }

    const removeTask = function(e) {
        const thisTask = masterList.data.filter( (t) => t.id == e.target.parentElement.getAttribute("data-id"));
        masterList.removeTask(thisTask[0]);
        masterList.displayedList.splice(masterList.displayedList.indexOf(thisTask[0]), 1);
        // reRender();
        renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);
    }
    
    const editBtn = document.querySelectorAll(`[data-id="${task.id}"] button`)[0];
    editBtn.addEventListener("click", editTask);
    
    const removeBtn = document.querySelectorAll(`[data-id="${task.id}"] button`)[1];
    removeBtn.addEventListener("click", removeTask);
} 

export function addMainEventListeners(){
    for (let item of masterList.displayedList) {
        addCardEventListeners(item);
    }
}


export function addSideProjectEventListeners(){
    // SideBar Project Name ELs
    try {
        console.log(DOM.sidebarProjectList.length);
        for (let i = 0; i < DOM.sidebarProjectList.length; i++) {
            const projectLink = (DOM.sidebarProjectList[i][0]);
            projectLink.addEventListener('click',  function() {
                currentSettings.update('byProject', projectLink.id);
                renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject);
            })
        };
    }

    catch {
        console.log('failed to add el to projects')
    }
    //Remove project button ? 
}
 
