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
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.closeModalButton.addEventListener("click", () => { 
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskModal.classList.toggle("closed");
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskContent.value = null;
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskDate.value = null;
        for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriority) {
            _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriorityValue = null;            
        }
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskProject.value = null;
    });
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
    editBtn.classList.add('material-icons');
    editBtn.setAttribute('data-id', task.id);
    editBtn.textContent = 'edit';
 
    
    const removeBtn = document.createElement("button");
    removeBtn.classList.add('remove-task');
    removeBtn.classList.add('material-icons');
    removeBtn.setAttribute('data-id', task.id);
    removeBtn.textContent = 'delete';
 
    
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

    const todayIcon = document.createElement('i');
    todayIcon.classList.add('material-icons');
    todayIcon.textContent = 'today';

    item1Anchor.id = 'todays-tasks';
    item1Anchor.href = '#';
    item1Anchor.textContent = "Today";
    item1Anchor.prepend(todayIcon);
    listItem1.append(item1Anchor);

    const weekIcon = document.createElement('i');
    weekIcon.classList.add('material-icons');
    weekIcon.textContent = 'date_range';
    const listItem2 = document.createElement('li');
    const item2Anchor = document.createElement('a');
    item2Anchor.id = 'this-week';
    item2Anchor.href = '#';
    item2Anchor.textContent = "This Week";
    item2Anchor.prepend(weekIcon);
    listItem2.append(item2Anchor);
    
    const monthIcon = document.createElement('i');
    monthIcon.classList.add('material-icons');
    monthIcon.textContent = 'calendar_month';
    const listItem3 = document.createElement('li');
    const item3Anchor = document.createElement('a');
    item3Anchor.id = 'all-tasks';
    item3Anchor.href = '#';
    item3Anchor.textContent = "All";
    item3Anchor.prepend(monthIcon);
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
        removeProjectBtn.classList.add('material-icons')
        removeProjectBtn.textContent = 'delete';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWU7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNEQUFlO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isc0RBQWU7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNEQUFlO0FBQy9COztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0Isc0RBQWU7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHTztBQUNQLFFBQVEsa0RBQVc7QUFDbkI7QUFDQSxRQUFRLDRFQUFxQyxDQUFDLGtEQUFXO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsS0FBSztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCw2QkFBNkI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hYWTs7QUFFWixDQUErQjtBQUNFO0FBQ3dFO0FBQy9EO0FBQzZDO0FBQ25DOzs7QUFHcEQ7QUFDQTtBQUNBLGtCQUFrQix3Q0FBSTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0EsaUJBQWlCLG9CQUFvQjtBQUNyQyxzQkFBc0Isd0NBQUk7QUFDMUI7QUFDQTtBQUNBLFFBQVEsNkRBQW9CO0FBQzVCO0FBQ0E7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFJLHFEQUFZLENBQUMsK0NBQVE7QUFDekIsSUFBSSxzREFBYSxDQUFDLCtDQUFRLEVBQUUscUVBQTRCO0FBQ3hELElBQUksMkRBQWtCLENBQUMsK0NBQVEsRUFBRSxxRUFBNEI7QUFDN0QsSUFBSSxtREFBVSxDQUFDLG1EQUFVLEVBQUUsb0VBQXNCLEVBQUUsMEVBQTRCOztBQUUvRTtBQUNBLElBQUksaUVBQXdCO0FBQzVCLElBQUkscUVBQTRCO0FBQ2hDLElBQUksOERBQXFCO0FBQ3pCLElBQUksbUVBQTRCO0FBQ2hDOzs7Ozs7Ozs7Ozs7OztBQ3REYTs7QUFFYjtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O1VDbEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWtCO0FBQ0U7QUFDd0U7QUFDL0Q7QUFDNkM7QUFDbkM7QUFDZDtBQUNSOztBQUU5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsSUFBSSx1REFBVTtBQUNkLHFDQUFxQyxtREFBVTtBQUMvQyxtREFBbUQsd0RBQWU7QUFDbEUsMERBQTBELGlFQUF3QjtBQUNsRjtBQUNBO0FBQ0EsR0FBRyxtREFBTTtBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9ET01DYWNoZS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2FkZEVMcy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2N1cnJlbnRTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2ZyZXNoU3RhcnQuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9tYXN0ZXJMaXN0LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvcmVzdW1lLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuXG5mdW5jdGlvbiBkb20oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0IGhlYWRlcigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IGFkZFRhc2tCdG4oKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYS10YXNrXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IGFkZFRhc2tGb3JtKCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZm9ybVwiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBhZGRUYXNrTW9kYWwoKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFzay1tb2RhbFwiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBjbG9zZU1vZGFsQnV0dG9uKCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb3NlLW1vZGFsLWJ1dHRvblwiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBuZXdUYXNrQ29udGVudCgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWNvbnRlbnRcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgbmV3VGFza0RhdGUoKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IG5ld1Rhc2tQcmlvcml0eSgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1wcmlvcml0eV0nKTtcbiAgICAgICAgfSwgIFxuICAgICAgICBnZXQgbmV3VGFza1Byb2plY3QoKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XG4gICAgICAgIH0sICAgICAgICAgIFxuICAgICAgICBtYWluLFxuICAgICAgICBib2R5LCBcbiAgICAgICAgZ2V0IHNpZGVCYXIoKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZWJhclwiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCB0b2RheXNUYXNrc1NpZGVCYXIgKCl7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2RheXMtdGFza3NcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCB0aGlzV2Vla1NpZGVCYXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aGlzLXdlZWtcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgYWxsVGFza3NTaWRlQmFyKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWxsLXRhc2tzXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IGNhcmRFZGl0QnRucygpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdC10YXNrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBjYXJkUmVtb3ZlQnRucygpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVtb3ZlLXRhc2snKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGNhcmRDaGVja0JveHMoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW25hbWU9XCJpc0NvbXBsZXRlZENoZWNrYm94XCJdJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBsaXN0QnlQcm9qZWN0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0LWJ5LXByb2plY3QnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHNpZGViYXJQcm9qZWN0TGlzdCgpIHtcbiAgICAgICAgICAgIC8vIEkgbmVlZCB0aGUgYW5jaG9yIHRhZ3MgbmV4dGVkIGluc2lkZSB0aGUgbGknc1xuICAgICAgICAgICAgY29uc3QgbGlzdGl0ZW1zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NpZGViYXJcIikuY2hpbGRyZW5bMV0uY2hpbGRyZW4pO1xuICAgICAgICAgICAgbGV0IHF1ZXJ5U3RyID0gJyc7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTwgbGlzdGl0ZW1zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBxdWVyeVN0ciA9IHF1ZXJ5U3RyICsgJyMnICsgbGlzdGl0ZW1zW2ldLmZpcnN0Q2hpbGQuaWQgXG4gICAgICAgICAgICAgICAgaWYgKGk8IGxpc3RpdGVtcy5sZW5ndGgtMSkge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeVN0ciA9IHF1ZXJ5U3RyICsgJywgJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocXVlcnlTdHIgPT09ICcnKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbnVsbCBxdWVyeScpXG4gICAgICAgICAgICAgICAgcXVlcnlTdHIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgbm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5U3RyKTtcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdFxuICAgICAgICB9LFxuICAgICAgICBnZXQgc2lkZWJhclByb2plY3RMaXN0UmVtb3ZlKCkge1xuICAgICAgICAgICAgY29uc3QgbGlzdGl0ZW1zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NpZGViYXJcIikuY2hpbGRyZW5bMV0uY2hpbGRyZW4pO1xuICAgICAgICAgICAgY29uc3QgbGlzdE9mUmVtb3ZlQnRucyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8IGxpc3RpdGVtcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGlzdE9mUmVtb3ZlQnRucy5wdXNoKGxpc3RpdGVtc1tpXS5sYXN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBsaXN0T2ZSZW1vdmVCdG5zXG5cbiAgICAgICAgfVxuICAgIH1cbiB9XG5cbmV4cG9ydCBjb25zdCBET00gPSBkb20oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgbWFzdGVyTGlzdCB9IGZyb20gXCIuL21hc3Rlckxpc3RcIjtcbmltcG9ydCB7IHJlbmRlck1haW4sIHJlbmRlclNpZGVCYXIgfSBmcm9tIFwiLi9yZW5kZXJcIjtcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiOyBcbmltcG9ydCB7IGN1cnJlbnRTZXR0aW5ncyB9IGZyb20gXCIuL2N1cnJlbnRTZXR0aW5nc1wiO1xuaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4vRE9NQ2FjaGVcIjtcblxubGV0IGVkaXR0aW5nID0gZmFsc2U7XG5sZXQgSUROdW1iZXIgPSBudWxsO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzKCl7IFxuLy8gICoqKiBBZGRUYXNrTW9kYWwgb3Blbiwgc3VibWl0LCBhbmQgY2xvc2UgYnRuIEVMcyAqKipcblxuICAgIC8vIGNhbGxiYWNrIGZvciBzdWJtaXRcbiAgICBjb25zdCB0YXNrU3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcbiAgICAgICAgaWYgKGVkaXR0aW5nKXtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tUb0VkaXQgPSBtYXN0ZXJMaXN0LmRhdGEuZmlsdGVyKCh0KT0+IHQuaWQgPT0gSUROdW1iZXIpWzBdO1xuICAgICAgICAgICAgbWFzdGVyTGlzdC5lZGl0VGFzayh0YXNrVG9FZGl0LCBcImNvbnRlbnRcIiwgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlKTtcbiAgICAgICAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgXCJkYXRlXCIsIG5ldyBEYXRlKERPTS5uZXdUYXNrRGF0ZS52YWx1ZSkpO1xuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IEFycmF5LmZyb20oRE9NLm5ld1Rhc2tQcmlvcml0eSkuZmlsdGVyKGUgPT4gZVsnY2hlY2tlZCddKVswXSA7IFxuICAgICAgICAgICAgY29uc29sZS5sb2cob3B0aW9uLnZhbHVlKVxuICAgICAgICAgICAgbWFzdGVyTGlzdC5lZGl0VGFzayh0YXNrVG9FZGl0LCBcInByaW9yaXR5XCIsIG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHRhc2tUb0VkaXQsIFwicHJvamVjdFwiLCBET00ubmV3VGFza1Byb2plY3QudmFsdWUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTsgXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGlzcGxheUxpc3QnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBET00ubmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2soIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSwgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlLCBuZXdUYXNrUHJpb3JpdHlWYWx1ZSwgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlKTtcbiAgICAgICAgICAgIG1hc3Rlckxpc3QuYWRkVGFzayhuZXdUYXNrKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7IFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG4gICAgICAgIH1cbiAgICAgXG4gICAgIFxuICAgICAgICBtYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcbiAgICAgICAgLy8gQ2xlYXIgdGhlIG1vZGFsIGlucHV0IGZpZWxkcyBcbiAgICAgICAgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlID0gbnVsbDtcbiAgICAgICAgRE9NLm5ld1Rhc2tEYXRlLnZhbHVlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgRE9NLm5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgRE9NLm5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDsgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBET00ubmV3VGFza1Byb2plY3QudmFsdWUgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBET00ubWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgIHJlbmRlclNpZGVCYXIoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7IFxuICAgICAgICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIGFkZFNpZGVUaW1lRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgRE9NLmFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgIGVkaXR0aW5nID0gZmFsc2U7XG4gICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpIH0pO1xuICAgIERPTS5jbG9zZU1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IFxuICAgICAgICBET00uYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG4gICAgICAgIERPTS5uZXdUYXNrQ29udGVudC52YWx1ZSA9IG51bGw7XG4gICAgICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIERPTS5uZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgIERPTS5uZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG51bGw7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlID0gbnVsbDtcbiAgICB9KTtcbiAgICBET00uYWRkVGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0YXNrU3VibWl0KTsgIFxuICAgIFxuICAgIC8vVG9kYXksIFdlZWssIGFuZCBBbGwgc2lkZUJhciBFTHNcbiAgICB0cnkge1xuICAgICAgICBET00udG9kYXlzVGFza3NTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpeyBcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RvZGF5JywgbnVsbCk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAgXG4gICAgICAgIERPTS50aGlzV2Vla1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0aGlzLXdlZWsnLCBudWxsKTtcbiAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgICBcbiAgICAgICAgRE9NLmFsbFRhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2FsbCcsIG51bGwpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICB9KTtcbiAgICAgICAgICAgXG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBhZGQgZXZlbnQgbGlzdGVuZXJzJyk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGFkZENhcmRFdmVudExpc3RlbmVycyh0YXNrKXtcbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWlkPVwiJHt0YXNrLmlkfVwiXSBpbnB1dGApO1xuICAgIGNoZWNrYm94WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IHRhc2tJRCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgICAgIGxldCB0YXNrID0gbWFzdGVyTGlzdC5kYXRhLmZpbHRlcigoZSk9PiBlLmlkID09IHRhc2tJRCk7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRhc2suY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2suY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjb21wbGV0ZWRcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGVkaXRUYXNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlZGl0dGluZyA9IHRydWU7XG4gICAgICAgIElETnVtYmVyID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgICAgICBjb25zdCB0YXNrVG9FZGl0ID0gbWFzdGVyTGlzdC5kYXRhLmZpbHRlcigodCk9PiB0LmlkID09IElETnVtYmVyKVswXTtcbiAgICAgICAgbGV0IHl5eXkgPSB0YXNrVG9FZGl0LmRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgbGV0IG1tID0gdGFza1RvRWRpdC5kYXRlLmdldE1vbnRoKCkrMTtcbiAgICAgICAgbGV0IGRkID0gdGFza1RvRWRpdC5kYXRlLmdldERhdGUoKTtcbiAgICAgICAgbGV0IHRhc2tEYXRlID0gU3RyaW5nKDEwMDAwICogeXl5eSArIDEwMCAqIG1tICsgZGQpO1xuICAgICAgICB0YXNrRGF0ZSA9IHRhc2tEYXRlLnNsaWNlKDAsNCkrJy0nK3Rhc2tEYXRlLnNsaWNlKDQsNikgKyAnLScgK3Rhc2tEYXRlLnNsaWNlKDYsOCk7XG4gICAgICAgIERPTS5uZXdUYXNrQ29udGVudC52YWx1ZSA9IHRhc2tUb0VkaXQuY29udGVudDtcbiAgICAgICAgRE9NLm5ld1Rhc2tEYXRlLnZhbHVlID0gdGFza0RhdGU7XG4gICAgICAgIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSA9IHRhc2tUb0VkaXQucHJvamVjdDtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgRE9NLm5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi52YWx1ZSA9PT0gdGFzay5wcmlvcml0eSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBET00uYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlVGFzayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29uc3QgdGhpc1Rhc2sgPSBtYXN0ZXJMaXN0LmRhdGEuZmlsdGVyKCAodCkgPT4gdC5pZCA9PSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikpO1xuICAgICAgICBtYXN0ZXJMaXN0LnJlbW92ZVRhc2sodGhpc1Rhc2tbMF0pO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGF0YScsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGF0YSkpOyBcbiAgICAgICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnNwbGljZShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QuaW5kZXhPZih0aGlzVGFza1swXSksIDEpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGlzcGxheUxpc3QnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QpKTtcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1pZD1cIiR7dGFzay5pZH1cIl0gYnV0dG9uYClbMF07XG4gICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdFRhc2spO1xuICAgIFxuICAgIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWlkPVwiJHt0YXNrLmlkfVwiXSBidXR0b25gKVsxXTtcbiAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbW92ZVRhc2spO1xufSBcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1haW5FdmVudExpc3RlbmVycygpe1xuICAgIGZvciAobGV0IGl0ZW0gb2YgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSB7XG4gICAgICAgIGFkZENhcmRFdmVudExpc3RlbmVycyhpdGVtKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKXtcbiAgICBjb25zdCByZW1vdmVUaGlzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGNvbmZpcm0oXCJEZWxldGUgdGhpcyBwcm9qZWN0IGFuZCBhbGwgdGFza3MgaW4gaXQ/XCIpKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrc1RvUmVtb3ZlID0gbWFzdGVyTGlzdC5wcm9kdWNlUHJvamVjdExpc3QoZS50YXJnZXQuaWQuc2xpY2UoMCwtNikpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRhc2tzVG9SZW1vdmUpe1xuICAgICAgICAgICAgICAgIG1hc3Rlckxpc3QucmVtb3ZlVGFzayhpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7IFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgICAgICByZW5kZXJTaWRlQmFyKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpOyBcbiAgICAgICAgICAgICAgICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgYWRkU2lkZVRpbWVFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICAgIH0gXG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBwcmVzc2VkIENhbmNlbCFcIik7XG4gICAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRE9NLnNpZGViYXJQcm9qZWN0TGlzdFJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBET00uc2lkZWJhclByb2plY3RMaXN0UmVtb3ZlW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlVGhpcyk7XG4gICAgfVxuICAgIC8vIFNpZGVCYXIgUHJvamVjdCBOYW1lIEVMc1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRE9NLnNpZGViYXJQcm9qZWN0TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpbmsgPSAoRE9NLnNpZGViYXJQcm9qZWN0TGlzdFtpXSk7XG4gICAgICAgICAgICBwcm9qZWN0TGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2J5UHJvamVjdCcsIHByb2plY3RMaW5rLmlkKTtcbiAgICAgICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICBcbiAgICB9XG5cbiAgICBjYXRjaCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmYWlsZWQgdG8gYWRkIGVsIHRvIHByb2plY3RzJylcbiAgICB9XG4gICAgLy9SZW1vdmUgcHJvamVjdCBidXR0b24gPyBcbiAgIFxuICAgIFxufVxuIFxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNpZGVUaW1lRXZlbnRMaXN0ZW5lcnMoKXtcbiAgICB0cnkge1xuICAgICAgICBET00udG9kYXlzVGFza3NTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpeyBcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RvZGF5JywgbnVsbCk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAgXG4gICAgICAgIERPTS50aGlzV2Vla1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0aGlzLXdlZWsnLCBudWxsKTtcbiAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgICBcbiAgICAgICAgRE9NLmFsbFRhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2FsbCcsIG51bGwpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCB0b2RheS93ZWVrL2FsbCBFTHMnKVxuICAgIH1cbiAgIFxufSIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgY29uc3QgY3VycmVudFNldHRpbmdzID0ge1xuICAgIHZpZXdCeTogJ2FsbCcsXG4gICAgd2hpY2hQcm9qZWN0OiBudWxsLFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbihuZXdWaWV3LCB3aGljaFAgPSBudWxsKSB7XG4gICAgICAgIHRoaXMudmlld0J5ID0gbmV3VmlldztcbiAgICAgICAgdGhpcy53aGljaFByb2plY3QgPSB3aGljaFA7XG4gICAgfVxuXG59IiwiXCJ1c2Ugc3RyaWN0XCJcblxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01DYWNoZVwiO1xuaW1wb3J0IHsgYWRkTWFpbkV2ZW50TGlzdGVuZXJzLCBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMsIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9hZGRFTHNcIjtcbmltcG9ydCB7IG1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJBZGRUYXNrTW9kYWwsIHJlbmRlclNpZGVCYXIsIHJlbmRlckhlYWRlciB9IGZyb20gXCIuL3JlbmRlclwiO1xuaW1wb3J0IHsgY3VycmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY3VycmVudFNldHRpbmdzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZyZXNoU3RhcnQoKSB7IFxuICAgIFxuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICBsZXQgdG9tb3Jyb3cgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyAxKTtcbiAgICBsZXQgZGF5QWZ0ZXJUb21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICBkYXlBZnRlclRvbW9ycm93LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgMik7XG5cbiAgICBsZXQgbGF0ZXJEYXkgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgbGF0ZXJEYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA4KTtcblxuICAgIGxldCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgeWVzdGVyZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMSk7XG5cbiAgICBjb25zdCBzYW1wbGVUYXNrID0gbmV3IFRhc2soIHRvZGF5LCAnUmVmYWN0b3IgdGljLXRhYy10b2UgcHJvZ3JhbScsICdub3JtYWwnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazIgPSBuZXcgVGFzayggdG9kYXksICdCdXkgbWlsaycsICdoaWdoJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2szID0gbmV3IFRhc2soIHRvbW9ycm93LCAnQnV5IGJpcnRoZGF5IGNhcmQnLCAnbm9ybWFsJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2s0ID0gbmV3IFRhc2soIHRvbW9ycm93LCAnQ2FsbCBtb20nLCAnaGlnaCcgKTsgXG4gICAgY29uc3Qgc2FtcGxlVGFzazUgPSBuZXcgVGFzayggdG9tb3Jyb3csICdEbyBSdWJ5IGJlZ2lubmVyIHR1dG9yaWFsJywgJ25vcm1hbCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrNiA9IG5ldyBUYXNrKCBkYXlBZnRlclRvbW9ycm93LCAnVmFjdXVtJywgJ2hpZ2gnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazcgPSBuZXcgVGFzayggZGF5QWZ0ZXJUb21vcnJvdywgJ0xhdW5kcnknLCAnbm9ybWFsJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2s4ID0gbmV3IFRhc2soIGRheUFmdGVyVG9tb3Jyb3csICdQcmFjdGljZSBwaWFubycsICdub3JtYWwnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazkgPSBuZXcgVGFzayggdG9kYXksICdEb2ctc2l0IGZvciBLaW1teScsICdoaWdoJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2sxMCA9IG5ldyBUYXNrKCB5ZXN0ZXJkYXksICdTY2hlZHVsZSBkZW50aXN0IGFwcG9pbnRtZW50JywgJ2hpZ2gnICk7XG5cbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzayk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2syKTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazMpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNCk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s1KTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazYpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNyk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s4KTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazkpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMTApO1xuICAgIG1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuXG5cbiAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2ssICdwcm9qZWN0JywgJ0NvZGluZycpO1xuICAgIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazIsICdwcm9qZWN0JywgJ1Nob3BwaW5nJyk7XG4gICAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrMywgJ3Byb2plY3QnLCAnU2hvcHBpbmcnKTtcbiAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s1LCAncHJvamVjdCcsICdDb2RpbmcnKTtcbiAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s2LCAncHJvamVjdCcsICdIb3VzZXdvcmsnKTtcbiAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s3LCAncHJvamVjdCcsICdIb3VzZXdvcmsnKTtcblxuICAgIC8vICoqKioqKioqKioqKioqKlxuXG4gICAgLy8gQ2FjaGUgRE9NIGFuZCByZW5kZXIgZWFjaCBzZWN0aW9uXG4gICAgY29uc29sZS5sb2cobWFzdGVyTGlzdC5kYXRhKTtcblxuICAgIHJlbmRlckhlYWRlcihET00uYm9keSk7XG4gICAgcmVuZGVyU2lkZUJhcihET00uYm9keSwgbWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTtcbiAgICByZW5kZXJBZGRUYXNrTW9kYWwoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcblxuICAgIC8vIEFkZCBldmVudGxpc3RlbmVycyB0byBoZWFkZXIgYW5kIG1vZGFsXG4gICAgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpO1xuICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIERPTS5zaWRlYmFyUHJvamVjdExpc3RSZW1vdmU7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIFRoZXJlIHNob3VsZCBvbmx5IGJlIG9uZSBtYXN0ZXIgbGlzdFxubGV0IGluc3RhbmNlID0gbnVsbDtcblxuLy8gQ29uc3RydWN0b3IgdG8gbWFrZSB0YXNrIG9iamVjdHNcbmNsYXNzIE1hc3Rlckxpc3Qge1xuICAgIGNvbnN0cnVjdG9yKCkgeyBcbiAgICAgICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2FuIG9ubHkgY3JlYXRlIG9uZSBpbnN0YW5jZSFcIik7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRMaXN0ID0gW107XG4gICAgfVxuXG4gICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIHJlbW92ZVRhc2sodGFzaykge1xuICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKHRoaXMuZGF0YS5pbmRleE9mKHRhc2spLCAxKTtcbiAgICB9XG5cbiAgICBlZGl0VGFzayh0YXNrLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGF0YVt0aGlzLmRhdGEuaW5kZXhPZih0YXNrKV1bYXR0cmlidXRlXSA9IHZhbHVlOyBcbiAgICB9XG5cbiAgICBzb3J0QnlEYXRlKCkge1xuICAgICAgICB0aGlzLmRhdGEuc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgIH1cblxuICAgIHByb2R1Y2VQcm9qZWN0TGlzdChwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gdGhpcy5kYXRhLmZpbHRlciggKHRhc2spID0+IHRhc2sucHJvamVjdCA9PSBwcm9qZWN0KTtcbiAgICAgICAgcHJvamVjdExpc3Quc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgICAgICByZXR1cm4gcHJvamVjdExpc3Q7XG4gICAgfVxuXG4gICAgZ2V0TGlzdE9mUHJvamVjdHMoKSB7XG4gICAgICAgIGNvbnN0IGFsbFByb2plY3RzID0gW107XG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCAodGFzayk9PiB7XG4gICAgICAgICAgICBpZiAodGFzay5wcm9qZWN0ICE9IG51bGwgJiYgIHRhc2sucHJvamVjdCAhPSAnJyAmJiAhYWxsUHJvamVjdHMuc29tZSgoYSk9PiBhID09PSB0YXNrLnByb2plY3QpKXtcbiAgICAgICAgICAgICAgICBhbGxQcm9qZWN0cy5wdXNoKHRhc2sucHJvamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBhbGxQcm9qZWN0cztcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYXN0ZXJMaXN0ID0gbmV3IE1hc3Rlckxpc3Q7XG5cblxuIiwiXCJ1c2Ugc3RyaWN0XCJcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTUNhY2hlXCI7XG5cbmZ1bmN0aW9uIHJlbmRlckNhcmQodGFzaykge1xuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgIGNoZWNrYm94Lm5hbWUgPSBcImlzQ29tcGxldGVkQ2hlY2tib3hcIjtcbiAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgICBjaGVja2JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZWQ7XG4gICAgY2hlY2tib3guaWQgPSB0YXNrLmNvbnRlbnQ7XG4gICAgXG4gICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoJ3Rhc2stbmFtZScpO1xuICAgIHRhc2tOYW1lLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGFzay5jb250ZW50O1xuXG4gICAgY29uc3QgdGFza0R1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza0R1ZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWR1ZS1kYXRlJyk7XG4gICAgdGFza0R1ZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgICB0YXNrRHVlLnRleHRDb250ZW50ID0gYER1ZTogJHt0YXNrLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7d2Vla2RheTogJ3Nob3J0JyB9KX0sXG4gICAgICAgICR7IHRhc2suZGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHsgbW9udGg6ICdzaG9ydCcgfSl9LiBcbiAgICAgICAgJHsgdGFzay5kYXRlLmdldERhdGUoKX0gYCAgXG4gICAgXG4gICAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gICAgZWRpdEJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgICBlZGl0QnRuLnRleHRDb250ZW50ID0gJ2VkaXQnO1xuIFxuICAgIFxuICAgIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZS10YXNrJyk7XG4gICAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gICAgcmVtb3ZlQnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICAgIHJlbW92ZUJ0bi50ZXh0Q29udGVudCA9ICdkZWxldGUnO1xuIFxuICAgIFxuICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgIGNhcmQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gICAgaWYgKHRhc2sucHJpb3JpdHkgPT0gJ2hpZ2gnKSB7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50Jyk7XG4gICAgfSBcbiAgICBjYXJkLmFwcGVuZChjaGVja2JveCwgdGFza05hbWUsIHRhc2tEdWUsIGVkaXRCdG4sIHJlbW92ZUJ0bik7XG4gICAgcmV0dXJuIChjYXJkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBvcHRpb24sIGJ5UHJvamVjdE5hbWUgPSBudWxsKSB7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICBsZXQgdG9tb3Jyb3cgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcblxuICAgIGxldCB3ZWVrRnJvbVRvZGF5PSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgd2Vla0Zyb21Ub2RheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDcpO1xuXG4gICAgbGV0IHRvZGF5R3JvdXAgPSBudWxsO1xuICAgIGxldCBwYXN0RHVlID0gbnVsbDtcbiAgICBsZXQgd2Vla0dyb3VwID0gbnVsbDtcblxuICAgIC8vIEZpcnN0IHJlbW92ZSBldmVyeXRoaW5nIGZyb20gbWFpbiBhbmQgZnJvbSBkaXNwbGF5TGlzdFxuICAgIHdoaWxlIChET00ubWFpbi5maXJzdENoaWxkKSB7XG4gICAgICAgIERPTS5tYWluLnJlbW92ZUNoaWxkKERPTS5tYWluLmZpcnN0Q2hpbGQpO1xuICAgICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3Quc3BsaWNlKDAsIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5sZW5ndGgpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb24gPT09ICdieVByb2plY3QnKXtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBtYXN0ZXJMaXN0LnByb2R1Y2VQcm9qZWN0TGlzdChieVByb2plY3ROYW1lKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcm9qZWN0SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgIHByb2plY3RIZWFkaW5nLnRleHRDb250ZW50ID0gYnlQcm9qZWN0TmFtZTtcbiAgICAgICAgRE9NLm1haW4uYXBwZW5kKHByb2plY3RIZWFkaW5nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZiAocHJvamVjdExpc3RbaV0uZGF0ZSA+PSB0b2RheSAmJiBwcm9qZWN0TGlzdFtpXS5kYXRlIDw9IHRvZGF5ICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZGF5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3N1YmhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TGlzdFtpXS5kYXRlID4gdG9kYXkgJiYgdG9kYXlHcm91cCA9PSAxKSAge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBET00ubWFpbi5hcHBlbmQocmVuZGVyQ2FyZChwcm9qZWN0TGlzdFtpXSkpO1xuICAgICAgICAgICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnB1c2gocHJvamVjdExpc3RbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFzdGVyTGlzdC5kYXRhLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b21vcnJvdyAmJiBvcHRpb24gPT09IFwidG9kYXlcIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07IFxuXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPiB3ZWVrRnJvbVRvZGF5ICYmIG9wdGlvbiA9PT0gXCJ0aGlzLXdlZWtcIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07IFxuXG5cbiAgICAgICAgICAgIC8vIFBhc3QtRHVlIFVuZG9uZSBCbG9ja1xuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9kYXkgICYmIHBhc3REdWUgPT0gbnVsbCAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uY29tcGxldGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHBhc3REdWUgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3REdWVIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBwYXN0RHVlSGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgcGFzdER1ZUhlYWRpbmcudGV4dENvbnRlbnQgPSAnUGFzdCBEdWUnO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZChwYXN0RHVlSGVhZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICBcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSAmJiBwYXN0RHVlID09IDEpIHtcbiAgICAgICAgICAgICAgICBwYXN0RHVlID0gMjtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUb2RheSBCbG9ja1xuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5ICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9tb3Jyb3cgJiYgdG9kYXlHcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IDE7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKHRvZGF5SGVhZGluZyk7XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgdG9kYXlHcm91cCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IDI7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDw9IHdlZWtGcm9tVG9kYXkgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgd2Vla0dyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB3ZWVrR3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdlZWtIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB3ZWVrSGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgd2Vla0hlYWRpbmcudGV4dENvbnRlbnQgPSAnVGhpcyBXZWVrJztcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQod2Vla0hlYWRpbmcpO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiB3ZWVrR3JvdXAgPT0gMSkge1xuICAgICAgICAgICAgICAgIHdlZWtHcm91cCA9IDI7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH07IFxuXG4gICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKChtYXN0ZXJMaXN0LmRhdGFbaV0uY29tcGxldGVkID09PSBmYWxzZSAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8IHRvZGF5KSB8fCBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSl7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKHJlbmRlckNhcmQobWFzdGVyTGlzdC5kYXRhW2ldKSk7XG4gICAgICAgICAgICAgICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnB1c2gobWFzdGVyTGlzdC5kYXRhW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBZGRUYXNrTW9kYWwoc29tZURpdiwgYXJyYXlPZlByb2plY3ROYW1lcykge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpO1xuICAgIGFkZFRhc2tNb2RhbC5pZCA9ICdhZGQtYS10YXNrLW1vZGFsJztcblxuICAgIGNvbnN0IGFkZFRhc2tNb2RhbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgdGFza0Zvcm0uaWQgPSAndGFzay1mb3JtJztcbiAgICBcbiAgICBjb25zdCBlbXB0eURpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVtcHR5RGl2MS50ZXh0Q29udGVudCA9ICcgJztcbiAgICBjb25zdCBlbXB0eURpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVtcHR5RGl2Mi50ZXh0Q29udGVudCA9ICcgJztcbiAgICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlkID0gJ2Nsb3NlLW1vZGFsLWJ1dHRvbic7XG5cbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlubmVySFRNTCA9ICcmdGltZXMnO1xuICAgIFxuICAgIGNvbnN0IGVtcHR5RGl2MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZW1wdHlEaXYzLnRleHRDb250ZW50ID0gJyAnO1xuICAgIGNvbnN0IGxhYmVsRm9yVGFza0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWxGb3JUYXNrQ29udGVudC5mb3IgPSAndGFzay1jb250ZW50JztcbiAgICBsYWJlbEZvclRhc2tDb250ZW50LnRleHRDb250ZW50ID0gJ1Rhc2s6J1xuXG4gICAgXG4gICAgXG4gICAgY29uc3QgdGFza0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGFza0NvbnRlbnQudHlwZSA9ICd0ZXh0JztcbiAgICB0YXNrQ29udGVudC5pZCA9ICd0YXNrLWNvbnRlbnQnO1xuICAgIHRhc2tDb250ZW50Lm5hbWUgPSAndGFzay1jb250ZW50JztcbiAgICB0YXNrQ29udGVudC5wbGFjZWhvbGRlciA9ICdFbnRlciBUYXNrJztcbiAgICB0YXNrQ29udGVudC5yZXF1aXJlZCA9IHRydWU7XG4gICAgY29uc3QgZW1wdHlEaXY0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBlbXB0eURpdjQudGV4dENvbnRlbnQgPSAnICc7XG4gICAgXG4gXG4gICAgY29uc3QgbGFiZWxGb3JEYXRlPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWxGb3JEYXRlLmZvciA9ICdkYXRlJztcbiAgICBsYWJlbEZvckRhdGUudGV4dENvbnRlbnQgPSAnRHVlOic7XG4gICAgY29uc3QgZW1wdHlEaXY1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBlbXB0eURpdjUudGV4dENvbnRlbnQgPSAnICc7XG5cbiBcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGRhdGUudHlwZSA9ICdkYXRlJztcbiAgICBkYXRlLmlkID0gJ2RhdGUnO1xuICAgIGRhdGUubmFtZSA9ICdkYXRlJztcbiAgICBkYXRlLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBjb25zdCBlbXB0eURpdjYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVtcHR5RGl2Ni50ZXh0Q29udGVudCA9ICcgJztcbiAgICBcbiAgICBjb25zdCBwcmlvcml0eVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eVRpdGxlLnRleHRDb250ZW50ID0gJ1ByaW9yaXR5Oic7XG5cbiAgICBjb25zdCBwcmlvcml0eU9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5pZCA9ICdwcmlvcml0eS1vcHRpb25zJztcblxuICAgIGNvbnN0IG9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG5vcm1hbFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIG5vcm1hbFJhZGlvLnR5cGUgPSBcInJhZGlvXCI7XG4gICAgbm9ybWFsUmFkaW8uaWQgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLm5hbWUgPSBcInByaW9yaXR5XCI7XG4gICAgbm9ybWFsUmFkaW8udmFsdWUgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IG5vcm1hbFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbm9ybWFsUmFkaW9MYWJlbC5mb3IgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvTGFiZWwudGV4dENvbnRlbnQgPSBcIk5vcm1hbFwiO1xuXG4gICAgY29uc3Qgb3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgaGlnaFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGhpZ2hSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgIGhpZ2hSYWRpby5pZCA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpby5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgIGhpZ2hSYWRpby52YWx1ZSA9IFwiaGlnaFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGhpZ2hSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGhpZ2hSYWRpb0xhYmVsLmZvciA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gXCJIaWdoXCI7XG4gICBcblxuICAgIGNvbnN0IGFzc2lnblRvUHJvamVjdExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGFzc2lnblRvUHJvamVjdExhYmVsLmZvciA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdExhYmVsLnRleHRDb250ZW50ID0gXCJQcm9qZWN0OlwiXG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgYXNzaWduVG9Qcm9qZWN0Lm5hbWUgPSBcInByb2plY3RcIjtcbiAgICBhc3NpZ25Ub1Byb2plY3QuaWQgPSBcInByb2plY3RcIjtcbiAgICBhc3NpZ25Ub1Byb2plY3QucGxhY2Vob2xkZXIgPSBcIk9wdGlvbmFsXCJcbiAgICBhc3NpZ25Ub1Byb2plY3Quc2V0QXR0cmlidXRlKFwibGlzdFwiLCBcInByb2plY3QtbGlzdFwiKTtcbiAgICBcblxuICAgIGNvbnN0IGFzc2lnblRvUHJvamVjdERhdGFMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRhdGFsaXN0XCIpO1xuICAgIGFzc2lnblRvUHJvamVjdERhdGFMaXN0LmlkID0gXCJwcm9qZWN0LWxpc3RcIjtcbiAgIFxuICAgIGFycmF5T2ZQcm9qZWN0TmFtZXMuZm9yRWFjaCggKGVudHJ5KSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gZW50cnk7XG4gICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGVudHJ5OyBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuYXBwZW5kKG9wdGlvbik7XG4gICAgfSlcblxuICAgIGFzc2lnblRvUHJvamVjdC5hcHBlbmQoYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QpO1xuXG4gICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzdWJtaXRCdG4udHlwZSA9IFwic3VibWl0XCI7XG4gICAgc3VibWl0QnRuLmlkID0gXCJtb2RhbC1zdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4udmFsdWUgPSBcIlN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XG5cbiAgICBvcHRpb24xLmFwcGVuZChub3JtYWxSYWRpbywgbm9ybWFsUmFkaW9MYWJlbCk7XG4gICAgb3B0aW9uMi5hcHBlbmQoaGlnaFJhZGlvLCBoaWdoUmFkaW9MYWJlbCk7XG4gICAgcHJpb3JpdHlPcHRpb25zLmFwcGVuZChvcHRpb24xLCBvcHRpb24yKTtcbiAgICB0YXNrRm9ybS5hcHBlbmQoXG4gICAgICAgIGVtcHR5RGl2MSwgXG4gICAgICAgIGVtcHR5RGl2MixcbiAgICAgICAgY2xvc2VNb2RhbEJ1dHRvbiwgXG4gICAgICAgIGxhYmVsRm9yVGFza0NvbnRlbnQsIFxuICAgICAgICB0YXNrQ29udGVudCwgXG4gICAgICAgIGVtcHR5RGl2MyxcbiAgICAgICAgbGFiZWxGb3JEYXRlLCBcbiAgICAgICAgZGF0ZSwgXG4gICAgICAgIGVtcHR5RGl2NCxcbiAgICAgICBcbiAgICAgICAgcHJpb3JpdHlUaXRsZSwgXG4gICAgICAgIHByaW9yaXR5T3B0aW9ucywgXG4gICAgICAgIGVtcHR5RGl2NSxcbiAgICAgICBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwsIFxuICAgICAgICBhc3NpZ25Ub1Byb2plY3QsXG4gICAgICAgIGVtcHR5RGl2NixcbiAgICAgICBcbiAgICAgICAgc3VibWl0QnRuKTtcbiAgICBhZGRUYXNrTW9kYWxDb250ZW50LmFwcGVuZCh0YXNrRm9ybSk7XG4gICAgYWRkVGFza01vZGFsLmFwcGVuZChhZGRUYXNrTW9kYWxDb250ZW50KTtcbiAgICBzb21lRGl2LmFwcGVuZChhZGRUYXNrTW9kYWwpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTaWRlQmFyKHNvbWVEaXYsIGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgICBpZiAoRE9NLnNpZGVCYXIpe1xuICAgIFxuICAgICAgICBET00uc2lkZUJhci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKERPTS5zaWRlQmFyKTtcbiAgICAgICAgXG4gICAgfVxuICAgIGNvbnN0IHNpZGViYXJTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgc2lkZWJhclNlY3Rpb24uaWQgPSAnc2lkZWJhcic7XG4gICAgY29uc3QgbGlzdEJ5VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgY29uc3QgbGlzdEl0ZW0xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBpdGVtMUFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgIGNvbnN0IHRvZGF5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICB0b2RheUljb24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnKTtcbiAgICB0b2RheUljb24udGV4dENvbnRlbnQgPSAndG9kYXknO1xuXG4gICAgaXRlbTFBbmNob3IuaWQgPSAndG9kYXlzLXRhc2tzJztcbiAgICBpdGVtMUFuY2hvci5ocmVmID0gJyMnO1xuICAgIGl0ZW0xQW5jaG9yLnRleHRDb250ZW50ID0gXCJUb2RheVwiO1xuICAgIGl0ZW0xQW5jaG9yLnByZXBlbmQodG9kYXlJY29uKTtcbiAgICBsaXN0SXRlbTEuYXBwZW5kKGl0ZW0xQW5jaG9yKTtcblxuICAgIGNvbnN0IHdlZWtJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIHdlZWtJY29uLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gICAgd2Vla0ljb24udGV4dENvbnRlbnQgPSAnZGF0ZV9yYW5nZSc7XG4gICAgY29uc3QgbGlzdEl0ZW0yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBpdGVtMkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpdGVtMkFuY2hvci5pZCA9ICd0aGlzLXdlZWsnO1xuICAgIGl0ZW0yQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgaXRlbTJBbmNob3IudGV4dENvbnRlbnQgPSBcIlRoaXMgV2Vla1wiO1xuICAgIGl0ZW0yQW5jaG9yLnByZXBlbmQod2Vla0ljb24pO1xuICAgIGxpc3RJdGVtMi5hcHBlbmQoaXRlbTJBbmNob3IpO1xuICAgIFxuICAgIGNvbnN0IG1vbnRoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICBtb250aEljb24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnKTtcbiAgICBtb250aEljb24udGV4dENvbnRlbnQgPSAnY2FsZW5kYXJfbW9udGgnO1xuICAgIGNvbnN0IGxpc3RJdGVtMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgaXRlbTNBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaXRlbTNBbmNob3IuaWQgPSAnYWxsLXRhc2tzJztcbiAgICBpdGVtM0FuY2hvci5ocmVmID0gJyMnO1xuICAgIGl0ZW0zQW5jaG9yLnRleHRDb250ZW50ID0gXCJBbGxcIjtcbiAgICBpdGVtM0FuY2hvci5wcmVwZW5kKG1vbnRoSWNvbik7XG4gICAgbGlzdEl0ZW0zLmFwcGVuZChpdGVtM0FuY2hvcik7XG5cbiAgICBsaXN0QnlUaW1lLmFwcGVuZChsaXN0SXRlbTEsIGxpc3RJdGVtMiwgbGlzdEl0ZW0zKTtcblxuICAgIGNvbnN0IGxpc3RCeVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIGxpc3RCeVByb2plY3QuaWQgPSAnbGlzdC1ieS1wcm9qZWN0JztcbiAgICBjb25zdCBtYWtlTGluayA9IGZ1bmN0aW9uKG5hbWUsIGRpdikge1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGNvbnN0IGl0ZW1BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGl0ZW1BbmNob3IuaWQgPSBuYW1lO1xuICAgICAgICBpdGVtQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgICAgIGl0ZW1BbmNob3IudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgICBjb25zdCByZW1vdmVQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICByZW1vdmVQcm9qZWN0QnRuLmlkID0gYCR7bmFtZX1SZW1vdmVgO1xuICAgICAgICByZW1vdmVQcm9qZWN0QnRuLmhyZWYgPSBcIiNcIlxuICAgICAgICByZW1vdmVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJylcbiAgICAgICAgcmVtb3ZlUHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICdkZWxldGUnO1xuICAgICAgICBsaXN0SXRlbS5hcHBlbmQoaXRlbUFuY2hvcixyZW1vdmVQcm9qZWN0QnRuKTtcbiAgICAgICAgZGl2LmFwcGVuZChsaXN0SXRlbSk7XG4gICAgfVxuICAgIGlmIChhcnJheU9mUHJvamVjdE5hbWVzKXtcbiAgICAgICAgYXJyYXlPZlByb2plY3ROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGEpeyBtYWtlTGluayhhLCBsaXN0QnlQcm9qZWN0KSB9ICk7XG4gICAgfVxuICAgIHNpZGViYXJTZWN0aW9uLmFwcGVuZChsaXN0QnlUaW1lLCBsaXN0QnlQcm9qZWN0KTtcbiAgICBzb21lRGl2LmFwcGVuZChzaWRlYmFyU2VjdGlvbik7ICAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJIZWFkZXIoc29tZURpdikge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYWRkVGFza0J0bi5pZCA9IFwiYWRkLWEtdGFza1wiO1xuICAgIGFkZFRhc2tCdG4udGV4dENvbnRlbnQgPSBcIkFkZCBUYXNrXCI7XG4gICAgaGVhZGVyLmFwcGVuZChhZGRUYXNrQnRuKTtcbiAgICBzb21lRGl2LnByZXBlbmQoaGVhZGVyKTtcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01DYWNoZVwiO1xuaW1wb3J0IHsgYWRkTWFpbkV2ZW50TGlzdGVuZXJzLCBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMsIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9hZGRFTHNcIjtcbmltcG9ydCB7IG1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJBZGRUYXNrTW9kYWwsIHJlbmRlclNpZGVCYXIsIHJlbmRlckhlYWRlciB9IGZyb20gXCIuL3JlbmRlclwiO1xuaW1wb3J0IHsgY3VycmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY3VycmVudFNldHRpbmdzXCI7XG5cblxuZnVuY3Rpb24gbWFrZVRhc2tGcm9tSlNPTih0aGluZyl7XG4gICAgY29uc29sZS5sb2codGhpbmcpO1xuICAgIGNvbnN0IHQgPSBuZXcgVGFzayh0aGluZy5kYXRlLCB0aGluZy5jb250ZW50LCB0aGluZy5wcmlvcml0eSk7XG4gICAgdC5wcm9qZWN0ID0gdGhpbmcucHJvamVjdDtcbiAgICB0LmNvbXBsZXRlZCA9IHRoaW5nLmNvbXBsZXRlZDtcbiAgIC8vIGNvbnNvbGUubG9nKHQpXG4gICAgcmV0dXJuIHRcbn1cblxuXG5cblxuXG5mdW5jdGlvbiBteUZ1bmN0aW9uKGRhdGFGcm9tU2VydmVyKXtcbiAgICBjb25zdCBwYXJzZWRKU09OID0gSlNPTi5wYXJzZShkYXRhRnJvbVNlcnZlcik7XG4gICAgZm9yIChsZXQgaT0wO2k8cGFyc2VkSlNPTi5sZW5ndGg7aSsrKSB7XG4gICAgICAgIGNvbnN0IHQgPSBuZXcgVGFzayhwYXJzZWRKU09OW2ldLmRhdGUsIHBhcnNlZEpTT05baV0uY29udGVudCwgcGFyc2VkSlNPTltpXS5wcmlvcml0eSk7XG4gICAgICAgIHQucHJvamVjdCA9IHBhcnNlZEpTT05baV0ucHJvamVjdDtcbiAgICAgICAgdC5jb21wbGV0ZWQgPSBwYXJzZWRKU09OW2ldLmNvbXBsZXRlZDtcbiAgICAgICAgbWFzdGVyTGlzdC5kYXRhLnB1c2godCk7XG4gICAgfVxuIH1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVzdW1lKCkgeyBcbiAgICBjb25zdCBvbGRKU09OID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ29sZERhdGEnKTtcbiAgICBteUZ1bmN0aW9uKG9sZEpTT04pO1xuICAgLy8gZm9yIChjb25zdCBlbnRyeSBvZiBvbGRKU09OKXtcbiAgICAgICAvL2NvbnNvbGUubG9nKGVudHJ5KVxuICAgICAgICAvL21hc3Rlckxpc3QuZGF0YS5wdXNoKG1ha2VUYXNrRnJvbUpTT04oZW50cnkpKTsgXG4gICAvLyB9XG4gICAvLyBjb25zb2xlLmxvZyhtYXN0ZXJMaXN0LmRhdGEpO1xuXG4gICAgXG5cbiAgICByZW5kZXJIZWFkZXIoRE9NLmJvZHkpO1xuICAgIHJlbmRlclNpZGVCYXIoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgcmVuZGVyQWRkVGFza01vZGFsKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG5cbiAgICAvLyBBZGQgZXZlbnRsaXN0ZW5lcnMgdG8gaGVhZGVyIGFuZCBtb2RhbFxuICAgIGFkZEluaXRpYWxFdmVudExpc3RlbmVycygpO1xuICAgIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBET00uc2lkZWJhclByb2plY3RMaXN0UmVtb3ZlO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuZXhwb3J0IGNsYXNzIFRhc2sge1xuXG4gICAgY29uc3RydWN0b3IoZGF0ZSwgY29udGVudCwgcHJpb3JpdHksIHByb2plY3QgPSBudWxsKSB7IFxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICB0aGlzLmlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwMDAwMCk7XG4gICAgfVxuXG4gICAgbWFya0RvbmUoKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gdHJ1ZTtcbiAgICB9XG5cbn07XG5cblxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTUNhY2hlXCI7XG5pbXBvcnQgeyBhZGRNYWluRXZlbnRMaXN0ZW5lcnMsIGFkZEluaXRpYWxFdmVudExpc3RlbmVycywgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycyB9IGZyb20gXCIuL2FkZEVMc1wiO1xuaW1wb3J0IHsgbWFzdGVyTGlzdCB9IGZyb20gXCIuL21hc3Rlckxpc3RcIjtcbmltcG9ydCB7IHJlbmRlck1haW4sIHJlbmRlckFkZFRhc2tNb2RhbCwgcmVuZGVyU2lkZUJhciwgcmVuZGVySGVhZGVyIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5pbXBvcnQgeyBjdXJyZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jdXJyZW50U2V0dGluZ3NcIjtcbmltcG9ydCBmcmVzaFN0YXJ0IGZyb20gXCIuL2ZyZXNoU3RhcnRcIjtcbmltcG9ydCByZXN1bWUgZnJvbSBcIi4vcmVzdW1lXCI7XG5cbi8vICBJbiByZXN1bWUuanMgXG4vLyAgTmVlZCB0byB0YWtlIHRoZSByZXR1cm5lZCB0aGluZyBieSBKU09OIGFuZCBtYWtlIGEgYnVuY2ggb2YgVGFzayBvYmplY3RzIHRoYXQgYXJlIHRoZW4gYWRkZWQgdG8gbWFzdGVybGlzdC5kYXRhXG5cbi8vZnVuY3Rpb24gcmV2aXZlcih0aGluZyl7XG4vLyAgICBuZXcgVGFzayh0aGlzLilcbiAgICBcbiAgICAvL3JldHVybiBuZXcgVGFzayggKVxuLy99XG5cblxuaWYoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvbGREYXRhJykpIHtcbiAgICBmcmVzaFN0YXJ0KCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luc3RhbmNlJywgbWFzdGVyTGlzdCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGlzcGxheUxpc3QnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QpKTtcbn0gXG5lbHNlIHtcbiAgIHJlc3VtZSgpO1xufVxuXG5cblxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=