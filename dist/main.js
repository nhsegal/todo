/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addSideBarEventListeners": () => (/* binding */ addSideBarEventListeners),
/* harmony export */   "prepareDOM": () => (/* binding */ prepareDOM)
/* harmony export */ });
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");




 



 // Cache the DOM
 


function prepareDOM (){
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
        const newTask = new _tasks__WEBPACK_IMPORTED_MODULE_2__.Task( newTaskDate.value, newTaskContent.value, newTaskPriorityValue, newTaskProject.value);
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.addTask(newTask);
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.sortByDate();
        newTaskContent.value = null;
        newTaskDate.value = null;
        for (const option of newTaskPriority) {
            newTaskPriorityValue = null;            
        }
        newTaskProject.value = null;
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderSideBar)(body, _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.getListOfProjects());
        
    }

    // Add eventlisteners
    addTaskBtn.addEventListener("click", () => { addTaskModal.classList.toggle("closed") });
    closeModalButton.addEventListener("click", () => { addTaskModal.classList.toggle("closed") });
    addTaskForm.addEventListener("submit", taskSubmit);  
}

// Add eventlisteners to sidebar
const addSideBarEventListeners = (listOfProjects) => {
    const addTaskBtn = document.querySelector("#add-a-task");
 
     const main = document.querySelector('main');

    try {
        const todaysTasks = document.querySelector("#todays-tasks");
        todaysTasks.addEventListener("click", function(){
        _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('today', null);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject)});

        const weeksTasks = document.querySelector("#this-week");
        weeksTasks.addEventListener("click", function(){
        _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('this-week', null);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject)});

        const allTasks = document.querySelector("#all-tasks");
        allTasks.addEventListener("click", function(){
        _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('all', null);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject)});
       
        console.log(listOfProjects);
        listOfProjects.forEach(    (item) => { 
                                            const el =document.getElementById(item);
                                            el.addEventListener('click', () => {
                                                _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('byProject', el.id);
                                                (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
                                            })
         } );
    }
    catch {
        console.log('failed');
    }
};




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
    if (document.querySelector("#sidebar")) {
        const deleteThis = document.querySelector("#sidebar");
        deleteThis.parentNode.removeChild(deleteThis);
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

    constructor(date, content, priority) { 
        this.date = new Date(date);
        this.content = content;
        this.completed = false;
        this.priority = priority;
        this.project = null;
        this.id = Math.floor(Math.random()*100000000);
    }

    markDone() {
        this.completed = true;
    }

    htmlFormat() {
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.checked = this.completed;
        checkbox.id = this.content;
    
        const taskName = document.createElement("div");
        taskName.classList.add('task-name');
        taskName.textContent = this.content;

        const taskDue = document.createElement("div");
        taskDue.classList.add('task-due-date');
        taskDue.textContent = `Due: ${this.date.toLocaleString('default', {weekday: 'short' })},
           ${ this.date.toLocaleString('default', { month: 'short' })}. 
            ${ this.date.getDate()} `  
    
        const editTask = function(e) {
            console.log(e.target.parentElement.getAttribute("data-id"));
        }

        const removeTask = function(e) {
           
            const thisTask = _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data.filter( (t) => t.id == e.target.parentElement.getAttribute("data-id"));
            console.log(thisTask[0]);
            _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.removeTask(thisTask[0])
            
            
            
            ;(0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_2__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_2__.currentSettings.whichProject);
           
        }
    
        const editBtn = document.createElement("button");
        editBtn.classList.add('edit-task');
        editBtn.textContent = 'edit';
        editBtn.addEventListener("click", editTask);
    
        const removeBtn = document.createElement("button");
        removeBtn.classList.add('remove-task');
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
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");









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

_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.addTask(sampleTask);
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.addTask(sampleTask2);
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.addTask(sampleTask3);
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.addTask(sampleTask4);
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.addTask(sampleTask5);
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.addTask(sampleTask6);
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.addTask(sampleTask7);
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.addTask(sampleTask8);
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.addTask(sampleTask9);
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.sortByDate();


_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.editTask(sampleTask, 'project', 'Coding');
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.editTask(sampleTask5, 'project', 'Coding');
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.editTask(sampleTask6, 'project', 'Coding');
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.editTask(sampleTask3, 'completed', 'true');
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.editTask(sampleTask8, 'project', 'Health');
_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.editTask(sampleTask9, 'project', 'Health');

// ***************


// Cache DOM and render each section
const body = document.querySelector("body");
const addDiv = document.querySelector("#for-add-task-modal");
const main = document.querySelector("main");

(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderHeader)(body);
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderSideBar)(body, _masterList__WEBPACK_IMPORTED_MODULE_2__.masterList, _masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.getListOfProjects());
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderAddTaskModal)(body, _masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.getListOfProjects());
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.whichProject);

