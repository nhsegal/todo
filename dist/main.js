/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMCache.js":
/*!*************************!*\
  !*** ./src/DOMCache.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOM": () => (/* binding */ DOM)
/* harmony export */ });

const main = document.querySelector('main');
const body = document.querySelector('body');

function dom() {
    return {
        get header() {
            return document.querySelector("header");
        }, 
        get addTaskBtn() {
            return document.querySelector("#add-a-task");
        }, 
        get addTaskForm() { 
            return document.querySelector("#task-form");
        }, 
        get addTaskModal() { 
            return document.querySelector("#add-a-task-modal");
        }, 
        get closeModalButton() { 
            return document.querySelector("#close-modal-button");
        }, 
        get newTaskContent() { 
            return document.querySelector("#task-content");
        }, 
        get newTaskDate() { 
            return document.querySelector("#date");
        },
        get newTaskPriority() { 
            return document.querySelectorAll('input[name=priority]');
        },  
        get newTaskProject() { 
            return document.querySelector('#project');
        },          
        main,
        body, 
        get sideBar() { 
            return document.querySelector("#sidebar");
        }, 
        get todaysTasksSideBar (){
            return document.querySelector("#todays-tasks");
        },
        get thisWeekSideBar() {
            return document.querySelector("#this-week");
        }, 
        get allTasksSideBar() {
            return document.querySelector("#all-tasks");
        }, 
        get cardEditBtns() {
            return document.querySelectorAll('.edit-task');
        },
        get cardRemoveBtns() {
            return document.querySelectorAll('.remove-task');
        },
        get cardCheckBoxs() {
            return document.querySelectorAll('[name="isCompletedCheckbox"]');
        },
        get sidebarProjectList() {
            // I need the anchor tags nexted inside the li's
            const listitems = this.sideBar.children[1].children;
            const arrayOfProjectLinks = [];
            for (let i = 0; i< listitems.length; i++){
                arrayOfProjectLinks.push(listitems[i].children);
            }
            
            return arrayOfProjectLinks
        },
    }
 }

const DOM = dom();

/***/ }),

/***/ "./src/addELs.js":
/*!***********************!*\
  !*** ./src/addELs.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCardEventListeners": () => (/* binding */ addCardEventListeners),
/* harmony export */   "addInitialEventListeners": () => (/* binding */ addInitialEventListeners),
/* harmony export */   "addSideProjectEventListeners": () => (/* binding */ addSideProjectEventListeners)
/* harmony export */ });
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");
/* harmony import */ var _DOMCache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DOMCache */ "./src/DOMCache.js");




 



function addInitialEventListeners(){ 
    //  *** AddTaskModal open, submit, and close btns ***

    // callback for submit
    const taskSubmit = function(e) {
        e.preventDefault();
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskModal.classList.toggle("closed");
        let newTaskPriorityValue = null;
        for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriority) {
            if (option.checked) {
                _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriorityValue = option.value;
            }
        }
        console.log(_DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskProject.value);
        const newTask = new _tasks__WEBPACK_IMPORTED_MODULE_2__.Task( _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskDate.value, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskContent.value, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriorityValue, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskProject.value);
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.addTask(newTask);
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.sortByDate();
        // Clear the modal input fields 
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskContent.value = null;
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskDate.value = null;
        for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriority) {
            newTaskPriorityValue = null;            
        }
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskProject.value = null;
        
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.getListOfProjects()); 
    }
    
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskBtn.addEventListener("click", () => { _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskModal.classList.toggle("closed") });
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.closeModalButton.addEventListener("click", () => { _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskModal.classList.toggle("closed") });
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskForm.addEventListener("submit", taskSubmit);  
    
    //Today, Week, and All in SideBar
    try {
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.todaysTasksSideBar.addEventListener("click", function(){ 
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('today', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject)});
         
            
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.thisWeekSideBar.addEventListener("click", function(){
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('this-week', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject)});
      
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.allTasksSideBar.addEventListener("click", function(){
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('all', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject)});
           
    }
    catch {
        console.log('failed to add event listeners');
    }

}

function addCardEventListeners(){
    //Completed
    //Edit
    //Remove
}

function addSideProjectEventListeners(){
    //Project Name
    try {
        console.log(_DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.sidebarProjectList.length);
        for (let i = 0; i < _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.sidebarProjectList.length; i++) {
            const projectLink = (_DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.sidebarProjectList[i][0]);
            projectLink.addEventListener('click',  function() {
                _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('byProject', projectLink.id);
                (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
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


/***/ }),

/***/ "./src/currentSettings.js":
/*!********************************!*\
  !*** ./src/currentSettings.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentSettings": () => (/* binding */ currentSettings)
/* harmony export */ });


const currentSettings = {
    viewBy: 'all',
    whichProject: null,

    update: function(newView, whichP = null) {
        this.viewBy = newView;
        this.whichProject = whichP;
    }

}

/***/ }),

/***/ "./src/masterList.js":
/*!***************************!*\
  !*** ./src/masterList.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "masterList": () => (/* binding */ masterList)
/* harmony export */ });


// There should only be one master list
let instance = null;

// Constructor to make task objects
class MasterList {
    constructor() { 
        if (instance) {
            throw new Error("You can only create one instance!");
        }
        instance = this;
        this.data = [];
    }

    addTask(task) {
        this.data.push(task);
    }

    removeTask(task) {
        this.data.splice(this.data.indexOf(task), 1);
    }

    editTask(task, attribute, value) {
        this.data[this.data.indexOf(task)][attribute] = value; 
    }

    sortByDate() {
        this.data.sort((a,b) => a.date - b.date);
    }

    produceProjectList(project) {
        const projectList = this.data.filter( (task) => task.project == project);
        projectList.sort((a,b) => a.date - b.date);
        return projectList;
    }

    getListOfProjects() {
        const allProjects = [];
        this.data.forEach( (task)=> {
            if (task.project != null && !allProjects.some((a)=> a===task.project)){
                allProjects.push(task.project);
            }
        }  )
        return allProjects;
    }
}

const masterList = new MasterList;

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAddTaskModal": () => (/* binding */ renderAddTaskModal),
/* harmony export */   "renderHeader": () => (/* binding */ renderHeader),
/* harmony export */   "renderMain": () => (/* binding */ renderMain),
/* harmony export */   "renderSideBar": () => (/* binding */ renderSideBar)
/* harmony export */ });



