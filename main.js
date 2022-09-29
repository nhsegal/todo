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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOYTs7QUFFa0I7QUFDRTtBQUN3RTtBQUMvRDtBQUM2QztBQUNuQztBQUNkO0FBQ1I7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxJQUFJLHVEQUFVO0FBQ2QscUNBQXFDLG1EQUFVO0FBQy9DLG1EQUFtRCx3REFBZTtBQUNsRSwwREFBMEQsaUVBQXdCO0FBQ2xGO0FBQ0E7QUFDQSxHQUFHLG1EQUFNO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL0RPTUNhY2hlLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvYWRkRUxzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvY3VycmVudFNldHRpbmdzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZnJlc2hTdGFydC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL21hc3Rlckxpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9yZXN1bWUuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG5cbmZ1bmN0aW9uIGRvbSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQgaGVhZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgYWRkVGFza0J0bigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1hLXRhc2tcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgYWRkVGFza0Zvcm0oKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1mb3JtXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IGFkZFRhc2tNb2RhbCgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYS10YXNrLW1vZGFsXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IGNsb3NlTW9kYWxCdXR0b24oKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2UtbW9kYWwtYnV0dG9uXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IG5ld1Rhc2tDb250ZW50KCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stY29udGVudFwiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBuZXdUYXNrRGF0ZSgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbmV3VGFza1ByaW9yaXR5KCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXByaW9yaXR5XScpO1xuICAgICAgICB9LCAgXG4gICAgICAgIGdldCBuZXdUYXNrUHJvamVjdCgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcbiAgICAgICAgfSwgICAgICAgICAgXG4gICAgICAgIG1haW4sXG4gICAgICAgIGJvZHksIFxuICAgICAgICBnZXQgc2lkZUJhcigpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IHRvZGF5c1Rhc2tzU2lkZUJhciAoKXtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZGF5cy10YXNrc1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHRoaXNXZWVrU2lkZUJhcigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RoaXMtd2Vla1wiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBhbGxUYXNrc1NpZGVCYXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhbGwtdGFza3NcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgY2FyZEVkaXRCdG5zKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0LXRhc2snKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGNhcmRSZW1vdmVCdG5zKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZW1vdmUtdGFzaycpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgY2FyZENoZWNrQm94cygpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbbmFtZT1cImlzQ29tcGxldGVkQ2hlY2tib3hcIl0nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGxpc3RCeVByb2plY3QoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpc3QtYnktcHJvamVjdCcpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgc2lkZWJhclByb2plY3RMaXN0KCkge1xuICAgICAgICAgICAgLy8gSSBuZWVkIHRoZSBhbmNob3IgdGFncyBuZXh0ZWQgaW5zaWRlIHRoZSBsaSdzXG4gICAgICAgICAgICBjb25zdCBsaXN0aXRlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZWJhclwiKS5jaGlsZHJlblsxXS5jaGlsZHJlbik7XG4gICAgICAgICAgICBsZXQgcXVlcnlTdHIgPSAnJztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpPCBsaXN0aXRlbXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIHF1ZXJ5U3RyID0gcXVlcnlTdHIgKyAnIycgKyBsaXN0aXRlbXNbaV0uZmlyc3RDaGlsZC5pZCBcbiAgICAgICAgICAgICAgICBpZiAoaTwgbGlzdGl0ZW1zLmxlbmd0aC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5U3RyID0gcXVlcnlTdHIgKyAnLCAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChxdWVyeVN0ciA9PT0gJycpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdudWxsIHF1ZXJ5JylcbiAgICAgICAgICAgICAgICBxdWVyeVN0ciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnlTdHIpO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBzaWRlYmFyUHJvamVjdExpc3RSZW1vdmUoKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0aXRlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZWJhclwiKS5jaGlsZHJlblsxXS5jaGlsZHJlbik7XG4gICAgICAgICAgICBjb25zdCBsaXN0T2ZSZW1vdmVCdG5zID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTwgbGlzdGl0ZW1zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsaXN0T2ZSZW1vdmVCdG5zLnB1c2gobGlzdGl0ZW1zW2ldLmxhc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGxpc3RPZlJlbW92ZUJ0bnNcblxuICAgICAgICB9XG4gICAgfVxuIH1cblxuZXhwb3J0IGNvbnN0IERPTSA9IGRvbSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBtYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyU2lkZUJhciB9IGZyb20gXCIuL3JlbmRlclwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7IFxuaW1wb3J0IHsgY3VycmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY3VycmVudFNldHRpbmdzXCI7XG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01DYWNoZVwiO1xuXG5sZXQgZWRpdHRpbmcgPSBmYWxzZTtcbmxldCBJRE51bWJlciA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMoKXsgXG4vLyAgKioqIEFkZFRhc2tNb2RhbCBvcGVuLCBzdWJtaXQsIGFuZCBjbG9zZSBidG4gRUxzICoqKlxuXG4gICAgLy8gY2FsbGJhY2sgZm9yIHN1Ym1pdFxuICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuICAgICAgICBpZiAoZWRpdHRpbmcpe1xuICAgICAgICAgICAgY29uc3QgdGFza1RvRWRpdCA9IG1hc3Rlckxpc3QuZGF0YS5maWx0ZXIoKHQpPT4gdC5pZCA9PSBJRE51bWJlcilbMF07XG4gICAgICAgICAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHRhc2tUb0VkaXQsIFwiY29udGVudFwiLCBET00ubmV3VGFza0NvbnRlbnQudmFsdWUpO1xuICAgICAgICAgICAgbWFzdGVyTGlzdC5lZGl0VGFzayh0YXNrVG9FZGl0LCBcImRhdGVcIiwgbmV3IERhdGUoRE9NLm5ld1Rhc2tEYXRlLnZhbHVlKSk7XG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gQXJyYXkuZnJvbShET00ubmV3VGFza1ByaW9yaXR5KS5maWx0ZXIoZSA9PiBlWydjaGVja2VkJ10pWzBdIDsgXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvcHRpb24udmFsdWUpXG4gICAgICAgICAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHRhc2tUb0VkaXQsIFwicHJpb3JpdHlcIiwgb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgXCJwcm9qZWN0XCIsIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGF0YScsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGF0YSkpOyBcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIERPTS5uZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBvcHRpb24udmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayggRE9NLm5ld1Rhc2tEYXRlLnZhbHVlLCBET00ubmV3VGFza0NvbnRlbnQudmFsdWUsIG5ld1Rhc2tQcmlvcml0eVZhbHVlLCBET00ubmV3VGFza1Byb2plY3QudmFsdWUpO1xuICAgICAgICAgICAgbWFzdGVyTGlzdC5hZGRUYXNrKG5ld1Rhc2spO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTsgXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGlzcGxheUxpc3QnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QpKTtcbiAgICAgICAgfVxuICAgICBcbiAgICAgXG4gICAgICAgIG1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuICAgICAgICAvLyBDbGVhciB0aGUgbW9kYWwgaW5wdXQgZmllbGRzIFxuICAgICAgICBET00ubmV3VGFza0NvbnRlbnQudmFsdWUgPSBudWxsO1xuICAgICAgICBET00ubmV3VGFza0RhdGUudmFsdWUgPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBET00ubmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICBET00ubmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsOyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgcmVuZGVyU2lkZUJhcihET00uYm9keSwgbWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTsgXG4gICAgICAgIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgYWRkU2lkZVRpbWVFdmVudExpc3RlbmVycygpO1xuICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBET00uYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyAgZWRpdHRpbmcgPSBmYWxzZTtcbiAgICBET00uYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIikgfSk7XG4gICAgRE9NLmNsb3NlTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpIH0pO1xuICAgIERPTS5hZGRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRhc2tTdWJtaXQpOyAgXG4gICAgXG4gICAgLy9Ub2RheSwgV2VlaywgYW5kIEFsbCBzaWRlQmFyIEVMc1xuICAgIHRyeSB7XG4gICAgICAgIERPTS50b2RheXNUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7IFxuICAgICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgndG9kYXknLCBudWxsKTtcbiAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICBcbiAgICAgICAgRE9NLnRoaXNXZWVrU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RoaXMtd2VlaycsIG51bGwpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICB9KTtcbiAgICAgIFxuICAgICAgICBET00uYWxsVGFza3NTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgnYWxsJywgbnVsbCk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAgICBcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCBldmVudCBsaXN0ZW5lcnMnKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gYWRkQ2FyZEV2ZW50TGlzdGVuZXJzKHRhc2spe1xuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtaWQ9XCIke3Rhc2suaWR9XCJdIGlucHV0YCk7XG4gICAgY2hlY2tib3hbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBsZXQgdGFza0lEID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJylcbiAgICAgICAgbGV0IHRhc2sgPSBtYXN0ZXJMaXN0LmRhdGEuZmlsdGVyKChlKT0+IGUuaWQgPT0gdGFza0lEKTtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGFzay5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFzay5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbXBsZXRlZFwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZWRpdFRhc2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGVkaXR0aW5nID0gdHJ1ZTtcbiAgICAgICAgSUROdW1iZXIgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gICAgICAgIGNvbnN0IHRhc2tUb0VkaXQgPSBtYXN0ZXJMaXN0LmRhdGEuZmlsdGVyKCh0KT0+IHQuaWQgPT0gSUROdW1iZXIpWzBdO1xuICAgICAgICBsZXQgeXl5eSA9IHRhc2tUb0VkaXQuZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBsZXQgbW0gPSB0YXNrVG9FZGl0LmRhdGUuZ2V0TW9udGgoKSsxO1xuICAgICAgICBsZXQgZGQgPSB0YXNrVG9FZGl0LmRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICBsZXQgdGFza0RhdGUgPSBTdHJpbmcoMTAwMDAgKiB5eXl5ICsgMTAwICogbW0gKyBkZCk7XG4gICAgICAgIHRhc2tEYXRlID0gdGFza0RhdGUuc2xpY2UoMCw0KSsnLScrdGFza0RhdGUuc2xpY2UoNCw2KSArICctJyArdGFza0RhdGUuc2xpY2UoNiw4KTtcbiAgICAgICAgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlID0gdGFza1RvRWRpdC5jb250ZW50O1xuICAgICAgICBET00ubmV3VGFza0RhdGUudmFsdWUgPSB0YXNrRGF0ZTtcbiAgICAgICAgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlID0gdGFza1RvRWRpdC5wcm9qZWN0O1xuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBET00ubmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnZhbHVlID09PSB0YXNrLnByaW9yaXR5KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVUYXNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zdCB0aGlzVGFzayA9IG1hc3Rlckxpc3QuZGF0YS5maWx0ZXIoICh0KSA9PiB0LmlkID09IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSk7XG4gICAgICAgIG1hc3Rlckxpc3QucmVtb3ZlVGFzayh0aGlzVGFza1swXSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7IFxuICAgICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3Quc3BsaWNlKG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5pbmRleE9mKHRoaXNUYXNrWzBdKSwgMSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWlkPVwiJHt0YXNrLmlkfVwiXSBidXR0b25gKVswXTtcbiAgICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlZGl0VGFzayk7XG4gICAgXG4gICAgY29uc3QgcmVtb3ZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtaWQ9XCIke3Rhc2suaWR9XCJdIGJ1dHRvbmApWzFdO1xuICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVtb3ZlVGFzayk7XG59IFxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCl7XG4gICAgZm9yIChsZXQgaXRlbSBvZiBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QpIHtcbiAgICAgICAgYWRkQ2FyZEV2ZW50TGlzdGVuZXJzKGl0ZW0pO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpe1xuICAgIGNvbnN0IHJlbW92ZVRoaXMgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoY29uZmlybShcIkRlbGV0ZSB0aGlzIHByb2plY3QgYW5kIGFsbCB0YXNrcyBpbiBpdD9cIikpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tzVG9SZW1vdmUgPSBtYXN0ZXJMaXN0LnByb2R1Y2VQcm9qZWN0TGlzdChlLnRhcmdldC5pZC5zbGljZSgwLC02KSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGFza3NUb1JlbW92ZSl7XG4gICAgICAgICAgICAgICAgbWFzdGVyTGlzdC5yZW1vdmVUYXNrKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTsgXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGlzcGxheUxpc3QnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QpKTtcbiAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgRE9NLm1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgICAgIHJlbmRlclNpZGVCYXIoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7IFxuICAgICAgICAgICAgICAgIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgICAgICBhZGRTaWRlVGltZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgfSBcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiWW91IHByZXNzZWQgQ2FuY2VsIVwiKTtcbiAgICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBET00uc2lkZWJhclByb2plY3RMaXN0UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIERPTS5zaWRlYmFyUHJvamVjdExpc3RSZW1vdmVbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVUaGlzKTtcbiAgICB9XG4gICAgLy8gU2lkZUJhciBQcm9qZWN0IE5hbWUgRUxzXG4gICAgdHJ5IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBET00uc2lkZWJhclByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TGluayA9IChET00uc2lkZWJhclByb2plY3RMaXN0W2ldKTtcbiAgICAgICAgICAgIHByb2plY3RMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgnYnlQcm9qZWN0JywgcHJvamVjdExpbmsuaWQpO1xuICAgICAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgIFxuICAgIH1cblxuICAgIGNhdGNoIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBhZGQgZWwgdG8gcHJvamVjdHMnKVxuICAgIH1cbiAgICAvL1JlbW92ZSBwcm9qZWN0IGJ1dHRvbiA/IFxuICAgXG4gICAgXG59XG4gXG5leHBvcnQgZnVuY3Rpb24gYWRkU2lkZVRpbWVFdmVudExpc3RlbmVycygpe1xuICAgIHRyeSB7XG4gICAgICAgIERPTS50b2RheXNUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7IFxuICAgICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgndG9kYXknLCBudWxsKTtcbiAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICBcbiAgICAgICAgRE9NLnRoaXNXZWVrU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RoaXMtd2VlaycsIG51bGwpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICB9KTtcbiAgICAgIFxuICAgICAgICBET00uYWxsVGFza3NTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgnYWxsJywgbnVsbCk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmYWlsZWQgdG8gYWRkIHRvZGF5L3dlZWsvYWxsIEVMcycpXG4gICAgfVxuICAgXG59IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBjb25zdCBjdXJyZW50U2V0dGluZ3MgPSB7XG4gICAgdmlld0J5OiAnYWxsJyxcbiAgICB3aGljaFByb2plY3Q6IG51bGwsXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKG5ld1ZpZXcsIHdoaWNoUCA9IG51bGwpIHtcbiAgICAgICAgdGhpcy52aWV3QnkgPSBuZXdWaWV3O1xuICAgICAgICB0aGlzLndoaWNoUHJvamVjdCA9IHdoaWNoUDtcbiAgICB9XG5cbn0iLCJcInVzZSBzdHJpY3RcIlxuXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTUNhY2hlXCI7XG5pbXBvcnQgeyBhZGRNYWluRXZlbnRMaXN0ZW5lcnMsIGFkZEluaXRpYWxFdmVudExpc3RlbmVycywgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycyB9IGZyb20gXCIuL2FkZEVMc1wiO1xuaW1wb3J0IHsgbWFzdGVyTGlzdCB9IGZyb20gXCIuL21hc3Rlckxpc3RcIjtcbmltcG9ydCB7IHJlbmRlck1haW4sIHJlbmRlckFkZFRhc2tNb2RhbCwgcmVuZGVyU2lkZUJhciwgcmVuZGVySGVhZGVyIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5pbXBvcnQgeyBjdXJyZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jdXJyZW50U2V0dGluZ3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZnJlc2hTdGFydCgpIHsgXG4gICAgXG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgIGxldCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICB0b21vcnJvdy5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDEpO1xuICAgIGxldCBkYXlBZnRlclRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xuICAgIGRheUFmdGVyVG9tb3Jyb3cuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyAyKTtcblxuICAgIGxldCBsYXRlckRheSA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICBsYXRlckRheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDgpO1xuXG4gICAgbGV0IHllc3RlcmRheSA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICB5ZXN0ZXJkYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAxKTtcblxuICAgIGNvbnN0IHNhbXBsZVRhc2sgPSBuZXcgVGFzayggdG9kYXksICdSZWZhY3RvciB0aWMtdGFjLXRvZSBwcm9ncmFtJywgJ25vcm1hbCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrMiA9IG5ldyBUYXNrKCB0b2RheSwgJ0J1eSBtaWxrJywgJ2hpZ2gnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazMgPSBuZXcgVGFzayggdG9tb3Jyb3csICdCdXkgYmlydGhkYXkgY2FyZCcsICdub3JtYWwnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazQgPSBuZXcgVGFzayggdG9tb3Jyb3csICdDYWxsIG1vbScsICdoaWdoJyApOyBcbiAgICBjb25zdCBzYW1wbGVUYXNrNSA9IG5ldyBUYXNrKCB0b21vcnJvdywgJ0RvIFJ1YnkgYmVnaW5uZXIgdHV0b3JpYWwnLCAnbm9ybWFsJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2s2ID0gbmV3IFRhc2soIGRheUFmdGVyVG9tb3Jyb3csICdWYWN1dW0nLCAnaGlnaCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrNyA9IG5ldyBUYXNrKCBkYXlBZnRlclRvbW9ycm93LCAnTGF1bmRyeScsICdub3JtYWwnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazggPSBuZXcgVGFzayggZGF5QWZ0ZXJUb21vcnJvdywgJ1ByYWN0aWNlIHBpYW5vJywgJ25vcm1hbCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrOSA9IG5ldyBUYXNrKCB0b2RheSwgJ0RvZy1zaXQgZm9yIEtpbW15JywgJ2hpZ2gnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazEwID0gbmV3IFRhc2soIHllc3RlcmRheSwgJ1NjaGVkdWxlIGRlbnRpc3QgYXBwb2ludG1lbnQnLCAnaGlnaCcgKTtcblxuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrKTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazIpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMyk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s0KTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazUpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNik7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s3KTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazgpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrOSk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2sxMCk7XG4gICAgbWFzdGVyTGlzdC5zb3J0QnlEYXRlKCk7XG5cblxuICAgIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzaywgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG4gICAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrMiwgJ3Byb2plY3QnLCAnU2hvcHBpbmcnKTtcbiAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2szLCAncHJvamVjdCcsICdTaG9wcGluZycpO1xuICAgIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazUsICdwcm9qZWN0JywgJ0NvZGluZycpO1xuICAgIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazYsICdwcm9qZWN0JywgJ0hvdXNld29yaycpO1xuICAgIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazcsICdwcm9qZWN0JywgJ0hvdXNld29yaycpO1xuXG4gICAgLy8gKioqKioqKioqKioqKioqXG5cbiAgICAvLyBDYWNoZSBET00gYW5kIHJlbmRlciBlYWNoIHNlY3Rpb25cbiAgICBjb25zb2xlLmxvZyhtYXN0ZXJMaXN0LmRhdGEpO1xuXG4gICAgcmVuZGVySGVhZGVyKERPTS5ib2R5KTtcbiAgICByZW5kZXJTaWRlQmFyKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgIHJlbmRlckFkZFRhc2tNb2RhbChET00uYm9keSwgbWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTtcbiAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuXG4gICAgLy8gQWRkIGV2ZW50bGlzdGVuZXJzIHRvIGhlYWRlciBhbmQgbW9kYWxcbiAgICBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgRE9NLnNpZGViYXJQcm9qZWN0TGlzdFJlbW92ZTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gVGhlcmUgc2hvdWxkIG9ubHkgYmUgb25lIG1hc3RlciBsaXN0XG5sZXQgaW5zdGFuY2UgPSBudWxsO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuY2xhc3MgTWFzdGVyTGlzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7IFxuICAgICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW4gb25seSBjcmVhdGUgb25lIGluc3RhbmNlIVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICB0aGlzLmRpc3BsYXllZExpc3QgPSBbXTtcbiAgICB9XG5cbiAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy5kYXRhLnB1c2godGFzayk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zcGxpY2UodGhpcy5kYXRhLmluZGV4T2YodGFzayksIDEpO1xuICAgIH1cblxuICAgIGVkaXRUYXNrKHRhc2ssIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhW3RoaXMuZGF0YS5pbmRleE9mKHRhc2spXVthdHRyaWJ1dGVdID0gdmFsdWU7IFxuICAgIH1cblxuICAgIHNvcnRCeURhdGUoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zb3J0KChhLGIpID0+IGEuZGF0ZSAtIGIuZGF0ZSk7XG4gICAgfVxuXG4gICAgcHJvZHVjZVByb2plY3RMaXN0KHByb2plY3QpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSB0aGlzLmRhdGEuZmlsdGVyKCAodGFzaykgPT4gdGFzay5wcm9qZWN0ID09IHByb2plY3QpO1xuICAgICAgICBwcm9qZWN0TGlzdC5zb3J0KChhLGIpID0+IGEuZGF0ZSAtIGIuZGF0ZSk7XG4gICAgICAgIHJldHVybiBwcm9qZWN0TGlzdDtcbiAgICB9XG5cbiAgICBnZXRMaXN0T2ZQcm9qZWN0cygpIHtcbiAgICAgICAgY29uc3QgYWxsUHJvamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goICh0YXNrKT0+IHtcbiAgICAgICAgICAgIGlmICh0YXNrLnByb2plY3QgIT0gbnVsbCAmJiAgdGFzay5wcm9qZWN0ICE9ICcnICYmICFhbGxQcm9qZWN0cy5zb21lKChhKT0+IGEgPT09IHRhc2sucHJvamVjdCkpe1xuICAgICAgICAgICAgICAgIGFsbFByb2plY3RzLnB1c2godGFzay5wcm9qZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFsbFByb2plY3RzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1hc3Rlckxpc3QgPSBuZXcgTWFzdGVyTGlzdDtcblxuXG4iLCJcInVzZSBzdHJpY3RcIlxuaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4vRE9NQ2FjaGVcIjtcblxuZnVuY3Rpb24gcmVuZGVyQ2FyZCh0YXNrKSB7XG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgY2hlY2tib3gubmFtZSA9IFwiaXNDb21wbGV0ZWRDaGVja2JveFwiO1xuICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0YXNrLmNvbXBsZXRlZDtcbiAgICBjaGVja2JveC5pZCA9IHRhc2suY29udGVudDtcbiAgICBcbiAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFzay1uYW1lJyk7XG4gICAgdGFza05hbWUuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0YXNrLmNvbnRlbnQ7XG5cbiAgICBjb25zdCB0YXNrRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRHVlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZHVlLWRhdGUnKTtcbiAgICB0YXNrRHVlLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICAgIHRhc2tEdWUudGV4dENvbnRlbnQgPSBgRHVlOiAke3Rhc2suZGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHt3ZWVrZGF5OiAnc2hvcnQnIH0pfSxcbiAgICAgICAgJHsgdGFzay5kYXRlLnRvTG9jYWxlU3RyaW5nKCdkZWZhdWx0JywgeyBtb250aDogJ3Nob3J0JyB9KX0uIFxuICAgICAgICAkeyB0YXNrLmRhdGUuZ2V0RGF0ZSgpfSBgICBcbiAgICBcbiAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoJ2VkaXQtdGFzaycpO1xuICAgIGVkaXRCdG4uc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gICAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdlZGl0JztcbiBcbiAgICBcbiAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtdGFzaycpO1xuICAgIHJlbW92ZUJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgICByZW1vdmVCdG4udGV4dENvbnRlbnQgPSAncmVtb3ZlJztcbiBcbiAgICBcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgICBjYXJkLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICAgIGlmICh0YXNrLnByaW9yaXR5ID09ICdoaWdoJykge1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2ltcG9ydGFudCcpO1xuICAgIH0gXG4gICAgY2FyZC5hcHBlbmQoY2hlY2tib3gsIHRhc2tOYW1lLCB0YXNrRHVlLCBlZGl0QnRuLCByZW1vdmVCdG4pO1xuICAgIHJldHVybiAoY2FyZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1haW4obWFzdGVyTGlzdCwgb3B0aW9uLCBieVByb2plY3ROYW1lID0gbnVsbCkge1xuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgbGV0IHRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xuICAgIHRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMSk7XG5cbiAgICBsZXQgd2Vla0Zyb21Ub2RheT0gbmV3IERhdGUodG9kYXkpO1xuICAgIHdlZWtGcm9tVG9kYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA3KTtcblxuICAgIGxldCB0b2RheUdyb3VwID0gbnVsbDtcbiAgICBsZXQgcGFzdER1ZSA9IG51bGw7XG4gICAgbGV0IHdlZWtHcm91cCA9IG51bGw7XG5cbiAgICAvLyBGaXJzdCByZW1vdmUgZXZlcnl0aGluZyBmcm9tIG1haW4gYW5kIGZyb20gZGlzcGxheUxpc3RcbiAgICB3aGlsZSAoRE9NLm1haW4uZmlyc3RDaGlsZCkge1xuICAgICAgICBET00ubWFpbi5yZW1vdmVDaGlsZChET00ubWFpbi5maXJzdENoaWxkKTtcbiAgICAgICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnNwbGljZSgwLCBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uID09PSAnYnlQcm9qZWN0Jyl7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gbWFzdGVyTGlzdC5wcm9kdWNlUHJvamVjdExpc3QoYnlQcm9qZWN0TmFtZSk7XG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJvamVjdEhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICBwcm9qZWN0SGVhZGluZy50ZXh0Q29udGVudCA9IGJ5UHJvamVjdE5hbWU7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZChwcm9qZWN0SGVhZGluZyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdExpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUgPj0gdG9kYXkgJiYgcHJvamVjdExpc3RbaV0uZGF0ZSA8PSB0b2RheSAmJiB0b2RheUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RheUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdzdWJoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBpZiAocHJvamVjdExpc3RbaV0uZGF0ZSA+IHRvZGF5ICYmIHRvZGF5R3JvdXAgPT0gMSkgIHtcbiAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKHJlbmRlckNhcmQocHJvamVjdExpc3RbaV0pKTtcbiAgICAgICAgICAgIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5wdXNoKHByb2plY3RMaXN0W2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hc3Rlckxpc3QuZGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgb3B0aW9uID09PSBcInRvZGF5XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9OyBcblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiBvcHRpb24gPT09IFwidGhpcy13ZWVrXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9OyBcblxuXG4gICAgICAgICAgICAvLyBQYXN0LUR1ZSBVbmRvbmUgQmxvY2tcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8IHRvZGF5ICAmJiBwYXN0RHVlID09IG51bGwgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmNvbXBsZXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBwYXN0RHVlID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXN0RHVlSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgcGFzdER1ZUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHBhc3REdWVIZWFkaW5nLnRleHRDb250ZW50ID0gJ1Bhc3QgRHVlJztcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQocGFzdER1ZUhlYWRpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9kYXkgJiYgcGFzdER1ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcGFzdER1ZSA9IDI7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVG9kYXkgQmxvY2tcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8IHRvbW9ycm93ICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZGF5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93ICYmIHRvZGF5R3JvdXAgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8PSB3ZWVrRnJvbVRvZGF5ICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93ICYmIHdlZWtHcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgd2Vla0dyb3VwID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCB3ZWVrSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgd2Vla0hlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHdlZWtIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RoaXMgV2Vlayc7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKHdlZWtIZWFkaW5nKTtcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+IHdlZWtGcm9tVG9kYXkgJiYgd2Vla0dyb3VwID09IDEpIHtcbiAgICAgICAgICAgICAgICB3ZWVrR3JvdXAgPSAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9OyBcblxuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICgobWFzdGVyTGlzdC5kYXRhW2ldLmNvbXBsZXRlZCA9PT0gZmFsc2UgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b2RheSkgfHwgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9kYXkpe1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZChyZW5kZXJDYXJkKG1hc3Rlckxpc3QuZGF0YVtpXSkpO1xuICAgICAgICAgICAgICAgIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5wdXNoKG1hc3Rlckxpc3QuZGF0YVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQWRkVGFza01vZGFsKHNvbWVEaXYsIGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgICBjb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbCcpO1xuICAgIGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QuYWRkKCdjbG9zZWQnKTtcbiAgICBhZGRUYXNrTW9kYWwuaWQgPSAnYWRkLWEtdGFzay1tb2RhbCc7XG5cbiAgICBjb25zdCBhZGRUYXNrTW9kYWxDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBhZGRUYXNrTW9kYWxDb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcbiAgICBcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIHRhc2tGb3JtLmlkID0gJ3Rhc2stZm9ybSc7XG4gICAgXG4gICAgY29uc3QgZW1wdHlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGNsb3NlTW9kYWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNsb3NlTW9kYWxCdXR0b24uaWQgPSAnY2xvc2UtbW9kYWwtYnV0dG9uJztcblxuICAgIGNsb3NlTW9kYWxCdXR0b24uaW5uZXJIVE1MID0gJyZ0aW1lcyc7XG4gICAgXG4gICAgY29uc3QgbGFiZWxGb3JUYXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBsYWJlbEZvclRhc2tDb250ZW50LmZvciA9ICd0YXNrLWNvbnRlbnQnO1xuICAgIGxhYmVsRm9yVGFza0NvbnRlbnQudGV4dENvbnRlbnQgPSAnVGFzazonXG4gICAgXG4gICAgY29uc3QgdGFza0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGFza0NvbnRlbnQudHlwZSA9ICd0ZXh0JztcbiAgICB0YXNrQ29udGVudC5pZCA9ICd0YXNrLWNvbnRlbnQnO1xuICAgIHRhc2tDb250ZW50Lm5hbWUgPSAndGFzay1jb250ZW50JztcbiAgICB0YXNrQ29udGVudC5wbGFjZWhvbGRlciA9ICdFbnRlciBUYXNrJztcbiAgICB0YXNrQ29udGVudC5yZXF1aXJlZCA9IHRydWU7XG4gICAgXG4gICAgY29uc3QgbGFiZWxGb3JEYXRlPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWxGb3JEYXRlLmZvciA9ICdkYXRlJztcbiAgICBsYWJlbEZvckRhdGUudGV4dENvbnRlbnQgPSAnRHVlOic7XG5cbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGRhdGUudHlwZSA9ICdkYXRlJztcbiAgICBkYXRlLmlkID0gJ2RhdGUnO1xuICAgIGRhdGUubmFtZSA9ICdkYXRlJztcbiAgICBkYXRlLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHByaW9yaXR5VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5VGl0bGUudGV4dENvbnRlbnQgPSAnUHJpb3JpdHk6JztcblxuICAgIGNvbnN0IHByaW9yaXR5T3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJpb3JpdHlPcHRpb25zLmlkID0gJ3ByaW9yaXR5LW9wdGlvbnMnO1xuXG4gICAgY29uc3Qgb3B0aW9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3Qgbm9ybWFsUmFkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgbm9ybWFsUmFkaW8udHlwZSA9IFwicmFkaW9cIjtcbiAgICBub3JtYWxSYWRpby5pZCA9IFwibm9ybWFsXCI7XG4gICAgbm9ybWFsUmFkaW8ubmFtZSA9IFwicHJpb3JpdHlcIjtcbiAgICBub3JtYWxSYWRpby52YWx1ZSA9IFwibm9ybWFsXCI7XG4gICAgbm9ybWFsUmFkaW8ucmVxdWlyZWQgPSB0cnVlO1xuXG4gICAgY29uc3Qgbm9ybWFsUmFkaW9MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBub3JtYWxSYWRpb0xhYmVsLmZvciA9IFwibm9ybWFsXCI7XG4gICAgbm9ybWFsUmFkaW9MYWJlbC50ZXh0Q29udGVudCA9IFwiTm9ybWFsXCI7XG5cbiAgICBjb25zdCBvcHRpb24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBoaWdoUmFkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaGlnaFJhZGlvLnR5cGUgPSBcInJhZGlvXCI7XG4gICAgaGlnaFJhZGlvLmlkID0gXCJoaWdoXCI7XG4gICAgaGlnaFJhZGlvLm5hbWUgPSBcInByaW9yaXR5XCI7XG4gICAgaGlnaFJhZGlvLnZhbHVlID0gXCJoaWdoXCI7XG4gICAgbm9ybWFsUmFkaW8ucmVxdWlyZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgaGlnaFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgaGlnaFJhZGlvTGFiZWwuZm9yID0gXCJoaWdoXCI7XG4gICAgaGlnaFJhZGlvTGFiZWwudGV4dENvbnRlbnQgPSBcIkhpZ2hcIjtcblxuICAgIGNvbnN0IGFzc2lnblRvUHJvamVjdExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGFzc2lnblRvUHJvamVjdExhYmVsLmZvciA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdExhYmVsLnRleHRDb250ZW50ID0gXCJQcm9qZWN0OlwiXG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgYXNzaWduVG9Qcm9qZWN0Lm5hbWUgPSBcInByb2plY3RcIjtcbiAgICBhc3NpZ25Ub1Byb2plY3QuaWQgPSBcInByb2plY3RcIjtcbiAgICBhc3NpZ25Ub1Byb2plY3QucGxhY2Vob2xkZXIgPSBcIk9wdGlvbmFsXCJcbiAgICBhc3NpZ25Ub1Byb2plY3Quc2V0QXR0cmlidXRlKFwibGlzdFwiLCBcInByb2plY3QtbGlzdFwiKTtcblxuICAgIGNvbnN0IGFzc2lnblRvUHJvamVjdERhdGFMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRhdGFsaXN0XCIpO1xuICAgIGFzc2lnblRvUHJvamVjdERhdGFMaXN0LmlkID0gXCJwcm9qZWN0LWxpc3RcIjtcbiAgIFxuICAgIGFycmF5T2ZQcm9qZWN0TmFtZXMuZm9yRWFjaCggKGVudHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gZW50cnk7XG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGVudHJ5OyBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuYXBwZW5kKG9wdGlvbik7XG4gICAgfSlcblxuICAgIGFzc2lnblRvUHJvamVjdC5hcHBlbmQoYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QpO1xuXG4gICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzdWJtaXRCdG4udHlwZSA9IFwic3VibWl0XCI7XG4gICAgc3VibWl0QnRuLmlkID0gXCJtb2RhbC1zdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4udmFsdWUgPSBcIlN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XG5cbiAgICBvcHRpb24xLmFwcGVuZChub3JtYWxSYWRpbywgbm9ybWFsUmFkaW9MYWJlbCk7XG4gICAgb3B0aW9uMi5hcHBlbmQoaGlnaFJhZGlvLCBoaWdoUmFkaW9MYWJlbCk7XG4gICAgcHJpb3JpdHlPcHRpb25zLmFwcGVuZChvcHRpb24xLCBvcHRpb24yKTtcbiAgICB0YXNrRm9ybS5hcHBlbmQoXG4gICAgICAgIGVtcHR5RGl2LCBcbiAgICAgICAgY2xvc2VNb2RhbEJ1dHRvbiwgXG4gICAgICAgIGxhYmVsRm9yVGFza0NvbnRlbnQsIFxuICAgICAgICB0YXNrQ29udGVudCwgXG4gICAgICAgIGxhYmVsRm9yRGF0ZSwgXG4gICAgICAgIGRhdGUsIFxuICAgICAgICBwcmlvcml0eVRpdGxlLCBcbiAgICAgICAgcHJpb3JpdHlPcHRpb25zLCBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwsIFxuICAgICAgICBhc3NpZ25Ub1Byb2plY3QsXG4gICAgICAgIHN1Ym1pdEJ0bik7XG4gICAgYWRkVGFza01vZGFsQ29udGVudC5hcHBlbmQodGFza0Zvcm0pO1xuICAgIGFkZFRhc2tNb2RhbC5hcHBlbmQoYWRkVGFza01vZGFsQ29udGVudCk7XG4gICAgc29tZURpdi5hcHBlbmQoYWRkVGFza01vZGFsKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2lkZUJhcihzb21lRGl2LCBhcnJheU9mUHJvamVjdE5hbWVzKSB7XG4gICAgaWYgKERPTS5zaWRlQmFyKXtcbiAgICBcbiAgICAgICAgRE9NLnNpZGVCYXIucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChET00uc2lkZUJhcik7XG4gICAgICAgIFxuICAgIH1cbiAgICBjb25zdCBzaWRlYmFyU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgIHNpZGViYXJTZWN0aW9uLmlkID0gJ3NpZGViYXInO1xuICAgIGNvbnN0IGxpc3RCeVRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIGNvbnN0IGxpc3RJdGVtMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgaXRlbTFBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaXRlbTFBbmNob3IuaWQgPSAndG9kYXlzLXRhc2tzJztcbiAgICBpdGVtMUFuY2hvci5ocmVmID0gJyMnO1xuICAgIGl0ZW0xQW5jaG9yLnRleHRDb250ZW50ID0gXCJUb2RheVwiO1xuXG4gICAgbGlzdEl0ZW0xLmFwcGVuZChpdGVtMUFuY2hvcik7XG5cbiAgICBjb25zdCBsaXN0SXRlbTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW0yQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW0yQW5jaG9yLmlkID0gJ3RoaXMtd2Vlayc7XG4gICAgaXRlbTJBbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtMkFuY2hvci50ZXh0Q29udGVudCA9IFwiVGhpcyBXZWVrXCI7XG4gICAgbGlzdEl0ZW0yLmFwcGVuZChpdGVtMkFuY2hvcik7XG4gICAgXG4gICAgY29uc3QgbGlzdEl0ZW0zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBpdGVtM0FuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpdGVtM0FuY2hvci5pZCA9ICdhbGwtdGFza3MnO1xuICAgIGl0ZW0zQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgaXRlbTNBbmNob3IudGV4dENvbnRlbnQgPSBcIkFsbFwiO1xuICAgIGxpc3RJdGVtMy5hcHBlbmQoaXRlbTNBbmNob3IpO1xuXG4gICAgbGlzdEJ5VGltZS5hcHBlbmQobGlzdEl0ZW0xLCBsaXN0SXRlbTIsIGxpc3RJdGVtMyk7XG5cbiAgICBjb25zdCBsaXN0QnlQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBsaXN0QnlQcm9qZWN0LmlkID0gJ2xpc3QtYnktcHJvamVjdCc7XG4gICAgY29uc3QgbWFrZUxpbmsgPSBmdW5jdGlvbihuYW1lLCBkaXYpIHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBjb25zdCBpdGVtQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBpdGVtQW5jaG9yLmlkID0gbmFtZTtcbiAgICAgICAgaXRlbUFuY2hvci5ocmVmID0gJyMnO1xuICAgICAgICBpdGVtQW5jaG9yLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgICAgY29uc3QgcmVtb3ZlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgcmVtb3ZlUHJvamVjdEJ0bi5pZCA9IGAke25hbWV9UmVtb3ZlYDtcbiAgICAgICAgcmVtb3ZlUHJvamVjdEJ0bi5ocmVmID0gXCIjXCJcbiAgICAgICAgcmVtb3ZlUHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICfDlyc7XG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZChpdGVtQW5jaG9yLHJlbW92ZVByb2plY3RCdG4pO1xuICAgICAgICBkaXYuYXBwZW5kKGxpc3RJdGVtKTtcbiAgICB9XG4gICAgaWYgKGFycmF5T2ZQcm9qZWN0TmFtZXMpe1xuICAgICAgICBhcnJheU9mUHJvamVjdE5hbWVzLmZvckVhY2goZnVuY3Rpb24oYSl7IG1ha2VMaW5rKGEsIGxpc3RCeVByb2plY3QpIH0gKTtcbiAgICB9XG4gICAgc2lkZWJhclNlY3Rpb24uYXBwZW5kKGxpc3RCeVRpbWUsIGxpc3RCeVByb2plY3QpO1xuICAgIHNvbWVEaXYuYXBwZW5kKHNpZGViYXJTZWN0aW9uKTsgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckhlYWRlcihzb21lRGl2KSB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBhZGRUYXNrQnRuLmlkID0gXCJhZGQtYS10YXNrXCI7XG4gICAgYWRkVGFza0J0bi50ZXh0Q29udGVudCA9IFwiQWRkIFRhc2tcIjtcbiAgICBoZWFkZXIuYXBwZW5kKGFkZFRhc2tCdG4pO1xuICAgIHNvbWVEaXYucHJlcGVuZChoZWFkZXIpO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIlxuXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTUNhY2hlXCI7XG5pbXBvcnQgeyBhZGRNYWluRXZlbnRMaXN0ZW5lcnMsIGFkZEluaXRpYWxFdmVudExpc3RlbmVycywgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycyB9IGZyb20gXCIuL2FkZEVMc1wiO1xuaW1wb3J0IHsgbWFzdGVyTGlzdCB9IGZyb20gXCIuL21hc3Rlckxpc3RcIjtcbmltcG9ydCB7IHJlbmRlck1haW4sIHJlbmRlckFkZFRhc2tNb2RhbCwgcmVuZGVyU2lkZUJhciwgcmVuZGVySGVhZGVyIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5pbXBvcnQgeyBjdXJyZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jdXJyZW50U2V0dGluZ3NcIjtcblxuXG5mdW5jdGlvbiBtYWtlVGFza0Zyb21KU09OKHRoaW5nKXtcbiAgICBjb25zb2xlLmxvZyh0aGluZyk7XG4gICAgY29uc3QgdCA9IG5ldyBUYXNrKHRoaW5nLmRhdGUsIHRoaW5nLmNvbnRlbnQsIHRoaW5nLnByaW9yaXR5KTtcbiAgICB0LnByb2plY3QgPSB0aGluZy5wcm9qZWN0O1xuICAgIHQuY29tcGxldGVkID0gdGhpbmcuY29tcGxldGVkO1xuICAgLy8gY29uc29sZS5sb2codClcbiAgICByZXR1cm4gdFxufVxuXG5cblxuXG5cbmZ1bmN0aW9uIG15RnVuY3Rpb24oZGF0YUZyb21TZXJ2ZXIpe1xuICAgIGNvbnN0IHBhcnNlZEpTT04gPSBKU09OLnBhcnNlKGRhdGFGcm9tU2VydmVyKTtcbiAgICBmb3IgKGxldCBpPTA7aTxwYXJzZWRKU09OLmxlbmd0aDtpKyspIHtcbiAgICAgICAgY29uc3QgdCA9IG5ldyBUYXNrKHBhcnNlZEpTT05baV0uZGF0ZSwgcGFyc2VkSlNPTltpXS5jb250ZW50LCBwYXJzZWRKU09OW2ldLnByaW9yaXR5KTtcbiAgICAgICAgdC5wcm9qZWN0ID0gcGFyc2VkSlNPTltpXS5wcm9qZWN0O1xuICAgICAgICB0LmNvbXBsZXRlZCA9IHBhcnNlZEpTT05baV0uY29tcGxldGVkO1xuICAgICAgICBtYXN0ZXJMaXN0LmRhdGEucHVzaCh0KTtcbiAgICB9XG4gfVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXN1bWUoKSB7IFxuICAgIGNvbnN0IG9sZEpTT04gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb2xkRGF0YScpO1xuICAgIG15RnVuY3Rpb24ob2xkSlNPTik7XG4gICAvLyBmb3IgKGNvbnN0IGVudHJ5IG9mIG9sZEpTT04pe1xuICAgICAgIC8vY29uc29sZS5sb2coZW50cnkpXG4gICAgICAgIC8vbWFzdGVyTGlzdC5kYXRhLnB1c2gobWFrZVRhc2tGcm9tSlNPTihlbnRyeSkpOyBcbiAgIC8vIH1cbiAgIC8vIGNvbnNvbGUubG9nKG1hc3Rlckxpc3QuZGF0YSk7XG5cbiAgICBcblxuICAgIHJlbmRlckhlYWRlcihET00uYm9keSk7XG4gICAgcmVuZGVyU2lkZUJhcihET00uYm9keSwgbWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTtcbiAgICByZW5kZXJBZGRUYXNrTW9kYWwoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcblxuICAgIC8vIEFkZCBldmVudGxpc3RlbmVycyB0byBoZWFkZXIgYW5kIG1vZGFsXG4gICAgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpO1xuICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIERPTS5zaWRlYmFyUHJvamVjdExpc3RSZW1vdmU7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIENvbnN0cnVjdG9yIHRvIG1ha2UgdGFzayBvYmplY3RzXG5leHBvcnQgY2xhc3MgVGFzayB7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRlLCBjb250ZW50LCBwcmlvcml0eSwgcHJvamVjdCA9IG51bGwpIHsgXG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIHRoaXMuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDAwMDAwKTtcbiAgICB9XG5cbiAgICBtYXJrRG9uZSgpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIH1cblxufTtcblxuXG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4vRE9NQ2FjaGVcIjtcbmltcG9ydCB7IGFkZE1haW5FdmVudExpc3RlbmVycywgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzLCBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vYWRkRUxzXCI7XG5pbXBvcnQgeyBtYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyQWRkVGFza01vZGFsLCByZW5kZXJTaWRlQmFyLCByZW5kZXJIZWFkZXIgfSBmcm9tIFwiLi9yZW5kZXJcIjtcbmltcG9ydCB7IGN1cnJlbnRTZXR0aW5ncyB9IGZyb20gXCIuL2N1cnJlbnRTZXR0aW5nc1wiO1xuaW1wb3J0IGZyZXNoU3RhcnQgZnJvbSBcIi4vZnJlc2hTdGFydFwiO1xuaW1wb3J0IHJlc3VtZSBmcm9tIFwiLi9yZXN1bWVcIjtcblxuLy8gIEluIHJlc3VtZS5qcyBcbi8vICBOZWVkIHRvIHRha2UgdGhlIHJldHVybmVkIHRoaW5nIGJ5IEpTT04gYW5kIG1ha2UgYSBidW5jaCBvZiBUYXNrIG9iamVjdHMgdGhhdCBhcmUgdGhlbiBhZGRlZCB0byBtYXN0ZXJsaXN0LmRhdGFcblxuLy9mdW5jdGlvbiByZXZpdmVyKHRoaW5nKXtcbi8vICAgIG5ldyBUYXNrKHRoaXMuKVxuICAgIFxuICAgIC8vcmV0dXJuIG5ldyBUYXNrKCApXG4vL31cblxuXG5pZighbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ29sZERhdGEnKSkge1xuICAgIGZyZXNoU3RhcnQoKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5zdGFuY2UnLCBtYXN0ZXJMaXN0KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGF0YScsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGF0YSkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xufSBcbmVsc2Uge1xuICAgcmVzdW1lKCk7XG59XG5cblxuXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==