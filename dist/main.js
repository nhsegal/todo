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
        get listByProject() {
            return document.querySelector('#list-by-project');
        },
        get sidebarProjectList() {
            // I need the anchor tags nexted inside the li's
            const listitems = Array.from(document.querySelector("#sidebar").children[1].children);
            let queryStr = '';
            for (let i = 0; i< listitems.length; i++){
                queryStr = queryStr + '#' + listitems[i].firstChild.id 
                if (i< listitems.length-1) {
                    queryStr = queryStr + ', ';
                }
            }
            if (queryStr === ''){
                console.log('null query')
                queryStr = null;
            }
            const nodeList = document.querySelectorAll(queryStr);
            return nodeList
        },
        get sidebarProjectListRemove() {
            const listitems = Array.from(document.querySelector("#sidebar").children[1].children);
            const listOfRemoveBtns = [];
            for (let i = 0; i< listitems.length; i++){
                listOfRemoveBtns.push(listitems[i].lastChild);
            }
        
            return listOfRemoveBtns

        }
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
/* harmony export */   "addInitialEventListeners": () => (/* binding */ addInitialEventListeners),
/* harmony export */   "addMainEventListeners": () => (/* binding */ addMainEventListeners),
/* harmony export */   "addSideProjectEventListeners": () => (/* binding */ addSideProjectEventListeners),
/* harmony export */   "addSideTimeEventListeners": () => (/* binding */ addSideTimeEventListeners)
/* harmony export */ });
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");
/* harmony import */ var _DOMCache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DOMCache */ "./src/DOMCache.js");




 



let editting = false;
let IDNumber = null;

