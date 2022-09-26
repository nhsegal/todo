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




 


function prepareDOM (){
    // Cache the DOM
    const addTaskBtn = document.querySelector("#add-a-task");
    const addTaskModal = document.querySelector("#add-a-task-modal");
    const closeModalButton = document.querySelector("#close-modal-button");
    const modalSubmitButton = document.querySelector("#modal-submit");
    const newTaskContent = document.querySelector("#task-content");
    const newTaskDate = document.querySelector("#date");
    const newTaskPriority = document.querySelectorAll('input[name=priority]');

    // Arrays for events
    const taskList = [];

    // Callback for create task submit
    const taskSubmit = function(e) {
        e.preventDefault();
        let newTaskPriorityValue = null;
        for (const option of newTaskPriority) {
            if (option.checked) {
                newTaskPriorityValue = option.value;
            }
        }
        addTaskModal.classList.toggle("closed");
        const newTask = new _tasks__WEBPACK_IMPORTED_MODULE_2__.Task( newTaskDate.value, newTaskContent.value, newTaskPriorityValue);
        masterList.addTask(newTask);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(masterList, main, currentSettings.viewBy, currentSettings.whichProject);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderSideBar)(body, masterList);
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
/* harmony export */   "MasterList": () => (/* binding */ MasterList)
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
    //const projectOption1 = document.createElement("option");
    //projectOption1.value = "Coding";
    //projectOption1.textContent = "Coding"; 
    //assignToProjectDataList.append(projectOption1);
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

//export function renderSideBar(arrayOfProjectNames)
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

    //How to add By Project?
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








// Create the masterList before building the DOM
const masterList = new _masterList__WEBPACK_IMPORTED_MODULE_2__.MasterList;




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

masterList.addTask(sampleTask);
masterList.addTask(sampleTask2);
masterList.addTask(sampleTask3);
masterList.addTask(sampleTask4);
masterList.addTask(sampleTask5);
masterList.addTask(sampleTask6);
masterList.addTask(sampleTask7);
masterList.addTask(sampleTask8);
masterList.addTask(sampleTask9);
masterList.sortByDate();


masterList.editTask(sampleTask, 'project', 'Coding');
masterList.editTask(sampleTask5, 'project', 'Coding');
masterList.editTask(sampleTask6, 'project', 'Coding');
masterList.editTask(sampleTask3, 'completed', 'true');
masterList.editTask(sampleTask8, 'project', 'Health');
masterList.editTask(sampleTask9, 'project', 'Health');

// ***************


// Cache DOM and render each section
const body = document.querySelector("body");
const addDiv = document.querySelector("#for-add-task-modal");
const main = document.querySelector("main");
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderHeader)(body);
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderSideBar)(body, masterList, masterList.getListOfProjects());
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderAddTaskModal)(body, masterList.getListOfProjects());
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.whichProject);

// Add eventlisteners to header and modal
//prepareDOM();

// Add eventlisteners to sidebar




