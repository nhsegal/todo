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
/* harmony export */   "prepareDOM": () => (/* binding */ prepareDOM)
/* harmony export */ });
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");




 


function prepareDOM (){
    // Cache the DOM
    const addTaskBtn = document.querySelector("#add-a-task");
    const addTaskModal = document.querySelector("#add-a-task-modal");
    const closeModalButton = document.querySelector("#close-modal-button");
    const modalSubmitButton = document.querySelector("#modal-submit");
    const newTaskContent = document.querySelector("#task-content");
    const newTaskDate = document.querySelector("#date");
    const newTaskPriority = document.querySelectorAll('input[name=priority]');
    const newTaskProject = document.querySelector('#project');
    const main = document.querySelector('main');
    const body = document.querySelector('body');

    // Arrays for events
    const taskList = [];

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
    modalSubmitButton.addEventListener("click", taskSubmit);
    return 'done'
   
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
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");

;

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
    //sidebarSection.textContent = "Upcoming Tasks";
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
            console.log(e.target);
        }
    
        const editBtn = document.createElement("button");
        editBtn.classList.add('edit-task');
        editBtn.textContent = 'edit';
        editBtn.addEventListener("click", editTask);
    
        const removeBtn = document.createElement("button");
        removeBtn.classList.add('remove-task');
        removeBtn.textContent = 'remove';
    
        const card = document.createElement("div");
        card.classList.add('card');
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

// Add eventlisteners to sidebar
const addSideBarEventListeners = (listOfProjects) => {
    try {
        const todaysTasks = document.querySelector("#todays-tasks");
        todaysTasks.addEventListener("click", function(){
        _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.update('today', null);
        (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.whichProject)});

        const weeksTasks = document.querySelector("#this-week");
        weeksTasks.addEventListener("click", function(){
        _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.update('this-week', null);
        (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.whichProject)});

        const allTasks = document.querySelector("#all-tasks");
        allTasks.addEventListener("click", function(){
        _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.update('all', null);
        (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.whichProject)});
       
        console.log(listOfProjects);
        listOfProjects.forEach(    (item) => { 
                                            const el =document.getElementById(item);
                                            el.addEventListener('click', () => {
                                                _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.update('byProject', el.id);
                                                (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_2__.masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.whichProject);
                                            })
         } );
    }
    catch {
        console.log('failed');
    }
};

