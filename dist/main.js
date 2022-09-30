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
            localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data)); 
            localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList));
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
            localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data)); 
            localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList));
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
        localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data)); 
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList.splice(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList.indexOf(thisTask[0]), 1);
        localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList));
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
            const tasksToRemove = _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.produceProjectList(e.target.id.slice(0,-6));
            for (const item of tasksToRemove){
                _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.removeTask(item);
            }
            localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data)); 
            localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList));
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

/***/ "./src/freshStart.js":
/*!***************************!*\
  !*** ./src/freshStart.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ freshStart)
/* harmony export */ });
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _DOMCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMCache */ "./src/DOMCache.js");
/* harmony import */ var _addELs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addELs */ "./src/addELs.js");
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");


;






function freshStart() { 
    
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
    console.log(_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.data);

    (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderHeader)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body);
    (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.getListOfProjects());
    (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderAddTaskModal)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.getListOfProjects());
    (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_5__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_5__.currentSettings.whichProject);

    // Add eventlisteners to header and modal
    (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addInitialEventListeners)();
    (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addSideProjectEventListeners)();
    (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addMainEventListeners)();
    _DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.sidebarProjectListRemove;
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
    
    const emptyDiv1 = document.createElement("div");
    emptyDiv1.textContent = ' ';
    const emptyDiv2 = document.createElement("div");
    emptyDiv2.textContent = ' ';
    const closeModalButton = document.createElement("div");
    closeModalButton.id = 'close-modal-button';

    closeModalButton.innerHTML = '&times';
    
    const emptyDiv3 = document.createElement("div");
    emptyDiv3.textContent = ' ';
    const labelForTaskContent = document.createElement("label");
    labelForTaskContent.for = 'task-content';
    labelForTaskContent.textContent = 'Task:'

    
    
    const taskContent = document.createElement("input");
    taskContent.type = 'text';
    taskContent.id = 'task-content';
    taskContent.name = 'task-content';
    taskContent.placeholder = 'Enter Task';
    taskContent.required = true;
    const emptyDiv4 = document.createElement("div");
    emptyDiv4.textContent = ' ';
    
 
    const labelForDate= document.createElement("label");
    labelForDate.for = 'date';
    labelForDate.textContent = 'Due:';
    const emptyDiv5 = document.createElement("div");
    emptyDiv5.textContent = ' ';

 
    const date = document.createElement("input");
    date.type = 'date';
    date.id = 'date';
    date.name = 'date';
    date.required = true;
    const emptyDiv6 = document.createElement("div");
    emptyDiv6.textContent = ' ';
    
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
        emptyDiv1, 
        emptyDiv2,
        closeModalButton, 
        labelForTaskContent, 
        taskContent, 
        emptyDiv3,
        labelForDate, 
        date, 
        emptyDiv4,
       
        priorityTitle, 
        priorityOptions, 
        emptyDiv5,
       
        assignToProjectLabel, 
        assignToProject,
        emptyDiv6,
       
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

/***/ "./src/resume.js":
/*!***********************!*\
  !*** ./src/resume.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ resume)
/* harmony export */ });
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _DOMCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMCache */ "./src/DOMCache.js");
/* harmony import */ var _addELs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addELs */ "./src/addELs.js");
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");


;







function makeTaskFromJSON(thing){
    console.log(thing);
    const t = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task(thing.date, thing.content, thing.priority);
    t.project = thing.project;
    t.completed = thing.completed;
   // console.log(t)
    return t
}





function myFunction(dataFromServer){
    const parsedJSON = JSON.parse(dataFromServer);
    for (let i=0;i<parsedJSON.length;i++) {
        const t = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task(parsedJSON[i].date, parsedJSON[i].content, parsedJSON[i].priority);
        t.project = parsedJSON[i].project;
        t.completed = parsedJSON[i].completed;
        _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.data.push(t);
    }
 }

function resume() { 
    const oldJSON = localStorage.getItem('oldData');
    myFunction(oldJSON);
   // for (const entry of oldJSON){
       //console.log(entry)
        //masterList.data.push(makeTaskFromJSON(entry)); 
   // }
   // console.log(masterList.data);

    

    (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderHeader)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body);
    (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.getListOfProjects());
    (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderAddTaskModal)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.getListOfProjects());
    (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_5__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_5__.currentSettings.whichProject);

    // Add eventlisteners to header and modal
    (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addInitialEventListeners)();
    (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addSideProjectEventListeners)();
    (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addMainEventListeners)();
    _DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.sidebarProjectListRemove;
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
/* harmony import */ var _freshStart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./freshStart */ "./src/freshStart.js");
/* harmony import */ var _resume__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resume */ "./src/resume.js");











//  In resume.js 
//  Need to take the returned thing by JSON and make a bunch of Task objects that are then added to masterlist.data

//function reviver(thing){
//    new Task(this.)
    
    //return new Task( )
//}