const addSideBarEventListeners = () => {
    try {
        const todaysTasks = document.querySelector("#todays-tasks");
        todaysTasks.addEventListener("click", function(){
        _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.update('today', null);
        (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.whichProject)});

        const weeksTasks = document.querySelector("#this-week");
        weeksTasks.addEventListener("click", function(){
        _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.update('this-week', null);
        (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.whichProject)});

        const allTasks = document.querySelector("#all-tasks");
        allTasks.addEventListener("click", function(){
        _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.update('all', null);
        (0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(masterList, main, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_4__.currentSettings.whichProject)});
    }
    catch {
        console.log('failed');
    }
};

addSideBarEventListeners();








})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFZOztBQUVMO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYYTs7QUFFNkI7QUFDVztBQUN0Qjs7O0FBR3hCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdDQUFJO0FBQ2hDO0FBQ0EsUUFBUSxtREFBVTtBQUNsQixRQUFRLHNEQUFhO0FBQ3JCOztBQUVBO0FBQ0EsaURBQWlELHlDQUF5QztBQUMxRix1REFBdUQseUNBQXlDO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxQ2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUNZO0FBQ1osQ0FBb0Q7O0FBRTdDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHdCQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDRCQUE0QjtBQUNwRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlEQUFpRCw2QkFBNkI7QUFDOUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3pTYTs7QUFFYjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxxQ0FBcUMsa0JBQWtCLEVBQUU7QUFDL0YsY0FBYyxzQ0FBc0MsZ0JBQWdCLEVBQUU7QUFDdEUsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7VUMxREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOYTs7QUFFa0I7QUFDSTtBQUNPO0FBQzZDO0FBQ25DOztBQUVwRDtBQUNBLHVCQUF1QixtREFBVTs7Ozs7QUFLakM7O0FBRUEsdUJBQXVCLHdDQUFJO0FBQzNCO0FBQ0Esd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBWTtBQUNaLHNEQUFhO0FBQ2IsMkRBQWtCO0FBQ2xCLG1EQUFVLG1CQUFtQixvRUFBc0IsRUFBRSwwRUFBNEI7O0FBRWpGO0FBQ0E7O0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9FQUFzQjtBQUM5QixRQUFRLG1EQUFVLG1CQUFtQixvRUFBc0IsRUFBRSwwRUFBNEIsRUFBRTs7QUFFM0Y7QUFDQTtBQUNBLFFBQVEsb0VBQXNCO0FBQzlCLFFBQVEsbURBQVUsbUJBQW1CLG9FQUFzQixFQUFFLDBFQUE0QixFQUFFOztBQUUzRjtBQUNBO0FBQ0EsUUFBUSxvRUFBc0I7QUFDOUIsUUFBUSxtREFBVSxtQkFBbUIsb0VBQXNCLEVBQUUsMEVBQTRCLEVBQUU7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvY3VycmVudFNldHRpbmdzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvbWFzdGVyTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3JlbmRlci5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgY29uc3QgY3VycmVudFNldHRpbmdzID0ge1xuICAgIHZpZXdCeTogJ2FsbCcsXG4gICAgd2hpY2hQcm9qZWN0OiBudWxsLFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbihuZXdWaWV3LCB3aGljaFAgPSBudWxsKSB7XG4gICAgICAgIHRoaXMudmlld0J5ID0gbmV3VmlldztcbiAgICAgICAgdGhpcy53aGljaFByb2plY3QgPSB3aGljaFA7XG4gICAgfVxuXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IE1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJTaWRlQmFyIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza3NcIjsgXG5cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVET00gKCl7XG4gICAgLy8gQ2FjaGUgdGhlIERPTVxuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1hLXRhc2tcIik7XG4gICAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYS10YXNrLW1vZGFsXCIpO1xuICAgIGNvbnN0IGNsb3NlTW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb3NlLW1vZGFsLWJ1dHRvblwiKTtcbiAgICBjb25zdCBtb2RhbFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWwtc3VibWl0XCIpO1xuICAgIGNvbnN0IG5ld1Rhc2tDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWNvbnRlbnRcIik7XG4gICAgY29uc3QgbmV3VGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGVcIik7XG4gICAgY29uc3QgbmV3VGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1wcmlvcml0eV0nKTtcblxuICAgIC8vIEFycmF5cyBmb3IgZXZlbnRzXG4gICAgY29uc3QgdGFza0xpc3QgPSBbXTtcblxuICAgIC8vIENhbGxiYWNrIGZvciBjcmVhdGUgdGFzayBzdWJtaXRcbiAgICBjb25zdCB0YXNrU3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIG5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBvcHRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayggbmV3VGFza0RhdGUudmFsdWUsIG5ld1Rhc2tDb250ZW50LnZhbHVlLCBuZXdUYXNrUHJpb3JpdHlWYWx1ZSk7XG4gICAgICAgIG1hc3Rlckxpc3QuYWRkVGFzayhuZXdUYXNrKTtcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgcmVuZGVyU2lkZUJhcihib2R5LCBtYXN0ZXJMaXN0KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlbnRsaXN0ZW5lcnNcbiAgICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpIH0pO1xuICAgIGNsb3NlTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIikgfSk7XG4gICAgbW9kYWxTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tTdWJtaXQpO1xuICAgIHJldHVybiAnZG9uZSdcbiAgIFxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIFRoZXJlIHNob3VsZCBvbmx5IGJlIG9uZSBtYXN0ZXIgbGlzdFxubGV0IGluc3RhbmNlID0gbnVsbDtcblxuLy8gQ29uc3RydWN0b3IgdG8gbWFrZSB0YXNrIG9iamVjdHNcbmV4cG9ydCBjbGFzcyBNYXN0ZXJMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbiBvbmx5IGNyZWF0ZSBvbmUgaW5zdGFuY2UhXCIpO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgfVxuXG4gICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIHJlbW92ZVRhc2sodGFzaykge1xuICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKHRoaXMuZGF0YS5pbmRleE9mKHRhc2spLCAxKTtcbiAgICB9XG5cbiAgICBlZGl0VGFzayh0YXNrLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGF0YVt0aGlzLmRhdGEuaW5kZXhPZih0YXNrKV1bYXR0cmlidXRlXSA9IHZhbHVlOyBcbiAgICB9XG5cbiAgICBzb3J0QnlEYXRlKCkge1xuICAgICAgICB0aGlzLmRhdGEuc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgIH1cblxuICAgIHByb2R1Y2VQcm9qZWN0TGlzdChwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gdGhpcy5kYXRhLmZpbHRlciggKHRhc2spID0+IHRhc2sucHJvamVjdCA9PSBwcm9qZWN0KTtcbiAgICAgICAgcHJvamVjdExpc3Quc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgICAgICByZXR1cm4gcHJvamVjdExpc3Q7XG4gICAgfVxuXG4gICAgZ2V0TGlzdE9mUHJvamVjdHMoKSB7XG4gICAgICAgIGNvbnN0IGFsbFByb2plY3RzID0gW107XG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCAodGFzayk9PiB7XG4gICAgICAgICAgICBpZiAodGFzay5wcm9qZWN0ICE9IG51bGwgJiYgIWFsbFByb2plY3RzLnNvbWUoKGEpPT4gYT09PXRhc2sucHJvamVjdCkpe1xuICAgICAgICAgICAgICAgIGFsbFByb2plY3RzLnB1c2godGFzay5wcm9qZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAgKVxuICAgICAgICByZXR1cm4gYWxsUHJvamVjdHM7XG4gICAgfVxufSIsIlwidXNlIHN0cmljdFwiXG5pbXBvcnQgeyBjdXJyZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jdXJyZW50U2V0dGluZ3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1haW4obWFzdGVyTGlzdCwgbWFpbiwgb3B0aW9uLCBieVByb2plY3ROYW1lID0gbnVsbCkge1xuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgbGV0IHRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xuICAgIHRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMSk7XG5cbiAgICBsZXQgd2Vla0Zyb21Ub2RheT0gbmV3IERhdGUodG9kYXkpO1xuICAgIHdlZWtGcm9tVG9kYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA3KTtcblxuICAgIGxldCB0b2RheUdyb3VwID0gbnVsbDtcbiAgICBsZXQgcGFzdER1ZSA9IG51bGw7XG4gICAgbGV0IHdlZWtHcm91cCA9IG51bGw7XG5cbiAgICAvLyBGaXJzdCByZW1vdmUgZXZlcnl0aGluZyBmcm9tIG1haW5cbiAgICB3aGlsZSAobWFpbi5maXJzdENoaWxkKSB7XG4gICAgICAgIG1haW4ucmVtb3ZlQ2hpbGQobWFpbi5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uID09PSAnYnlQcm9qZWN0Jyl7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gbWFzdGVyTGlzdC5wcm9kdWNlUHJvamVjdExpc3QoYnlQcm9qZWN0TmFtZSk7XG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcHJvamVjdEhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICBwcm9qZWN0SGVhZGluZy50ZXh0Q29udGVudCA9IGJ5UHJvamVjdE5hbWU7XG4gICAgICAgIG1haW4uYXBwZW5kKHByb2plY3RIZWFkaW5nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZiAocHJvamVjdExpc3RbaV0uZGF0ZSA+PSB0b2RheSAmJiBwcm9qZWN0TGlzdFtpXS5kYXRlIDw9IHRvZGF5ICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZGF5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3N1YmhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKHRvZGF5SGVhZGluZyk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUgPiB0b2RheSAmJiB0b2RheUdyb3VwID09IDEpICB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWFpbi5hcHBlbmQocHJvamVjdExpc3RbaV0uaHRtbEZvcm1hdCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hc3Rlckxpc3QuZGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgb3B0aW9uID09PSBcInRvZGF5XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9OyBcblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiBvcHRpb24gPT09IFwidGhpcy13ZWVrXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9OyBcblxuXG4gICAgICAgICAgICAvLyBQYXN0LUR1ZSBVbmRvbmUgQmxvY2tcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8IHRvZGF5ICAmJiBwYXN0RHVlID09IG51bGwgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmNvbXBsZXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBwYXN0RHVlID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXN0RHVlSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgcGFzdER1ZUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHBhc3REdWVIZWFkaW5nLnRleHRDb250ZW50ID0gJ1Bhc3QgRHVlJztcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChwYXN0RHVlSGVhZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICBcbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSAmJiBwYXN0RHVlID09IDEpIHtcbiAgICAgICAgICAgICAgICBwYXN0RHVlID0gMjtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRvZGF5IEJsb2NrXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9kYXkgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b21vcnJvdyAmJiB0b2RheUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RheUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93ICYmIHRvZGF5R3JvdXAgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDw9IHdlZWtGcm9tVG9kYXkgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgd2Vla0dyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB3ZWVrR3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdlZWtIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB3ZWVrSGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgd2Vla0hlYWRpbmcudGV4dENvbnRlbnQgPSAnVGhpcyBXZWVrJztcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCh3ZWVrSGVhZGluZyk7XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPiB3ZWVrRnJvbVRvZGF5ICYmIHdlZWtHcm91cCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgd2Vla0dyb3VwID0gMjtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9OyBcblxuICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICgobWFzdGVyTGlzdC5kYXRhW2ldLmNvbXBsZXRlZCA9PT0gZmFsc2UgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b2RheSkgfHwgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9kYXkpe1xuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKG1hc3Rlckxpc3QuZGF0YVtpXS5odG1sRm9ybWF0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFkZFRhc2tNb2RhbChzb21lRGl2LCBhcnJheU9mUHJvamVjdE5hbWVzKSB7XG4gICAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcbiAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnY2xvc2VkJyk7XG4gICAgYWRkVGFza01vZGFsLmlkID0gJ2FkZC1hLXRhc2stbW9kYWwnO1xuXG4gICAgY29uc3QgYWRkVGFza01vZGFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWRkVGFza01vZGFsQ29udGVudC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250ZW50Jyk7XG4gICAgXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICB0YXNrRm9ybS5pZCA9ICd0YXNrLWZvcm0nO1xuICAgIFxuICAgIGNvbnN0IGVtcHR5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlkID0gJ2Nsb3NlLW1vZGFsLWJ1dHRvbic7XG5cbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlubmVySFRNTCA9ICcmdGltZXMnO1xuICAgIFxuICAgIGNvbnN0IGxhYmVsRm9yVGFza0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWxGb3JUYXNrQ29udGVudC5mb3IgPSAndGFzay1jb250ZW50JztcbiAgICBsYWJlbEZvclRhc2tDb250ZW50LnRleHRDb250ZW50ID0gJ1Rhc2s6J1xuICAgIFxuICAgIGNvbnN0IHRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHRhc2tDb250ZW50LnR5cGUgPSAndGV4dCc7XG4gICAgdGFza0NvbnRlbnQuaWQgPSAndGFzay1jb250ZW50JztcbiAgICB0YXNrQ29udGVudC5uYW1lID0gJ3Rhc2stY29udGVudCc7XG4gICAgdGFza0NvbnRlbnQucGxhY2Vob2xkZXIgPSAnRW50ZXIgVGFzayc7XG4gICAgdGFza0NvbnRlbnQucmVxdWlyZWQgPSB0cnVlO1xuICAgIFxuICAgIGNvbnN0IGxhYmVsRm9yRGF0ZT0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsRm9yRGF0ZS5mb3IgPSAnZGF0ZSc7XG4gICAgbGFiZWxGb3JEYXRlLnRleHRDb250ZW50ID0gJ0R1ZTonO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBkYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgZGF0ZS5pZCA9ICdkYXRlJztcbiAgICBkYXRlLm5hbWUgPSAnZGF0ZSc7XG4gICAgZGF0ZS5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBwcmlvcml0eVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eVRpdGxlLnRleHRDb250ZW50ID0gJ1ByaW9yaXR5Oic7XG5cbiAgICBjb25zdCBwcmlvcml0eU9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5pZCA9ICdwcmlvcml0eS1vcHRpb25zJztcblxuICAgIGNvbnN0IG9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG5vcm1hbFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIG5vcm1hbFJhZGlvLnR5cGUgPSBcInJhZGlvXCI7XG4gICAgbm9ybWFsUmFkaW8uaWQgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLm5hbWUgPSBcInByaW9yaXR5XCI7XG4gICAgbm9ybWFsUmFkaW8udmFsdWUgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IG5vcm1hbFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbm9ybWFsUmFkaW9MYWJlbC5mb3IgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvTGFiZWwudGV4dENvbnRlbnQgPSBcIk5vcm1hbFwiO1xuXG4gICAgY29uc3Qgb3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgaGlnaFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGhpZ2hSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgIGhpZ2hSYWRpby5pZCA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpby5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgIGhpZ2hSYWRpby52YWx1ZSA9IFwiaGlnaFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGhpZ2hSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGhpZ2hSYWRpb0xhYmVsLmZvciA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gXCJIaWdoXCI7XG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbC5mb3IgPSBcInByb2plY3RcIjtcbiAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbC50ZXh0Q29udGVudCA9IFwiUHJvamVjdDpcIlxuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGFzc2lnblRvUHJvamVjdC5uYW1lID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0LmlkID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0LnBsYWNlaG9sZGVyID0gXCJPcHRpb25hbFwiXG4gICAgYXNzaWduVG9Qcm9qZWN0LnNldEF0dHJpYnV0ZShcImxpc3RcIiwgXCJwcm9qZWN0LWxpc3RcIik7XG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkYXRhbGlzdFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdC5pZCA9IFwicHJvamVjdC1saXN0XCI7XG4gICBcbiAgICBhcnJheU9mUHJvamVjdE5hbWVzLmZvckVhY2goIChlbnRyeSkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGVudHJ5O1xuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBlbnRyeTsgXG4gICAgICAgIGFzc2lnblRvUHJvamVjdERhdGFMaXN0LmFwcGVuZChvcHRpb24pO1xuICAgIH0pXG4gICAgLy9jb25zdCBwcm9qZWN0T3B0aW9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgLy9wcm9qZWN0T3B0aW9uMS52YWx1ZSA9IFwiQ29kaW5nXCI7XG4gICAgLy9wcm9qZWN0T3B0aW9uMS50ZXh0Q29udGVudCA9IFwiQ29kaW5nXCI7IFxuICAgIC8vYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuYXBwZW5kKHByb2plY3RPcHRpb24xKTtcbiAgICBhc3NpZ25Ub1Byb2plY3QuYXBwZW5kKGFzc2lnblRvUHJvamVjdERhdGFMaXN0KTtcblxuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc3VibWl0QnRuLnR5cGUgPSBcInN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi5pZCA9IFwibW9kYWwtc3VibWl0XCI7XG4gICAgc3VibWl0QnRuLnZhbHVlID0gXCJTdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xuXG4gICAgb3B0aW9uMS5hcHBlbmQobm9ybWFsUmFkaW8sIG5vcm1hbFJhZGlvTGFiZWwpO1xuICAgIG9wdGlvbjIuYXBwZW5kKGhpZ2hSYWRpbywgaGlnaFJhZGlvTGFiZWwpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5hcHBlbmQob3B0aW9uMSwgb3B0aW9uMik7XG4gICAgdGFza0Zvcm0uYXBwZW5kKFxuICAgICAgICBlbXB0eURpdiwgXG4gICAgICAgIGNsb3NlTW9kYWxCdXR0b24sIFxuICAgICAgICBsYWJlbEZvclRhc2tDb250ZW50LCBcbiAgICAgICAgdGFza0NvbnRlbnQsIFxuICAgICAgICBsYWJlbEZvckRhdGUsIFxuICAgICAgICBkYXRlLCBcbiAgICAgICAgcHJpb3JpdHlUaXRsZSwgXG4gICAgICAgIHByaW9yaXR5T3B0aW9ucywgXG4gICAgICAgIGFzc2lnblRvUHJvamVjdExhYmVsLCBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0LFxuICAgICAgICBzdWJtaXRCdG4pO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuYXBwZW5kKHRhc2tGb3JtKTtcbiAgICBhZGRUYXNrTW9kYWwuYXBwZW5kKGFkZFRhc2tNb2RhbENvbnRlbnQpO1xuICAgIHNvbWVEaXYuYXBwZW5kKGFkZFRhc2tNb2RhbCk7XG59XG5cbi8vZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNpZGVCYXIoYXJyYXlPZlByb2plY3ROYW1lcylcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTaWRlQmFyKHNvbWVEaXYsIG1hc3Rlckxpc3QsIGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyXCIpKSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZVRoaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NpZGViYXJcIik7XG4gICAgICAgIGRlbGV0ZVRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkZWxldGVUaGlzKTtcbiAgICB9XG5cbiAgICBjb25zdCBzaWRlYmFyU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgIHNpZGViYXJTZWN0aW9uLmlkID0gJ3NpZGViYXInO1xuICAgIC8vc2lkZWJhclNlY3Rpb24udGV4dENvbnRlbnQgPSBcIlVwY29taW5nIFRhc2tzXCI7XG4gICAgY29uc3QgbGlzdEJ5VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgY29uc3QgbGlzdEl0ZW0xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBpdGVtMUFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpdGVtMUFuY2hvci5pZCA9ICd0b2RheXMtdGFza3MnO1xuICAgIGl0ZW0xQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgaXRlbTFBbmNob3IudGV4dENvbnRlbnQgPSBcIlRvZGF5XCI7XG5cblxuXG4gICAgbGlzdEl0ZW0xLmFwcGVuZChpdGVtMUFuY2hvcik7XG5cbiAgICBjb25zdCBsaXN0SXRlbTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW0yQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW0yQW5jaG9yLmlkID0gJ3RoaXMtd2Vlayc7XG4gICAgaXRlbTJBbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtMkFuY2hvci50ZXh0Q29udGVudCA9IFwiVGhpcyBXZWVrXCI7XG4gICAgbGlzdEl0ZW0yLmFwcGVuZChpdGVtMkFuY2hvcik7XG4gICAgXG4gICAgY29uc3QgbGlzdEl0ZW0zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBpdGVtM0FuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpdGVtM0FuY2hvci5pZCA9ICdhbGwtdGFza3MnO1xuICAgIGl0ZW0zQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgaXRlbTNBbmNob3IudGV4dENvbnRlbnQgPSBcIkFsbFwiO1xuICAgIGxpc3RJdGVtMy5hcHBlbmQoaXRlbTNBbmNob3IpO1xuXG4gICAgbGlzdEJ5VGltZS5hcHBlbmQobGlzdEl0ZW0xLCBsaXN0SXRlbTIsIGxpc3RJdGVtMyk7XG5cbiAgICAvL0hvdyB0byBhZGQgQnkgUHJvamVjdD9cbiAgICBjb25zdCBsaXN0QnlQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcblxuICAgIGNvbnN0IG1ha2VMaW5rID0gZnVuY3Rpb24obmFtZSwgZGl2KSB7XG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgY29uc3QgaXRlbUFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgaXRlbUFuY2hvci5pZCA9IG5hbWU7XG4gICAgICAgIGl0ZW1BbmNob3IuaHJlZiA9ICcjJztcbiAgICAgICAgaXRlbUFuY2hvci50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZChpdGVtQW5jaG9yKTtcbiAgICAgICAgZGl2LmFwcGVuZChsaXN0SXRlbSk7XG4gICAgfVxuXG4gICBcbiAgICBpZiAoYXJyYXlPZlByb2plY3ROYW1lcyl7XG4gICAgICAgIGFycmF5T2ZQcm9qZWN0TmFtZXMuZm9yRWFjaChmdW5jdGlvbihhKXsgbWFrZUxpbmsoYSwgbGlzdEJ5UHJvamVjdCkgfSApO1xuICAgIH1cbiAgICBzaWRlYmFyU2VjdGlvbi5hcHBlbmQobGlzdEJ5VGltZSwgbGlzdEJ5UHJvamVjdCk7XG4gICAgc29tZURpdi5hcHBlbmQoc2lkZWJhclNlY3Rpb24pO1xuXG4gICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckhlYWRlcihzb21lRGl2KSB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBhZGRUYXNrQnRuLmlkID0gXCJhZGQtYS10YXNrXCI7XG4gICAgYWRkVGFza0J0bi50ZXh0Q29udGVudCA9IFwiQWRkIFRhc2tcIjtcbiAgICBoZWFkZXIuYXBwZW5kKGFkZFRhc2tCdG4pO1xuICAgIHNvbWVEaXYucHJlcGVuZChoZWFkZXIpO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gQ29uc3RydWN0b3IgdG8gbWFrZSB0YXNrIG9iamVjdHNcbmV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRlLCBjb250ZW50LCBwcmlvcml0eSkgeyBcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMDAwMDApO1xuICAgIH1cblxuICAgIG1hcmtEb25lKCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaHRtbEZvcm1hdCgpIHtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICBjaGVja2JveC5uYW1lID0gXCJuYW1lXCI7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0aGlzLmNvbXBsZXRlZDtcbiAgICAgICAgY2hlY2tib3guaWQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgXG4gICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFzay1uYW1lJyk7XG4gICAgICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGhpcy5jb250ZW50O1xuXG4gICAgICAgIGNvbnN0IHRhc2tEdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0YXNrRHVlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZHVlLWRhdGUnKTtcbiAgICAgICAgdGFza0R1ZS50ZXh0Q29udGVudCA9IGBEdWU6ICR7dGhpcy5kYXRlLnRvTG9jYWxlU3RyaW5nKCdkZWZhdWx0Jywge3dlZWtkYXk6ICdzaG9ydCcgfSl9LFxuICAgICAgICAgICAkeyB0aGlzLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7IG1vbnRoOiAnc2hvcnQnIH0pfS4gXG4gICAgICAgICAgICAkeyB0aGlzLmRhdGUuZ2V0RGF0ZSgpfSBgICBcbiAgICBcbiAgICAgICAgY29uc3QgZWRpdFRhc2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldCk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGVkaXRCdG4uY2xhc3NMaXN0LmFkZCgnZWRpdC10YXNrJyk7XG4gICAgICAgIGVkaXRCdG4udGV4dENvbnRlbnQgPSAnZWRpdCc7XG4gICAgICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVkaXRUYXNrKTtcbiAgICBcbiAgICAgICAgY29uc3QgcmVtb3ZlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZS10YXNrJyk7XG4gICAgICAgIHJlbW92ZUJ0bi50ZXh0Q29udGVudCA9ICdyZW1vdmUnO1xuICAgIFxuICAgICAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XG4gICAgICAgIGlmICh0aGlzLnByaW9yaXR5ID09ICdoaWdoJykge1xuICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdpbXBvcnRhbnQnKTtcbiAgICAgICAgfSBcbiAgICAgICAgY2FyZC5hcHBlbmQoY2hlY2tib3gsIHRhc2tOYW1lLCB0YXNrRHVlLCBlZGl0QnRuLCByZW1vdmVCdG4pO1xuICAgICAgICByZXR1cm4gKGNhcmQpXG4gICAgfVxuXG5cbiAgICBcbn07XG5cblxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCB7IHByZXBhcmVET00gfSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7IE1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJBZGRUYXNrTW9kYWwsIHJlbmRlclNpZGVCYXIsIHJlbmRlckhlYWRlciB9IGZyb20gXCIuL3JlbmRlclwiO1xuaW1wb3J0IHsgY3VycmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY3VycmVudFNldHRpbmdzXCI7XG5cbi8vIENyZWF0ZSB0aGUgbWFzdGVyTGlzdCBiZWZvcmUgYnVpbGRpbmcgdGhlIERPTVxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0O1xuXG5cblxuXG4vLyAgIyMjIyMjIyMjIyMgICAgIFNhbXBsZSB0YXNrcyB0byB0ZXN0IHRoZSBhcHAgICAgICMjIyMjIyMjIyMjIFxuXG5jb25zdCBzYW1wbGVUYXNrID0gbmV3IFRhc2soICcyMDIyLTA5LTIzJywgJ0ZpbmlzaCBPZGluIFByb2plY3QnLCAnbm9ybWFsJyApO1xuc2FtcGxlVGFzay5jb21wbGV0ZWQgPSB0cnVlO1xuY29uc3Qgc2FtcGxlVGFzazIgPSBuZXcgVGFzayggJzIwMjItMDktMjMnLCAnUHJhY3RpY2UgS3VuZyBmdScsICdoaWdoJyApO1xuY29uc3Qgc2FtcGxlVGFzazMgPSBuZXcgVGFzayggJzIwMjItMDktMjYnLCAnQ29vayBhIHBpZScsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrNCA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yNicsICdTbGVlcCcsICdoaWdoJyApO1xuY29uc3Qgc2FtcGxlVGFzazUgPSBuZXcgVGFzayggJzIwMjItMDktMjgnLCAnTGVhcm4gUnVieScsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrNiA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yNycsICdDb2RlIFRldHJpcycsICdoaWdoJyApO1xuY29uc3Qgc2FtcGxlVGFzazcgPSBuZXcgVGFzayggJzIwMjItMTAtMDEnLCAnUmVjeWNsZScsICdoaWdoJyApO1xuY29uc3Qgc2FtcGxlVGFzazggPSBuZXcgVGFzayggJzIwMjItMTAtMDInLCAnU3dpbScsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrOSA9IG5ldyBUYXNrKCAnMjAyMi0xMC0yMycsICdFYXQnLCAnaGlnaCcgKTtcblxubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2spO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2syKTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMyk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazQpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s1KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNik7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazcpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s4KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrOSk7XG5tYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcblxuXG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2ssICdwcm9qZWN0JywgJ0NvZGluZycpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNSwgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s2LCAncHJvamVjdCcsICdDb2RpbmcnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazMsICdjb21wbGV0ZWQnLCAndHJ1ZScpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrOCwgJ3Byb2plY3QnLCAnSGVhbHRoJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s5LCAncHJvamVjdCcsICdIZWFsdGgnKTtcblxuLy8gKioqKioqKioqKioqKioqXG5cblxuLy8gQ2FjaGUgRE9NIGFuZCByZW5kZXIgZWFjaCBzZWN0aW9uXG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5jb25zdCBhZGREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvci1hZGQtdGFzay1tb2RhbFwiKTtcbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbnJlbmRlckhlYWRlcihib2R5KTtcbnJlbmRlclNpZGVCYXIoYm9keSwgbWFzdGVyTGlzdCwgbWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTtcbnJlbmRlckFkZFRhc2tNb2RhbChib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xucmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcblxuLy8gQWRkIGV2ZW50bGlzdGVuZXJzIHRvIGhlYWRlciBhbmQgbW9kYWxcbi8vcHJlcGFyZURPTSgpO1xuXG4vLyBBZGQgZXZlbnRsaXN0ZW5lcnMgdG8gc2lkZWJhclxuXG5cblxuXG5jb25zdCBhZGRTaWRlQmFyRXZlbnRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9kYXlzVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZGF5cy10YXNrc1wiKTtcbiAgICAgICAgdG9kYXlzVGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RvZGF5JywgbnVsbCk7XG4gICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgbWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCl9KTtcblxuICAgICAgICBjb25zdCB3ZWVrc1Rhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aGlzLXdlZWtcIik7XG4gICAgICAgIHdlZWtzVGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RoaXMtd2VlaycsIG51bGwpO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpfSk7XG5cbiAgICAgICAgY29uc3QgYWxsVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FsbC10YXNrc1wiKTtcbiAgICAgICAgYWxsVGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2FsbCcsIG51bGwpO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpfSk7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZhaWxlZCcpO1xuICAgIH1cbn07XG5cbmFkZFNpZGVCYXJFdmVudExpc3RlbmVycygpO1xuXG5cblxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=