addSideBarEventListeners( _masterList__WEBPACK_IMPORTED_MODULE_2__.masterList.getListOfProjects());








})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFZOztBQUVMO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWGE7O0FBRTZCO0FBQ1c7QUFDdEI7QUFDcUI7O0FBRTdDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdDQUFJO0FBQ2hDLFFBQVEsMkRBQWtCO0FBQzFCLFFBQVEsOERBQXFCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQVUsQ0FBQyxtREFBVSxRQUFRLG9FQUFzQixFQUFFLDBFQUE0QjtBQUN6RixRQUFRLHNEQUFhLE9BQU8sbURBQVUsRUFBRSxxRUFBNEI7QUFDcEU7O0FBRUE7QUFDQSxpREFBaUQseUNBQXlDO0FBQzFGLHVEQUF1RCx5Q0FBeUM7QUFDaEc7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3BEYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoREs7QUFDWixDQUFvRDs7QUFFN0M7QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isd0JBQXdCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCO0FBQ3BEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpREFBaUQsNkJBQTZCO0FBQzlFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyU2E7O0FBRWI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0MscUNBQXFDLGtCQUFrQixFQUFFO0FBQy9GLGNBQWMsc0NBQXNDLGdCQUFnQixFQUFFO0FBQ3RFLGVBQWUscUJBQXFCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7O1VDMURBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWtCO0FBQ0k7QUFDTztBQUM2QztBQUNuQzs7O0FBR3BEOztBQUVBLHVCQUF1Qix3Q0FBSTtBQUMzQjtBQUNBLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7O0FBRTVCLDJEQUFrQjtBQUNsQiwyREFBa0I7QUFDbEIsMkRBQWtCO0FBQ2xCLDJEQUFrQjtBQUNsQiwyREFBa0I7QUFDbEIsMkRBQWtCO0FBQ2xCLDJEQUFrQjtBQUNsQiwyREFBa0I7QUFDbEIsMkRBQWtCO0FBQ2xCLDhEQUFxQjs7O0FBR3JCLDREQUFtQjtBQUNuQiw0REFBbUI7QUFDbkIsNERBQW1CO0FBQ25CLDREQUFtQjtBQUNuQiw0REFBbUI7QUFDbkIsNERBQW1COztBQUVuQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscURBQVk7QUFDWixzREFBYSxPQUFPLG1EQUFVLEVBQUUscUVBQTRCO0FBQzVELDJEQUFrQixPQUFPLHFFQUE0QjtBQUNyRCxtREFBVSxDQUFDLG1EQUFVLFFBQVEsb0VBQXNCLEVBQUUsMEVBQTRCOztBQUVqRjtBQUNBLGdEQUFVOztBQUVWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9FQUFzQjtBQUM5QixRQUFRLG1EQUFVLENBQUMsbURBQVUsUUFBUSxvRUFBc0IsRUFBRSwwRUFBNEIsRUFBRTs7QUFFM0Y7QUFDQTtBQUNBLFFBQVEsb0VBQXNCO0FBQzlCLFFBQVEsbURBQVUsQ0FBQyxtREFBVSxRQUFRLG9FQUFzQixFQUFFLDBFQUE0QixFQUFFOztBQUUzRjtBQUNBO0FBQ0EsUUFBUSxvRUFBc0I7QUFDOUIsUUFBUSxtREFBVSxDQUFDLG1EQUFVLFFBQVEsb0VBQXNCLEVBQUUsMEVBQTRCLEVBQUU7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxvRUFBc0I7QUFDdEUsZ0RBQWdELG1EQUFVLENBQUMsbURBQVUsUUFBUSxvRUFBc0IsRUFBRSwwRUFBNEI7QUFDakksNkNBQTZDO0FBQzdDLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixxRUFBNEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2N1cnJlbnRTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL21hc3Rlckxpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNvbnN0IGN1cnJlbnRTZXR0aW5ncyA9IHtcbiAgICB2aWV3Qnk6ICdhbGwnLFxuICAgIHdoaWNoUHJvamVjdDogbnVsbCxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24obmV3Vmlldywgd2hpY2hQID0gbnVsbCkge1xuICAgICAgICB0aGlzLnZpZXdCeSA9IG5ld1ZpZXc7XG4gICAgICAgIHRoaXMud2hpY2hQcm9qZWN0ID0gd2hpY2hQO1xuICAgIH1cblxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBtYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyU2lkZUJhciB9IGZyb20gXCIuL3JlbmRlclwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7IFxuaW1wb3J0IHsgY3VycmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY3VycmVudFNldHRpbmdzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlRE9NICgpe1xuICAgIC8vIENhY2hlIHRoZSBET01cbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYS10YXNrXCIpO1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFzay1tb2RhbFwiKTtcbiAgICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbG9zZS1tb2RhbC1idXR0b25cIik7XG4gICAgY29uc3QgbW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsLXN1Ym1pdFwiKTtcbiAgICBjb25zdCBuZXdUYXNrQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1jb250ZW50XCIpO1xuICAgIGNvbnN0IG5ld1Rhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpO1xuICAgIGNvbnN0IG5ld1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9cHJpb3JpdHldJyk7XG4gICAgY29uc3QgbmV3VGFza1Byb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgIC8vIEFycmF5cyBmb3IgZXZlbnRzXG4gICAgY29uc3QgdGFza0xpc3QgPSBbXTtcblxuICAgIC8vIENhbGxiYWNrIGZvciBjcmVhdGUgdGFzayBzdWJtaXRcbiAgICBjb25zdCB0YXNrU3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuICAgICAgICBsZXQgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBuZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayggbmV3VGFza0RhdGUudmFsdWUsIG5ld1Rhc2tDb250ZW50LnZhbHVlLCBuZXdUYXNrUHJpb3JpdHlWYWx1ZSwgbmV3VGFza1Byb2plY3QudmFsdWUpO1xuICAgICAgICBtYXN0ZXJMaXN0LmFkZFRhc2sobmV3VGFzayk7XG4gICAgICAgIG1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuICAgICAgICBuZXdUYXNrQ29udGVudC52YWx1ZSA9IG51bGw7XG4gICAgICAgIG5ld1Rhc2tEYXRlLnZhbHVlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgbmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG51bGw7ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgbmV3VGFza1Byb2plY3QudmFsdWUgPSBudWxsO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICByZW5kZXJTaWRlQmFyKGJvZHksIG1hc3Rlckxpc3QsIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGV2ZW50bGlzdGVuZXJzXG4gICAgYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKSB9KTtcbiAgICBjbG9zZU1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpIH0pO1xuICAgIG1vZGFsU3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrU3VibWl0KTtcbiAgICByZXR1cm4gJ2RvbmUnXG4gICBcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBUaGVyZSBzaG91bGQgb25seSBiZSBvbmUgbWFzdGVyIGxpc3RcbmxldCBpbnN0YW5jZSA9IG51bGw7XG5cbi8vIENvbnN0cnVjdG9yIHRvIG1ha2UgdGFzayBvYmplY3RzXG5jbGFzcyBNYXN0ZXJMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbiBvbmx5IGNyZWF0ZSBvbmUgaW5zdGFuY2UhXCIpO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgfVxuXG4gICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIHJlbW92ZVRhc2sodGFzaykge1xuICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKHRoaXMuZGF0YS5pbmRleE9mKHRhc2spLCAxKTtcbiAgICB9XG5cbiAgICBlZGl0VGFzayh0YXNrLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGF0YVt0aGlzLmRhdGEuaW5kZXhPZih0YXNrKV1bYXR0cmlidXRlXSA9IHZhbHVlOyBcbiAgICB9XG5cbiAgICBzb3J0QnlEYXRlKCkge1xuICAgICAgICB0aGlzLmRhdGEuc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgIH1cblxuICAgIHByb2R1Y2VQcm9qZWN0TGlzdChwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gdGhpcy5kYXRhLmZpbHRlciggKHRhc2spID0+IHRhc2sucHJvamVjdCA9PSBwcm9qZWN0KTtcbiAgICAgICAgcHJvamVjdExpc3Quc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgICAgICByZXR1cm4gcHJvamVjdExpc3Q7XG4gICAgfVxuXG4gICAgZ2V0TGlzdE9mUHJvamVjdHMoKSB7XG4gICAgICAgIGNvbnN0IGFsbFByb2plY3RzID0gW107XG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCAodGFzayk9PiB7XG4gICAgICAgICAgICBpZiAodGFzay5wcm9qZWN0ICE9IG51bGwgJiYgIWFsbFByb2plY3RzLnNvbWUoKGEpPT4gYT09PXRhc2sucHJvamVjdCkpe1xuICAgICAgICAgICAgICAgIGFsbFByb2plY3RzLnB1c2godGFzay5wcm9qZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAgKVxuICAgICAgICByZXR1cm4gYWxsUHJvamVjdHM7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0OyIsIlwidXNlIHN0cmljdFwiXG5pbXBvcnQgeyBjdXJyZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jdXJyZW50U2V0dGluZ3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1haW4obWFzdGVyTGlzdCwgbWFpbiwgb3B0aW9uLCBieVByb2plY3ROYW1lID0gbnVsbCkge1xuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgbGV0IHRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xuICAgIHRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMSk7XG5cbiAgICBsZXQgd2Vla0Zyb21Ub2RheT0gbmV3IERhdGUodG9kYXkpO1xuICAgIHdlZWtGcm9tVG9kYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA3KTtcblxuICAgIGxldCB0b2RheUdyb3VwID0gbnVsbDtcbiAgICBsZXQgcGFzdER1ZSA9IG51bGw7XG4gICAgbGV0IHdlZWtHcm91cCA9IG51bGw7XG5cbiAgICAvLyBGaXJzdCByZW1vdmUgZXZlcnl0aGluZyBmcm9tIG1haW5cbiAgICB3aGlsZSAobWFpbi5maXJzdENoaWxkKSB7XG4gICAgICAgIG1haW4ucmVtb3ZlQ2hpbGQobWFpbi5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uID09PSAnYnlQcm9qZWN0Jyl7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gbWFzdGVyTGlzdC5wcm9kdWNlUHJvamVjdExpc3QoYnlQcm9qZWN0TmFtZSk7XG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJvamVjdEhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICBwcm9qZWN0SGVhZGluZy50ZXh0Q29udGVudCA9IGJ5UHJvamVjdE5hbWU7XG4gICAgICAgIG1haW4uYXBwZW5kKHByb2plY3RIZWFkaW5nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZiAocHJvamVjdExpc3RbaV0uZGF0ZSA+PSB0b2RheSAmJiBwcm9qZWN0TGlzdFtpXS5kYXRlIDw9IHRvZGF5ICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZGF5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3N1YmhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKHRvZGF5SGVhZGluZyk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUgPiB0b2RheSAmJiB0b2RheUdyb3VwID09IDEpICB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWFpbi5hcHBlbmQocHJvamVjdExpc3RbaV0uaHRtbEZvcm1hdCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hc3Rlckxpc3QuZGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgb3B0aW9uID09PSBcInRvZGF5XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9OyBcblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiBvcHRpb24gPT09IFwidGhpcy13ZWVrXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9OyBcblxuXG4gICAgICAgICAgICAvLyBQYXN0LUR1ZSBVbmRvbmUgQmxvY2tcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8IHRvZGF5ICAmJiBwYXN0RHVlID09IG51bGwgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmNvbXBsZXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBwYXN0RHVlID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXN0RHVlSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgcGFzdER1ZUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHBhc3REdWVIZWFkaW5nLnRleHRDb250ZW50ID0gJ1Bhc3QgRHVlJztcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChwYXN0RHVlSGVhZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICBcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSAmJiBwYXN0RHVlID09IDEpIHtcbiAgICAgICAgICAgICAgICBwYXN0RHVlID0gMjtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRvZGF5IEJsb2NrXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9kYXkgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b21vcnJvdyAmJiB0b2RheUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RheUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93ICYmIHRvZGF5R3JvdXAgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDw9IHdlZWtGcm9tVG9kYXkgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgd2Vla0dyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB3ZWVrR3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdlZWtIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB3ZWVrSGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgd2Vla0hlYWRpbmcudGV4dENvbnRlbnQgPSAnVGhpcyBXZWVrJztcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCh3ZWVrSGVhZGluZyk7XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPiB3ZWVrRnJvbVRvZGF5ICYmIHdlZWtHcm91cCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgd2Vla0dyb3VwID0gMjtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9OyBcblxuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICgobWFzdGVyTGlzdC5kYXRhW2ldLmNvbXBsZXRlZCA9PT0gZmFsc2UgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b2RheSkgfHwgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9kYXkpe1xuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKG1hc3Rlckxpc3QuZGF0YVtpXS5odG1sRm9ybWF0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFkZFRhc2tNb2RhbChzb21lRGl2LCBhcnJheU9mUHJvamVjdE5hbWVzKSB7XG4gICAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcbiAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnY2xvc2VkJyk7XG4gICAgYWRkVGFza01vZGFsLmlkID0gJ2FkZC1hLXRhc2stbW9kYWwnO1xuXG4gICAgY29uc3QgYWRkVGFza01vZGFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWRkVGFza01vZGFsQ29udGVudC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250ZW50Jyk7XG4gICAgXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICB0YXNrRm9ybS5pZCA9ICd0YXNrLWZvcm0nO1xuICAgIFxuICAgIGNvbnN0IGVtcHR5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlkID0gJ2Nsb3NlLW1vZGFsLWJ1dHRvbic7XG5cbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlubmVySFRNTCA9ICcmdGltZXMnO1xuICAgIFxuICAgIGNvbnN0IGxhYmVsRm9yVGFza0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWxGb3JUYXNrQ29udGVudC5mb3IgPSAndGFzay1jb250ZW50JztcbiAgICBsYWJlbEZvclRhc2tDb250ZW50LnRleHRDb250ZW50ID0gJ1Rhc2s6J1xuICAgIFxuICAgIGNvbnN0IHRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHRhc2tDb250ZW50LnR5cGUgPSAndGV4dCc7XG4gICAgdGFza0NvbnRlbnQuaWQgPSAndGFzay1jb250ZW50JztcbiAgICB0YXNrQ29udGVudC5uYW1lID0gJ3Rhc2stY29udGVudCc7XG4gICAgdGFza0NvbnRlbnQucGxhY2Vob2xkZXIgPSAnRW50ZXIgVGFzayc7XG4gICAgdGFza0NvbnRlbnQucmVxdWlyZWQgPSB0cnVlO1xuICAgIFxuICAgIGNvbnN0IGxhYmVsRm9yRGF0ZT0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsRm9yRGF0ZS5mb3IgPSAnZGF0ZSc7XG4gICAgbGFiZWxGb3JEYXRlLnRleHRDb250ZW50ID0gJ0R1ZTonO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBkYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgZGF0ZS5pZCA9ICdkYXRlJztcbiAgICBkYXRlLm5hbWUgPSAnZGF0ZSc7XG4gICAgZGF0ZS5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBwcmlvcml0eVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eVRpdGxlLnRleHRDb250ZW50ID0gJ1ByaW9yaXR5Oic7XG5cbiAgICBjb25zdCBwcmlvcml0eU9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5pZCA9ICdwcmlvcml0eS1vcHRpb25zJztcblxuICAgIGNvbnN0IG9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG5vcm1hbFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIG5vcm1hbFJhZGlvLnR5cGUgPSBcInJhZGlvXCI7XG4gICAgbm9ybWFsUmFkaW8uaWQgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLm5hbWUgPSBcInByaW9yaXR5XCI7XG4gICAgbm9ybWFsUmFkaW8udmFsdWUgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IG5vcm1hbFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbm9ybWFsUmFkaW9MYWJlbC5mb3IgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvTGFiZWwudGV4dENvbnRlbnQgPSBcIk5vcm1hbFwiO1xuXG4gICAgY29uc3Qgb3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgaGlnaFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGhpZ2hSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgIGhpZ2hSYWRpby5pZCA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpby5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgIGhpZ2hSYWRpby52YWx1ZSA9IFwiaGlnaFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGhpZ2hSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGhpZ2hSYWRpb0xhYmVsLmZvciA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gXCJIaWdoXCI7XG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbC5mb3IgPSBcInByb2plY3RcIjtcbiAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbC50ZXh0Q29udGVudCA9IFwiUHJvamVjdDpcIlxuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGFzc2lnblRvUHJvamVjdC5uYW1lID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0LmlkID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0LnBsYWNlaG9sZGVyID0gXCJPcHRpb25hbFwiXG4gICAgYXNzaWduVG9Qcm9qZWN0LnNldEF0dHJpYnV0ZShcImxpc3RcIiwgXCJwcm9qZWN0LWxpc3RcIik7XG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkYXRhbGlzdFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdC5pZCA9IFwicHJvamVjdC1saXN0XCI7XG4gICBcbiAgICBhcnJheU9mUHJvamVjdE5hbWVzLmZvckVhY2goIChlbnRyeSkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGVudHJ5O1xuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBlbnRyeTsgXG4gICAgICAgIGFzc2lnblRvUHJvamVjdERhdGFMaXN0LmFwcGVuZChvcHRpb24pO1xuICAgIH0pXG5cbiAgICBhc3NpZ25Ub1Byb2plY3QuYXBwZW5kKGFzc2lnblRvUHJvamVjdERhdGFMaXN0KTtcblxuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc3VibWl0QnRuLnR5cGUgPSBcInN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi5pZCA9IFwibW9kYWwtc3VibWl0XCI7XG4gICAgc3VibWl0QnRuLnZhbHVlID0gXCJTdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xuXG4gICAgb3B0aW9uMS5hcHBlbmQobm9ybWFsUmFkaW8sIG5vcm1hbFJhZGlvTGFiZWwpO1xuICAgIG9wdGlvbjIuYXBwZW5kKGhpZ2hSYWRpbywgaGlnaFJhZGlvTGFiZWwpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5hcHBlbmQob3B0aW9uMSwgb3B0aW9uMik7XG4gICAgdGFza0Zvcm0uYXBwZW5kKFxuICAgICAgICBlbXB0eURpdiwgXG4gICAgICAgIGNsb3NlTW9kYWxCdXR0b24sIFxuICAgICAgICBsYWJlbEZvclRhc2tDb250ZW50LCBcbiAgICAgICAgdGFza0NvbnRlbnQsIFxuICAgICAgICBsYWJlbEZvckRhdGUsIFxuICAgICAgICBkYXRlLCBcbiAgICAgICAgcHJpb3JpdHlUaXRsZSwgXG4gICAgICAgIHByaW9yaXR5T3B0aW9ucywgXG4gICAgICAgIGFzc2lnblRvUHJvamVjdExhYmVsLCBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0LFxuICAgICAgICBzdWJtaXRCdG4pO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuYXBwZW5kKHRhc2tGb3JtKTtcbiAgICBhZGRUYXNrTW9kYWwuYXBwZW5kKGFkZFRhc2tNb2RhbENvbnRlbnQpO1xuICAgIHNvbWVEaXYuYXBwZW5kKGFkZFRhc2tNb2RhbCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNpZGVCYXIoc29tZURpdiwgbWFzdGVyTGlzdCwgYXJyYXlPZlByb2plY3ROYW1lcykge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NpZGViYXJcIikpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlVGhpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZWJhclwiKTtcbiAgICAgICAgZGVsZXRlVGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRlbGV0ZVRoaXMpO1xuICAgIH1cblxuICAgIGNvbnN0IHNpZGViYXJTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgc2lkZWJhclNlY3Rpb24uaWQgPSAnc2lkZWJhcic7XG4gICAgLy9zaWRlYmFyU2VjdGlvbi50ZXh0Q29udGVudCA9IFwiVXBjb21pbmcgVGFza3NcIjtcbiAgICBjb25zdCBsaXN0QnlUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBjb25zdCBsaXN0SXRlbTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW0xQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW0xQW5jaG9yLmlkID0gJ3RvZGF5cy10YXNrcyc7XG4gICAgaXRlbTFBbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtMUFuY2hvci50ZXh0Q29udGVudCA9IFwiVG9kYXlcIjtcblxuXG5cbiAgICBsaXN0SXRlbTEuYXBwZW5kKGl0ZW0xQW5jaG9yKTtcblxuICAgIGNvbnN0IGxpc3RJdGVtMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgaXRlbTJBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaXRlbTJBbmNob3IuaWQgPSAndGhpcy13ZWVrJztcbiAgICBpdGVtMkFuY2hvci5ocmVmID0gJyMnO1xuICAgIGl0ZW0yQW5jaG9yLnRleHRDb250ZW50ID0gXCJUaGlzIFdlZWtcIjtcbiAgICBsaXN0SXRlbTIuYXBwZW5kKGl0ZW0yQW5jaG9yKTtcbiAgICBcbiAgICBjb25zdCBsaXN0SXRlbTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW0zQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW0zQW5jaG9yLmlkID0gJ2FsbC10YXNrcyc7XG4gICAgaXRlbTNBbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtM0FuY2hvci50ZXh0Q29udGVudCA9IFwiQWxsXCI7XG4gICAgbGlzdEl0ZW0zLmFwcGVuZChpdGVtM0FuY2hvcik7XG5cbiAgICBsaXN0QnlUaW1lLmFwcGVuZChsaXN0SXRlbTEsIGxpc3RJdGVtMiwgbGlzdEl0ZW0zKTtcblxuICAgIGNvbnN0IGxpc3RCeVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuXG4gICAgY29uc3QgbWFrZUxpbmsgPSBmdW5jdGlvbihuYW1lLCBkaXYpIHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBjb25zdCBpdGVtQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBpdGVtQW5jaG9yLmlkID0gbmFtZTtcbiAgICAgICAgaXRlbUFuY2hvci5ocmVmID0gJyMnO1xuICAgICAgICBpdGVtQW5jaG9yLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kKGl0ZW1BbmNob3IpO1xuICAgICAgICBkaXYuYXBwZW5kKGxpc3RJdGVtKTtcbiAgICB9XG5cbiAgIFxuICAgIGlmIChhcnJheU9mUHJvamVjdE5hbWVzKXtcbiAgICAgICAgYXJyYXlPZlByb2plY3ROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGEpeyBtYWtlTGluayhhLCBsaXN0QnlQcm9qZWN0KSB9ICk7XG4gICAgfVxuICAgIHNpZGViYXJTZWN0aW9uLmFwcGVuZChsaXN0QnlUaW1lLCBsaXN0QnlQcm9qZWN0KTtcbiAgICBzb21lRGl2LmFwcGVuZChzaWRlYmFyU2VjdGlvbik7XG5cbiAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVySGVhZGVyKHNvbWVEaXYpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGFkZFRhc2tCdG4uaWQgPSBcImFkZC1hLXRhc2tcIjtcbiAgICBhZGRUYXNrQnRuLnRleHRDb250ZW50ID0gXCJBZGQgVGFza1wiO1xuICAgIGhlYWRlci5hcHBlbmQoYWRkVGFza0J0bik7XG4gICAgc29tZURpdi5wcmVwZW5kKGhlYWRlcik7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuZXhwb3J0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKGRhdGUsIGNvbnRlbnQsIHByaW9yaXR5KSB7IFxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLnByb2plY3QgPSBudWxsO1xuICAgICAgICB0aGlzLmlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwMDAwMCk7XG4gICAgfVxuXG4gICAgbWFya0RvbmUoKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBodG1sRm9ybWF0KCkge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBcIm5hbWVcIjtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRoaXMuY29tcGxldGVkO1xuICAgICAgICBjaGVja2JveC5pZCA9IHRoaXMuY29udGVudDtcbiAgICBcbiAgICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKCd0YXNrLW5hbWUnKTtcbiAgICAgICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0aGlzLmNvbnRlbnQ7XG5cbiAgICAgICAgY29uc3QgdGFza0R1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRhc2tEdWUuY2xhc3NMaXN0LmFkZCgndGFzay1kdWUtZGF0ZScpO1xuICAgICAgICB0YXNrRHVlLnRleHRDb250ZW50ID0gYER1ZTogJHt0aGlzLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7d2Vla2RheTogJ3Nob3J0JyB9KX0sXG4gICAgICAgICAgICR7IHRoaXMuZGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHsgbW9udGg6ICdzaG9ydCcgfSl9LiBcbiAgICAgICAgICAgICR7IHRoaXMuZGF0ZS5nZXREYXRlKCl9IGAgIFxuICAgIFxuICAgICAgICBjb25zdCBlZGl0VGFzayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgICAgICAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdlZGl0JztcbiAgICAgICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdFRhc2spO1xuICAgIFxuICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgICAgICAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gJ3JlbW92ZSc7XG4gICAgXG4gICAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgICAgICAgaWYgKHRoaXMucHJpb3JpdHkgPT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2ltcG9ydGFudCcpO1xuICAgICAgICB9IFxuICAgICAgICBjYXJkLmFwcGVuZChjaGVja2JveCwgdGFza05hbWUsIHRhc2tEdWUsIGVkaXRCdG4sIHJlbW92ZUJ0bik7XG4gICAgICAgIHJldHVybiAoY2FyZClcbiAgICB9XG5cblxuICAgIFxufTtcblxuXG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHsgcHJlcGFyZURPTSB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHsgbWFzdGVyTGlzdCB9IGZyb20gXCIuL21hc3Rlckxpc3RcIjtcbmltcG9ydCB7IHJlbmRlck1haW4sIHJlbmRlckFkZFRhc2tNb2RhbCwgcmVuZGVyU2lkZUJhciwgcmVuZGVySGVhZGVyIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5pbXBvcnQgeyBjdXJyZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jdXJyZW50U2V0dGluZ3NcIjtcblxuXG4vLyAgIyMjIyMjIyMjIyMgICAgIFNhbXBsZSB0YXNrcyB0byB0ZXN0IHRoZSBhcHAgICAgICMjIyMjIyMjIyMjIFxuXG5jb25zdCBzYW1wbGVUYXNrID0gbmV3IFRhc2soICcyMDIyLTA5LTIzJywgJ0ZpbmlzaCBPZGluIFByb2plY3QnLCAnbm9ybWFsJyApO1xuc2FtcGxlVGFzay5jb21wbGV0ZWQgPSB0cnVlO1xuY29uc3Qgc2FtcGxlVGFzazIgPSBuZXcgVGFzayggJzIwMjItMDktMjMnLCAnUHJhY3RpY2UgS3VuZyBmdScsICdoaWdoJyApO1xuY29uc3Qgc2FtcGxlVGFzazMgPSBuZXcgVGFzayggJzIwMjItMDktMjYnLCAnQ29vayBhIHBpZScsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrNCA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yNicsICdTbGVlcCcsICdoaWdoJyApO1xuY29uc3Qgc2FtcGxlVGFzazUgPSBuZXcgVGFzayggJzIwMjItMDktMjgnLCAnTGVhcm4gUnVieScsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrNiA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yNycsICdDb2RlIFRldHJpcycsICdoaWdoJyApO1xuY29uc3Qgc2FtcGxlVGFzazcgPSBuZXcgVGFzayggJzIwMjItMTAtMDEnLCAnUmVjeWNsZScsICdoaWdoJyApO1xuY29uc3Qgc2FtcGxlVGFzazggPSBuZXcgVGFzayggJzIwMjItMTAtMDInLCAnU3dpbScsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrOSA9IG5ldyBUYXNrKCAnMjAyMi0xMC0yMycsICdFYXQnLCAnaGlnaCcgKTtcblxubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2spO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2syKTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMyk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazQpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s1KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNik7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazcpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s4KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrOSk7XG5tYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcblxuXG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2ssICdwcm9qZWN0JywgJ0NvZGluZycpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNSwgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s2LCAncHJvamVjdCcsICdDb2RpbmcnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazMsICdjb21wbGV0ZWQnLCAndHJ1ZScpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrOCwgJ3Byb2plY3QnLCAnSGVhbHRoJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s5LCAncHJvamVjdCcsICdIZWFsdGgnKTtcblxuLy8gKioqKioqKioqKioqKioqXG5cblxuLy8gQ2FjaGUgRE9NIGFuZCByZW5kZXIgZWFjaCBzZWN0aW9uXG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5jb25zdCBhZGREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvci1hZGQtdGFzay1tb2RhbFwiKTtcbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxucmVuZGVySGVhZGVyKGJvZHkpO1xucmVuZGVyU2lkZUJhcihib2R5LCBtYXN0ZXJMaXN0LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xucmVuZGVyQWRkVGFza01vZGFsKGJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG5yZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuXG4vLyBBZGQgZXZlbnRsaXN0ZW5lcnMgdG8gaGVhZGVyIGFuZCBtb2RhbFxucHJlcGFyZURPTSgpO1xuXG4vLyBBZGQgZXZlbnRsaXN0ZW5lcnMgdG8gc2lkZWJhclxuY29uc3QgYWRkU2lkZUJhckV2ZW50TGlzdGVuZXJzID0gKGxpc3RPZlByb2plY3RzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9kYXlzVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZGF5cy10YXNrc1wiKTtcbiAgICAgICAgdG9kYXlzVGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RvZGF5JywgbnVsbCk7XG4gICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgbWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCl9KTtcblxuICAgICAgICBjb25zdCB3ZWVrc1Rhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aGlzLXdlZWtcIik7XG4gICAgICAgIHdlZWtzVGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RoaXMtd2VlaycsIG51bGwpO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpfSk7XG5cbiAgICAgICAgY29uc3QgYWxsVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FsbC10YXNrc1wiKTtcbiAgICAgICAgYWxsVGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2FsbCcsIG51bGwpO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpfSk7XG4gICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKGxpc3RPZlByb2plY3RzKTtcbiAgICAgICAgbGlzdE9mUHJvamVjdHMuZm9yRWFjaCggICAgKGl0ZW0pID0+IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdieVByb2plY3QnLCBlbC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgfSApO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmYWlsZWQnKTtcbiAgICB9XG59O1xuXG5hZGRTaWRlQmFyRXZlbnRMaXN0ZW5lcnMoIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG5cblxuXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==