function addInitialEventListeners(){ 
//  *** AddTaskModal open, submit, and close btn ELs ***

    // callback for submit
    const taskSubmit = function(e) {
        e.preventDefault();
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskModal.classList.toggle("closed");
        if (editting){
            const taskToEdit = _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data.filter((t)=> t.id == IDNumber)[0];
            _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.editTask(taskToEdit, "content", _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskContent.value);
            _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.editTask(taskToEdit, "date", new Date(_DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskDate.value));
            let option = Array.from(_DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriority).filter(e => e['checked'])[0] ; 
            console.log(option.value)
            _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.editTask(taskToEdit, "priority", option.value);
            _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.editTask(taskToEdit, "project", _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskProject.value);
     
        }
        else {
            let newTaskPriorityValue = null;
            for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriority) {
                if (option.checked) {
                    newTaskPriorityValue = option.value;
                }
            }
        
            const newTask = new _tasks__WEBPACK_IMPORTED_MODULE_2__.Task( _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskDate.value, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskContent.value, newTaskPriorityValue, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskProject.value);
            _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.addTask(newTask);

        }
     
     
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.sortByDate();
        // Clear the modal input fields 
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskContent.value = null;
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskDate.value = null;
        for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriority) {
            _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriorityValue = null;            
        }
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskProject.value = null;
        
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.getListOfProjects()); 
        addSideProjectEventListeners();
        addSideTimeEventListeners();
        addMainEventListeners();
    }

    _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskBtn.addEventListener("click", () => {  editting = false;
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskModal.classList.toggle("closed") });
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.closeModalButton.addEventListener("click", () => { _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskModal.classList.toggle("closed") });
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskForm.addEventListener("submit", taskSubmit);  
    
    //Today, Week, and All sideBar ELs
    try {
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.todaysTasksSideBar.addEventListener("click", function(){ 
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('today', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
            addMainEventListeners();
        });
         
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.thisWeekSideBar.addEventListener("click", function(){
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('this-week', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
            addMainEventListeners();
        });
      
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.allTasksSideBar.addEventListener("click", function(){
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('all', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
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
        let task = _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data.filter((e)=> e.id == taskID);
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
        const taskToEdit = _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data.filter((t)=> t.id == IDNumber)[0];
        let yyyy = taskToEdit.date.getFullYear();
        let mm = taskToEdit.date.getMonth()+1;
        let dd = taskToEdit.date.getDate();
        let taskDate = String(10000 * yyyy + 100 * mm + dd);
        taskDate = taskDate.slice(0,4)+'-'+taskDate.slice(4,6) + '-' +taskDate.slice(6,8);
        console.log(taskDate)
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskContent.value = taskToEdit.content;
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskDate.value = taskDate;
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskProject.value = taskToEdit.project;
        for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriority) {
            if (option.value === task.priority) {
                option.checked = true;
            }
        }
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskModal.classList.toggle("closed");
        





    }

    const removeTask = function(e) {
        const thisTask = _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data.filter( (t) => t.id == e.target.parentElement.getAttribute("data-id"));
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.removeTask(thisTask[0]);
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList.splice(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList.indexOf(thisTask[0]), 1);
        // reRender();
        // reAttachEl();
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
        addMainEventListeners();
    }
    
    const editBtn = document.querySelectorAll(`[data-id="${task.id}"] button`)[0];
    editBtn.addEventListener("click", editTask);
    
    const removeBtn = document.querySelectorAll(`[data-id="${task.id}"] button`)[1];
    removeBtn.addEventListener("click", removeTask);
} 

function addMainEventListeners(){
    for (let item of _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList) {
        addCardEventListeners(item);
    }
}


function addSideProjectEventListeners(){
    const removeThis = function (e) {
        if (confirm("Delete this project and all tasks in it?")) {
            const tasksToRemove = _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.produceProjectList(e.target.id.slice(0,-6))
            console.log(tasksToRemove);
            for (const item of tasksToRemove){
                _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.removeTask(item);
                
            }
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
                (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.getListOfProjects()); 
                addSideProjectEventListeners();
                addSideTimeEventListeners();
                addMainEventListeners();
          } 
          else {
            console.log("You pressed Cancel!");
          }
    }

    for (let i = 0; i < _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.sidebarProjectListRemove.length; i++) {
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.sidebarProjectListRemove[i].addEventListener('click', removeThis);
    }
    // SideBar Project Name ELs
    try {
        for (let i = 0; i < _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.sidebarProjectList.length; i++) {
            const projectLink = (_DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.sidebarProjectList[i]);
     
            projectLink.addEventListener('click', function() {
                console.log(projectLink)
                _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('byProject', projectLink.id);
                (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
                addMainEventListeners();
            });
        }
       
    }

    catch {
        console.log('failed to add el to projects')
    }
    //Remove project button ? 
   
    
}
 
function addSideTimeEventListeners(){
    try {
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.todaysTasksSideBar.addEventListener("click", function(){ 
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('today', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
            addMainEventListeners();
        });
         
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.thisWeekSideBar.addEventListener("click", function(){
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('this-week', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
            addMainEventListeners();
        });
      
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.allTasksSideBar.addEventListener("click", function(){
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('all', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
            addMainEventListeners();
        });
    }
    catch {
        console.log('failed to add today/week/all ELs')
    }
   
}

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
        this.displayedList = [];
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
            if (task.project != null &&  task.project != '' && !allProjects.some((a)=> a === task.project)){
                allProjects.push(task.project);
            }
        })
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
/* harmony import */ var _DOMCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMCache */ "./src/DOMCache.js");

;

function renderCard(task) {
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "isCompletedCheckbox";
    checkbox.setAttribute('data-id', task.id);
    checkbox.checked = task.completed;
    checkbox.id = task.content;
    
    const taskName = document.createElement("div");
    taskName.classList.add('task-name');
    taskName.setAttribute('data-id', task.id);
    taskName.textContent = task.content;

    const taskDue = document.createElement("div");
    taskDue.classList.add('task-due-date');
    taskDue.setAttribute('data-id', task.id);
    taskDue.textContent = `Due: ${task.date.toLocaleString('default', {weekday: 'short' })},
        ${ task.date.toLocaleString('default', { month: 'short' })}. 
        ${ task.date.getDate()} `  
    
    const editBtn = document.createElement("button");
    editBtn.classList.add('edit-task');
    editBtn.setAttribute('data-id', task.id);
    editBtn.textContent = 'edit';
 
    
    const removeBtn = document.createElement("button");
    removeBtn.classList.add('remove-task');
    removeBtn.setAttribute('data-id', task.id);
    removeBtn.textContent = 'remove';
 
    
    const card = document.createElement("div");
    card.classList.add('card');
    card.setAttribute('data-id', task.id);
    if (task.priority == 'high') {
        card.classList.add('important');
    } 
    card.append(checkbox, taskName, taskDue, editBtn, removeBtn);
    return (card)
}

function renderMain(masterList, option, byProjectName = null) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let weekFromToday= new Date(today);
    weekFromToday.setDate(today.getDate() + 7);

    let todayGroup = null;
    let pastDue = null;
    let weekGroup = null;

    // First remove everything from main and from displayList
    while (_DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.firstChild) {
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.removeChild(_DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.firstChild);
        masterList.displayedList.splice(0, masterList.displayedList.length);
    }

    if (option === 'byProject'){
        const projectList = masterList.produceProjectList(byProjectName);
        const projectHeading = document.createElement("div");
        projectHeading.classList.add('heading');
        projectHeading.textContent = byProjectName;
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(projectHeading);
        for (let i = 0; i < projectList.length; i++){
            if (projectList[i].date >= today && projectList[i].date <= today && todayGroup == null) {
                todayGroup = 1;
                const todayHeading = document.createElement("div");
                todayHeading.classList.add('subheading');
                todayHeading.textContent = 'Today';
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(todayHeading);
            } 
            if (projectList[i].date > today && todayGroup == 1)  {
                todayGroup = null;
                const lineBreak = document.createElement('hr');
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(lineBreak);
            }
            _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(renderCard(projectList[i]));
            masterList.displayedList.push(projectList[i]);
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
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(pastDueHeading);
            }
         
            if (masterList.data[i].date >= today && pastDue == 1) {
                pastDue = 2;
                const lineBreak = document.createElement('hr');
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(lineBreak);
            }

            // Today Block
            if (masterList.data[i].date >= today && masterList.data[i].date < tomorrow && todayGroup == null) {
                todayGroup = 1;
                const todayHeading = document.createElement("div");
                todayHeading.classList.add('heading');
                todayHeading.textContent = 'Today';
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(todayHeading);
            } 

            if (masterList.data[i].date >= tomorrow && todayGroup == 1) {
                todayGroup = 2;
                const lineBreak = document.createElement('hr');
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(lineBreak);
            }

            if (masterList.data[i].date <= weekFromToday && masterList.data[i].date >= tomorrow && weekGroup == null) {
                weekGroup = 1;
                const weekHeading = document.createElement("div");
                weekHeading.classList.add('heading');
                weekHeading.textContent = 'This Week';
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(weekHeading);
            } 

            if (masterList.data[i].date > weekFromToday && weekGroup == 1) {
                weekGroup = 2;
                const lineBreak = document.createElement('hr');
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(lineBreak);
            }; 

           
            if ((masterList.data[i].completed === false && masterList.data[i].date < today) || masterList.data[i].date >= today){
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(renderCard(masterList.data[i]));
                masterList.displayedList.push(masterList.data[i]);
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


function renderSideBar(someDiv, arrayOfProjectNames) {
    if (_DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.sideBar){
    
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.sideBar.parentElement.removeChild(_DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.sideBar);
        
    }
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

    const listByProject = document.createElement('ul');
    listByProject.id = 'list-by-project';
    const makeLink = function(name, div) {
        const listItem = document.createElement('li');
        const itemAnchor = document.createElement('a');
        itemAnchor.id = name;
        itemAnchor.href = '#';
        itemAnchor.textContent = name;
        const removeProjectBtn = document.createElement('a');
        removeProjectBtn.id = `${name}Remove`;
        removeProjectBtn.href = "#"
        removeProjectBtn.textContent = '×';
        listItem.append(itemAnchor,removeProjectBtn);
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









/*
To Do: 
--local storage
--styling
*/



//  ###########     Sample tasks to test the app     ########### 
let today = new Date();
today.setHours(0, 0, 0, 0);

let tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
let dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);

let laterDay = new Date(today);
laterDay.setDate(today.getDate() + 8);

let yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const sampleTask = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( today, 'Refactor tic-tac-toe program', 'normal' );
const sampleTask2 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( today, 'Buy milk', 'high' );
const sampleTask3 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( tomorrow, 'Buy birthday card', 'normal' );
const sampleTask4 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( tomorrow, 'Call mom', 'high' ); 
const sampleTask5 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( tomorrow, 'Do Ruby beginner tutorial', 'normal' );
const sampleTask6 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( dayAfterTomorrow, 'Vacuum', 'high' );
const sampleTask7 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( dayAfterTomorrow, 'Laundry', 'normal' );
const sampleTask8 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( dayAfterTomorrow, 'Practice piano', 'normal' );
const sampleTask9 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( today, 'Dog-sit for Kimmy', 'high' );
const sampleTask10 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( yesterday, 'Schedule dentist appointment', 'high' );

_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask2);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask3);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask4);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask5);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask6);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask7);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask8);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask9);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask10);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.sortByDate();


_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask, 'project', 'Coding');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask2, 'project', 'Shopping');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask3, 'project', 'Shopping');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask5, 'project', 'Coding');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask6, 'project', 'Housework');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask7, 'project', 'Housework');

// ***************


// Cache DOM and render each section


(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderHeader)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body);
(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.getListOfProjects());
(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderAddTaskModal)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.getListOfProjects());
(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_5__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_5__.currentSettings.whichProject);

