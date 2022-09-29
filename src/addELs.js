"use strict";

import { masterList } from "./masterList";
import { renderMain, renderSideBar } from "./render";
import { Task } from "./tasks"; 
import { currentSettings } from "./currentSettings";
import { DOM } from "./DOMCache";

let editting = false;
let IDNumber = null;

export function addInitialEventListeners(){ 
//  *** AddTaskModal open, submit, and close btn ELs ***

    // callback for submit
    const taskSubmit = function(e) {
        e.preventDefault();
        DOM.addTaskModal.classList.toggle("closed");
        if (editting){
            const taskToEdit = masterList.data.filter((t)=> t.id == IDNumber)[0];
            masterList.editTask(taskToEdit, "content", DOM.newTaskContent.value);
            masterList.editTask(taskToEdit, "date", new Date(DOM.newTaskDate.value));
            let option = Array.from(DOM.newTaskPriority).filter(e => e['checked'])[0] ; 
            console.log(option.value)
            masterList.editTask(taskToEdit, "priority", option.value);
            masterList.editTask(taskToEdit, "project", DOM.newTaskProject.value);
            localStorage.setItem('oldData', JSON.stringify(masterList.data)); 
            localStorage.setItem('oldDisplayList', JSON.stringify(masterList.displayedList));
        }
        else {
            let newTaskPriorityValue = null;
            for (const option of DOM.newTaskPriority) {
                if (option.checked) {
                    newTaskPriorityValue = option.value;
                }
            }
        
            const newTask = new Task( DOM.newTaskDate.value, DOM.newTaskContent.value, newTaskPriorityValue, DOM.newTaskProject.value);
            masterList.addTask(newTask);
            localStorage.setItem('oldData', JSON.stringify(masterList.data)); 
            localStorage.setItem('oldDisplayList', JSON.stringify(masterList.displayedList));
        }
     
     
        masterList.sortByDate();
        // Clear the modal input fields 
        DOM.newTaskContent.value = null;
        DOM.newTaskDate.value = null;
        for (const option of DOM.newTaskPriority) {
            DOM.newTaskPriorityValue = null;            
        }
        DOM.newTaskProject.value = null;
        
        renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject);
        renderSideBar(DOM.body, masterList.getListOfProjects()); 
        addSideProjectEventListeners();
        addSideTimeEventListeners();
        addMainEventListeners();
    }

    DOM.addTaskBtn.addEventListener("click", () => {  editting = false;
    DOM.addTaskModal.classList.toggle("closed") });
    DOM.closeModalButton.addEventListener("click", () => { DOM.addTaskModal.classList.toggle("closed") });
    DOM.addTaskForm.addEventListener("submit", taskSubmit);  
    
    //Today, Week, and All sideBar ELs
    try {
        DOM.todaysTasksSideBar.addEventListener("click", function(){ 
            currentSettings.update('today', null);
            renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);
            addMainEventListeners();
        });
         
        DOM.thisWeekSideBar.addEventListener("click", function(){
            currentSettings.update('this-week', null);
            renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);
            addMainEventListeners();
        });
      
        DOM.allTasksSideBar.addEventListener("click", function(){
            currentSettings.update('all', null);
            renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);
            addMainEventListeners();
        });
           
    }
    catch {
        console.log('failed to add event listeners');
    }

}

function addCardEventListeners(task){
    const checkbox = document.querySelectorAll(`[data-id="${task.id}"] input`);
    checkbox[0].addEventListener('change', function(e) {
        let taskID = e.target.getAttribute('data-id')
        let task = masterList.data.filter((e)=> e.id == taskID);
        if (this.checked) {
            task.completed = true;
            e.target.parentElement.classList.add("completed");
        } else {
            task.completed = false;
            e.target.parentElement.classList.remove("completed");
        }
    });

    const editTask = function(e) {
        editting = true;
        IDNumber = e.target.parentElement.getAttribute("data-id");
        const taskToEdit = masterList.data.filter((t)=> t.id == IDNumber)[0];
        let yyyy = taskToEdit.date.getFullYear();
        let mm = taskToEdit.date.getMonth()+1;
        let dd = taskToEdit.date.getDate();
        let taskDate = String(10000 * yyyy + 100 * mm + dd);
        taskDate = taskDate.slice(0,4)+'-'+taskDate.slice(4,6) + '-' +taskDate.slice(6,8);
        DOM.newTaskContent.value = taskToEdit.content;
        DOM.newTaskDate.value = taskDate;
        DOM.newTaskProject.value = taskToEdit.project;
        for (const option of DOM.newTaskPriority) {
            if (option.value === task.priority) {
                option.checked = true;
            }
        }
        DOM.addTaskModal.classList.toggle("closed");
    }

    const removeTask = function(e) {
        const thisTask = masterList.data.filter( (t) => t.id == e.target.parentElement.getAttribute("data-id"));
        masterList.removeTask(thisTask[0]);
        localStorage.setItem('oldData', JSON.stringify(masterList.data)); 
        masterList.displayedList.splice(masterList.displayedList.indexOf(thisTask[0]), 1);
        localStorage.setItem('oldDisplayList', JSON.stringify(masterList.displayedList));
        renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);
        addMainEventListeners();
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
    const removeThis = function (e) {
        if (confirm("Delete this project and all tasks in it?")) {
            const tasksToRemove = masterList.produceProjectList(e.target.id.slice(0,-6));
            for (const item of tasksToRemove){
                masterList.removeTask(item);
            }
            localStorage.setItem('oldData', JSON.stringify(masterList.data)); 
            localStorage.setItem('oldDisplayList', JSON.stringify(masterList.displayedList));
            renderMain(masterList, DOM.main, currentSettings.viewBy, currentSettings.whichProject);
                renderSideBar(DOM.body, masterList.getListOfProjects()); 
                addSideProjectEventListeners();
                addSideTimeEventListeners();
                addMainEventListeners();
          } 
          else {
            console.log("You pressed Cancel!");
          }
    }

    for (let i = 0; i < DOM.sidebarProjectListRemove.length; i++) {
        DOM.sidebarProjectListRemove[i].addEventListener('click', removeThis);
    }
    // SideBar Project Name ELs
    try {
        for (let i = 0; i < DOM.sidebarProjectList.length; i++) {
            const projectLink = (DOM.sidebarProjectList[i]);
            projectLink.addEventListener('click', function() {
                currentSettings.update('byProject', projectLink.id);
                renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);
                addMainEventListeners();
            });
        }
       
    }

    catch {
        console.log('failed to add el to projects')
    }
    //Remove project button ? 
   
    
}
 
export function addSideTimeEventListeners(){
    try {
        DOM.todaysTasksSideBar.addEventListener("click", function(){ 
            currentSettings.update('today', null);
            renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);
            addMainEventListeners();
        });
         
        DOM.thisWeekSideBar.addEventListener("click", function(){
            currentSettings.update('this-week', null);
            renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);
            addMainEventListeners();
        });
      
        DOM.allTasksSideBar.addEventListener("click", function(){
            currentSettings.update('all', null);
            renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);
            addMainEventListeners();
        });
    }
    catch {
        console.log('failed to add today/week/all ELs')
    }
   
}