if(!localStorage.getItem('oldData')) {
    (0,_freshStart__WEBPACK_IMPORTED_MODULE_6__["default"])();
    localStorage.setItem('instance', _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList);
    localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.data));
    localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.displayedList));
} 
else {
   (0,_resume__WEBPACK_IMPORTED_MODULE_7__["default"])();
}








})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05hOztBQUVrQjtBQUNFO0FBQ3dFO0FBQy9EO0FBQzZDO0FBQ25DO0FBQ2Q7QUFDUjs7QUFFOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLElBQUksdURBQVU7QUFDZCxxQ0FBcUMsbURBQVU7QUFDL0MsbURBQW1ELHdEQUFlO0FBQ2xFLDBEQUEwRCxpRUFBd0I7QUFDbEY7QUFDQTtBQUNBLEdBQUcsbURBQU07QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvRE9NQ2FjaGUuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9hZGRFTHMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9jdXJyZW50U2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9mcmVzaFN0YXJ0LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvbWFzdGVyTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3JlbmRlci5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Jlc3VtZS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cblxuZnVuY3Rpb24gZG9tKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldCBoZWFkZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlclwiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBhZGRUYXNrQnRuKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFza1wiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBhZGRUYXNrRm9ybSgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWZvcm1cIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgYWRkVGFza01vZGFsKCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1hLXRhc2stbW9kYWxcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgY2xvc2VNb2RhbEJ1dHRvbigpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbG9zZS1tb2RhbC1idXR0b25cIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgbmV3VGFza0NvbnRlbnQoKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1jb250ZW50XCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IG5ld1Rhc2tEYXRlKCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGVcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBuZXdUYXNrUHJpb3JpdHkoKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9cHJpb3JpdHldJyk7XG4gICAgICAgIH0sICBcbiAgICAgICAgZ2V0IG5ld1Rhc2tQcm9qZWN0KCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xuICAgICAgICB9LCAgICAgICAgICBcbiAgICAgICAgbWFpbixcbiAgICAgICAgYm9keSwgXG4gICAgICAgIGdldCBzaWRlQmFyKCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NpZGViYXJcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgdG9kYXlzVGFza3NTaWRlQmFyICgpe1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kYXlzLXRhc2tzXCIpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgdGhpc1dlZWtTaWRlQmFyKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGhpcy13ZWVrXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IGFsbFRhc2tzU2lkZUJhcigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FsbC10YXNrc1wiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBjYXJkRWRpdEJ0bnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXQtdGFzaycpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgY2FyZFJlbW92ZUJ0bnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlbW92ZS10YXNrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBjYXJkQ2hlY2tCb3hzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuYW1lPVwiaXNDb21wbGV0ZWRDaGVja2JveFwiXScpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbGlzdEJ5UHJvamVjdCgpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGlzdC1ieS1wcm9qZWN0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBzaWRlYmFyUHJvamVjdExpc3QoKSB7XG4gICAgICAgICAgICAvLyBJIG5lZWQgdGhlIGFuY2hvciB0YWdzIG5leHRlZCBpbnNpZGUgdGhlIGxpJ3NcbiAgICAgICAgICAgIGNvbnN0IGxpc3RpdGVtcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyXCIpLmNoaWxkcmVuWzFdLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIGxldCBxdWVyeVN0ciA9ICcnO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8IGxpc3RpdGVtcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgcXVlcnlTdHIgPSBxdWVyeVN0ciArICcjJyArIGxpc3RpdGVtc1tpXS5maXJzdENoaWxkLmlkIFxuICAgICAgICAgICAgICAgIGlmIChpPCBsaXN0aXRlbXMubGVuZ3RoLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnlTdHIgPSBxdWVyeVN0ciArICcsICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHF1ZXJ5U3RyID09PSAnJyl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ251bGwgcXVlcnknKVxuICAgICAgICAgICAgICAgIHF1ZXJ5U3RyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5vZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeVN0cik7XG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3RcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHNpZGViYXJQcm9qZWN0TGlzdFJlbW92ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RpdGVtcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyXCIpLmNoaWxkcmVuWzFdLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RPZlJlbW92ZUJ0bnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPCBsaXN0aXRlbXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxpc3RPZlJlbW92ZUJ0bnMucHVzaChsaXN0aXRlbXNbaV0ubGFzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbGlzdE9mUmVtb3ZlQnRuc1xuXG4gICAgICAgIH1cbiAgICB9XG4gfVxuXG5leHBvcnQgY29uc3QgRE9NID0gZG9tKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJTaWRlQmFyIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza3NcIjsgXG5pbXBvcnQgeyBjdXJyZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jdXJyZW50U2V0dGluZ3NcIjtcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTUNhY2hlXCI7XG5cbmxldCBlZGl0dGluZyA9IGZhbHNlO1xubGV0IElETnVtYmVyID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEluaXRpYWxFdmVudExpc3RlbmVycygpeyBcbi8vICAqKiogQWRkVGFza01vZGFsIG9wZW4sIHN1Ym1pdCwgYW5kIGNsb3NlIGJ0biBFTHMgKioqXG5cbiAgICAvLyBjYWxsYmFjayBmb3Igc3VibWl0XG4gICAgY29uc3QgdGFza1N1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBET00uYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG4gICAgICAgIGlmIChlZGl0dGluZyl7XG4gICAgICAgICAgICBjb25zdCB0YXNrVG9FZGl0ID0gbWFzdGVyTGlzdC5kYXRhLmZpbHRlcigodCk9PiB0LmlkID09IElETnVtYmVyKVswXTtcbiAgICAgICAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgXCJjb250ZW50XCIsIERPTS5uZXdUYXNrQ29udGVudC52YWx1ZSk7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHRhc2tUb0VkaXQsIFwiZGF0ZVwiLCBuZXcgRGF0ZShET00ubmV3VGFza0RhdGUudmFsdWUpKTtcbiAgICAgICAgICAgIGxldCBvcHRpb24gPSBBcnJheS5mcm9tKERPTS5uZXdUYXNrUHJpb3JpdHkpLmZpbHRlcihlID0+IGVbJ2NoZWNrZWQnXSlbMF0gOyBcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbi52YWx1ZSlcbiAgICAgICAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgXCJwcmlvcml0eVwiLCBvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgbWFzdGVyTGlzdC5lZGl0VGFzayh0YXNrVG9FZGl0LCBcInByb2plY3RcIiwgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7IFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgRE9NLm5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKCBET00ubmV3VGFza0RhdGUudmFsdWUsIERPTS5uZXdUYXNrQ29udGVudC52YWx1ZSwgbmV3VGFza1ByaW9yaXR5VmFsdWUsIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSk7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0LmFkZFRhc2sobmV3VGFzayk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGF0YScsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGF0YSkpOyBcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xuICAgICAgICB9XG4gICAgIFxuICAgICBcbiAgICAgICAgbWFzdGVyTGlzdC5zb3J0QnlEYXRlKCk7XG4gICAgICAgIC8vIENsZWFyIHRoZSBtb2RhbCBpbnB1dCBmaWVsZHMgXG4gICAgICAgIERPTS5uZXdUYXNrQ29udGVudC52YWx1ZSA9IG51bGw7XG4gICAgICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIERPTS5uZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgIERPTS5uZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG51bGw7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgRE9NLm1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICByZW5kZXJTaWRlQmFyKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpOyBcbiAgICAgICAgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpO1xuICAgICAgICBhZGRTaWRlVGltZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIERPTS5hZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7ICBlZGl0dGluZyA9IGZhbHNlO1xuICAgIERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKSB9KTtcbiAgICBET00uY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBET00uYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIikgfSk7XG4gICAgRE9NLmFkZFRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGFza1N1Ym1pdCk7ICBcbiAgICBcbiAgICAvL1RvZGF5LCBXZWVrLCBhbmQgQWxsIHNpZGVCYXIgRUxzXG4gICAgdHJ5IHtcbiAgICAgICAgRE9NLnRvZGF5c1Rhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXsgXG4gICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0b2RheScsIG51bGwpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICB9KTtcbiAgICAgICAgIFxuICAgICAgICBET00udGhpc1dlZWtTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgndGhpcy13ZWVrJywgbnVsbCk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH0pO1xuICAgICAgXG4gICAgICAgIERPTS5hbGxUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdhbGwnLCBudWxsKTtcbiAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICAgIFxuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmYWlsZWQgdG8gYWRkIGV2ZW50IGxpc3RlbmVycycpO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBhZGRDYXJkRXZlbnRMaXN0ZW5lcnModGFzayl7XG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1pZD1cIiR7dGFzay5pZH1cIl0gaW5wdXRgKTtcbiAgICBjaGVja2JveFswXS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCB0YXNrSUQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKVxuICAgICAgICBsZXQgdGFzayA9IG1hc3Rlckxpc3QuZGF0YS5maWx0ZXIoKGUpPT4gZS5pZCA9PSB0YXNrSUQpO1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0YXNrLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXNrLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY29tcGxldGVkXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBlZGl0VGFzayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZWRpdHRpbmcgPSB0cnVlO1xuICAgICAgICBJRE51bWJlciA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgICAgICAgY29uc3QgdGFza1RvRWRpdCA9IG1hc3Rlckxpc3QuZGF0YS5maWx0ZXIoKHQpPT4gdC5pZCA9PSBJRE51bWJlcilbMF07XG4gICAgICAgIGxldCB5eXl5ID0gdGFza1RvRWRpdC5kYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGxldCBtbSA9IHRhc2tUb0VkaXQuZGF0ZS5nZXRNb250aCgpKzE7XG4gICAgICAgIGxldCBkZCA9IHRhc2tUb0VkaXQuZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgIGxldCB0YXNrRGF0ZSA9IFN0cmluZygxMDAwMCAqIHl5eXkgKyAxMDAgKiBtbSArIGRkKTtcbiAgICAgICAgdGFza0RhdGUgPSB0YXNrRGF0ZS5zbGljZSgwLDQpKyctJyt0YXNrRGF0ZS5zbGljZSg0LDYpICsgJy0nICt0YXNrRGF0ZS5zbGljZSg2LDgpO1xuICAgICAgICBET00ubmV3VGFza0NvbnRlbnQudmFsdWUgPSB0YXNrVG9FZGl0LmNvbnRlbnQ7XG4gICAgICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSA9IHRhc2tEYXRlO1xuICAgICAgICBET00ubmV3VGFza1Byb2plY3QudmFsdWUgPSB0YXNrVG9FZGl0LnByb2plY3Q7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIERPTS5uZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24udmFsdWUgPT09IHRhc2sucHJpb3JpdHkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb24uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZVRhc2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnN0IHRoaXNUYXNrID0gbWFzdGVyTGlzdC5kYXRhLmZpbHRlciggKHQpID0+IHQuaWQgPT0gZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpKTtcbiAgICAgICAgbWFzdGVyTGlzdC5yZW1vdmVUYXNrKHRoaXNUYXNrWzBdKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTsgXG4gICAgICAgIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5zcGxpY2UobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LmluZGV4T2YodGhpc1Rhc2tbMF0pLCAxKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG4gICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtaWQ9XCIke3Rhc2suaWR9XCJdIGJ1dHRvbmApWzBdO1xuICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVkaXRUYXNrKTtcbiAgICBcbiAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1pZD1cIiR7dGFzay5pZH1cIl0gYnV0dG9uYClbMV07XG4gICAgcmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW1vdmVUYXNrKTtcbn0gXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKXtcbiAgICBmb3IgKGxldCBpdGVtIG9mIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkge1xuICAgICAgICBhZGRDYXJkRXZlbnRMaXN0ZW5lcnMoaXRlbSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCl7XG4gICAgY29uc3QgcmVtb3ZlVGhpcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChjb25maXJtKFwiRGVsZXRlIHRoaXMgcHJvamVjdCBhbmQgYWxsIHRhc2tzIGluIGl0P1wiKSkge1xuICAgICAgICAgICAgY29uc3QgdGFza3NUb1JlbW92ZSA9IG1hc3Rlckxpc3QucHJvZHVjZVByb2plY3RMaXN0KGUudGFyZ2V0LmlkLnNsaWNlKDAsLTYpKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0YXNrc1RvUmVtb3ZlKXtcbiAgICAgICAgICAgICAgICBtYXN0ZXJMaXN0LnJlbW92ZVRhc2soaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGF0YScsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGF0YSkpOyBcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBET00ubWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyU2lkZUJhcihET00uYm9keSwgbWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTsgXG4gICAgICAgICAgICAgICAgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgIGFkZFNpZGVUaW1lRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICB9IFxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJZb3UgcHJlc3NlZCBDYW5jZWwhXCIpO1xuICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IERPTS5zaWRlYmFyUHJvamVjdExpc3RSZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgRE9NLnNpZGViYXJQcm9qZWN0TGlzdFJlbW92ZVtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZVRoaXMpO1xuICAgIH1cbiAgICAvLyBTaWRlQmFyIFByb2plY3QgTmFtZSBFTHNcbiAgICB0cnkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IERPTS5zaWRlYmFyUHJvamVjdExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaW5rID0gKERPTS5zaWRlYmFyUHJvamVjdExpc3RbaV0pO1xuICAgICAgICAgICAgcHJvamVjdExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdieVByb2plY3QnLCBwcm9qZWN0TGluay5pZCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgfVxuXG4gICAgY2F0Y2gge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCBlbCB0byBwcm9qZWN0cycpXG4gICAgfVxuICAgIC8vUmVtb3ZlIHByb2plY3QgYnV0dG9uID8gXG4gICBcbiAgICBcbn1cbiBcbmV4cG9ydCBmdW5jdGlvbiBhZGRTaWRlVGltZUV2ZW50TGlzdGVuZXJzKCl7XG4gICAgdHJ5IHtcbiAgICAgICAgRE9NLnRvZGF5c1Rhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXsgXG4gICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0b2RheScsIG51bGwpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICB9KTtcbiAgICAgICAgIFxuICAgICAgICBET00udGhpc1dlZWtTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgndGhpcy13ZWVrJywgbnVsbCk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH0pO1xuICAgICAgXG4gICAgICAgIERPTS5hbGxUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdhbGwnLCBudWxsKTtcbiAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBhZGQgdG9kYXkvd2Vlay9hbGwgRUxzJylcbiAgICB9XG4gICBcbn0iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNvbnN0IGN1cnJlbnRTZXR0aW5ncyA9IHtcbiAgICB2aWV3Qnk6ICdhbGwnLFxuICAgIHdoaWNoUHJvamVjdDogbnVsbCxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24obmV3Vmlldywgd2hpY2hQID0gbnVsbCkge1xuICAgICAgICB0aGlzLnZpZXdCeSA9IG5ld1ZpZXc7XG4gICAgICAgIHRoaXMud2hpY2hQcm9qZWN0ID0gd2hpY2hQO1xuICAgIH1cblxufSIsIlwidXNlIHN0cmljdFwiXG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4vRE9NQ2FjaGVcIjtcbmltcG9ydCB7IGFkZE1haW5FdmVudExpc3RlbmVycywgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzLCBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vYWRkRUxzXCI7XG5pbXBvcnQgeyBtYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyQWRkVGFza01vZGFsLCByZW5kZXJTaWRlQmFyLCByZW5kZXJIZWFkZXIgfSBmcm9tIFwiLi9yZW5kZXJcIjtcbmltcG9ydCB7IGN1cnJlbnRTZXR0aW5ncyB9IGZyb20gXCIuL2N1cnJlbnRTZXR0aW5nc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmcmVzaFN0YXJ0KCkgeyBcbiAgICBcbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgbGV0IHRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xuICAgIHRvbW9ycm93LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgMSk7XG4gICAgbGV0IGRheUFmdGVyVG9tb3Jyb3cgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgZGF5QWZ0ZXJUb21vcnJvdy5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDIpO1xuXG4gICAgbGV0IGxhdGVyRGF5ID0gbmV3IERhdGUodG9kYXkpO1xuICAgIGxhdGVyRGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgOCk7XG5cbiAgICBsZXQgeWVzdGVyZGF5ID0gbmV3IERhdGUodG9kYXkpO1xuICAgIHllc3RlcmRheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDEpO1xuXG4gICAgY29uc3Qgc2FtcGxlVGFzayA9IG5ldyBUYXNrKCB0b2RheSwgJ1JlZmFjdG9yIHRpYy10YWMtdG9lIHByb2dyYW0nLCAnbm9ybWFsJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2syID0gbmV3IFRhc2soIHRvZGF5LCAnQnV5IG1pbGsnLCAnaGlnaCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrMyA9IG5ldyBUYXNrKCB0b21vcnJvdywgJ0J1eSBiaXJ0aGRheSBjYXJkJywgJ25vcm1hbCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrNCA9IG5ldyBUYXNrKCB0b21vcnJvdywgJ0NhbGwgbW9tJywgJ2hpZ2gnICk7IFxuICAgIGNvbnN0IHNhbXBsZVRhc2s1ID0gbmV3IFRhc2soIHRvbW9ycm93LCAnRG8gUnVieSBiZWdpbm5lciB0dXRvcmlhbCcsICdub3JtYWwnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazYgPSBuZXcgVGFzayggZGF5QWZ0ZXJUb21vcnJvdywgJ1ZhY3V1bScsICdoaWdoJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2s3ID0gbmV3IFRhc2soIGRheUFmdGVyVG9tb3Jyb3csICdMYXVuZHJ5JywgJ25vcm1hbCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrOCA9IG5ldyBUYXNrKCBkYXlBZnRlclRvbW9ycm93LCAnUHJhY3RpY2UgcGlhbm8nLCAnbm9ybWFsJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2s5ID0gbmV3IFRhc2soIHRvZGF5LCAnRG9nLXNpdCBmb3IgS2ltbXknLCAnaGlnaCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrMTAgPSBuZXcgVGFzayggeWVzdGVyZGF5LCAnU2NoZWR1bGUgZGVudGlzdCBhcHBvaW50bWVudCcsICdoaWdoJyApO1xuXG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2spO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMik7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2szKTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazQpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNSk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s2KTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazcpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrOCk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s5KTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazEwKTtcbiAgICBtYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcblxuXG4gICAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrLCAncHJvamVjdCcsICdDb2RpbmcnKTtcbiAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2syLCAncHJvamVjdCcsICdTaG9wcGluZycpO1xuICAgIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazMsICdwcm9qZWN0JywgJ1Nob3BwaW5nJyk7XG4gICAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNSwgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG4gICAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNiwgJ3Byb2plY3QnLCAnSG91c2V3b3JrJyk7XG4gICAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNywgJ3Byb2plY3QnLCAnSG91c2V3b3JrJyk7XG5cbiAgICAvLyAqKioqKioqKioqKioqKipcblxuICAgIC8vIENhY2hlIERPTSBhbmQgcmVuZGVyIGVhY2ggc2VjdGlvblxuICAgIGNvbnNvbGUubG9nKG1hc3Rlckxpc3QuZGF0YSk7XG5cbiAgICByZW5kZXJIZWFkZXIoRE9NLmJvZHkpO1xuICAgIHJlbmRlclNpZGVCYXIoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgcmVuZGVyQWRkVGFza01vZGFsKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG5cbiAgICAvLyBBZGQgZXZlbnRsaXN0ZW5lcnMgdG8gaGVhZGVyIGFuZCBtb2RhbFxuICAgIGFkZEluaXRpYWxFdmVudExpc3RlbmVycygpO1xuICAgIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBET00uc2lkZWJhclByb2plY3RMaXN0UmVtb3ZlO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBUaGVyZSBzaG91bGQgb25seSBiZSBvbmUgbWFzdGVyIGxpc3RcbmxldCBpbnN0YW5jZSA9IG51bGw7XG5cbi8vIENvbnN0cnVjdG9yIHRvIG1ha2UgdGFzayBvYmplY3RzXG5jbGFzcyBNYXN0ZXJMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbiBvbmx5IGNyZWF0ZSBvbmUgaW5zdGFuY2UhXCIpO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICAgIHRoaXMuZGlzcGxheWVkTGlzdCA9IFtdO1xuICAgIH1cblxuICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICB0aGlzLmRhdGEucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZih0YXNrKSwgMSk7XG4gICAgfVxuXG4gICAgZWRpdFRhc2sodGFzaywgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmRhdGFbdGhpcy5kYXRhLmluZGV4T2YodGFzayldW2F0dHJpYnV0ZV0gPSB2YWx1ZTsgXG4gICAgfVxuXG4gICAgc29ydEJ5RGF0ZSgpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNvcnQoKGEsYikgPT4gYS5kYXRlIC0gYi5kYXRlKTtcbiAgICB9XG5cbiAgICBwcm9kdWNlUHJvamVjdExpc3QocHJvamVjdCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IHRoaXMuZGF0YS5maWx0ZXIoICh0YXNrKSA9PiB0YXNrLnByb2plY3QgPT0gcHJvamVjdCk7XG4gICAgICAgIHByb2plY3RMaXN0LnNvcnQoKGEsYikgPT4gYS5kYXRlIC0gYi5kYXRlKTtcbiAgICAgICAgcmV0dXJuIHByb2plY3RMaXN0O1xuICAgIH1cblxuICAgIGdldExpc3RPZlByb2plY3RzKCkge1xuICAgICAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCggKHRhc2spPT4ge1xuICAgICAgICAgICAgaWYgKHRhc2sucHJvamVjdCAhPSBudWxsICYmICB0YXNrLnByb2plY3QgIT0gJycgJiYgIWFsbFByb2plY3RzLnNvbWUoKGEpPT4gYSA9PT0gdGFzay5wcm9qZWN0KSl7XG4gICAgICAgICAgICAgICAgYWxsUHJvamVjdHMucHVzaCh0YXNrLnByb2plY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYWxsUHJvamVjdHM7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0O1xuXG5cbiIsIlwidXNlIHN0cmljdFwiXG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01DYWNoZVwiO1xuXG5mdW5jdGlvbiByZW5kZXJDYXJkKHRhc2spIHtcbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICBjaGVja2JveC5uYW1lID0gXCJpc0NvbXBsZXRlZENoZWNrYm94XCI7XG4gICAgY2hlY2tib3guc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gICAgY2hlY2tib3guY2hlY2tlZCA9IHRhc2suY29tcGxldGVkO1xuICAgIGNoZWNrYm94LmlkID0gdGFzay5jb250ZW50O1xuICAgIFxuICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKCd0YXNrLW5hbWUnKTtcbiAgICB0YXNrTmFtZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRhc2suY29udGVudDtcblxuICAgIGNvbnN0IHRhc2tEdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tEdWUuY2xhc3NMaXN0LmFkZCgndGFzay1kdWUtZGF0ZScpO1xuICAgIHRhc2tEdWUuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gICAgdGFza0R1ZS50ZXh0Q29udGVudCA9IGBEdWU6ICR7dGFzay5kYXRlLnRvTG9jYWxlU3RyaW5nKCdkZWZhdWx0Jywge3dlZWtkYXk6ICdzaG9ydCcgfSl9LFxuICAgICAgICAkeyB0YXNrLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7IG1vbnRoOiAnc2hvcnQnIH0pfS4gXG4gICAgICAgICR7IHRhc2suZGF0ZS5nZXREYXRlKCl9IGAgIFxuICAgIFxuICAgIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGVkaXRCdG4uY2xhc3NMaXN0LmFkZCgnZWRpdC10YXNrJyk7XG4gICAgZWRpdEJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgICBlZGl0QnRuLnRleHRDb250ZW50ID0gJ2VkaXQnO1xuIFxuICAgIFxuICAgIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZS10YXNrJyk7XG4gICAgcmVtb3ZlQnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICAgIHJlbW92ZUJ0bi50ZXh0Q29udGVudCA9ICdyZW1vdmUnO1xuIFxuICAgIFxuICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgIGNhcmQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gICAgaWYgKHRhc2sucHJpb3JpdHkgPT0gJ2hpZ2gnKSB7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50Jyk7XG4gICAgfSBcbiAgICBjYXJkLmFwcGVuZChjaGVja2JveCwgdGFza05hbWUsIHRhc2tEdWUsIGVkaXRCdG4sIHJlbW92ZUJ0bik7XG4gICAgcmV0dXJuIChjYXJkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBvcHRpb24sIGJ5UHJvamVjdE5hbWUgPSBudWxsKSB7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBsZXQgdG9tb3Jyb3cgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcblxuICAgIGxldCB3ZWVrRnJvbVRvZGF5PSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgd2Vla0Zyb21Ub2RheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDcpO1xuXG4gICAgbGV0IHRvZGF5R3JvdXAgPSBudWxsO1xuICAgIGxldCBwYXN0RHVlID0gbnVsbDtcbiAgICBsZXQgd2Vla0dyb3VwID0gbnVsbDtcblxuICAgIC8vIEZpcnN0IHJlbW92ZSBldmVyeXRoaW5nIGZyb20gbWFpbiBhbmQgZnJvbSBkaXNwbGF5TGlzdFxuICAgIHdoaWxlIChET00ubWFpbi5maXJzdENoaWxkKSB7XG4gICAgICAgIERPTS5tYWluLnJlbW92ZUNoaWxkKERPTS5tYWluLmZpcnN0Q2hpbGQpO1xuICAgICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3Quc3BsaWNlKDAsIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5sZW5ndGgpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb24gPT09ICdieVByb2plY3QnKXtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBtYXN0ZXJMaXN0LnByb2R1Y2VQcm9qZWN0TGlzdChieVByb2plY3ROYW1lKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcm9qZWN0SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgIHByb2plY3RIZWFkaW5nLnRleHRDb250ZW50ID0gYnlQcm9qZWN0TmFtZTtcbiAgICAgICAgRE9NLm1haW4uYXBwZW5kKHByb2plY3RIZWFkaW5nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZiAocHJvamVjdExpc3RbaV0uZGF0ZSA+PSB0b2RheSAmJiBwcm9qZWN0TGlzdFtpXS5kYXRlIDw9IHRvZGF5ICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZGF5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3N1YmhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TGlzdFtpXS5kYXRlID4gdG9kYXkgJiYgdG9kYXlHcm91cCA9PSAxKSAge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBET00ubWFpbi5hcHBlbmQocmVuZGVyQ2FyZChwcm9qZWN0TGlzdFtpXSkpO1xuICAgICAgICAgICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnB1c2gocHJvamVjdExpc3RbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFzdGVyTGlzdC5kYXRhLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b21vcnJvdyAmJiBvcHRpb24gPT09IFwidG9kYXlcIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07IFxuXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPiB3ZWVrRnJvbVRvZGF5ICYmIG9wdGlvbiA9PT0gXCJ0aGlzLXdlZWtcIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07IFxuXG5cbiAgICAgICAgICAgIC8vIFBhc3QtRHVlIFVuZG9uZSBCbG9ja1xuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9kYXkgICYmIHBhc3REdWUgPT0gbnVsbCAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uY29tcGxldGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHBhc3REdWUgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3REdWVIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBwYXN0RHVlSGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgcGFzdER1ZUhlYWRpbmcudGV4dENvbnRlbnQgPSAnUGFzdCBEdWUnO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZChwYXN0RHVlSGVhZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICBcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSAmJiBwYXN0RHVlID09IDEpIHtcbiAgICAgICAgICAgICAgICBwYXN0RHVlID0gMjtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUb2RheSBCbG9ja1xuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5ICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9tb3Jyb3cgJiYgdG9kYXlHcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IDE7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKHRvZGF5SGVhZGluZyk7XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgdG9kYXlHcm91cCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IDI7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDw9IHdlZWtGcm9tVG9kYXkgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgd2Vla0dyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB3ZWVrR3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdlZWtIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB3ZWVrSGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgd2Vla0hlYWRpbmcudGV4dENvbnRlbnQgPSAnVGhpcyBXZWVrJztcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQod2Vla0hlYWRpbmcpO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiB3ZWVrR3JvdXAgPT0gMSkge1xuICAgICAgICAgICAgICAgIHdlZWtHcm91cCA9IDI7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH07IFxuXG4gICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKChtYXN0ZXJMaXN0LmRhdGFbaV0uY29tcGxldGVkID09PSBmYWxzZSAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8IHRvZGF5KSB8fCBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSl7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKHJlbmRlckNhcmQobWFzdGVyTGlzdC5kYXRhW2ldKSk7XG4gICAgICAgICAgICAgICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnB1c2gobWFzdGVyTGlzdC5kYXRhW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBZGRUYXNrTW9kYWwoc29tZURpdiwgYXJyYXlPZlByb2plY3ROYW1lcykge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpO1xuICAgIGFkZFRhc2tNb2RhbC5pZCA9ICdhZGQtYS10YXNrLW1vZGFsJztcblxuICAgIGNvbnN0IGFkZFRhc2tNb2RhbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgdGFza0Zvcm0uaWQgPSAndGFzay1mb3JtJztcbiAgICBcbiAgICBjb25zdCBlbXB0eURpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVtcHR5RGl2MS50ZXh0Q29udGVudCA9ICcgJztcbiAgICBjb25zdCBlbXB0eURpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVtcHR5RGl2Mi50ZXh0Q29udGVudCA9ICcgJztcbiAgICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlkID0gJ2Nsb3NlLW1vZGFsLWJ1dHRvbic7XG5cbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlubmVySFRNTCA9ICcmdGltZXMnO1xuICAgIFxuICAgIGNvbnN0IGVtcHR5RGl2MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZW1wdHlEaXYzLnRleHRDb250ZW50ID0gJyAnO1xuICAgIGNvbnN0IGxhYmVsRm9yVGFza0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWxGb3JUYXNrQ29udGVudC5mb3IgPSAndGFzay1jb250ZW50JztcbiAgICBsYWJlbEZvclRhc2tDb250ZW50LnRleHRDb250ZW50ID0gJ1Rhc2s6J1xuXG4gICAgXG4gICAgXG4gICAgY29uc3QgdGFza0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGFza0NvbnRlbnQudHlwZSA9ICd0ZXh0JztcbiAgICB0YXNrQ29udGVudC5pZCA9ICd0YXNrLWNvbnRlbnQnO1xuICAgIHRhc2tDb250ZW50Lm5hbWUgPSAndGFzay1jb250ZW50JztcbiAgICB0YXNrQ29udGVudC5wbGFjZWhvbGRlciA9ICdFbnRlciBUYXNrJztcbiAgICB0YXNrQ29udGVudC5yZXF1aXJlZCA9IHRydWU7XG4gICAgY29uc3QgZW1wdHlEaXY0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBlbXB0eURpdjQudGV4dENvbnRlbnQgPSAnICc7XG4gICAgXG4gXG4gICAgY29uc3QgbGFiZWxGb3JEYXRlPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWxGb3JEYXRlLmZvciA9ICdkYXRlJztcbiAgICBsYWJlbEZvckRhdGUudGV4dENvbnRlbnQgPSAnRHVlOic7XG4gICAgY29uc3QgZW1wdHlEaXY1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBlbXB0eURpdjUudGV4dENvbnRlbnQgPSAnICc7XG5cbiBcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGRhdGUudHlwZSA9ICdkYXRlJztcbiAgICBkYXRlLmlkID0gJ2RhdGUnO1xuICAgIGRhdGUubmFtZSA9ICdkYXRlJztcbiAgICBkYXRlLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBjb25zdCBlbXB0eURpdjYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVtcHR5RGl2Ni50ZXh0Q29udGVudCA9ICcgJztcbiAgICBcbiAgICBjb25zdCBwcmlvcml0eVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eVRpdGxlLnRleHRDb250ZW50ID0gJ1ByaW9yaXR5Oic7XG5cbiAgICBjb25zdCBwcmlvcml0eU9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5pZCA9ICdwcmlvcml0eS1vcHRpb25zJztcblxuICAgIGNvbnN0IG9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG5vcm1hbFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIG5vcm1hbFJhZGlvLnR5cGUgPSBcInJhZGlvXCI7XG4gICAgbm9ybWFsUmFkaW8uaWQgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLm5hbWUgPSBcInByaW9yaXR5XCI7XG4gICAgbm9ybWFsUmFkaW8udmFsdWUgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IG5vcm1hbFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbm9ybWFsUmFkaW9MYWJlbC5mb3IgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvTGFiZWwudGV4dENvbnRlbnQgPSBcIk5vcm1hbFwiO1xuXG4gICAgY29uc3Qgb3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgaGlnaFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGhpZ2hSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgIGhpZ2hSYWRpby5pZCA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpby5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgIGhpZ2hSYWRpby52YWx1ZSA9IFwiaGlnaFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGhpZ2hSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGhpZ2hSYWRpb0xhYmVsLmZvciA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gXCJIaWdoXCI7XG4gICBcblxuICAgIGNvbnN0IGFzc2lnblRvUHJvamVjdExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGFzc2lnblRvUHJvamVjdExhYmVsLmZvciA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdExhYmVsLnRleHRDb250ZW50ID0gXCJQcm9qZWN0OlwiXG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgYXNzaWduVG9Qcm9qZWN0Lm5hbWUgPSBcInByb2plY3RcIjtcbiAgICBhc3NpZ25Ub1Byb2plY3QuaWQgPSBcInByb2plY3RcIjtcbiAgICBhc3NpZ25Ub1Byb2plY3QucGxhY2Vob2xkZXIgPSBcIk9wdGlvbmFsXCJcbiAgICBhc3NpZ25Ub1Byb2plY3Quc2V0QXR0cmlidXRlKFwibGlzdFwiLCBcInByb2plY3QtbGlzdFwiKTtcbiAgICBcblxuICAgIGNvbnN0IGFzc2lnblRvUHJvamVjdERhdGFMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRhdGFsaXN0XCIpO1xuICAgIGFzc2lnblRvUHJvamVjdERhdGFMaXN0LmlkID0gXCJwcm9qZWN0LWxpc3RcIjtcbiAgIFxuICAgIGFycmF5T2ZQcm9qZWN0TmFtZXMuZm9yRWFjaCggKGVudHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gZW50cnk7XG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGVudHJ5OyBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuYXBwZW5kKG9wdGlvbik7XG4gICAgfSlcblxuICAgIGFzc2lnblRvUHJvamVjdC5hcHBlbmQoYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QpO1xuXG4gICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzdWJtaXRCdG4udHlwZSA9IFwic3VibWl0XCI7XG4gICAgc3VibWl0QnRuLmlkID0gXCJtb2RhbC1zdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4udmFsdWUgPSBcIlN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XG5cbiAgICBvcHRpb24xLmFwcGVuZChub3JtYWxSYWRpbywgbm9ybWFsUmFkaW9MYWJlbCk7XG4gICAgb3B0aW9uMi5hcHBlbmQoaGlnaFJhZGlvLCBoaWdoUmFkaW9MYWJlbCk7XG4gICAgcHJpb3JpdHlPcHRpb25zLmFwcGVuZChvcHRpb24xLCBvcHRpb24yKTtcbiAgICB0YXNrRm9ybS5hcHBlbmQoXG4gICAgICAgIGVtcHR5RGl2MSwgXG4gICAgICAgIGVtcHR5RGl2MixcbiAgICAgICAgY2xvc2VNb2RhbEJ1dHRvbiwgXG4gICAgICAgIGxhYmVsRm9yVGFza0NvbnRlbnQsIFxuICAgICAgICB0YXNrQ29udGVudCwgXG4gICAgICAgIGVtcHR5RGl2MyxcbiAgICAgICAgbGFiZWxGb3JEYXRlLCBcbiAgICAgICAgZGF0ZSwgXG4gICAgICAgIGVtcHR5RGl2NCxcbiAgICAgICBcbiAgICAgICAgcHJpb3JpdHlUaXRsZSwgXG4gICAgICAgIHByaW9yaXR5T3B0aW9ucywgXG4gICAgICAgIGVtcHR5RGl2NSxcbiAgICAgICBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwsIFxuICAgICAgICBhc3NpZ25Ub1Byb2plY3QsXG4gICAgICAgIGVtcHR5RGl2NixcbiAgICAgICBcbiAgICAgICAgc3VibWl0QnRuKTtcbiAgICBhZGRUYXNrTW9kYWxDb250ZW50LmFwcGVuZCh0YXNrRm9ybSk7XG4gICAgYWRkVGFza01vZGFsLmFwcGVuZChhZGRUYXNrTW9kYWxDb250ZW50KTtcbiAgICBzb21lRGl2LmFwcGVuZChhZGRUYXNrTW9kYWwpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTaWRlQmFyKHNvbWVEaXYsIGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgICBpZiAoRE9NLnNpZGVCYXIpe1xuICAgIFxuICAgICAgICBET00uc2lkZUJhci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKERPTS5zaWRlQmFyKTtcbiAgICAgICAgXG4gICAgfVxuICAgIGNvbnN0IHNpZGViYXJTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgc2lkZWJhclNlY3Rpb24uaWQgPSAnc2lkZWJhcic7XG4gICAgY29uc3QgbGlzdEJ5VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgY29uc3QgbGlzdEl0ZW0xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBpdGVtMUFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpdGVtMUFuY2hvci5pZCA9ICd0b2RheXMtdGFza3MnO1xuICAgIGl0ZW0xQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgaXRlbTFBbmNob3IudGV4dENvbnRlbnQgPSBcIlRvZGF5XCI7XG5cbiAgICBsaXN0SXRlbTEuYXBwZW5kKGl0ZW0xQW5jaG9yKTtcblxuICAgIGNvbnN0IGxpc3RJdGVtMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgaXRlbTJBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaXRlbTJBbmNob3IuaWQgPSAndGhpcy13ZWVrJztcbiAgICBpdGVtMkFuY2hvci5ocmVmID0gJyMnO1xuICAgIGl0ZW0yQW5jaG9yLnRleHRDb250ZW50ID0gXCJUaGlzIFdlZWtcIjtcbiAgICBsaXN0SXRlbTIuYXBwZW5kKGl0ZW0yQW5jaG9yKTtcbiAgICBcbiAgICBjb25zdCBsaXN0SXRlbTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW0zQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW0zQW5jaG9yLmlkID0gJ2FsbC10YXNrcyc7XG4gICAgaXRlbTNBbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtM0FuY2hvci50ZXh0Q29udGVudCA9IFwiQWxsXCI7XG4gICAgbGlzdEl0ZW0zLmFwcGVuZChpdGVtM0FuY2hvcik7XG5cbiAgICBsaXN0QnlUaW1lLmFwcGVuZChsaXN0SXRlbTEsIGxpc3RJdGVtMiwgbGlzdEl0ZW0zKTtcblxuICAgIGNvbnN0IGxpc3RCeVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIGxpc3RCeVByb2plY3QuaWQgPSAnbGlzdC1ieS1wcm9qZWN0JztcbiAgICBjb25zdCBtYWtlTGluayA9IGZ1bmN0aW9uKG5hbWUsIGRpdikge1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGNvbnN0IGl0ZW1BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGl0ZW1BbmNob3IuaWQgPSBuYW1lO1xuICAgICAgICBpdGVtQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgICAgIGl0ZW1BbmNob3IudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgICBjb25zdCByZW1vdmVQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICByZW1vdmVQcm9qZWN0QnRuLmlkID0gYCR7bmFtZX1SZW1vdmVgO1xuICAgICAgICByZW1vdmVQcm9qZWN0QnRuLmhyZWYgPSBcIiNcIlxuICAgICAgICByZW1vdmVQcm9qZWN0QnRuLnRleHRDb250ZW50ID0gJ8OXJztcbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kKGl0ZW1BbmNob3IscmVtb3ZlUHJvamVjdEJ0bik7XG4gICAgICAgIGRpdi5hcHBlbmQobGlzdEl0ZW0pO1xuICAgIH1cbiAgICBpZiAoYXJyYXlPZlByb2plY3ROYW1lcyl7XG4gICAgICAgIGFycmF5T2ZQcm9qZWN0TmFtZXMuZm9yRWFjaChmdW5jdGlvbihhKXsgbWFrZUxpbmsoYSwgbGlzdEJ5UHJvamVjdCkgfSApO1xuICAgIH1cbiAgICBzaWRlYmFyU2VjdGlvbi5hcHBlbmQobGlzdEJ5VGltZSwgbGlzdEJ5UHJvamVjdCk7XG4gICAgc29tZURpdi5hcHBlbmQoc2lkZWJhclNlY3Rpb24pOyAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVySGVhZGVyKHNvbWVEaXYpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGFkZFRhc2tCdG4uaWQgPSBcImFkZC1hLXRhc2tcIjtcbiAgICBhZGRUYXNrQnRuLnRleHRDb250ZW50ID0gXCJBZGQgVGFza1wiO1xuICAgIGhlYWRlci5hcHBlbmQoYWRkVGFza0J0bik7XG4gICAgc29tZURpdi5wcmVwZW5kKGhlYWRlcik7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiXG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4vRE9NQ2FjaGVcIjtcbmltcG9ydCB7IGFkZE1haW5FdmVudExpc3RlbmVycywgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzLCBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vYWRkRUxzXCI7XG5pbXBvcnQgeyBtYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyQWRkVGFza01vZGFsLCByZW5kZXJTaWRlQmFyLCByZW5kZXJIZWFkZXIgfSBmcm9tIFwiLi9yZW5kZXJcIjtcbmltcG9ydCB7IGN1cnJlbnRTZXR0aW5ncyB9IGZyb20gXCIuL2N1cnJlbnRTZXR0aW5nc1wiO1xuXG5cbmZ1bmN0aW9uIG1ha2VUYXNrRnJvbUpTT04odGhpbmcpe1xuICAgIGNvbnNvbGUubG9nKHRoaW5nKTtcbiAgICBjb25zdCB0ID0gbmV3IFRhc2sodGhpbmcuZGF0ZSwgdGhpbmcuY29udGVudCwgdGhpbmcucHJpb3JpdHkpO1xuICAgIHQucHJvamVjdCA9IHRoaW5nLnByb2plY3Q7XG4gICAgdC5jb21wbGV0ZWQgPSB0aGluZy5jb21wbGV0ZWQ7XG4gICAvLyBjb25zb2xlLmxvZyh0KVxuICAgIHJldHVybiB0XG59XG5cblxuXG5cblxuZnVuY3Rpb24gbXlGdW5jdGlvbihkYXRhRnJvbVNlcnZlcil7XG4gICAgY29uc3QgcGFyc2VkSlNPTiA9IEpTT04ucGFyc2UoZGF0YUZyb21TZXJ2ZXIpO1xuICAgIGZvciAobGV0IGk9MDtpPHBhcnNlZEpTT04ubGVuZ3RoO2krKykge1xuICAgICAgICBjb25zdCB0ID0gbmV3IFRhc2socGFyc2VkSlNPTltpXS5kYXRlLCBwYXJzZWRKU09OW2ldLmNvbnRlbnQsIHBhcnNlZEpTT05baV0ucHJpb3JpdHkpO1xuICAgICAgICB0LnByb2plY3QgPSBwYXJzZWRKU09OW2ldLnByb2plY3Q7XG4gICAgICAgIHQuY29tcGxldGVkID0gcGFyc2VkSlNPTltpXS5jb21wbGV0ZWQ7XG4gICAgICAgIG1hc3Rlckxpc3QuZGF0YS5wdXNoKHQpO1xuICAgIH1cbiB9XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc3VtZSgpIHsgXG4gICAgY29uc3Qgb2xkSlNPTiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvbGREYXRhJyk7XG4gICAgbXlGdW5jdGlvbihvbGRKU09OKTtcbiAgIC8vIGZvciAoY29uc3QgZW50cnkgb2Ygb2xkSlNPTil7XG4gICAgICAgLy9jb25zb2xlLmxvZyhlbnRyeSlcbiAgICAgICAgLy9tYXN0ZXJMaXN0LmRhdGEucHVzaChtYWtlVGFza0Zyb21KU09OKGVudHJ5KSk7IFxuICAgLy8gfVxuICAgLy8gY29uc29sZS5sb2cobWFzdGVyTGlzdC5kYXRhKTtcblxuICAgIFxuXG4gICAgcmVuZGVySGVhZGVyKERPTS5ib2R5KTtcbiAgICByZW5kZXJTaWRlQmFyKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgIHJlbmRlckFkZFRhc2tNb2RhbChET00uYm9keSwgbWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTtcbiAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuXG4gICAgLy8gQWRkIGV2ZW50bGlzdGVuZXJzIHRvIGhlYWRlciBhbmQgbW9kYWxcbiAgICBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgRE9NLnNpZGViYXJQcm9qZWN0TGlzdFJlbW92ZTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gQ29uc3RydWN0b3IgdG8gbWFrZSB0YXNrIG9iamVjdHNcbmV4cG9ydCBjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGUsIGNvbnRlbnQsIHByaW9yaXR5LCBwcm9qZWN0ID0gbnVsbCkgeyBcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMDAwMDApO1xuICAgIH1cblxuICAgIG1hcmtEb25lKCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgfVxuXG59O1xuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01DYWNoZVwiO1xuaW1wb3J0IHsgYWRkTWFpbkV2ZW50TGlzdGVuZXJzLCBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMsIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9hZGRFTHNcIjtcbmltcG9ydCB7IG1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJBZGRUYXNrTW9kYWwsIHJlbmRlclNpZGVCYXIsIHJlbmRlckhlYWRlciB9IGZyb20gXCIuL3JlbmRlclwiO1xuaW1wb3J0IHsgY3VycmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY3VycmVudFNldHRpbmdzXCI7XG5pbXBvcnQgZnJlc2hTdGFydCBmcm9tIFwiLi9mcmVzaFN0YXJ0XCI7XG5pbXBvcnQgcmVzdW1lIGZyb20gXCIuL3Jlc3VtZVwiO1xuXG4vLyAgSW4gcmVzdW1lLmpzIFxuLy8gIE5lZWQgdG8gdGFrZSB0aGUgcmV0dXJuZWQgdGhpbmcgYnkgSlNPTiBhbmQgbWFrZSBhIGJ1bmNoIG9mIFRhc2sgb2JqZWN0cyB0aGF0IGFyZSB0aGVuIGFkZGVkIHRvIG1hc3Rlcmxpc3QuZGF0YVxuXG4vL2Z1bmN0aW9uIHJldml2ZXIodGhpbmcpe1xuLy8gICAgbmV3IFRhc2sodGhpcy4pXG4gICAgXG4gICAgLy9yZXR1cm4gbmV3IFRhc2soIClcbi8vfVxuXG5cbmlmKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb2xkRGF0YScpKSB7XG4gICAgZnJlc2hTdGFydCgpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbnN0YW5jZScsIG1hc3Rlckxpc3QpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG59IFxuZWxzZSB7XG4gICByZXN1bWUoKTtcbn1cblxuXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9