// Add eventlisteners to header and modal
(0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addInitialEventListeners)();
(0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addSideProjectEventListeners)();
(0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addMainEventListeners)();
_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.sidebarProjectListRemove;






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UTtBQUNyQixzREFBYSxDQUFDLCtDQUFRLEVBQUUscUVBQTRCO0FBQ3BELDJEQUFrQixDQUFDLCtDQUFRLEVBQUUscUVBQTRCO0FBQ3pELG1EQUFVLENBQUMsbURBQVUsRUFBRSxvRUFBc0IsRUFBRSwwRUFBNEI7O0FBRTNFO0FBQ0EsaUVBQXdCO0FBQ3hCLHFFQUE0QjtBQUM1Qiw4REFBcUI7QUFDckIsbUVBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9ET01DYWNoZS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2FkZEVMcy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2N1cnJlbnRTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL21hc3Rlckxpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG5cbmZ1bmN0aW9uIGRvbSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQgaGVhZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgYWRkVGFza0J0bigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1hLXRhc2tcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgYWRkVGFza0Zvcm0oKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1mb3JtXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IGFkZFRhc2tNb2RhbCgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYS10YXNrLW1vZGFsXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IGNsb3NlTW9kYWxCdXR0b24oKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2UtbW9kYWwtYnV0dG9uXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IG5ld1Rhc2tDb250ZW50KCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stY29udGVudFwiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBuZXdUYXNrRGF0ZSgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbmV3VGFza1ByaW9yaXR5KCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXByaW9yaXR5XScpO1xuICAgICAgICB9LCAgXG4gICAgICAgIGdldCBuZXdUYXNrUHJvamVjdCgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcbiAgICAgICAgfSwgICAgICAgICAgXG4gICAgICAgIG1haW4sXG4gICAgICAgIGJvZHksIFxuICAgICAgICBnZXQgc2lkZUJhcigpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IHRvZGF5c1Rhc2tzU2lkZUJhciAoKXtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZGF5cy10YXNrc1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHRoaXNXZWVrU2lkZUJhcigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RoaXMtd2Vla1wiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBhbGxUYXNrc1NpZGVCYXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhbGwtdGFza3NcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgY2FyZEVkaXRCdG5zKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0LXRhc2snKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGNhcmRSZW1vdmVCdG5zKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZW1vdmUtdGFzaycpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgY2FyZENoZWNrQm94cygpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbbmFtZT1cImlzQ29tcGxldGVkQ2hlY2tib3hcIl0nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGxpc3RCeVByb2plY3QoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpc3QtYnktcHJvamVjdCcpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgc2lkZWJhclByb2plY3RMaXN0KCkge1xuICAgICAgICAgICAgLy8gSSBuZWVkIHRoZSBhbmNob3IgdGFncyBuZXh0ZWQgaW5zaWRlIHRoZSBsaSdzXG4gICAgICAgICAgICBjb25zdCBsaXN0aXRlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZWJhclwiKS5jaGlsZHJlblsxXS5jaGlsZHJlbik7XG4gICAgICAgICAgICBsZXQgcXVlcnlTdHIgPSAnJztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPCBsaXN0aXRlbXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHF1ZXJ5U3RyID0gcXVlcnlTdHIgKyAnIycgKyBsaXN0aXRlbXNbaV0uZmlyc3RDaGlsZC5pZCBcbiAgICAgICAgICAgICAgICBpZiAoaTwgbGlzdGl0ZW1zLmxlbmd0aC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5U3RyID0gcXVlcnlTdHIgKyAnLCAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChxdWVyeVN0ciA9PT0gJycpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdudWxsIHF1ZXJ5JylcbiAgICAgICAgICAgICAgICBxdWVyeVN0ciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnlTdHIpO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBzaWRlYmFyUHJvamVjdExpc3RSZW1vdmUoKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0aXRlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZWJhclwiKS5jaGlsZHJlblsxXS5jaGlsZHJlbik7XG4gICAgICAgICAgICBjb25zdCBsaXN0T2ZSZW1vdmVCdG5zID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTwgbGlzdGl0ZW1zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsaXN0T2ZSZW1vdmVCdG5zLnB1c2gobGlzdGl0ZW1zW2ldLmxhc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGxpc3RPZlJlbW92ZUJ0bnNcblxuICAgICAgICB9XG4gICAgfVxuIH1cblxuZXhwb3J0IGNvbnN0IERPTSA9IGRvbSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBtYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyU2lkZUJhciB9IGZyb20gXCIuL3JlbmRlclwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7IFxuaW1wb3J0IHsgY3VycmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY3VycmVudFNldHRpbmdzXCI7XG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01DYWNoZVwiO1xuXG5sZXQgZWRpdHRpbmcgPSBmYWxzZTtcbmxldCBJRE51bWJlciA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMoKXsgXG4vLyAgKioqIEFkZFRhc2tNb2RhbCBvcGVuLCBzdWJtaXQsIGFuZCBjbG9zZSBidG4gRUxzICoqKlxuXG4gICAgLy8gY2FsbGJhY2sgZm9yIHN1Ym1pdFxuICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuICAgICAgICBpZiAoZWRpdHRpbmcpe1xuICAgICAgICAgICAgY29uc3QgdGFza1RvRWRpdCA9IG1hc3Rlckxpc3QuZGF0YS5maWx0ZXIoKHQpPT4gdC5pZCA9PSBJRE51bWJlcilbMF07XG4gICAgICAgICAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHRhc2tUb0VkaXQsIFwiY29udGVudFwiLCBET00ubmV3VGFza0NvbnRlbnQudmFsdWUpO1xuICAgICAgICAgICAgbWFzdGVyTGlzdC5lZGl0VGFzayh0YXNrVG9FZGl0LCBcImRhdGVcIiwgbmV3IERhdGUoRE9NLm5ld1Rhc2tEYXRlLnZhbHVlKSk7XG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gQXJyYXkuZnJvbShET00ubmV3VGFza1ByaW9yaXR5KS5maWx0ZXIoZSA9PiBlWydjaGVja2VkJ10pWzBdIDsgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvcHRpb24udmFsdWUpXG4gICAgICAgICAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHRhc2tUb0VkaXQsIFwicHJpb3JpdHlcIiwgb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgXCJwcm9qZWN0XCIsIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSk7XG4gICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIERPTS5uZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBvcHRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayggRE9NLm5ld1Rhc2tEYXRlLnZhbHVlLCBET00ubmV3VGFza0NvbnRlbnQudmFsdWUsIG5ld1Rhc2tQcmlvcml0eVZhbHVlLCBET00ubmV3VGFza1Byb2plY3QudmFsdWUpO1xuICAgICAgICAgICAgbWFzdGVyTGlzdC5hZGRUYXNrKG5ld1Rhc2spO1xuXG4gICAgICAgIH1cbiAgICAgXG4gICAgIFxuICAgICAgICBtYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcbiAgICAgICAgLy8gQ2xlYXIgdGhlIG1vZGFsIGlucHV0IGZpZWxkcyBcbiAgICAgICAgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlID0gbnVsbDtcbiAgICAgICAgRE9NLm5ld1Rhc2tEYXRlLnZhbHVlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgRE9NLm5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgRE9NLm5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDsgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBET00ubmV3VGFza1Byb2plY3QudmFsdWUgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBET00ubWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgIHJlbmRlclNpZGVCYXIoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7IFxuICAgICAgICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIGFkZFNpZGVUaW1lRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgRE9NLmFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgIGVkaXR0aW5nID0gZmFsc2U7XG4gICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpIH0pO1xuICAgIERPTS5jbG9zZU1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKSB9KTtcbiAgICBET00uYWRkVGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0YXNrU3VibWl0KTsgIFxuICAgIFxuICAgIC8vVG9kYXksIFdlZWssIGFuZCBBbGwgc2lkZUJhciBFTHNcbiAgICB0cnkge1xuICAgICAgICBET00udG9kYXlzVGFza3NTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpeyBcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RvZGF5JywgbnVsbCk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAgXG4gICAgICAgIERPTS50aGlzV2Vla1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0aGlzLXdlZWsnLCBudWxsKTtcbiAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgICBcbiAgICAgICAgRE9NLmFsbFRhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2FsbCcsIG51bGwpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICB9KTtcbiAgICAgICAgICAgXG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBhZGQgZXZlbnQgbGlzdGVuZXJzJyk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGFkZENhcmRFdmVudExpc3RlbmVycyh0YXNrKXtcbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWlkPVwiJHt0YXNrLmlkfVwiXSBpbnB1dGApO1xuICAgIGNoZWNrYm94WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IHRhc2tJRCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgICAgIGxldCB0YXNrID0gbWFzdGVyTGlzdC5kYXRhLmZpbHRlcigoZSk9PiBlLmlkID09IHRhc2tJRCk7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRhc2suY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2suY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjb21wbGV0ZWRcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGVkaXRUYXNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlZGl0dGluZyA9IHRydWU7XG4gICAgICAgIElETnVtYmVyID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgICAgICBjb25zdCB0YXNrVG9FZGl0ID0gbWFzdGVyTGlzdC5kYXRhLmZpbHRlcigodCk9PiB0LmlkID09IElETnVtYmVyKVswXTtcbiAgICAgICAgbGV0IHl5eXkgPSB0YXNrVG9FZGl0LmRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgbGV0IG1tID0gdGFza1RvRWRpdC5kYXRlLmdldE1vbnRoKCkrMTtcbiAgICAgICAgbGV0IGRkID0gdGFza1RvRWRpdC5kYXRlLmdldERhdGUoKTtcbiAgICAgICAgbGV0IHRhc2tEYXRlID0gU3RyaW5nKDEwMDAwICogeXl5eSArIDEwMCAqIG1tICsgZGQpO1xuICAgICAgICB0YXNrRGF0ZSA9IHRhc2tEYXRlLnNsaWNlKDAsNCkrJy0nK3Rhc2tEYXRlLnNsaWNlKDQsNikgKyAnLScgK3Rhc2tEYXRlLnNsaWNlKDYsOCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2tEYXRlKVxuICAgICAgICBET00ubmV3VGFza0NvbnRlbnQudmFsdWUgPSB0YXNrVG9FZGl0LmNvbnRlbnQ7XG4gICAgICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSA9IHRhc2tEYXRlO1xuICAgICAgICBET00ubmV3VGFza1Byb2plY3QudmFsdWUgPSB0YXNrVG9FZGl0LnByb2plY3Q7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIERPTS5uZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24udmFsdWUgPT09IHRhc2sucHJpb3JpdHkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb24uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuICAgICAgICBcblxuXG5cblxuXG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlVGFzayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc3QgdGhpc1Rhc2sgPSBtYXN0ZXJMaXN0LmRhdGEuZmlsdGVyKCAodCkgPT4gdC5pZCA9PSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikpO1xuICAgICAgICBtYXN0ZXJMaXN0LnJlbW92ZVRhc2sodGhpc1Rhc2tbMF0pO1xuICAgICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3Quc3BsaWNlKG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5pbmRleE9mKHRoaXNUYXNrWzBdKSwgMSk7XG4gICAgICAgIC8vIHJlUmVuZGVyKCk7XG4gICAgICAgIC8vIHJlQXR0YWNoRWwoKTtcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1pZD1cIiR7dGFzay5pZH1cIl0gYnV0dG9uYClbMF07XG4gICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdFRhc2spO1xuICAgIFxuICAgIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWlkPVwiJHt0YXNrLmlkfVwiXSBidXR0b25gKVsxXTtcbiAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbW92ZVRhc2spO1xufSBcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1haW5FdmVudExpc3RlbmVycygpe1xuICAgIGZvciAobGV0IGl0ZW0gb2YgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSB7XG4gICAgICAgIGFkZENhcmRFdmVudExpc3RlbmVycyhpdGVtKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKXtcbiAgICBjb25zdCByZW1vdmVUaGlzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGNvbmZpcm0oXCJEZWxldGUgdGhpcyBwcm9qZWN0IGFuZCBhbGwgdGFza3MgaW4gaXQ/XCIpKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrc1RvUmVtb3ZlID0gbWFzdGVyTGlzdC5wcm9kdWNlUHJvamVjdExpc3QoZS50YXJnZXQuaWQuc2xpY2UoMCwtNikpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrc1RvUmVtb3ZlKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0YXNrc1RvUmVtb3ZlKXtcbiAgICAgICAgICAgICAgICBtYXN0ZXJMaXN0LnJlbW92ZVRhc2soaXRlbSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgICAgICByZW5kZXJTaWRlQmFyKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpOyBcbiAgICAgICAgICAgICAgICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgYWRkU2lkZVRpbWVFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICAgIH0gXG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBwcmVzc2VkIENhbmNlbCFcIik7XG4gICAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRE9NLnNpZGViYXJQcm9qZWN0TGlzdFJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBET00uc2lkZWJhclByb2plY3RMaXN0UmVtb3ZlW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlVGhpcyk7XG4gICAgfVxuICAgIC8vIFNpZGVCYXIgUHJvamVjdCBOYW1lIEVMc1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRE9NLnNpZGViYXJQcm9qZWN0TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpbmsgPSAoRE9NLnNpZGViYXJQcm9qZWN0TGlzdFtpXSk7XG4gICAgIFxuICAgICAgICAgICAgcHJvamVjdExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0TGluaylcbiAgICAgICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdieVByb2plY3QnLCBwcm9qZWN0TGluay5pZCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgfVxuXG4gICAgY2F0Y2gge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCBlbCB0byBwcm9qZWN0cycpXG4gICAgfVxuICAgIC8vUmVtb3ZlIHByb2plY3QgYnV0dG9uID8gXG4gICBcbiAgICBcbn1cbiBcbmV4cG9ydCBmdW5jdGlvbiBhZGRTaWRlVGltZUV2ZW50TGlzdGVuZXJzKCl7XG4gICAgdHJ5IHtcbiAgICAgICAgRE9NLnRvZGF5c1Rhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXsgXG4gICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0b2RheScsIG51bGwpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICB9KTtcbiAgICAgICAgIFxuICAgICAgICBET00udGhpc1dlZWtTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgndGhpcy13ZWVrJywgbnVsbCk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH0pO1xuICAgICAgXG4gICAgICAgIERPTS5hbGxUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdhbGwnLCBudWxsKTtcbiAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBhZGQgdG9kYXkvd2Vlay9hbGwgRUxzJylcbiAgICB9XG4gICBcbn0iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNvbnN0IGN1cnJlbnRTZXR0aW5ncyA9IHtcbiAgICB2aWV3Qnk6ICdhbGwnLFxuICAgIHdoaWNoUHJvamVjdDogbnVsbCxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24obmV3Vmlldywgd2hpY2hQID0gbnVsbCkge1xuICAgICAgICB0aGlzLnZpZXdCeSA9IG5ld1ZpZXc7XG4gICAgICAgIHRoaXMud2hpY2hQcm9qZWN0ID0gd2hpY2hQO1xuICAgIH1cblxufSIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBUaGVyZSBzaG91bGQgb25seSBiZSBvbmUgbWFzdGVyIGxpc3RcbmxldCBpbnN0YW5jZSA9IG51bGw7XG5cbi8vIENvbnN0cnVjdG9yIHRvIG1ha2UgdGFzayBvYmplY3RzXG5jbGFzcyBNYXN0ZXJMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbiBvbmx5IGNyZWF0ZSBvbmUgaW5zdGFuY2UhXCIpO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICAgIHRoaXMuZGlzcGxheWVkTGlzdCA9IFtdO1xuICAgIH1cblxuICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICB0aGlzLmRhdGEucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZih0YXNrKSwgMSk7XG4gICAgfVxuXG4gICAgZWRpdFRhc2sodGFzaywgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmRhdGFbdGhpcy5kYXRhLmluZGV4T2YodGFzayldW2F0dHJpYnV0ZV0gPSB2YWx1ZTsgXG4gICAgfVxuXG4gICAgc29ydEJ5RGF0ZSgpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNvcnQoKGEsYikgPT4gYS5kYXRlIC0gYi5kYXRlKTtcbiAgICB9XG5cbiAgICBwcm9kdWNlUHJvamVjdExpc3QocHJvamVjdCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IHRoaXMuZGF0YS5maWx0ZXIoICh0YXNrKSA9PiB0YXNrLnByb2plY3QgPT0gcHJvamVjdCk7XG4gICAgICAgIHByb2plY3RMaXN0LnNvcnQoKGEsYikgPT4gYS5kYXRlIC0gYi5kYXRlKTtcbiAgICAgICAgcmV0dXJuIHByb2plY3RMaXN0O1xuICAgIH1cblxuICAgIGdldExpc3RPZlByb2plY3RzKCkge1xuICAgICAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCggKHRhc2spPT4ge1xuICAgICAgICAgICAgaWYgKHRhc2sucHJvamVjdCAhPSBudWxsICYmICB0YXNrLnByb2plY3QgIT0gJycgJiYgIWFsbFByb2plY3RzLnNvbWUoKGEpPT4gYSA9PT0gdGFzay5wcm9qZWN0KSl7XG4gICAgICAgICAgICAgICAgYWxsUHJvamVjdHMucHVzaCh0YXNrLnByb2plY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYWxsUHJvamVjdHM7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0OyIsIlwidXNlIHN0cmljdFwiXG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01DYWNoZVwiO1xuXG5mdW5jdGlvbiByZW5kZXJDYXJkKHRhc2spIHtcbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICBjaGVja2JveC5uYW1lID0gXCJpc0NvbXBsZXRlZENoZWNrYm94XCI7XG4gICAgY2hlY2tib3guc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gICAgY2hlY2tib3guY2hlY2tlZCA9IHRhc2suY29tcGxldGVkO1xuICAgIGNoZWNrYm94LmlkID0gdGFzay5jb250ZW50O1xuICAgIFxuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKCd0YXNrLW5hbWUnKTtcbiAgICB0YXNrTmFtZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRhc2suY29udGVudDtcblxuICAgIGNvbnN0IHRhc2tEdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tEdWUuY2xhc3NMaXN0LmFkZCgndGFzay1kdWUtZGF0ZScpO1xuICAgIHRhc2tEdWUuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gICAgdGFza0R1ZS50ZXh0Q29udGVudCA9IGBEdWU6ICR7dGFzay5kYXRlLnRvTG9jYWxlU3RyaW5nKCdkZWZhdWx0Jywge3dlZWtkYXk6ICdzaG9ydCcgfSl9LFxuICAgICAgICAkeyB0YXNrLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7IG1vbnRoOiAnc2hvcnQnIH0pfS4gXG4gICAgICAgICR7IHRhc2suZGF0ZS5nZXREYXRlKCl9IGAgIFxuICAgIFxuICAgIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGVkaXRCdG4uY2xhc3NMaXN0LmFkZCgnZWRpdC10YXNrJyk7XG4gICAgZWRpdEJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgICBlZGl0QnRuLnRleHRDb250ZW50ID0gJ2VkaXQnO1xuIFxuICAgIFxuICAgIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZS10YXNrJyk7XG4gICAgcmVtb3ZlQnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICAgIHJlbW92ZUJ0bi50ZXh0Q29udGVudCA9ICdyZW1vdmUnO1xuIFxuICAgIFxuICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgIGNhcmQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gICAgaWYgKHRhc2sucHJpb3JpdHkgPT0gJ2hpZ2gnKSB7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50Jyk7XG4gICAgfSBcbiAgICBjYXJkLmFwcGVuZChjaGVja2JveCwgdGFza05hbWUsIHRhc2tEdWUsIGVkaXRCdG4sIHJlbW92ZUJ0bik7XG4gICAgcmV0dXJuIChjYXJkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBvcHRpb24sIGJ5UHJvamVjdE5hbWUgPSBudWxsKSB7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBsZXQgdG9tb3Jyb3cgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcblxuICAgIGxldCB3ZWVrRnJvbVRvZGF5PSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgd2Vla0Zyb21Ub2RheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDcpO1xuXG4gICAgbGV0IHRvZGF5R3JvdXAgPSBudWxsO1xuICAgIGxldCBwYXN0RHVlID0gbnVsbDtcbiAgICBsZXQgd2Vla0dyb3VwID0gbnVsbDtcblxuICAgIC8vIEZpcnN0IHJlbW92ZSBldmVyeXRoaW5nIGZyb20gbWFpbiBhbmQgZnJvbSBkaXNwbGF5TGlzdFxuICAgIHdoaWxlIChET00ubWFpbi5maXJzdENoaWxkKSB7XG4gICAgICAgIERPTS5tYWluLnJlbW92ZUNoaWxkKERPTS5tYWluLmZpcnN0Q2hpbGQpO1xuICAgICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3Quc3BsaWNlKDAsIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5sZW5ndGgpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb24gPT09ICdieVByb2plY3QnKXtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBtYXN0ZXJMaXN0LnByb2R1Y2VQcm9qZWN0TGlzdChieVByb2plY3ROYW1lKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcm9qZWN0SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgIHByb2plY3RIZWFkaW5nLnRleHRDb250ZW50ID0gYnlQcm9qZWN0TmFtZTtcbiAgICAgICAgRE9NLm1haW4uYXBwZW5kKHByb2plY3RIZWFkaW5nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZiAocHJvamVjdExpc3RbaV0uZGF0ZSA+PSB0b2RheSAmJiBwcm9qZWN0TGlzdFtpXS5kYXRlIDw9IHRvZGF5ICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZGF5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3N1YmhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TGlzdFtpXS5kYXRlID4gdG9kYXkgJiYgdG9kYXlHcm91cCA9PSAxKSAge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBET00ubWFpbi5hcHBlbmQocmVuZGVyQ2FyZChwcm9qZWN0TGlzdFtpXSkpO1xuICAgICAgICAgICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnB1c2gocHJvamVjdExpc3RbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFzdGVyTGlzdC5kYXRhLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b21vcnJvdyAmJiBvcHRpb24gPT09IFwidG9kYXlcIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07IFxuXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPiB3ZWVrRnJvbVRvZGF5ICYmIG9wdGlvbiA9PT0gXCJ0aGlzLXdlZWtcIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07IFxuXG5cbiAgICAgICAgICAgIC8vIFBhc3QtRHVlIFVuZG9uZSBCbG9ja1xuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9kYXkgICYmIHBhc3REdWUgPT0gbnVsbCAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uY29tcGxldGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHBhc3REdWUgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3REdWVIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBwYXN0RHVlSGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgcGFzdER1ZUhlYWRpbmcudGV4dENvbnRlbnQgPSAnUGFzdCBEdWUnO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZChwYXN0RHVlSGVhZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICBcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSAmJiBwYXN0RHVlID09IDEpIHtcbiAgICAgICAgICAgICAgICBwYXN0RHVlID0gMjtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUb2RheSBCbG9ja1xuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5ICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9tb3Jyb3cgJiYgdG9kYXlHcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IDE7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKHRvZGF5SGVhZGluZyk7XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgdG9kYXlHcm91cCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IDI7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDw9IHdlZWtGcm9tVG9kYXkgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgd2Vla0dyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB3ZWVrR3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdlZWtIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB3ZWVrSGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgd2Vla0hlYWRpbmcudGV4dENvbnRlbnQgPSAnVGhpcyBXZWVrJztcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQod2Vla0hlYWRpbmcpO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiB3ZWVrR3JvdXAgPT0gMSkge1xuICAgICAgICAgICAgICAgIHdlZWtHcm91cCA9IDI7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH07IFxuXG4gICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKChtYXN0ZXJMaXN0LmRhdGFbaV0uY29tcGxldGVkID09PSBmYWxzZSAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8IHRvZGF5KSB8fCBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSl7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKHJlbmRlckNhcmQobWFzdGVyTGlzdC5kYXRhW2ldKSk7XG4gICAgICAgICAgICAgICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnB1c2gobWFzdGVyTGlzdC5kYXRhW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBZGRUYXNrTW9kYWwoc29tZURpdiwgYXJyYXlPZlByb2plY3ROYW1lcykge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpO1xuICAgIGFkZFRhc2tNb2RhbC5pZCA9ICdhZGQtYS10YXNrLW1vZGFsJztcblxuICAgIGNvbnN0IGFkZFRhc2tNb2RhbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgdGFza0Zvcm0uaWQgPSAndGFzay1mb3JtJztcbiAgICBcbiAgICBjb25zdCBlbXB0eURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5pZCA9ICdjbG9zZS1tb2RhbC1idXR0b24nO1xuXG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzJztcbiAgICBcbiAgICBjb25zdCBsYWJlbEZvclRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsRm9yVGFza0NvbnRlbnQuZm9yID0gJ3Rhc2stY29udGVudCc7XG4gICAgbGFiZWxGb3JUYXNrQ29udGVudC50ZXh0Q29udGVudCA9ICdUYXNrOidcbiAgICBcbiAgICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0YXNrQ29udGVudC50eXBlID0gJ3RleHQnO1xuICAgIHRhc2tDb250ZW50LmlkID0gJ3Rhc2stY29udGVudCc7XG4gICAgdGFza0NvbnRlbnQubmFtZSA9ICd0YXNrLWNvbnRlbnQnO1xuICAgIHRhc2tDb250ZW50LnBsYWNlaG9sZGVyID0gJ0VudGVyIFRhc2snO1xuICAgIHRhc2tDb250ZW50LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBcbiAgICBjb25zdCBsYWJlbEZvckRhdGU9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBsYWJlbEZvckRhdGUuZm9yID0gJ2RhdGUnO1xuICAgIGxhYmVsRm9yRGF0ZS50ZXh0Q29udGVudCA9ICdEdWU6JztcblxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgZGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgIGRhdGUuaWQgPSAnZGF0ZSc7XG4gICAgZGF0ZS5uYW1lID0gJ2RhdGUnO1xuICAgIGRhdGUucmVxdWlyZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgcHJpb3JpdHlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJpb3JpdHlUaXRsZS50ZXh0Q29udGVudCA9ICdQcmlvcml0eTonO1xuXG4gICAgY29uc3QgcHJpb3JpdHlPcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eU9wdGlvbnMuaWQgPSAncHJpb3JpdHktb3B0aW9ucyc7XG5cbiAgICBjb25zdCBvcHRpb24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBub3JtYWxSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBub3JtYWxSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgIG5vcm1hbFJhZGlvLmlkID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpby5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgIG5vcm1hbFJhZGlvLnZhbHVlID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpby5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBub3JtYWxSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIG5vcm1hbFJhZGlvTGFiZWwuZm9yID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gXCJOb3JtYWxcIjtcblxuICAgIGNvbnN0IG9wdGlvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGhpZ2hSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBoaWdoUmFkaW8udHlwZSA9IFwicmFkaW9cIjtcbiAgICBoaWdoUmFkaW8uaWQgPSBcImhpZ2hcIjtcbiAgICBoaWdoUmFkaW8ubmFtZSA9IFwicHJpb3JpdHlcIjtcbiAgICBoaWdoUmFkaW8udmFsdWUgPSBcImhpZ2hcIjtcbiAgICBub3JtYWxSYWRpby5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBoaWdoUmFkaW9MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBoaWdoUmFkaW9MYWJlbC5mb3IgPSBcImhpZ2hcIjtcbiAgICBoaWdoUmFkaW9MYWJlbC50ZXh0Q29udGVudCA9IFwiSGlnaFwiO1xuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwuZm9yID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwudGV4dENvbnRlbnQgPSBcIlByb2plY3Q6XCJcblxuICAgIGNvbnN0IGFzc2lnblRvUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3QubmFtZSA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdC5pZCA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdC5wbGFjZWhvbGRlciA9IFwiT3B0aW9uYWxcIlxuICAgIGFzc2lnblRvUHJvamVjdC5zZXRBdHRyaWJ1dGUoXCJsaXN0XCIsIFwicHJvamVjdC1saXN0XCIpO1xuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGF0YWxpc3RcIik7XG4gICAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuaWQgPSBcInByb2plY3QtbGlzdFwiO1xuICAgXG4gICAgYXJyYXlPZlByb2plY3ROYW1lcy5mb3JFYWNoKCAoZW50cnkpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuICAgICAgICBvcHRpb24udmFsdWUgPSBlbnRyeTtcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gZW50cnk7IFxuICAgICAgICBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdC5hcHBlbmQob3B0aW9uKTtcbiAgICB9KVxuXG4gICAgYXNzaWduVG9Qcm9qZWN0LmFwcGVuZChhc3NpZ25Ub1Byb2plY3REYXRhTGlzdCk7XG5cbiAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHN1Ym1pdEJ0bi50eXBlID0gXCJzdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4uaWQgPSBcIm1vZGFsLXN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi52YWx1ZSA9IFwiU3VibWl0XCI7XG4gICAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gXCJTdWJtaXRcIjtcblxuICAgIG9wdGlvbjEuYXBwZW5kKG5vcm1hbFJhZGlvLCBub3JtYWxSYWRpb0xhYmVsKTtcbiAgICBvcHRpb24yLmFwcGVuZChoaWdoUmFkaW8sIGhpZ2hSYWRpb0xhYmVsKTtcbiAgICBwcmlvcml0eU9wdGlvbnMuYXBwZW5kKG9wdGlvbjEsIG9wdGlvbjIpO1xuICAgIHRhc2tGb3JtLmFwcGVuZChcbiAgICAgICAgZW1wdHlEaXYsIFxuICAgICAgICBjbG9zZU1vZGFsQnV0dG9uLCBcbiAgICAgICAgbGFiZWxGb3JUYXNrQ29udGVudCwgXG4gICAgICAgIHRhc2tDb250ZW50LCBcbiAgICAgICAgbGFiZWxGb3JEYXRlLCBcbiAgICAgICAgZGF0ZSwgXG4gICAgICAgIHByaW9yaXR5VGl0bGUsIFxuICAgICAgICBwcmlvcml0eU9wdGlvbnMsIFxuICAgICAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbCwgXG4gICAgICAgIGFzc2lnblRvUHJvamVjdCxcbiAgICAgICAgc3VibWl0QnRuKTtcbiAgICBhZGRUYXNrTW9kYWxDb250ZW50LmFwcGVuZCh0YXNrRm9ybSk7XG4gICAgYWRkVGFza01vZGFsLmFwcGVuZChhZGRUYXNrTW9kYWxDb250ZW50KTtcbiAgICBzb21lRGl2LmFwcGVuZChhZGRUYXNrTW9kYWwpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTaWRlQmFyKHNvbWVEaXYsIGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgICBpZiAoRE9NLnNpZGVCYXIpe1xuICAgIFxuICAgICAgICBET00uc2lkZUJhci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKERPTS5zaWRlQmFyKTtcbiAgICAgICAgXG4gICAgfVxuICAgIGNvbnN0IHNpZGViYXJTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgc2lkZWJhclNlY3Rpb24uaWQgPSAnc2lkZWJhcic7XG4gICAgY29uc3QgbGlzdEJ5VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgY29uc3QgbGlzdEl0ZW0xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBpdGVtMUFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpdGVtMUFuY2hvci5pZCA9ICd0b2RheXMtdGFza3MnO1xuICAgIGl0ZW0xQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgaXRlbTFBbmNob3IudGV4dENvbnRlbnQgPSBcIlRvZGF5XCI7XG5cbiAgICBsaXN0SXRlbTEuYXBwZW5kKGl0ZW0xQW5jaG9yKTtcblxuICAgIGNvbnN0IGxpc3RJdGVtMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgaXRlbTJBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaXRlbTJBbmNob3IuaWQgPSAndGhpcy13ZWVrJztcbiAgICBpdGVtMkFuY2hvci5ocmVmID0gJyMnO1xuICAgIGl0ZW0yQW5jaG9yLnRleHRDb250ZW50ID0gXCJUaGlzIFdlZWtcIjtcbiAgICBsaXN0SXRlbTIuYXBwZW5kKGl0ZW0yQW5jaG9yKTtcbiAgICBcbiAgICBjb25zdCBsaXN0SXRlbTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW0zQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW0zQW5jaG9yLmlkID0gJ2FsbC10YXNrcyc7XG4gICAgaXRlbTNBbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtM0FuY2hvci50ZXh0Q29udGVudCA9IFwiQWxsXCI7XG4gICAgbGlzdEl0ZW0zLmFwcGVuZChpdGVtM0FuY2hvcik7XG5cbiAgICBsaXN0QnlUaW1lLmFwcGVuZChsaXN0SXRlbTEsIGxpc3RJdGVtMiwgbGlzdEl0ZW0zKTtcblxuICAgIGNvbnN0IGxpc3RCeVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIGxpc3RCeVByb2plY3QuaWQgPSAnbGlzdC1ieS1wcm9qZWN0JztcbiAgICBjb25zdCBtYWtlTGluayA9IGZ1bmN0aW9uKG5hbWUsIGRpdikge1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGNvbnN0IGl0ZW1BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGl0ZW1BbmNob3IuaWQgPSBuYW1lO1xuICAgICAgICBpdGVtQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgICAgIGl0ZW1BbmNob3IudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgICBjb25zdCByZW1vdmVQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICByZW1vdmVQcm9qZWN0QnRuLmlkID0gYCR7bmFtZX1SZW1vdmVgO1xuICAgICAgICByZW1vdmVQcm9qZWN0QnRuLmhyZWYgPSBcIiNcIlxuICAgICAgICByZW1vdmVQcm9qZWN0QnRuLnRleHRDb250ZW50ID0gJ8OXJztcbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kKGl0ZW1BbmNob3IscmVtb3ZlUHJvamVjdEJ0bik7XG4gICAgICAgIGRpdi5hcHBlbmQobGlzdEl0ZW0pO1xuICAgIH1cbiAgICBpZiAoYXJyYXlPZlByb2plY3ROYW1lcyl7XG4gICAgICAgIGFycmF5T2ZQcm9qZWN0TmFtZXMuZm9yRWFjaChmdW5jdGlvbihhKXsgbWFrZUxpbmsoYSwgbGlzdEJ5UHJvamVjdCkgfSApO1xuICAgIH1cbiAgICBzaWRlYmFyU2VjdGlvbi5hcHBlbmQobGlzdEJ5VGltZSwgbGlzdEJ5UHJvamVjdCk7XG4gICAgc29tZURpdi5hcHBlbmQoc2lkZWJhclNlY3Rpb24pOyAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVySGVhZGVyKHNvbWVEaXYpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGFkZFRhc2tCdG4uaWQgPSBcImFkZC1hLXRhc2tcIjtcbiAgICBhZGRUYXNrQnRuLnRleHRDb250ZW50ID0gXCJBZGQgVGFza1wiO1xuICAgIGhlYWRlci5hcHBlbmQoYWRkVGFza0J0bik7XG4gICAgc29tZURpdi5wcmVwZW5kKGhlYWRlcik7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuZXhwb3J0IGNsYXNzIFRhc2sge1xuXG4gICAgY29uc3RydWN0b3IoZGF0ZSwgY29udGVudCwgcHJpb3JpdHksIHByb2plY3QgPSBudWxsKSB7IFxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICB0aGlzLmlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwMDAwMCk7XG4gICAgfVxuXG4gICAgbWFya0RvbmUoKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gdHJ1ZTtcbiAgICB9XG5cbn07XG5cblxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTUNhY2hlXCI7XG5pbXBvcnQgeyBhZGRNYWluRXZlbnRMaXN0ZW5lcnMsIGFkZEluaXRpYWxFdmVudExpc3RlbmVycywgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycyB9IGZyb20gXCIuL2FkZEVMc1wiO1xuaW1wb3J0IHsgbWFzdGVyTGlzdCB9IGZyb20gXCIuL21hc3Rlckxpc3RcIjtcbmltcG9ydCB7IHJlbmRlck1haW4sIHJlbmRlckFkZFRhc2tNb2RhbCwgcmVuZGVyU2lkZUJhciwgcmVuZGVySGVhZGVyIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5pbXBvcnQgeyBjdXJyZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jdXJyZW50U2V0dGluZ3NcIjtcblxuLypcblRvIERvOiBcbi0tbG9jYWwgc3RvcmFnZVxuLS1zdHlsaW5nXG4qL1xuXG5cblxuLy8gICMjIyMjIyMjIyMjICAgICBTYW1wbGUgdGFza3MgdG8gdGVzdCB0aGUgYXBwICAgICAjIyMjIyMjIyMjIyBcbmxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG50b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxubGV0IHRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xudG9tb3Jyb3cuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyAxKTtcbmxldCBkYXlBZnRlclRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xuZGF5QWZ0ZXJUb21vcnJvdy5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDIpO1xuXG5sZXQgbGF0ZXJEYXkgPSBuZXcgRGF0ZSh0b2RheSk7XG5sYXRlckRheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDgpO1xuXG5sZXQgeWVzdGVyZGF5ID0gbmV3IERhdGUodG9kYXkpO1xueWVzdGVyZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMSk7XG5cbmNvbnN0IHNhbXBsZVRhc2sgPSBuZXcgVGFzayggdG9kYXksICdSZWZhY3RvciB0aWMtdGFjLXRvZSBwcm9ncmFtJywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2syID0gbmV3IFRhc2soIHRvZGF5LCAnQnV5IG1pbGsnLCAnaGlnaCcgKTtcbmNvbnN0IHNhbXBsZVRhc2szID0gbmV3IFRhc2soIHRvbW9ycm93LCAnQnV5IGJpcnRoZGF5IGNhcmQnLCAnbm9ybWFsJyApO1xuY29uc3Qgc2FtcGxlVGFzazQgPSBuZXcgVGFzayggdG9tb3Jyb3csICdDYWxsIG1vbScsICdoaWdoJyApOyBcbmNvbnN0IHNhbXBsZVRhc2s1ID0gbmV3IFRhc2soIHRvbW9ycm93LCAnRG8gUnVieSBiZWdpbm5lciB0dXRvcmlhbCcsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrNiA9IG5ldyBUYXNrKCBkYXlBZnRlclRvbW9ycm93LCAnVmFjdXVtJywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrNyA9IG5ldyBUYXNrKCBkYXlBZnRlclRvbW9ycm93LCAnTGF1bmRyeScsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrOCA9IG5ldyBUYXNrKCBkYXlBZnRlclRvbW9ycm93LCAnUHJhY3RpY2UgcGlhbm8nLCAnbm9ybWFsJyApO1xuY29uc3Qgc2FtcGxlVGFzazkgPSBuZXcgVGFzayggdG9kYXksICdEb2ctc2l0IGZvciBLaW1teScsICdoaWdoJyApO1xuY29uc3Qgc2FtcGxlVGFzazEwID0gbmV3IFRhc2soIHllc3RlcmRheSwgJ1NjaGVkdWxlIGRlbnRpc3QgYXBwb2ludG1lbnQnLCAnaGlnaCcgKTtcblxubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2spO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2syKTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMyk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazQpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s1KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNik7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazcpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s4KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrOSk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazEwKTtcbm1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuXG5cbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzaywgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2syLCAncHJvamVjdCcsICdTaG9wcGluZycpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrMywgJ3Byb2plY3QnLCAnU2hvcHBpbmcnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazUsICdwcm9qZWN0JywgJ0NvZGluZycpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNiwgJ3Byb2plY3QnLCAnSG91c2V3b3JrJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s3LCAncHJvamVjdCcsICdIb3VzZXdvcmsnKTtcblxuLy8gKioqKioqKioqKioqKioqXG5cblxuLy8gQ2FjaGUgRE9NIGFuZCByZW5kZXIgZWFjaCBzZWN0aW9uXG5cblxucmVuZGVySGVhZGVyKERPTS5ib2R5KTtcbnJlbmRlclNpZGVCYXIoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG5yZW5kZXJBZGRUYXNrTW9kYWwoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG5yZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuXG4vLyBBZGQgZXZlbnRsaXN0ZW5lcnMgdG8gaGVhZGVyIGFuZCBtb2RhbFxuYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzKCk7XG5hZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG5hZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbkRPTS5zaWRlYmFyUHJvamVjdExpc3RSZW1vdmU7XG5cblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9