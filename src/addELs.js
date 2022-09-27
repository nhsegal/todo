"use strict";

import { masterList } from "./masterList";
import { renderMain, renderSideBar } from "./render";
import { Task } from "./tasks"; 
import { currentSettings } from "./currentSettings";
import { DOM } from "./DOMCache";

export function addInitialEventListeners(){ 
    //  *** AddTaskModal open, submit, and close btns ***

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
        const newTask = new Task( DOM.newTaskDate.value, DOM.newTaskContent.value, DOM.newTaskPriorityValue, DOM.newTaskProject.value);
        masterList.addTask(newTask);
        masterList.sortByDate();
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
    
    //Today, Week, and All in SideBar
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

export function addCardEventListeners(){
    //Completed
    //Edit
    //Remove
}

export function addSideProjectEventListeners(){
   
    //Project Name
    try {
        console.log(DOM.sidebarProjectList.length);
        for (let i = 0; i < DOM.sidebarProjectList.length; i++) {
            const projectLink = (DOM.sidebarProjectList[i][0]);
            projectLink.addEventListener('click',  function() {
                currentSettings.update('byProject', projectLink.id);
                renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject);
            }
           
            )
               // currentSettings.update('byProject', el.id);
               // renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject);
                
            
            
        };
    }

    catch {
        console.log('failed to add el to projects')
    }
   
 
    //Remove project button ? 
}
 
/*
export function prepareDOM(){


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
    console.log(DOM);
    DOM.addTaskBtn.addEventListener("click", () => { addTaskModal.classList.toggle("closed") });
    DOM.closeModalButton.addEventListener("click", () => { addTaskModal.classList.toggle("closed") });
    DOM.addTaskForm.addEventListener("submit", taskSubmit);  
}


// Add eventlisteners to sidebar
export const addSideBarEventListeners = () => {
  
    try {

        DOM.todaysTasks.addEventListener("click", function(){
        currentSettings.update('today', null);
        renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject)});

     
        weeksTasks.addEventListener("click", function(){
        currentSettings.update('this-week', null);
        renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject)});

      
        DOM.allTasks.addEventListener("click", function(){
        currentSettings.update('all', null);
        renderMain(masterList, main, currentSettings.viewBy, currentSettings.whichProject)});
       
        DOM.sidebarProjectList.forEach(    (item) => { 
                                            const el =document.getElementById(item);
                                            el.addEventListener('click', () => {
                                                currentSettings.update('byProject', el.id);
                                                renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject);
                                            })
         } );
    }
    catch {
        console.log('failed');
    }
};

*/