function renderMain(masterList, main, option, byProjectName = null) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let weekFromToday= new Date(today);
    weekFromToday.setDate(today.getDate() + 7);

    let todayGroup = null;
    let pastDue = null;
    let weekGroup = null;

    // First remove everything from main
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    if (option === 'byProject'){
        const projectList = masterList.produceProjectList(byProjectName);
        const projectHeading = document.createElement("div");
        projectHeading.classList.add('heading');
        projectHeading.textContent = byProjectName;
        main.append(projectHeading);
        for (let i = 0; i < projectList.length; i++){
            if (projectList[i].date >= today && projectList[i].date <= today && todayGroup == null) {
                todayGroup = 1;
                const todayHeading = document.createElement("div");
                todayHeading.classList.add('subheading');
                todayHeading.textContent = 'Today';
                main.append(todayHeading);
            } 
            if (projectList[i].date > today && todayGroup == 1)  {
                todayGroup = null;
                const lineBreak = document.createElement('hr');
                main.append(lineBreak);
            }
            main.append(projectList[i].htmlFormat());
        }
        return;
    }
    else {
        for (let i = 0; i < masterList.data.length; i++){
            if (masterList.data[i].date >= tomorrow && option === "today") {
                return;
            }; 

            if (masterList.data[i].date > weekFromToday && option === "this-week") {
                return;
            }; 


            // Past-Due Undone Block
            if (masterList.data[i].date < today  && pastDue == null && masterList.data[i].completed === false) {
                pastDue = 1;
                const pastDueHeading = document.createElement("div");
                pastDueHeading.classList.add('heading');
                pastDueHeading.textContent = 'Past Due';
                main.append(pastDueHeading);
            }
         
            if (masterList.data[i].date >= today && pastDue == 1) {
                pastDue = 2;
                const lineBreak = document.createElement('hr');
                main.append(lineBreak);
            }

            // Today Block
            if (masterList.data[i].date >= today && masterList.data[i].date < tomorrow && todayGroup == null) {
                todayGroup = 1;
                const todayHeading = document.createElement("div");
                todayHeading.classList.add('heading');
                todayHeading.textContent = 'Today';
                main.append(todayHeading);
            } 

            if (masterList.data[i].date >= tomorrow && todayGroup == 1) {
                todayGroup = 2;
                const lineBreak = document.createElement('hr');
                main.append(lineBreak);
            }

            if (masterList.data[i].date <= weekFromToday && masterList.data[i].date >= tomorrow && weekGroup == null) {
                weekGroup = 1;
                const weekHeading = document.createElement("div");
                weekHeading.classList.add('heading');
                weekHeading.textContent = 'This Week';
                main.append(weekHeading);
            } 

            if (masterList.data[i].date > weekFromToday && weekGroup == 1) {
                weekGroup = 2;
                const lineBreak = document.createElement('hr');
                main.append(lineBreak);
            }; 

           
            if ((masterList.data[i].completed === false && masterList.data[i].date < today) || masterList.data[i].date >= today){
                main.append(masterList.data[i].htmlFormat());
            }
        
           
        }

    }
}

function renderAddTaskModal(someDiv, arrayOfProjectNames) {
    const addTaskModal = document.createElement("div");
    addTaskModal.classList.add('modal');
    addTaskModal.classList.add('closed');
    addTaskModal.id = 'add-a-task-modal';

    const addTaskModalContent = document.createElement("div");
    addTaskModalContent.classList.add('modal-content');
    
    const taskForm = document.createElement("form");
    taskForm.id = 'task-form';
    
    const emptyDiv = document.createElement("div");
    const closeModalButton = document.createElement("div");
    closeModalButton.id = 'close-modal-button';

    closeModalButton.innerHTML = '&times';
    
    const labelForTaskContent = document.createElement("label");
    labelForTaskContent.for = 'task-content';
    labelForTaskContent.textContent = 'Task:'
    
    const taskContent = document.createElement("input");
    taskContent.type = 'text';
    taskContent.id = 'task-content';
    taskContent.name = 'task-content';
    taskContent.placeholder = 'Enter Task';
    taskContent.required = true;
    
    const labelForDate= document.createElement("label");
    labelForDate.for = 'date';
    labelForDate.textContent = 'Due:';

    const date = document.createElement("input");
    date.type = 'date';
    date.id = 'date';
    date.name = 'date';
    date.required = true;

    const priorityTitle = document.createElement("div");
    priorityTitle.textContent = 'Priority:';

    const priorityOptions = document.createElement("div");
    priorityOptions.id = 'priority-options';

    const option1 = document.createElement("div");
    const normalRadio = document.createElement("input");
    normalRadio.type = "radio";
    normalRadio.id = "normal";
    normalRadio.name = "priority";
    normalRadio.value = "normal";
    normalRadio.required = true;

    const normalRadioLabel = document.createElement("label");
    normalRadioLabel.for = "normal";
    normalRadioLabel.textContent = "Normal";

    const option2 = document.createElement("div");
    const highRadio = document.createElement("input");
    highRadio.type = "radio";
    highRadio.id = "high";
    highRadio.name = "priority";
    highRadio.value = "high";
    normalRadio.required = true;

    const highRadioLabel = document.createElement("label");
    highRadioLabel.for = "high";
    highRadioLabel.textContent = "High";

    const assignToProjectLabel = document.createElement("label");
    assignToProjectLabel.for = "project";
    assignToProjectLabel.textContent = "Project:"

    const assignToProject = document.createElement("input");
    assignToProject.name = "project";
    assignToProject.id = "project";
    assignToProject.placeholder = "Optional"
    assignToProject.setAttribute("list", "project-list");

    const assignToProjectDataList = document.createElement("datalist");
    assignToProjectDataList.id = "project-list";
   
    arrayOfProjectNames.forEach( (entry) => {
        const option = document.createElement("option")
        option.value = entry;
        option.textContent = entry; 
        assignToProjectDataList.append(option);
    })

    assignToProject.append(assignToProjectDataList);

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.id = "modal-submit";
    submitBtn.value = "Submit";
    submitBtn.textContent = "Submit";

    option1.append(normalRadio, normalRadioLabel);
    option2.append(highRadio, highRadioLabel);
    priorityOptions.append(option1, option2);
    taskForm.append(
        emptyDiv, 
        closeModalButton, 
        labelForTaskContent, 
        taskContent, 
        labelForDate, 
        date, 
        priorityTitle, 
        priorityOptions, 
        assignToProjectLabel, 
        assignToProject,
        submitBtn);
    addTaskModalContent.append(taskForm);
    addTaskModal.append(addTaskModalContent);
    someDiv.append(addTaskModal);
}

