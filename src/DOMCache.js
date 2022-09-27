
const header = document.createElement("header");
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
const sideBar = document.querySelector("#sidebar");
const todaysTasksSideBar = document.querySelector("todays-tasks");
const thisWeekSideBar = document.querySelector("this-week");
const allTasksSideBar = document.querySelector("all-tasks");

function dom() {
    return {
        header,
        addTaskBtn, 
        addTaskForm, 
        addTaskModal, 
        closeModalButton, 
        newTaskContent, 
        newTaskDate, 
        newTaskPriority,
        newTaskProject, 
        main,
        body, 
        sideBar,
        todaysTasksSideBar,
        thisWeekSideBar, 
        allTasksSideBar, 
        get cardEditBtns() {
            editBtns = document.querySelectorAll('.edit-task');
            return editBtns;
        },
        get cardRemoveBtns() {
            removeBtns = document.querySelectorAll('.remove-task');
            return removeBtns;
        },
        get cardCheckBoxs() {
            completed = document.querySelectorAll('[name="isCompletedCheckbox"]');
            return completed;
        },
        get sidebarProjectList() {
            // I need the anchor tags nexted inside the li's
            const listitems = sideBar.children[1].children;
            const arrayOfProjectLinks = [];
            for (let i = 0; i< listitems.length; i++){
                arrayOfProjectLinks.push(listitems[i].children);
            }
            return arrayOfProjectLinks
        },
    }
 }

export const DOM = dom();