// Add eventlisteners to header and modal
(0,_dom__WEBPACK_IMPORTED_MODULE_1__.prepareDOM)();
(0,_dom__WEBPACK_IMPORTED_MODULE_1__.addSideBarEventListeners)( _masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.getListOfProjects());








})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFZOztBQUVMO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hhOztBQUU2QjtBQUNXO0FBQ3RCO0FBQ3FCOzs7QUFHcEQ7QUFDQTs7O0FBR087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix3Q0FBSTtBQUNoQyxRQUFRLDJEQUFrQjtBQUMxQixRQUFRLDhEQUFxQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1EQUFVLENBQUMsbURBQVUsUUFBUSxvRUFBc0IsRUFBRSwwRUFBNEI7QUFDekYsUUFBUSxzREFBYSxPQUFPLG1EQUFVLEVBQUUscUVBQTRCO0FBQ3BFO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQseUNBQXlDO0FBQzFGLHVEQUF1RCx5Q0FBeUM7QUFDaEc7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsb0VBQXNCO0FBQzlCLFFBQVEsbURBQVUsQ0FBQyxtREFBVSxRQUFRLG9FQUFzQixFQUFFLDBFQUE0QixFQUFFOztBQUUzRjtBQUNBO0FBQ0EsUUFBUSxvRUFBc0I7QUFDOUIsUUFBUSxtREFBVSxDQUFDLG1EQUFVLFFBQVEsb0VBQXNCLEVBQUUsMEVBQTRCLEVBQUU7O0FBRTNGO0FBQ0E7QUFDQSxRQUFRLG9FQUFzQjtBQUM5QixRQUFRLG1EQUFVLENBQUMsbURBQVUsUUFBUSxvRUFBc0IsRUFBRSwwRUFBNEIsRUFBRTtBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELG9FQUFzQjtBQUN0RSxnREFBZ0QsbURBQVUsQ0FBQyxtREFBVSxRQUFRLG9FQUFzQixFQUFFLDBFQUE0QjtBQUNqSSw2Q0FBNkM7QUFDN0MsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEZhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRU87Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERLOzs7QUFHTDtBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix3QkFBd0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw0QkFBNEI7QUFDcEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsNkJBQTZCO0FBQzlFO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3UmE7QUFDNkI7QUFDSjtBQUNjOzs7QUFHcEQ7O0FBRUE7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLHFDQUFxQyxrQkFBa0IsRUFBRTtBQUMvRixjQUFjLHNDQUFzQyxnQkFBZ0IsRUFBRTtBQUN0RSxlQUFlLHFCQUFxQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCLCtEQUFzQjtBQUNuRDtBQUNBLFlBQVksOERBQXFCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0RBQVUsQ0FBQyxtREFBVSxRQUFRLG9FQUFzQixFQUFFLDBFQUE0QjtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O1VDNUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWtCO0FBQzhCO0FBQ25CO0FBQzZDO0FBQ25DOzs7QUFHcEQ7O0FBRUEsdUJBQXVCLHdDQUFJO0FBQzNCO0FBQ0Esd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTs7QUFFNUIsMkRBQWtCO0FBQ2xCLDJEQUFrQjtBQUNsQiwyREFBa0I7QUFDbEIsMkRBQWtCO0FBQ2xCLDJEQUFrQjtBQUNsQiwyREFBa0I7QUFDbEIsMkRBQWtCO0FBQ2xCLDJEQUFrQjtBQUNsQiwyREFBa0I7QUFDbEIsOERBQXFCOzs7QUFHckIsNERBQW1CO0FBQ25CLDREQUFtQjtBQUNuQiw0REFBbUI7QUFDbkIsNERBQW1CO0FBQ25CLDREQUFtQjtBQUNuQiw0REFBbUI7O0FBRW5COzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxREFBWTtBQUNaLHNEQUFhLE9BQU8sbURBQVUsRUFBRSxxRUFBNEI7QUFDNUQsMkRBQWtCLE9BQU8scUVBQTRCO0FBQ3JELG1EQUFVLENBQUMsbURBQVUsUUFBUSxvRUFBc0IsRUFBRSwwRUFBNEI7O0FBRWpGO0FBQ0EsZ0RBQVU7QUFDViw4REFBd0IsRUFBRSxxRUFBNEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2N1cnJlbnRTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL21hc3Rlckxpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNvbnN0IGN1cnJlbnRTZXR0aW5ncyA9IHtcbiAgICB2aWV3Qnk6ICdhbGwnLFxuICAgIHdoaWNoUHJvamVjdDogbnVsbCxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24obmV3Vmlldywgd2hpY2hQID0gbnVsbCkge1xuICAgICAgICB0aGlzLnZpZXdCeSA9IG5ld1ZpZXc7XG4gICAgICAgIHRoaXMud2hpY2hQcm9qZWN0ID0gd2hpY2hQO1xuICAgIH1cblxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBtYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyU2lkZUJhciB9IGZyb20gXCIuL3JlbmRlclwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7IFxuaW1wb3J0IHsgY3VycmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY3VycmVudFNldHRpbmdzXCI7XG5cblxuIC8vIENhY2hlIHRoZSBET01cbiBcblxuXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZURPTSAoKXtcbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYS10YXNrXCIpO1xuICAgIGNvbnN0IGFkZFRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWZvcm1cIik7XG4gICAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYS10YXNrLW1vZGFsXCIpO1xuICAgIGNvbnN0IGNsb3NlTW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb3NlLW1vZGFsLWJ1dHRvblwiKTtcbiAgICBjb25zdCBuZXdUYXNrQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1jb250ZW50XCIpO1xuICAgIGNvbnN0IG5ld1Rhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpO1xuICAgIGNvbnN0IG5ld1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9cHJpb3JpdHldJyk7XG4gICAgY29uc3QgbmV3VGFza1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgIC8vIENhbGxiYWNrIGZvciBjcmVhdGUgdGFzayBzdWJtaXRcbiAgICBjb25zdCB0YXNrU3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuICAgICAgICBsZXQgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBuZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayggbmV3VGFza0RhdGUudmFsdWUsIG5ld1Rhc2tDb250ZW50LnZhbHVlLCBuZXdUYXNrUHJpb3JpdHlWYWx1ZSwgbmV3VGFza1Byb2plY3QudmFsdWUpO1xuICAgICAgICBtYXN0ZXJMaXN0LmFkZFRhc2sobmV3VGFzayk7XG4gICAgICAgIG1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuICAgICAgICBuZXdUYXNrQ29udGVudC52YWx1ZSA9IG51bGw7XG4gICAgICAgIG5ld1Rhc2tEYXRlLnZhbHVlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgbmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG51bGw7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgbmV3VGFza1Byb2plY3QudmFsdWUgPSBudWxsO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICByZW5kZXJTaWRlQmFyKGJvZHksIG1hc3Rlckxpc3QsIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vIEFkZCBldmVudGxpc3RlbmVyc1xuICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIikgfSk7XG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKSB9KTtcbiAgICBhZGRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRhc2tTdWJtaXQpOyAgXG59XG5cbi8vIEFkZCBldmVudGxpc3RlbmVycyB0byBzaWRlYmFyXG5leHBvcnQgY29uc3QgYWRkU2lkZUJhckV2ZW50TGlzdGVuZXJzID0gKGxpc3RPZlByb2plY3RzKSA9PiB7XG4gICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFza1wiKTtcbiBcbiAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcblxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRvZGF5c1Rhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2RheXMtdGFza3NcIik7XG4gICAgICAgIHRvZGF5c1Rhc2tzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0b2RheScsIG51bGwpO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpfSk7XG5cbiAgICAgICAgY29uc3Qgd2Vla3NUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGhpcy13ZWVrXCIpO1xuICAgICAgICB3ZWVrc1Rhc2tzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0aGlzLXdlZWsnLCBudWxsKTtcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KX0pO1xuXG4gICAgICAgIGNvbnN0IGFsbFRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhbGwtdGFza3NcIik7XG4gICAgICAgIGFsbFRhc2tzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdhbGwnLCBudWxsKTtcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KX0pO1xuICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhsaXN0T2ZQcm9qZWN0cyk7XG4gICAgICAgIGxpc3RPZlByb2plY3RzLmZvckVhY2goICAgIChpdGVtKSA9PiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgnYnlQcm9qZWN0JywgZWwuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgIH0gKTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkJyk7XG4gICAgfVxufTtcblxuXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gVGhlcmUgc2hvdWxkIG9ubHkgYmUgb25lIG1hc3RlciBsaXN0XG5sZXQgaW5zdGFuY2UgPSBudWxsO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuY2xhc3MgTWFzdGVyTGlzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7IFxuICAgICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW4gb25seSBjcmVhdGUgb25lIGluc3RhbmNlIVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIH1cblxuICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICB0aGlzLmRhdGEucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZih0YXNrKSwgMSk7XG4gICAgfVxuXG4gICAgZWRpdFRhc2sodGFzaywgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmRhdGFbdGhpcy5kYXRhLmluZGV4T2YodGFzayldW2F0dHJpYnV0ZV0gPSB2YWx1ZTsgXG4gICAgfVxuXG4gICAgc29ydEJ5RGF0ZSgpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNvcnQoKGEsYikgPT4gYS5kYXRlIC0gYi5kYXRlKTtcbiAgICB9XG5cbiAgICBwcm9kdWNlUHJvamVjdExpc3QocHJvamVjdCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IHRoaXMuZGF0YS5maWx0ZXIoICh0YXNrKSA9PiB0YXNrLnByb2plY3QgPT0gcHJvamVjdCk7XG4gICAgICAgIHByb2plY3RMaXN0LnNvcnQoKGEsYikgPT4gYS5kYXRlIC0gYi5kYXRlKTtcbiAgICAgICAgcmV0dXJuIHByb2plY3RMaXN0O1xuICAgIH1cblxuICAgIGdldExpc3RPZlByb2plY3RzKCkge1xuICAgICAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCggKHRhc2spPT4ge1xuICAgICAgICAgICAgaWYgKHRhc2sucHJvamVjdCAhPSBudWxsICYmICFhbGxQcm9qZWN0cy5zb21lKChhKT0+IGE9PT10YXNrLnByb2plY3QpKXtcbiAgICAgICAgICAgICAgICBhbGxQcm9qZWN0cy5wdXNoKHRhc2sucHJvamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gIClcbiAgICAgICAgcmV0dXJuIGFsbFByb2plY3RzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1hc3Rlckxpc3QgPSBuZXcgTWFzdGVyTGlzdDsiLCJcInVzZSBzdHJpY3RcIlxuXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIG9wdGlvbiwgYnlQcm9qZWN0TmFtZSA9IG51bGwpIHtcbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGxldCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICB0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDEpO1xuXG4gICAgbGV0IHdlZWtGcm9tVG9kYXk9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICB3ZWVrRnJvbVRvZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNyk7XG5cbiAgICBsZXQgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgbGV0IHBhc3REdWUgPSBudWxsO1xuICAgIGxldCB3ZWVrR3JvdXAgPSBudWxsO1xuXG4gICAgLy8gRmlyc3QgcmVtb3ZlIGV2ZXJ5dGhpbmcgZnJvbSBtYWluXG4gICAgd2hpbGUgKG1haW4uZmlyc3RDaGlsZCkge1xuICAgICAgICBtYWluLnJlbW92ZUNoaWxkKG1haW4uZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbiA9PT0gJ2J5UHJvamVjdCcpe1xuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IG1hc3Rlckxpc3QucHJvZHVjZVByb2plY3RMaXN0KGJ5UHJvamVjdE5hbWUpO1xuICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHByb2plY3RIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgcHJvamVjdEhlYWRpbmcudGV4dENvbnRlbnQgPSBieVByb2plY3ROYW1lO1xuICAgICAgICBtYWluLmFwcGVuZChwcm9qZWN0SGVhZGluZyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdExpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUgPj0gdG9kYXkgJiYgcHJvamVjdExpc3RbaV0uZGF0ZSA8PSB0b2RheSAmJiB0b2RheUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RheUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdzdWJoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TGlzdFtpXS5kYXRlID4gdG9kYXkgJiYgdG9kYXlHcm91cCA9PSAxKSAge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1haW4uYXBwZW5kKHByb2plY3RMaXN0W2ldLmh0bWxGb3JtYXQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXN0ZXJMaXN0LmRhdGEubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93ICYmIG9wdGlvbiA9PT0gXCJ0b2RheVwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTsgXG5cbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+IHdlZWtGcm9tVG9kYXkgJiYgb3B0aW9uID09PSBcInRoaXMtd2Vla1wiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTsgXG5cblxuICAgICAgICAgICAgLy8gUGFzdC1EdWUgVW5kb25lIEJsb2NrXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b2RheSAgJiYgcGFzdER1ZSA9PSBudWxsICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5jb21wbGV0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcGFzdER1ZSA9IDE7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFzdER1ZUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHBhc3REdWVIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICBwYXN0RHVlSGVhZGluZy50ZXh0Q29udGVudCA9ICdQYXN0IER1ZSc7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQocGFzdER1ZUhlYWRpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9kYXkgJiYgcGFzdER1ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcGFzdER1ZSA9IDI7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUb2RheSBCbG9ja1xuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5ICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9tb3Jyb3cgJiYgdG9kYXlHcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IDE7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b21vcnJvdyAmJiB0b2RheUdyb3VwID09IDEpIHtcbiAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMjtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8PSB3ZWVrRnJvbVRvZGF5ICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93ICYmIHdlZWtHcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgd2Vla0dyb3VwID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCB3ZWVrSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgd2Vla0hlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHdlZWtIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RoaXMgV2Vlayc7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQod2Vla0hlYWRpbmcpO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiB3ZWVrR3JvdXAgPT0gMSkge1xuICAgICAgICAgICAgICAgIHdlZWtHcm91cCA9IDI7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfTsgXG5cbiAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoKG1hc3Rlckxpc3QuZGF0YVtpXS5jb21wbGV0ZWQgPT09IGZhbHNlICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9kYXkpIHx8IG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5KXtcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChtYXN0ZXJMaXN0LmRhdGFbaV0uaHRtbEZvcm1hdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBZGRUYXNrTW9kYWwoc29tZURpdiwgYXJyYXlPZlByb2plY3ROYW1lcykge1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpO1xuICAgIGFkZFRhc2tNb2RhbC5pZCA9ICdhZGQtYS10YXNrLW1vZGFsJztcblxuICAgIGNvbnN0IGFkZFRhc2tNb2RhbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgdGFza0Zvcm0uaWQgPSAndGFzay1mb3JtJztcbiAgICBcbiAgICBjb25zdCBlbXB0eURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5pZCA9ICdjbG9zZS1tb2RhbC1idXR0b24nO1xuXG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzJztcbiAgICBcbiAgICBjb25zdCBsYWJlbEZvclRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsRm9yVGFza0NvbnRlbnQuZm9yID0gJ3Rhc2stY29udGVudCc7XG4gICAgbGFiZWxGb3JUYXNrQ29udGVudC50ZXh0Q29udGVudCA9ICdUYXNrOidcbiAgICBcbiAgICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0YXNrQ29udGVudC50eXBlID0gJ3RleHQnO1xuICAgIHRhc2tDb250ZW50LmlkID0gJ3Rhc2stY29udGVudCc7XG4gICAgdGFza0NvbnRlbnQubmFtZSA9ICd0YXNrLWNvbnRlbnQnO1xuICAgIHRhc2tDb250ZW50LnBsYWNlaG9sZGVyID0gJ0VudGVyIFRhc2snO1xuICAgIHRhc2tDb250ZW50LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBcbiAgICBjb25zdCBsYWJlbEZvckRhdGU9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBsYWJlbEZvckRhdGUuZm9yID0gJ2RhdGUnO1xuICAgIGxhYmVsRm9yRGF0ZS50ZXh0Q29udGVudCA9ICdEdWU6JztcblxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgZGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgIGRhdGUuaWQgPSAnZGF0ZSc7XG4gICAgZGF0ZS5uYW1lID0gJ2RhdGUnO1xuICAgIGRhdGUucmVxdWlyZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgcHJpb3JpdHlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJpb3JpdHlUaXRsZS50ZXh0Q29udGVudCA9ICdQcmlvcml0eTonO1xuXG4gICAgY29uc3QgcHJpb3JpdHlPcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eU9wdGlvbnMuaWQgPSAncHJpb3JpdHktb3B0aW9ucyc7XG5cbiAgICBjb25zdCBvcHRpb24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBub3JtYWxSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBub3JtYWxSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgIG5vcm1hbFJhZGlvLmlkID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpby5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgIG5vcm1hbFJhZGlvLnZhbHVlID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpby5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBub3JtYWxSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIG5vcm1hbFJhZGlvTGFiZWwuZm9yID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gXCJOb3JtYWxcIjtcblxuICAgIGNvbnN0IG9wdGlvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGhpZ2hSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBoaWdoUmFkaW8udHlwZSA9IFwicmFkaW9cIjtcbiAgICBoaWdoUmFkaW8uaWQgPSBcImhpZ2hcIjtcbiAgICBoaWdoUmFkaW8ubmFtZSA9IFwicHJpb3JpdHlcIjtcbiAgICBoaWdoUmFkaW8udmFsdWUgPSBcImhpZ2hcIjtcbiAgICBub3JtYWxSYWRpby5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBoaWdoUmFkaW9MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBoaWdoUmFkaW9MYWJlbC5mb3IgPSBcImhpZ2hcIjtcbiAgICBoaWdoUmFkaW9MYWJlbC50ZXh0Q29udGVudCA9IFwiSGlnaFwiO1xuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwuZm9yID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwudGV4dENvbnRlbnQgPSBcIlByb2plY3Q6XCJcblxuICAgIGNvbnN0IGFzc2lnblRvUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3QubmFtZSA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdC5pZCA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdC5wbGFjZWhvbGRlciA9IFwiT3B0aW9uYWxcIlxuICAgIGFzc2lnblRvUHJvamVjdC5zZXRBdHRyaWJ1dGUoXCJsaXN0XCIsIFwicHJvamVjdC1saXN0XCIpO1xuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGF0YWxpc3RcIik7XG4gICAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuaWQgPSBcInByb2plY3QtbGlzdFwiO1xuICAgXG4gICAgYXJyYXlPZlByb2plY3ROYW1lcy5mb3JFYWNoKCAoZW50cnkpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuICAgICAgICBvcHRpb24udmFsdWUgPSBlbnRyeTtcbiAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gZW50cnk7IFxuICAgICAgICBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdC5hcHBlbmQob3B0aW9uKTtcbiAgICB9KVxuXG4gICAgYXNzaWduVG9Qcm9qZWN0LmFwcGVuZChhc3NpZ25Ub1Byb2plY3REYXRhTGlzdCk7XG5cbiAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHN1Ym1pdEJ0bi50eXBlID0gXCJzdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4uaWQgPSBcIm1vZGFsLXN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi52YWx1ZSA9IFwiU3VibWl0XCI7XG4gICAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gXCJTdWJtaXRcIjtcblxuICAgIG9wdGlvbjEuYXBwZW5kKG5vcm1hbFJhZGlvLCBub3JtYWxSYWRpb0xhYmVsKTtcbiAgICBvcHRpb24yLmFwcGVuZChoaWdoUmFkaW8sIGhpZ2hSYWRpb0xhYmVsKTtcbiAgICBwcmlvcml0eU9wdGlvbnMuYXBwZW5kKG9wdGlvbjEsIG9wdGlvbjIpO1xuICAgIHRhc2tGb3JtLmFwcGVuZChcbiAgICAgICAgZW1wdHlEaXYsIFxuICAgICAgICBjbG9zZU1vZGFsQnV0dG9uLCBcbiAgICAgICAgbGFiZWxGb3JUYXNrQ29udGVudCwgXG4gICAgICAgIHRhc2tDb250ZW50LCBcbiAgICAgICAgbGFiZWxGb3JEYXRlLCBcbiAgICAgICAgZGF0ZSwgXG4gICAgICAgIHByaW9yaXR5VGl0bGUsIFxuICAgICAgICBwcmlvcml0eU9wdGlvbnMsIFxuICAgICAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbCwgXG4gICAgICAgIGFzc2lnblRvUHJvamVjdCxcbiAgICAgICAgc3VibWl0QnRuKTtcbiAgICBhZGRUYXNrTW9kYWxDb250ZW50LmFwcGVuZCh0YXNrRm9ybSk7XG4gICAgYWRkVGFza01vZGFsLmFwcGVuZChhZGRUYXNrTW9kYWxDb250ZW50KTtcbiAgICBzb21lRGl2LmFwcGVuZChhZGRUYXNrTW9kYWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2lkZUJhcihzb21lRGl2LCBtYXN0ZXJMaXN0LCBhcnJheU9mUHJvamVjdE5hbWVzKSB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZWJhclwiKSkge1xuICAgICAgICBjb25zdCBkZWxldGVUaGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyXCIpO1xuICAgICAgICBkZWxldGVUaGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZGVsZXRlVGhpcyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2lkZWJhclNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgICBzaWRlYmFyU2VjdGlvbi5pZCA9ICdzaWRlYmFyJztcbiAgICBjb25zdCBsaXN0QnlUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBjb25zdCBsaXN0SXRlbTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW0xQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW0xQW5jaG9yLmlkID0gJ3RvZGF5cy10YXNrcyc7XG4gICAgaXRlbTFBbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtMUFuY2hvci50ZXh0Q29udGVudCA9IFwiVG9kYXlcIjtcblxuICAgIGxpc3RJdGVtMS5hcHBlbmQoaXRlbTFBbmNob3IpO1xuXG4gICAgY29uc3QgbGlzdEl0ZW0yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBpdGVtMkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpdGVtMkFuY2hvci5pZCA9ICd0aGlzLXdlZWsnO1xuICAgIGl0ZW0yQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgaXRlbTJBbmNob3IudGV4dENvbnRlbnQgPSBcIlRoaXMgV2Vla1wiO1xuICAgIGxpc3RJdGVtMi5hcHBlbmQoaXRlbTJBbmNob3IpO1xuICAgIFxuICAgIGNvbnN0IGxpc3RJdGVtMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgaXRlbTNBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaXRlbTNBbmNob3IuaWQgPSAnYWxsLXRhc2tzJztcbiAgICBpdGVtM0FuY2hvci5ocmVmID0gJyMnO1xuICAgIGl0ZW0zQW5jaG9yLnRleHRDb250ZW50ID0gXCJBbGxcIjtcbiAgICBsaXN0SXRlbTMuYXBwZW5kKGl0ZW0zQW5jaG9yKTtcblxuICAgIGxpc3RCeVRpbWUuYXBwZW5kKGxpc3RJdGVtMSwgbGlzdEl0ZW0yLCBsaXN0SXRlbTMpO1xuXG4gICAgY29uc3QgbGlzdEJ5UHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cbiAgICBjb25zdCBtYWtlTGluayA9IGZ1bmN0aW9uKG5hbWUsIGRpdikge1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGNvbnN0IGl0ZW1BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGl0ZW1BbmNob3IuaWQgPSBuYW1lO1xuICAgICAgICBpdGVtQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgICAgIGl0ZW1BbmNob3IudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgICBsaXN0SXRlbS5hcHBlbmQoaXRlbUFuY2hvcik7XG4gICAgICAgIGRpdi5hcHBlbmQobGlzdEl0ZW0pO1xuICAgIH1cbiAgICBpZiAoYXJyYXlPZlByb2plY3ROYW1lcyl7XG4gICAgICAgIGFycmF5T2ZQcm9qZWN0TmFtZXMuZm9yRWFjaChmdW5jdGlvbihhKXsgbWFrZUxpbmsoYSwgbGlzdEJ5UHJvamVjdCkgfSApO1xuICAgIH1cbiAgICBzaWRlYmFyU2VjdGlvbi5hcHBlbmQobGlzdEJ5VGltZSwgbGlzdEJ5UHJvamVjdCk7XG4gICAgc29tZURpdi5hcHBlbmQoc2lkZWJhclNlY3Rpb24pOyAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVySGVhZGVyKHNvbWVEaXYpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGFkZFRhc2tCdG4uaWQgPSBcImFkZC1hLXRhc2tcIjtcbiAgICBhZGRUYXNrQnRuLnRleHRDb250ZW50ID0gXCJBZGQgVGFza1wiO1xuICAgIGhlYWRlci5hcHBlbmQoYWRkVGFza0J0bik7XG4gICAgc29tZURpdi5wcmVwZW5kKGhlYWRlcik7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0IHsgbWFzdGVyTGlzdCB9IGZyb20gXCIuL21hc3Rlckxpc3RcIjtcbmltcG9ydCB7IHJlbmRlck1haW4gfSBmcm9tIFwiLi9yZW5kZXJcIjtcbmltcG9ydCB7IGN1cnJlbnRTZXR0aW5ncyB9IGZyb20gXCIuL2N1cnJlbnRTZXR0aW5nc1wiO1xuXG5cbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG5cbi8vIENvbnN0cnVjdG9yIHRvIG1ha2UgdGFzayBvYmplY3RzXG5leHBvcnQgY2xhc3MgVGFzayB7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRlLCBjb250ZW50LCBwcmlvcml0eSkgeyBcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMDAwMDApO1xuICAgIH1cblxuICAgIG1hcmtEb25lKCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaHRtbEZvcm1hdCgpIHtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICBjaGVja2JveC5uYW1lID0gXCJuYW1lXCI7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0aGlzLmNvbXBsZXRlZDtcbiAgICAgICAgY2hlY2tib3guaWQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgXG4gICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFzay1uYW1lJyk7XG4gICAgICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGhpcy5jb250ZW50O1xuXG4gICAgICAgIGNvbnN0IHRhc2tEdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0YXNrRHVlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZHVlLWRhdGUnKTtcbiAgICAgICAgdGFza0R1ZS50ZXh0Q29udGVudCA9IGBEdWU6ICR7dGhpcy5kYXRlLnRvTG9jYWxlU3RyaW5nKCdkZWZhdWx0Jywge3dlZWtkYXk6ICdzaG9ydCcgfSl9LFxuICAgICAgICAgICAkeyB0aGlzLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7IG1vbnRoOiAnc2hvcnQnIH0pfS4gXG4gICAgICAgICAgICAkeyB0aGlzLmRhdGUuZ2V0RGF0ZSgpfSBgICBcbiAgICBcbiAgICAgICAgY29uc3QgZWRpdFRhc2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlVGFzayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB0aGlzVGFzayA9IG1hc3Rlckxpc3QuZGF0YS5maWx0ZXIoICh0KSA9PiB0LmlkID09IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzVGFza1swXSk7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0LnJlbW92ZVRhc2sodGhpc1Rhc2tbMF0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgICAgICAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdlZGl0JztcbiAgICAgICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdFRhc2spO1xuICAgIFxuICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgICAgICAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gJ3JlbW92ZSc7XG4gICAgICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVtb3ZlVGFzayk7XG4gICAgXG4gICAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgICAgICAgY2FyZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0aGlzLmlkKTtcbiAgICAgICAgaWYgKHRoaXMucHJpb3JpdHkgPT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2ltcG9ydGFudCcpO1xuICAgICAgICB9IFxuICAgICAgICBjYXJkLmFwcGVuZChjaGVja2JveCwgdGFza05hbWUsIHRhc2tEdWUsIGVkaXRCdG4sIHJlbW92ZUJ0bik7XG4gICAgICAgIHJldHVybiAoY2FyZClcbiAgICB9IFxufTtcblxuXG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHsgcHJlcGFyZURPTSwgYWRkU2lkZUJhckV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgeyBtYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyQWRkVGFza01vZGFsLCByZW5kZXJTaWRlQmFyLCByZW5kZXJIZWFkZXIgfSBmcm9tIFwiLi9yZW5kZXJcIjtcbmltcG9ydCB7IGN1cnJlbnRTZXR0aW5ncyB9IGZyb20gXCIuL2N1cnJlbnRTZXR0aW5nc1wiO1xuXG5cbi8vICAjIyMjIyMjIyMjIyAgICAgU2FtcGxlIHRhc2tzIHRvIHRlc3QgdGhlIGFwcCAgICAgIyMjIyMjIyMjIyMgXG5cbmNvbnN0IHNhbXBsZVRhc2sgPSBuZXcgVGFzayggJzIwMjItMDktMjMnLCAnRmluaXNoIE9kaW4gUHJvamVjdCcsICdub3JtYWwnICk7XG5zYW1wbGVUYXNrLmNvbXBsZXRlZCA9IHRydWU7XG5jb25zdCBzYW1wbGVUYXNrMiA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdQcmFjdGljZSBLdW5nIGZ1JywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrMyA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yNicsICdDb29rIGEgcGllJywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s0ID0gbmV3IFRhc2soICcyMDIyLTA5LTI2JywgJ1NsZWVwJywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrNSA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yOCcsICdMZWFybiBSdWJ5JywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s2ID0gbmV3IFRhc2soICcyMDIyLTA5LTI3JywgJ0NvZGUgVGV0cmlzJywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrNyA9IG5ldyBUYXNrKCAnMjAyMi0xMC0wMScsICdSZWN5Y2xlJywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrOCA9IG5ldyBUYXNrKCAnMjAyMi0xMC0wMicsICdTd2ltJywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s5ID0gbmV3IFRhc2soICcyMDIyLTEwLTIzJywgJ0VhdCcsICdoaWdoJyApO1xuXG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzayk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazIpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2szKTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNCk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazUpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s2KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNyk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazgpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s5KTtcbm1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuXG5cbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzaywgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s1LCAncHJvamVjdCcsICdDb2RpbmcnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazYsICdwcm9qZWN0JywgJ0NvZGluZycpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrMywgJ2NvbXBsZXRlZCcsICd0cnVlJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s4LCAncHJvamVjdCcsICdIZWFsdGgnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazksICdwcm9qZWN0JywgJ0hlYWx0aCcpO1xuXG4vLyAqKioqKioqKioqKioqKipcblxuXG4vLyBDYWNoZSBET00gYW5kIHJlbmRlciBlYWNoIHNlY3Rpb25cbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbmNvbnN0IGFkZERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9yLWFkZC10YXNrLW1vZGFsXCIpO1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG5yZW5kZXJIZWFkZXIoYm9keSk7XG5yZW5kZXJTaWRlQmFyKGJvZHksIG1hc3Rlckxpc3QsIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG5yZW5kZXJBZGRUYXNrTW9kYWwoYm9keSwgbWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTtcbnJlbmRlck1haW4obWFzdGVyTGlzdCwgbWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG5cbi8vIEFkZCBldmVudGxpc3RlbmVycyB0byBoZWFkZXIgYW5kIG1vZGFsXG5wcmVwYXJlRE9NKCk7XG5hZGRTaWRlQmFyRXZlbnRMaXN0ZW5lcnMoIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG5cblxuXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==