function renderSideBar(someDiv, masterList, arrayOfProjectNames) {
 

    const sidebarSection = document.createElement("section");
    sidebarSection.id = 'sidebar';
    const listByTime = document.createElement('ul');
    const listItem1 = document.createElement('li');
    const item1Anchor = document.createElement('a');
    item1Anchor.id = 'todays-tasks';
    item1Anchor.href = '#';
    item1Anchor.textContent = "Today";

    listItem1.append(item1Anchor);

    const listItem2 = document.createElement('li');
    const item2Anchor = document.createElement('a');
    item2Anchor.id = 'this-week';
    item2Anchor.href = '#';
    item2Anchor.textContent = "This Week";
    listItem2.append(item2Anchor);
    
    const listItem3 = document.createElement('li');
    const item3Anchor = document.createElement('a');
    item3Anchor.id = 'all-tasks';
    item3Anchor.href = '#';
    item3Anchor.textContent = "All";
    listItem3.append(item3Anchor);

    listByTime.append(listItem1, listItem2, listItem3);

    if (document.querySelector("#list-by-project")) {
        const deleteThis = document.querySelector("#list-by-project");
        deleteThis.parentNode.removeChild(deleteThis);
    }

    const listByProject = document.createElement('ul');
    listByProject.id = 'list-by-project';

    const makeLink = function(name, div) {
        const listItem = document.createElement('li');
        const itemAnchor = document.createElement('a');
        itemAnchor.id = name;
        itemAnchor.href = '#';
        itemAnchor.textContent = name;
        listItem.append(itemAnchor);
        div.append(listItem);
    }
    if (arrayOfProjectNames){
        arrayOfProjectNames.forEach(function(a){ makeLink(a, listByProject) } );
    }
    sidebarSection.append(listByTime, listByProject);
    someDiv.append(sidebarSection);   
}

function renderHeader(someDiv) {
    const header = document.createElement("header");
    const addTaskBtn = document.createElement("button");
    addTaskBtn.id = "add-a-task";
    addTaskBtn.textContent = "Add Task";
    header.append(addTaskBtn);
    someDiv.prepend(header);
}



/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");






const main = document.querySelector('main');

// Constructor to make task objects
class Task {

    constructor(date, content, priority, project = null) { 
        this.date = new Date(date);
        this.content = content;
        this.completed = false;
        this.priority = priority;
        this.project = project;
        this.id = Math.floor(Math.random()*100000000);
    }

    markDone() {
        this.completed = true;
    }

    htmlFormat() {
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "isCompletedCheckbox";
        checkbox.setAttribute('data-id', this.id);
        checkbox.checked = this.completed;
        checkbox.id = this.content;
    
        const taskName = document.createElement("div");
        taskName.classList.add('task-name');
        taskName.setAttribute('data-id', this.id);
        taskName.textContent = this.content;

        const taskDue = document.createElement("div");
        taskDue.classList.add('task-due-date');
        taskDue.setAttribute('data-id', this.id);
        taskDue.textContent = `Due: ${this.date.toLocaleString('default', {weekday: 'short' })},
           ${ this.date.toLocaleString('default', { month: 'short' })}. 
            ${ this.date.getDate()} `  
    
        const editTask = function(e) {
            console.log(e.target.parentElement.getAttribute("data-id"));
        }

        const removeTask = function(e) {
            const thisTask = _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data.filter( (t) => t.id == e.target.parentElement.getAttribute("data-id"));
            _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.removeTask(thisTask[0])
            // reRender();
            ;(0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_2__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_2__.currentSettings.whichProject);
        }
    
        const editBtn = document.createElement("button");
        editBtn.classList.add('edit-task');
        editBtn.setAttribute('data-id', this.id);
        editBtn.textContent = 'edit';
        editBtn.addEventListener("click", editTask);
    
        const removeBtn = document.createElement("button");
        removeBtn.classList.add('remove-task');
        removeBtn.setAttribute('data-id', this.id);
        removeBtn.textContent = 'remove';
        removeBtn.addEventListener("click", removeTask);
    
        const card = document.createElement("div");
        card.classList.add('card');
        card.setAttribute('data-id', this.id);
        if (this.priority == 'high') {
            card.classList.add('important');
        } 
        card.append(checkbox, taskName, taskDue, editBtn, removeBtn);
        return (card)
    } 
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _DOMCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMCache */ "./src/DOMCache.js");
/* harmony import */ var _addELs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addELs */ "./src/addELs.js");
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");










//  ###########     Sample tasks to test the app     ########### 

const sampleTask = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-23', 'Finish Odin Project', 'normal' );
sampleTask.completed = true;
const sampleTask2 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-23', 'Practice Kung fu', 'high' );
const sampleTask3 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-26', 'Cook a pie', 'normal' );
const sampleTask4 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-26', 'Sleep', 'high' );
const sampleTask5 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-28', 'Learn Ruby', 'normal' );
const sampleTask6 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-27', 'Code Tetris', 'high' );
const sampleTask7 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-10-01', 'Recycle', 'high' );
const sampleTask8 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-10-02', 'Swim', 'normal' );
const sampleTask9 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-10-23', 'Eat', 'high' );

_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask2);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask3);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask4);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask5);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask6);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask7);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask8);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask9);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.sortByDate();


_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask, 'project', 'Coding');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask5, 'project', 'Coding');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask6, 'project', 'Coding');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask3, 'completed', 'true');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask8, 'project', 'Health');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask9, 'project', 'Health');

// ***************


// Cache DOM and render each section
//const body = document.querySelector("body");
//const main = document.querySelector("main");

(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderHeader)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body);
(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList, _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.getListOfProjects());
(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderAddTaskModal)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.getListOfProjects());
(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList, _DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.main, _currentSettings__WEBPACK_IMPORTED_MODULE_5__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_5__.currentSettings.whichProject);

