import { resetRetrieveHandlers } from "source-map-support";
import { DOM } from "./DOMCache";
import { masterList } from "./masterList";

/*
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
*/
const taskSubmit = function(e) {
    e.preventDefault();
    DOM.addTaskModal.classList.toggle("closed");
    let newTaskPriorityValue = null;
    for (const option of DOM.newTaskPriority) {
        if (option.checked) {
            newTaskPriorityValue = option.value;
        }
    }
    const newTask = new Task( DOM.newTaskDate.value, DOM.newTaskContent.value, DOM.newTaskPriorityValue, DOM.newTaskProject.value);
    masterList.addTask(newTask);
    masterList.sortByDate();
    // Clear the form
    DOM.newTaskContent.value = null;
    DOM.newTaskDate.value = null;
    for (const option of DOM.newTaskPriority) {
        newTaskPriorityValue = null;            
    }
    DOM.newTaskProject.value = null;
}

// Add eventlisteners
DOM.addTaskBtn.addEventListener("click", () => { addTaskModal.classList.toggle("closed") });
DOM.closeModalButton.addEventListener("click", () => { addTaskModal.classList.toggle("closed") });
DOM.addTaskForm.addEventListener("submit", taskSubmit);  

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