// Add eventlisteners to header and modal
(0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addInitialEventListeners)();
(0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addSideProjectEventListeners)();








})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCw2QkFBNkI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hTYTtBQUM2QjtBQUNKO0FBQ2M7OztBQUdwRDs7QUFFQTtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MscUNBQXFDLGtCQUFrQixFQUFFO0FBQy9GLGNBQWMsc0NBQXNDLGdCQUFnQixFQUFFO0FBQ3RFLGVBQWUscUJBQXFCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLCtEQUFzQjtBQUNuRCxZQUFZLDhEQUFxQjtBQUNqQztBQUNBLFlBQVksb0RBQVUsQ0FBQyxtREFBVSxRQUFRLG9FQUFzQixFQUFFLDBFQUE0QjtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7VUM1RUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWtCO0FBQ0U7QUFDaUQ7QUFDeEM7QUFDNkM7QUFDbkM7OztBQUdwRDs7QUFFQSx1QkFBdUIsd0NBQUk7QUFDM0I7QUFDQSx3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJOztBQUU1QiwyREFBa0I7QUFDbEIsMkRBQWtCO0FBQ2xCLDJEQUFrQjtBQUNsQiwyREFBa0I7QUFDbEIsMkRBQWtCO0FBQ2xCLDJEQUFrQjtBQUNsQiwyREFBa0I7QUFDbEIsMkRBQWtCO0FBQ2xCLDJEQUFrQjtBQUNsQiw4REFBcUI7OztBQUdyQiw0REFBbUI7QUFDbkIsNERBQW1CO0FBQ25CLDREQUFtQjtBQUNuQiw0REFBbUI7QUFDbkIsNERBQW1CO0FBQ25CLDREQUFtQjs7QUFFbkI7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQSxxREFBWSxDQUFDLCtDQUFRO0FBQ3JCLHNEQUFhLENBQUMsK0NBQVEsRUFBRSxtREFBVSxFQUFFLHFFQUE0QjtBQUNoRSwyREFBa0IsQ0FBQywrQ0FBUSxFQUFFLHFFQUE0QjtBQUN6RCxtREFBVSxDQUFDLG1EQUFVLEVBQUUsK0NBQVEsRUFBRSxvRUFBc0IsRUFBRSwwRUFBNEI7O0FBRXJGO0FBQ0EsaUVBQXdCO0FBQ3hCLHFFQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvRE9NQ2FjaGUuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9hZGRFTHMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9jdXJyZW50U2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9tYXN0ZXJMaXN0LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuZnVuY3Rpb24gZG9tKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldCBoZWFkZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlclwiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBhZGRUYXNrQnRuKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFza1wiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBhZGRUYXNrRm9ybSgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWZvcm1cIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgYWRkVGFza01vZGFsKCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1hLXRhc2stbW9kYWxcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgY2xvc2VNb2RhbEJ1dHRvbigpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbG9zZS1tb2RhbC1idXR0b25cIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgbmV3VGFza0NvbnRlbnQoKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1jb250ZW50XCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IG5ld1Rhc2tEYXRlKCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGVcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBuZXdUYXNrUHJpb3JpdHkoKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9cHJpb3JpdHldJyk7XG4gICAgICAgIH0sICBcbiAgICAgICAgZ2V0IG5ld1Rhc2tQcm9qZWN0KCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xuICAgICAgICB9LCAgICAgICAgICBcbiAgICAgICAgbWFpbixcbiAgICAgICAgYm9keSwgXG4gICAgICAgIGdldCBzaWRlQmFyKCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NpZGViYXJcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgdG9kYXlzVGFza3NTaWRlQmFyICgpe1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kYXlzLXRhc2tzXCIpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgdGhpc1dlZWtTaWRlQmFyKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGhpcy13ZWVrXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IGFsbFRhc2tzU2lkZUJhcigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FsbC10YXNrc1wiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBjYXJkRWRpdEJ0bnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXQtdGFzaycpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgY2FyZFJlbW92ZUJ0bnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlbW92ZS10YXNrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBjYXJkQ2hlY2tCb3hzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuYW1lPVwiaXNDb21wbGV0ZWRDaGVja2JveFwiXScpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgc2lkZWJhclByb2plY3RMaXN0KCkge1xuICAgICAgICAgICAgLy8gSSBuZWVkIHRoZSBhbmNob3IgdGFncyBuZXh0ZWQgaW5zaWRlIHRoZSBsaSdzXG4gICAgICAgICAgICBjb25zdCBsaXN0aXRlbXMgPSB0aGlzLnNpZGVCYXIuY2hpbGRyZW5bMV0uY2hpbGRyZW47XG4gICAgICAgICAgICBjb25zdCBhcnJheU9mUHJvamVjdExpbmtzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTwgbGlzdGl0ZW1zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBhcnJheU9mUHJvamVjdExpbmtzLnB1c2gobGlzdGl0ZW1zW2ldLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGFycmF5T2ZQcm9qZWN0TGlua3NcbiAgICAgICAgfSxcbiAgICB9XG4gfVxuXG5leHBvcnQgY29uc3QgRE9NID0gZG9tKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJTaWRlQmFyIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza3NcIjsgXG5pbXBvcnQgeyBjdXJyZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jdXJyZW50U2V0dGluZ3NcIjtcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTUNhY2hlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMoKXsgXG4gICAgLy8gICoqKiBBZGRUYXNrTW9kYWwgb3Blbiwgc3VibWl0LCBhbmQgY2xvc2UgYnRucyAqKipcblxuICAgIC8vIGNhbGxiYWNrIGZvciBzdWJtaXRcbiAgICBjb25zdCB0YXNrU3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcbiAgICAgICAgbGV0IG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgRE9NLm5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgRE9NLm5ld1Rhc2tQcmlvcml0eVZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSk7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayggRE9NLm5ld1Rhc2tEYXRlLnZhbHVlLCBET00ubmV3VGFza0NvbnRlbnQudmFsdWUsIERPTS5uZXdUYXNrUHJpb3JpdHlWYWx1ZSwgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlKTtcbiAgICAgICAgbWFzdGVyTGlzdC5hZGRUYXNrKG5ld1Rhc2spO1xuICAgICAgICBtYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcbiAgICAgICAgLy8gQ2xlYXIgdGhlIG1vZGFsIGlucHV0IGZpZWxkcyBcbiAgICAgICAgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlID0gbnVsbDtcbiAgICAgICAgRE9NLm5ld1Rhc2tEYXRlLnZhbHVlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgRE9NLm5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsOyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgcmVuZGVyU2lkZUJhcihET00uYm9keSwgbWFzdGVyTGlzdCwgbWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTsgXG4gICAgfVxuICAgIFxuICAgIERPTS5hZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKSB9KTtcbiAgICBET00uY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBET00uYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIikgfSk7XG4gICAgRE9NLmFkZFRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGFza1N1Ym1pdCk7ICBcbiAgICBcbiAgICAvL1RvZGF5LCBXZWVrLCBhbmQgQWxsIGluIFNpZGVCYXJcbiAgICB0cnkge1xuICAgICAgICBET00udG9kYXlzVGFza3NTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpeyBcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RvZGF5JywgbnVsbCk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KX0pO1xuICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgRE9NLnRoaXNXZWVrU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RoaXMtd2VlaycsIG51bGwpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBET00ubWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCl9KTtcbiAgICAgIFxuICAgICAgICBET00uYWxsVGFza3NTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgnYWxsJywgbnVsbCk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KX0pO1xuICAgICAgICAgICBcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCBldmVudCBsaXN0ZW5lcnMnKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENhcmRFdmVudExpc3RlbmVycygpe1xuICAgIC8vQ29tcGxldGVkXG4gICAgLy9FZGl0XG4gICAgLy9SZW1vdmVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKXtcbiAgICAvL1Byb2plY3QgTmFtZVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKERPTS5zaWRlYmFyUHJvamVjdExpc3QubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBET00uc2lkZWJhclByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TGluayA9IChET00uc2lkZWJhclByb2plY3RMaXN0W2ldWzBdKTtcbiAgICAgICAgICAgIHByb2plY3RMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2J5UHJvamVjdCcsIHByb2plY3RMaW5rLmlkKTtcbiAgICAgICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgICAvLyBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdieVByb2plY3QnLCBlbC5pZCk7XG4gICAgICAgICAgICAgICAvLyByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2F0Y2gge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCBlbCB0byBwcm9qZWN0cycpXG4gICAgfVxuICAgXG4gXG4gICAgLy9SZW1vdmUgcHJvamVjdCBidXR0b24gPyBcbn1cbiBcbi8qXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZURPTSgpe1xuXG5cbiAgICAvLyBDYWxsYmFjayBmb3IgY3JlYXRlIHRhc2sgc3VibWl0XG4gICAgY29uc3QgdGFza1N1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcbiAgICAgICAgbGV0IG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgbmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2soIG5ld1Rhc2tEYXRlLnZhbHVlLCBuZXdUYXNrQ29udGVudC52YWx1ZSwgbmV3VGFza1ByaW9yaXR5VmFsdWUsIG5ld1Rhc2tQcm9qZWN0LnZhbHVlKTtcbiAgICAgICAgbWFzdGVyTGlzdC5hZGRUYXNrKG5ld1Rhc2spO1xuICAgICAgICBtYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcbiAgICAgICAgbmV3VGFza0NvbnRlbnQudmFsdWUgPSBudWxsO1xuICAgICAgICBuZXdUYXNrRGF0ZS52YWx1ZSA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIG5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsOyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIG5ld1Rhc2tQcm9qZWN0LnZhbHVlID0gbnVsbDtcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgcmVuZGVyU2lkZUJhcihib2R5LCBtYXN0ZXJMaXN0LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlbnRsaXN0ZW5lcnNcbiAgICBjb25zb2xlLmxvZyhET00pO1xuICAgIERPTS5hZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpIH0pO1xuICAgIERPTS5jbG9zZU1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpIH0pO1xuICAgIERPTS5hZGRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRhc2tTdWJtaXQpOyAgXG59XG5cblxuLy8gQWRkIGV2ZW50bGlzdGVuZXJzIHRvIHNpZGViYXJcbmV4cG9ydCBjb25zdCBhZGRTaWRlQmFyRXZlbnRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gIFxuICAgIHRyeSB7XG5cbiAgICAgICAgRE9NLnRvZGF5c1Rhc2tzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0b2RheScsIG51bGwpO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KX0pO1xuXG4gICAgIFxuICAgICAgICB3ZWVrc1Rhc2tzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0aGlzLXdlZWsnLCBudWxsKTtcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBET00ubWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCl9KTtcblxuICAgICAgXG4gICAgICAgIERPTS5hbGxUYXNrcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgnYWxsJywgbnVsbCk7XG4gICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgbWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCl9KTtcbiAgICAgICBcbiAgICAgICAgRE9NLnNpZGViYXJQcm9qZWN0TGlzdC5mb3JFYWNoKCAgICAoaXRlbSkgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2J5UHJvamVjdCcsIGVsLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgRE9NLm1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgfSApO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmYWlsZWQnKTtcbiAgICB9XG59O1xuXG4qL1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBjb25zdCBjdXJyZW50U2V0dGluZ3MgPSB7XG4gICAgdmlld0J5OiAnYWxsJyxcbiAgICB3aGljaFByb2plY3Q6IG51bGwsXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKG5ld1ZpZXcsIHdoaWNoUCA9IG51bGwpIHtcbiAgICAgICAgdGhpcy52aWV3QnkgPSBuZXdWaWV3O1xuICAgICAgICB0aGlzLndoaWNoUHJvamVjdCA9IHdoaWNoUDtcbiAgICB9XG5cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gVGhlcmUgc2hvdWxkIG9ubHkgYmUgb25lIG1hc3RlciBsaXN0XG5sZXQgaW5zdGFuY2UgPSBudWxsO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuY2xhc3MgTWFzdGVyTGlzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7IFxuICAgICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW4gb25seSBjcmVhdGUgb25lIGluc3RhbmNlIVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIH1cblxuICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICB0aGlzLmRhdGEucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZih0YXNrKSwgMSk7XG4gICAgfVxuXG4gICAgZWRpdFRhc2sodGFzaywgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmRhdGFbdGhpcy5kYXRhLmluZGV4T2YodGFzayldW2F0dHJpYnV0ZV0gPSB2YWx1ZTsgXG4gICAgfVxuXG4gICAgc29ydEJ5RGF0ZSgpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNvcnQoKGEsYikgPT4gYS5kYXRlIC0gYi5kYXRlKTtcbiAgICB9XG5cbiAgICBwcm9kdWNlUHJvamVjdExpc3QocHJvamVjdCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IHRoaXMuZGF0YS5maWx0ZXIoICh0YXNrKSA9PiB0YXNrLnByb2plY3QgPT0gcHJvamVjdCk7XG4gICAgICAgIHByb2plY3RMaXN0LnNvcnQoKGEsYikgPT4gYS5kYXRlIC0gYi5kYXRlKTtcbiAgICAgICAgcmV0dXJuIHByb2plY3RMaXN0O1xuICAgIH1cblxuICAgIGdldExpc3RPZlByb2plY3RzKCkge1xuICAgICAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCggKHRhc2spPT4ge1xuICAgICAgICAgICAgaWYgKHRhc2sucHJvamVjdCAhPSBudWxsICYmICFhbGxQcm9qZWN0cy5zb21lKChhKT0+IGE9PT10YXNrLnByb2plY3QpKXtcbiAgICAgICAgICAgICAgICBhbGxQcm9qZWN0cy5wdXNoKHRhc2sucHJvamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gIClcbiAgICAgICAgcmV0dXJuIGFsbFByb2plY3RzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1hc3Rlckxpc3QgPSBuZXcgTWFzdGVyTGlzdDsiLCJcInVzZSBzdHJpY3RcIlxuXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIG9wdGlvbiwgYnlQcm9qZWN0TmFtZSA9IG51bGwpIHtcbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGxldCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICB0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDEpO1xuXG4gICAgbGV0IHdlZWtGcm9tVG9kYXk9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICB3ZWVrRnJvbVRvZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNyk7XG5cbiAgICBsZXQgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgbGV0IHBhc3REdWUgPSBudWxsO1xuICAgIGxldCB3ZWVrR3JvdXAgPSBudWxsO1xuXG4gICAgLy8gRmlyc3QgcmVtb3ZlIGV2ZXJ5dGhpbmcgZnJvbSBtYWluXG4gICAgd2hpbGUgKG1haW4uZmlyc3RDaGlsZCkge1xuICAgICAgICBtYWluLnJlbW92ZUNoaWxkKG1haW4uZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbiA9PT0gJ2J5UHJvamVjdCcpe1xuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IG1hc3Rlckxpc3QucHJvZHVjZVByb2plY3RMaXN0KGJ5UHJvamVjdE5hbWUpO1xuICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHByb2plY3RIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgcHJvamVjdEhlYWRpbmcudGV4dENvbnRlbnQgPSBieVByb2plY3ROYW1lO1xuICAgICAgICBtYWluLmFwcGVuZChwcm9qZWN0SGVhZGluZyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdExpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUgPj0gdG9kYXkgJiYgcHJvamVjdExpc3RbaV0uZGF0ZSA8PSB0b2RheSAmJiB0b2RheUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RheUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdzdWJoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TGlzdFtpXS5kYXRlID4gdG9kYXkgJiYgdG9kYXlHcm91cCA9PSAxKSAge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1haW4uYXBwZW5kKHByb2plY3RMaXN0W2ldLmh0bWxGb3JtYXQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXN0ZXJMaXN0LmRhdGEubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93ICYmIG9wdGlvbiA9PT0gXCJ0b2RheVwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTsgXG5cbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+IHdlZWtGcm9tVG9kYXkgJiYgb3B0aW9uID09PSBcInRoaXMtd2Vla1wiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTsgXG5cblxuICAgICAgICAgICAgLy8gUGFzdC1EdWUgVW5kb25lIEJsb2NrXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b2RheSAgJiYgcGFzdER1ZSA9PSBudWxsICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5jb21wbGV0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcGFzdER1ZSA9IDE7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFzdER1ZUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHBhc3REdWVIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICBwYXN0RHVlSGVhZGluZy50ZXh0Q29udGVudCA9ICdQYXN0IER1ZSc7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQocGFzdER1ZUhlYWRpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9kYXkgJiYgcGFzdER1ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcGFzdER1ZSA9IDI7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUb2RheSBCbG9ja1xuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5ICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9tb3Jyb3cgJiYgdG9kYXlHcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IDE7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b21vcnJvdyAmJiB0b2RheUdyb3VwID09IDEpIHtcbiAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMjtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8PSB3ZWVrRnJvbVRvZGF5ICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93ICYmIHdlZWtHcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgd2Vla0dyb3VwID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCB3ZWVrSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgd2Vla0hlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHdlZWtIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RoaXMgV2Vlayc7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQod2Vla0hlYWRpbmcpO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiB3ZWVrR3JvdXAgPT0gMSkge1xuICAgICAgICAgICAgICAgIHdlZWtHcm91cCA9IDI7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfTsgXG5cbiAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoKG1hc3Rlckxpc3QuZGF0YVtpXS5jb21wbGV0ZWQgPT09IGZhbHNlICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9kYXkpIHx8IG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5KXtcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChtYXN0ZXJMaXN0LmRhdGFbaV0uaHRtbEZvcm1hdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBZGRUYXNrTW9kYWwoc29tZURpdiwgYXJyYXlPZlByb2plY3ROYW1lcykge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpO1xuICAgIGFkZFRhc2tNb2RhbC5pZCA9ICdhZGQtYS10YXNrLW1vZGFsJztcblxuICAgIGNvbnN0IGFkZFRhc2tNb2RhbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgdGFza0Zvcm0uaWQgPSAndGFzay1mb3JtJztcbiAgICBcbiAgICBjb25zdCBlbXB0eURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5pZCA9ICdjbG9zZS1tb2RhbC1idXR0b24nO1xuXG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzJztcbiAgICBcbiAgICBjb25zdCBsYWJlbEZvclRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsRm9yVGFza0NvbnRlbnQuZm9yID0gJ3Rhc2stY29udGVudCc7XG4gICAgbGFiZWxGb3JUYXNrQ29udGVudC50ZXh0Q29udGVudCA9ICdUYXNrOidcbiAgICBcbiAgICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0YXNrQ29udGVudC50eXBlID0gJ3RleHQnO1xuICAgIHRhc2tDb250ZW50LmlkID0gJ3Rhc2stY29udGVudCc7XG4gICAgdGFza0NvbnRlbnQubmFtZSA9ICd0YXNrLWNvbnRlbnQnO1xuICAgIHRhc2tDb250ZW50LnBsYWNlaG9sZGVyID0gJ0VudGVyIFRhc2snO1xuICAgIHRhc2tDb250ZW50LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBcbiAgICBjb25zdCBsYWJlbEZvckRhdGU9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBsYWJlbEZvckRhdGUuZm9yID0gJ2RhdGUnO1xuICAgIGxhYmVsRm9yRGF0ZS50ZXh0Q29udGVudCA9ICdEdWU6JztcblxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgZGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgIGRhdGUuaWQgPSAnZGF0ZSc7XG4gICAgZGF0ZS5uYW1lID0gJ2RhdGUnO1xuICAgIGRhdGUucmVxdWlyZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgcHJpb3JpdHlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJpb3JpdHlUaXRsZS50ZXh0Q29udGVudCA9ICdQcmlvcml0eTonO1xuXG4gICAgY29uc3QgcHJpb3JpdHlPcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eU9wdGlvbnMuaWQgPSAncHJpb3JpdHktb3B0aW9ucyc7XG5cbiAgICBjb25zdCBvcHRpb24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBub3JtYWxSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBub3JtYWxSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgIG5vcm1hbFJhZGlvLmlkID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpby5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgIG5vcm1hbFJhZGlvLnZhbHVlID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpby5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBub3JtYWxSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIG5vcm1hbFJhZGlvTGFiZWwuZm9yID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gXCJOb3JtYWxcIjtcblxuICAgIGNvbnN0IG9wdGlvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGhpZ2hSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBoaWdoUmFkaW8udHlwZSA9IFwicmFkaW9cIjtcbiAgICBoaWdoUmFkaW8uaWQgPSBcImhpZ2hcIjtcbiAgICBoaWdoUmFkaW8ubmFtZSA9IFwicHJpb3JpdHlcIjtcbiAgICBoaWdoUmFkaW8udmFsdWUgPSBcImhpZ2hcIjtcbiAgICBub3JtYWxSYWRpby5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBoaWdoUmFkaW9MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBoaWdoUmFkaW9MYWJlbC5mb3IgPSBcImhpZ2hcIjtcbiAgICBoaWdoUmFkaW9MYWJlbC50ZXh0Q29udGVudCA9IFwiSGlnaFwiO1xuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwuZm9yID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwudGV4dENvbnRlbnQgPSBcIlByb2plY3Q6XCJcblxuICAgIGNvbnN0IGFzc2lnblRvUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3QubmFtZSA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdC5pZCA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdC5wbGFjZWhvbGRlciA9IFwiT3B0aW9uYWxcIlxuICAgIGFzc2lnblRvUHJvamVjdC5zZXRBdHRyaWJ1dGUoXCJsaXN0XCIsIFwicHJvamVjdC1saXN0XCIpO1xuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGF0YWxpc3RcIik7XG4gICAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuaWQgPSBcInByb2plY3QtbGlzdFwiO1xuICAgXG4gICAgYXJyYXlPZlByb2plY3ROYW1lcy5mb3JFYWNoKCAoZW50cnkpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuICAgICAgICBvcHRpb24udmFsdWUgPSBlbnRyeTtcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gZW50cnk7IFxuICAgICAgICBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdC5hcHBlbmQob3B0aW9uKTtcbiAgICB9KVxuXG4gICAgYXNzaWduVG9Qcm9qZWN0LmFwcGVuZChhc3NpZ25Ub1Byb2plY3REYXRhTGlzdCk7XG5cbiAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHN1Ym1pdEJ0bi50eXBlID0gXCJzdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4uaWQgPSBcIm1vZGFsLXN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi52YWx1ZSA9IFwiU3VibWl0XCI7XG4gICAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gXCJTdWJtaXRcIjtcblxuICAgIG9wdGlvbjEuYXBwZW5kKG5vcm1hbFJhZGlvLCBub3JtYWxSYWRpb0xhYmVsKTtcbiAgICBvcHRpb24yLmFwcGVuZChoaWdoUmFkaW8sIGhpZ2hSYWRpb0xhYmVsKTtcbiAgICBwcmlvcml0eU9wdGlvbnMuYXBwZW5kKG9wdGlvbjEsIG9wdGlvbjIpO1xuICAgIHRhc2tGb3JtLmFwcGVuZChcbiAgICAgICAgZW1wdHlEaXYsIFxuICAgICAgICBjbG9zZU1vZGFsQnV0dG9uLCBcbiAgICAgICAgbGFiZWxGb3JUYXNrQ29udGVudCwgXG4gICAgICAgIHRhc2tDb250ZW50LCBcbiAgICAgICAgbGFiZWxGb3JEYXRlLCBcbiAgICAgICAgZGF0ZSwgXG4gICAgICAgIHByaW9yaXR5VGl0bGUsIFxuICAgICAgICBwcmlvcml0eU9wdGlvbnMsIFxuICAgICAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbCwgXG4gICAgICAgIGFzc2lnblRvUHJvamVjdCxcbiAgICAgICAgc3VibWl0QnRuKTtcbiAgICBhZGRUYXNrTW9kYWxDb250ZW50LmFwcGVuZCh0YXNrRm9ybSk7XG4gICAgYWRkVGFza01vZGFsLmFwcGVuZChhZGRUYXNrTW9kYWxDb250ZW50KTtcbiAgICBzb21lRGl2LmFwcGVuZChhZGRUYXNrTW9kYWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2lkZUJhcihzb21lRGl2LCBtYXN0ZXJMaXN0LCBhcnJheU9mUHJvamVjdE5hbWVzKSB7XG4gXG5cbiAgICBjb25zdCBzaWRlYmFyU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgIHNpZGViYXJTZWN0aW9uLmlkID0gJ3NpZGViYXInO1xuICAgIGNvbnN0IGxpc3RCeVRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIGNvbnN0IGxpc3RJdGVtMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgaXRlbTFBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaXRlbTFBbmNob3IuaWQgPSAndG9kYXlzLXRhc2tzJztcbiAgICBpdGVtMUFuY2hvci5ocmVmID0gJyMnO1xuICAgIGl0ZW0xQW5jaG9yLnRleHRDb250ZW50ID0gXCJUb2RheVwiO1xuXG4gICAgbGlzdEl0ZW0xLmFwcGVuZChpdGVtMUFuY2hvcik7XG5cbiAgICBjb25zdCBsaXN0SXRlbTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW0yQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW0yQW5jaG9yLmlkID0gJ3RoaXMtd2Vlayc7XG4gICAgaXRlbTJBbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtMkFuY2hvci50ZXh0Q29udGVudCA9IFwiVGhpcyBXZWVrXCI7XG4gICAgbGlzdEl0ZW0yLmFwcGVuZChpdGVtMkFuY2hvcik7XG4gICAgXG4gICAgY29uc3QgbGlzdEl0ZW0zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBpdGVtM0FuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpdGVtM0FuY2hvci5pZCA9ICdhbGwtdGFza3MnO1xuICAgIGl0ZW0zQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgaXRlbTNBbmNob3IudGV4dENvbnRlbnQgPSBcIkFsbFwiO1xuICAgIGxpc3RJdGVtMy5hcHBlbmQoaXRlbTNBbmNob3IpO1xuXG4gICAgbGlzdEJ5VGltZS5hcHBlbmQobGlzdEl0ZW0xLCBsaXN0SXRlbTIsIGxpc3RJdGVtMyk7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaXN0LWJ5LXByb2plY3RcIikpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlVGhpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdC1ieS1wcm9qZWN0XCIpO1xuICAgICAgICBkZWxldGVUaGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZGVsZXRlVGhpcyk7XG4gICAgfVxuXG4gICAgY29uc3QgbGlzdEJ5UHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgbGlzdEJ5UHJvamVjdC5pZCA9ICdsaXN0LWJ5LXByb2plY3QnO1xuXG4gICAgY29uc3QgbWFrZUxpbmsgPSBmdW5jdGlvbihuYW1lLCBkaXYpIHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBjb25zdCBpdGVtQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBpdGVtQW5jaG9yLmlkID0gbmFtZTtcbiAgICAgICAgaXRlbUFuY2hvci5ocmVmID0gJyMnO1xuICAgICAgICBpdGVtQW5jaG9yLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kKGl0ZW1BbmNob3IpO1xuICAgICAgICBkaXYuYXBwZW5kKGxpc3RJdGVtKTtcbiAgICB9XG4gICAgaWYgKGFycmF5T2ZQcm9qZWN0TmFtZXMpe1xuICAgICAgICBhcnJheU9mUHJvamVjdE5hbWVzLmZvckVhY2goZnVuY3Rpb24oYSl7IG1ha2VMaW5rKGEsIGxpc3RCeVByb2plY3QpIH0gKTtcbiAgICB9XG4gICAgc2lkZWJhclNlY3Rpb24uYXBwZW5kKGxpc3RCeVRpbWUsIGxpc3RCeVByb2plY3QpO1xuICAgIHNvbWVEaXYuYXBwZW5kKHNpZGViYXJTZWN0aW9uKTsgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckhlYWRlcihzb21lRGl2KSB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBhZGRUYXNrQnRuLmlkID0gXCJhZGQtYS10YXNrXCI7XG4gICAgYWRkVGFza0J0bi50ZXh0Q29udGVudCA9IFwiQWRkIFRhc2tcIjtcbiAgICBoZWFkZXIuYXBwZW5kKGFkZFRhc2tCdG4pO1xuICAgIHNvbWVEaXYucHJlcGVuZChoZWFkZXIpO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbmltcG9ydCB7IG1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyByZW5kZXJNYWluIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5pbXBvcnQgeyBjdXJyZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jdXJyZW50U2V0dGluZ3NcIjtcblxuXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuZXhwb3J0IGNsYXNzIFRhc2sge1xuXG4gICAgY29uc3RydWN0b3IoZGF0ZSwgY29udGVudCwgcHJpb3JpdHksIHByb2plY3QgPSBudWxsKSB7IFxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICB0aGlzLmlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwMDAwMCk7XG4gICAgfVxuXG4gICAgbWFya0RvbmUoKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBodG1sRm9ybWF0KCkge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBcImlzQ29tcGxldGVkQ2hlY2tib3hcIjtcbiAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGhpcy5pZCk7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0aGlzLmNvbXBsZXRlZDtcbiAgICAgICAgY2hlY2tib3guaWQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgXG4gICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFzay1uYW1lJyk7XG4gICAgICAgIHRhc2tOYW1lLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRoaXMuaWQpO1xuICAgICAgICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRoaXMuY29udGVudDtcblxuICAgICAgICBjb25zdCB0YXNrRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGFza0R1ZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWR1ZS1kYXRlJyk7XG4gICAgICAgIHRhc2tEdWUuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGhpcy5pZCk7XG4gICAgICAgIHRhc2tEdWUudGV4dENvbnRlbnQgPSBgRHVlOiAke3RoaXMuZGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHt3ZWVrZGF5OiAnc2hvcnQnIH0pfSxcbiAgICAgICAgICAgJHsgdGhpcy5kYXRlLnRvTG9jYWxlU3RyaW5nKCdkZWZhdWx0JywgeyBtb250aDogJ3Nob3J0JyB9KX0uIFxuICAgICAgICAgICAgJHsgdGhpcy5kYXRlLmdldERhdGUoKX0gYCAgXG4gICAgXG4gICAgICAgIGNvbnN0IGVkaXRUYXNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlbW92ZVRhc2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBjb25zdCB0aGlzVGFzayA9IG1hc3Rlckxpc3QuZGF0YS5maWx0ZXIoICh0KSA9PiB0LmlkID09IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSk7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0LnJlbW92ZVRhc2sodGhpc1Rhc2tbMF0pXG4gICAgICAgICAgICAvLyByZVJlbmRlcigpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgICAgICAgZWRpdEJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0aGlzLmlkKTtcbiAgICAgICAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdlZGl0JztcbiAgICAgICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdFRhc2spO1xuICAgIFxuICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgICAgICAgcmVtb3ZlQnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRoaXMuaWQpO1xuICAgICAgICByZW1vdmVCdG4udGV4dENvbnRlbnQgPSAncmVtb3ZlJztcbiAgICAgICAgcmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW1vdmVUYXNrKTtcbiAgICBcbiAgICAgICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgICAgICBjYXJkLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRoaXMuaWQpO1xuICAgICAgICBpZiAodGhpcy5wcmlvcml0eSA9PSAnaGlnaCcpIHtcbiAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50Jyk7XG4gICAgICAgIH0gXG4gICAgICAgIGNhcmQuYXBwZW5kKGNoZWNrYm94LCB0YXNrTmFtZSwgdGFza0R1ZSwgZWRpdEJ0biwgcmVtb3ZlQnRuKTtcbiAgICAgICAgcmV0dXJuIChjYXJkKVxuICAgIH0gXG59O1xuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01DYWNoZVwiO1xuaW1wb3J0IHsgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzLCBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vYWRkRUxzXCI7XG5pbXBvcnQgeyBtYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyQWRkVGFza01vZGFsLCByZW5kZXJTaWRlQmFyLCByZW5kZXJIZWFkZXIgfSBmcm9tIFwiLi9yZW5kZXJcIjtcbmltcG9ydCB7IGN1cnJlbnRTZXR0aW5ncyB9IGZyb20gXCIuL2N1cnJlbnRTZXR0aW5nc1wiO1xuXG5cbi8vICAjIyMjIyMjIyMjIyAgICAgU2FtcGxlIHRhc2tzIHRvIHRlc3QgdGhlIGFwcCAgICAgIyMjIyMjIyMjIyMgXG5cbmNvbnN0IHNhbXBsZVRhc2sgPSBuZXcgVGFzayggJzIwMjItMDktMjMnLCAnRmluaXNoIE9kaW4gUHJvamVjdCcsICdub3JtYWwnICk7XG5zYW1wbGVUYXNrLmNvbXBsZXRlZCA9IHRydWU7XG5jb25zdCBzYW1wbGVUYXNrMiA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdQcmFjdGljZSBLdW5nIGZ1JywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrMyA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yNicsICdDb29rIGEgcGllJywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s0ID0gbmV3IFRhc2soICcyMDIyLTA5LTI2JywgJ1NsZWVwJywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrNSA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yOCcsICdMZWFybiBSdWJ5JywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s2ID0gbmV3IFRhc2soICcyMDIyLTA5LTI3JywgJ0NvZGUgVGV0cmlzJywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrNyA9IG5ldyBUYXNrKCAnMjAyMi0xMC0wMScsICdSZWN5Y2xlJywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrOCA9IG5ldyBUYXNrKCAnMjAyMi0xMC0wMicsICdTd2ltJywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s5ID0gbmV3IFRhc2soICcyMDIyLTEwLTIzJywgJ0VhdCcsICdoaWdoJyApO1xuXG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzayk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazIpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2szKTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNCk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazUpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s2KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNyk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazgpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s5KTtcbm1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuXG5cbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzaywgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s1LCAncHJvamVjdCcsICdDb2RpbmcnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazYsICdwcm9qZWN0JywgJ0NvZGluZycpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrMywgJ2NvbXBsZXRlZCcsICd0cnVlJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s4LCAncHJvamVjdCcsICdIZWFsdGgnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazksICdwcm9qZWN0JywgJ0hlYWx0aCcpO1xuXG4vLyAqKioqKioqKioqKioqKipcblxuXG4vLyBDYWNoZSBET00gYW5kIHJlbmRlciBlYWNoIHNlY3Rpb25cbi8vY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuLy9jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbnJlbmRlckhlYWRlcihET00uYm9keSk7XG5yZW5kZXJTaWRlQmFyKERPTS5ib2R5LCBtYXN0ZXJMaXN0LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xucmVuZGVyQWRkVGFza01vZGFsKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xucmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBET00ubWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG5cbi8vIEFkZCBldmVudGxpc3RlbmVycyB0byBoZWFkZXIgYW5kIG1vZGFsXG5hZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMoKTtcbmFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcblxuXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9