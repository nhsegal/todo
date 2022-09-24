/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");



 


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
        const newTask = new _tasks__WEBPACK_IMPORTED_MODULE_1__.Task( newTaskDate.value, newTaskContent.value, newTaskPriorityValue);
        taskList.push(newTask);
        render(taskList);
    }

    // Add eventlisteners
    addTaskBtn.addEventListener("click", () => { console.log('here'); addTaskModal.classList.toggle("closed") });
    closeModalButton.addEventListener("click", () => { addTaskModal.classList.toggle("closed") });
    modalSubmitButton.addEventListener("click", taskSubmit);
   
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




// Constructor to make task objects
class MasterList {
    constructor() { 
       this.data = [];
    }

    addTask(task) {
        this.data.push(task);
    }

    removeTask(task) {
        let tempArr = [];
        while (this.data.indexOf(task) > -1) {
            tempArr.push(this.data.pop());
        }
        tempArr.pop();
        while (tempArr.length) {
            this.data.push(tempArr.pop());
        }
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


// Complete the "week" option. Add a "Past Due" category
// Maybe the sidebar should be radio buttons 
function renderMain(masterList, main, option, projectName = null) {
    let today = new Date();
    let todayGroup = null;
    // First remove everything from main
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    console.log(option)

    switch(option) {
        case 'byProject':
            const projectList = masterList.produceProjectList(projectName);
            const projectHeading = document.createElement("div");
            projectHeading.classList.add('heading');
            projectHeading.textContent = projectName;
            main.append(projectHeading);
            for (let i = 0; i < projectList.length; i++){
                if (projectList[i].date.getDate() == today.getDate() && projectList[i].date.getMonth() == today.getMonth() && todayGroup == null ) {
                    todayGroup = 1;
                    const todayHeading = document.createElement("div");
                    todayHeading.classList.add('subheading');
                    todayHeading.textContent = 'Today';
                    main.append(todayHeading);
                }; 
                if (( projectList[i].date.getDate() != today.getDate() && todayGroup == 1 ) || ( projectList[i].date.getMonth() != today.getMonth() && todayGroup == 1 ))  {
                    todayGroup = null;
                    const lineBreak = document.createElement('hr');
                    main.append(lineBreak);
                }; 
                main.append(projectList[i].htmlFormat());
            }
            return;
        
        case 'today':
            for (let i = 0; i < masterList.data.length; i++){
                if (masterList.data[i].date.getDate() == today.getDate() && masterList.data[i].date.getMonth() == today.getMonth() && todayGroup == null ) {
                    todayGroup = 1;
                    const todayHeading = document.createElement("div");
                    todayHeading.classList.add('heading');
                    todayHeading.textContent = 'Today';
                    main.append(todayHeading);
                }; 
        
                if ((masterList.data[i].date.getDate() != today.getDate()) ||  (masterList.data[i].date.getMonth() != today.getMonth()) ) {
                 
                    return;
                }; 
            
                main.append(masterList.data[i].htmlFormat());
            }
            break;

        case 'thisWeek':
            break;
        
        default:
            console.log('there')
            for (let i = 0; i < masterList.data.length; i++){
                if (masterList.data[i].date.getDate() == today.getDate() && masterList.data[i].date.getMonth() == today.getMonth() && todayGroup == null ) {
                    todayGroup = 1;
                    const todayHeading = document.createElement("div");
                    todayHeading.classList.add('heading');
                    todayHeading.textContent = 'Today';
                    main.append(todayHeading);
                }; 
        
                if ((masterList.data[i].date.getDate() != today.getDate() && todayGroup == 1) ||  (masterList.data[i].date.getMonth() != today.getMonth() && todayGroup == 1) ) {
                    todayGroup = null;
                    const lineBreak = document.createElement('hr');
                    main.append(lineBreak);
                }; 
                main.append(masterList.data[i].htmlFormat());
            


            } 
            return
    }
}

// Modify renderAddTasksModal to accept an array of projectNames after someDiv 
// and use this array as the select options
function renderAddTaskModal(someDiv) {
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
   
    const projectOption1 = document.createElement("option");
    projectOption1.value = "Coding";
    projectOption1.textContent = "Coding"; 

    assignToProjectDataList.append(projectOption1);
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
function renderSideBar(someDiv) {
    const sidebarSection = document.createElement("section");
    sidebarSection.id = 'sidebar';
    sidebarSection.textContent = "Upcoming Tasks";

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

    sidebarSection.append(listByTime);
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

/*
<header>
<div>
    <button id="add-a-task">Add task</button>
</div>
<div>
    <button id="add-a-project">Add project</button>
</div>
</header>
*/

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









const main = document.querySelector("main");
const side = document.querySelector("#sidebarContainer");
const addDiv = document.querySelector("#for-add-task-modal");

(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderHeader)(document.querySelector("body"));
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderAddTaskModal)(addDiv);
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderSideBar)(side);
//prepareDOM();


const todaysTasks = document.querySelector("#todays-tasks");
todaysTasks.addEventListener("click", function(){(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(masterList, main, 'today')});

const allTasks = document.querySelector("#all-tasks");
allTasks.addEventListener("click", function(){(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(masterList, main, 'all')});

const sampleTask = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-23', 'Finish Odin Project', 'normal' );
const sampleTask2 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-23', 'Practice Kung fu', 'high' );
const sampleTask3 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-23', 'Cook a pie', 'normal' );
const sampleTask4 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-29', 'Sleep', 'high' );
const sampleTask5 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-23', 'Learn Ruby', 'normal' );
const sampleTask6 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-26', 'Code Tetris', 'high' );

const masterList = new _masterList__WEBPACK_IMPORTED_MODULE_2__.MasterList;
masterList.addTask(sampleTask);
masterList.addTask(sampleTask2);
masterList.addTask(sampleTask3);
masterList.addTask(sampleTask4);
masterList.addTask(sampleTask5);
masterList.addTask(sampleTask6);
masterList.sortByDate();
//masterList.removeTask(sampleTask3);

masterList.editTask(sampleTask, 'project', 'Coding');
masterList.editTask(sampleTask5, 'project', 'Coding');
masterList.editTask(sampleTask6, 'project', 'Coding');
masterList.editTask(sampleTask3, 'completed', 'true');
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(masterList, main, 'byProject', 'Coding');





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFhOztBQUU2QjtBQUNYO0FBQ087O0FBRS9CO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdDQUFJO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxxQkFBcUIseUNBQXlDO0FBQy9HLHVEQUF1RCx5Q0FBeUM7QUFDaEc7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN2Q2E7Ozs7QUFJYjtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkNZOztBQUVaO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdCQUF3QjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDRCQUE0QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDRCQUE0QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hRYTs7QUFFYjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxxQ0FBcUMsa0JBQWtCLEVBQUU7QUFDL0YsY0FBYyxzQ0FBc0MsZ0JBQWdCLEVBQUU7QUFDdEUsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7VUMxREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05hOztBQUVrQjtBQUNJO0FBQ087QUFDNkM7Ozs7QUFJdkY7QUFDQTtBQUNBOztBQUVBLHFEQUFZO0FBQ1osMkRBQWtCO0FBQ2xCLHNEQUFhO0FBQ2I7OztBQUdBO0FBQ0EsaURBQWlELG1EQUFVLDRCQUE0Qjs7QUFFdkY7QUFDQSw4Q0FBOEMsbURBQVUsMEJBQTBCOztBQUVsRix1QkFBdUIsd0NBQUk7QUFDM0Isd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTs7QUFFNUIsdUJBQXVCLG1EQUFVO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvbWFzdGVyTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3JlbmRlci5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBNYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7IFxuaW1wb3J0IHsgcmVuZGVyTWFpbiB9IGZyb20gXCIuL3JlbmRlclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZURPTSAoKXtcbiAgICAvLyBDYWNoZSB0aGUgRE9NXG4gICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFza1wiKTtcbiAgICBjb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1hLXRhc2stbW9kYWxcIik7XG4gICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2UtbW9kYWwtYnV0dG9uXCIpO1xuICAgIGNvbnN0IG1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbC1zdWJtaXRcIik7XG4gICAgY29uc3QgbmV3VGFza0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stY29udGVudFwiKTtcbiAgICBjb25zdCBuZXdUYXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKTtcbiAgICBjb25zdCBuZXdUYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXByaW9yaXR5XScpO1xuXG4gICAgLy8gQXJyYXlzIGZvciBldmVudHNcbiAgICBjb25zdCB0YXNrTGlzdCA9IFtdO1xuXG4gICAgLy8gQ2FsbGJhY2sgZm9yIGNyZWF0ZSB0YXNrIHN1Ym1pdFxuICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgbmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKCBuZXdUYXNrRGF0ZS52YWx1ZSwgbmV3VGFza0NvbnRlbnQudmFsdWUsIG5ld1Rhc2tQcmlvcml0eVZhbHVlKTtcbiAgICAgICAgdGFza0xpc3QucHVzaChuZXdUYXNrKTtcbiAgICAgICAgcmVuZGVyKHRhc2tMaXN0KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlbnRsaXN0ZW5lcnNcbiAgICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IGNvbnNvbGUubG9nKCdoZXJlJyk7IGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpIH0pO1xuICAgIGNsb3NlTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIikgfSk7XG4gICAgbW9kYWxTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tTdWJtaXQpO1xuICAgXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuXG5cbi8vIENvbnN0cnVjdG9yIHRvIG1ha2UgdGFzayBvYmplY3RzXG5leHBvcnQgY2xhc3MgTWFzdGVyTGlzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7IFxuICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIH1cblxuICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICB0aGlzLmRhdGEucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgbGV0IHRlbXBBcnIgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRoaXMuZGF0YS5pbmRleE9mKHRhc2spID4gLTEpIHtcbiAgICAgICAgICAgIHRlbXBBcnIucHVzaCh0aGlzLmRhdGEucG9wKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRlbXBBcnIucG9wKCk7XG4gICAgICAgIHdoaWxlICh0ZW1wQXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2godGVtcEFyci5wb3AoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGl0VGFzayh0YXNrLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGF0YVt0aGlzLmRhdGEuaW5kZXhPZih0YXNrKV1bYXR0cmlidXRlXSA9IHZhbHVlOyBcbiAgICB9XG5cbiAgICBzb3J0QnlEYXRlKCkge1xuICAgICAgICB0aGlzLmRhdGEuc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgIH1cblxuICAgIHByb2R1Y2VQcm9qZWN0TGlzdChwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gdGhpcy5kYXRhLmZpbHRlciggKHRhc2spID0+IHRhc2sucHJvamVjdCA9PSBwcm9qZWN0KTtcbiAgICAgICAgcHJvamVjdExpc3Quc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgICAgICByZXR1cm4gcHJvamVjdExpc3Q7XG4gICAgfVxuXG59IiwiXCJ1c2Ugc3RyaWN0XCJcblxuLy8gQ29tcGxldGUgdGhlIFwid2Vla1wiIG9wdGlvbi4gQWRkIGEgXCJQYXN0IER1ZVwiIGNhdGVnb3J5XG4vLyBNYXliZSB0aGUgc2lkZWJhciBzaG91bGQgYmUgcmFkaW8gYnV0dG9ucyBcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIG9wdGlvbiwgcHJvamVjdE5hbWUgPSBudWxsKSB7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBsZXQgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgLy8gRmlyc3QgcmVtb3ZlIGV2ZXJ5dGhpbmcgZnJvbSBtYWluXG4gICAgd2hpbGUgKG1haW4uZmlyc3RDaGlsZCkge1xuICAgICAgICBtYWluLnJlbW92ZUNoaWxkKG1haW4uZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG9wdGlvbilcblxuICAgIHN3aXRjaChvcHRpb24pIHtcbiAgICAgICAgY2FzZSAnYnlQcm9qZWN0JzpcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gbWFzdGVyTGlzdC5wcm9kdWNlUHJvamVjdExpc3QocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgcHJvamVjdEhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgcHJvamVjdEhlYWRpbmcudGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcbiAgICAgICAgICAgIG1haW4uYXBwZW5kKHByb2plY3RIZWFkaW5nKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdExpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0TGlzdFtpXS5kYXRlLmdldERhdGUoKSA9PSB0b2RheS5nZXREYXRlKCkgJiYgcHJvamVjdExpc3RbaV0uZGF0ZS5nZXRNb250aCgpID09IHRvZGF5LmdldE1vbnRoKCkgJiYgdG9kYXlHcm91cCA9PSBudWxsICkge1xuICAgICAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3N1YmhlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgICAgICBpZiAoKCBwcm9qZWN0TGlzdFtpXS5kYXRlLmdldERhdGUoKSAhPSB0b2RheS5nZXREYXRlKCkgJiYgdG9kYXlHcm91cCA9PSAxICkgfHwgKCBwcm9qZWN0TGlzdFtpXS5kYXRlLmdldE1vbnRoKCkgIT0gdG9kYXkuZ2V0TW9udGgoKSAmJiB0b2RheUdyb3VwID09IDEgKSkgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQocHJvamVjdExpc3RbaV0uaHRtbEZvcm1hdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGNhc2UgJ3RvZGF5JzpcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFzdGVyTGlzdC5kYXRhLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUuZ2V0RGF0ZSgpID09IHRvZGF5LmdldERhdGUoKSAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZS5nZXRNb250aCgpID09IHRvZGF5LmdldE1vbnRoKCkgJiYgdG9kYXlHcm91cCA9PSBudWxsICkge1xuICAgICAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZS5nZXREYXRlKCkgIT0gdG9kYXkuZ2V0RGF0ZSgpKSB8fCAgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldE1vbnRoKCkgIT0gdG9kYXkuZ2V0TW9udGgoKSkgKSB7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChtYXN0ZXJMaXN0LmRhdGFbaV0uaHRtbEZvcm1hdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3RoaXNXZWVrJzpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGVyZScpXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hc3Rlckxpc3QuZGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldERhdGUoKSA9PSB0b2RheS5nZXREYXRlKCkgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUuZ2V0TW9udGgoKSA9PSB0b2RheS5nZXRNb250aCgpICYmIHRvZGF5R3JvdXAgPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvZGF5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKHRvZGF5SGVhZGluZyk7XG4gICAgICAgICAgICAgICAgfTsgXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICgobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUuZ2V0RGF0ZSgpICE9IHRvZGF5LmdldERhdGUoKSAmJiB0b2RheUdyb3VwID09IDEpIHx8ICAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUuZ2V0TW9udGgoKSAhPSB0b2RheS5nZXRNb250aCgpICYmIHRvZGF5R3JvdXAgPT0gMSkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKG1hc3Rlckxpc3QuZGF0YVtpXS5odG1sRm9ybWF0KCkpO1xuICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIHJldHVyblxuICAgIH1cbn1cblxuLy8gTW9kaWZ5IHJlbmRlckFkZFRhc2tzTW9kYWwgdG8gYWNjZXB0IGFuIGFycmF5IG9mIHByb2plY3ROYW1lcyBhZnRlciBzb21lRGl2IFxuLy8gYW5kIHVzZSB0aGlzIGFycmF5IGFzIHRoZSBzZWxlY3Qgb3B0aW9uc1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFkZFRhc2tNb2RhbChzb21lRGl2KSB7XG4gICAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcbiAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnY2xvc2VkJyk7XG4gICAgYWRkVGFza01vZGFsLmlkID0gJ2FkZC1hLXRhc2stbW9kYWwnO1xuXG4gICAgY29uc3QgYWRkVGFza01vZGFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWRkVGFza01vZGFsQ29udGVudC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250ZW50Jyk7XG4gICAgXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICB0YXNrRm9ybS5pZCA9ICd0YXNrLWZvcm0nO1xuICAgIFxuICAgIGNvbnN0IGVtcHR5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlkID0gJ2Nsb3NlLW1vZGFsLWJ1dHRvbic7XG5cbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlubmVySFRNTCA9ICcmdGltZXMnO1xuICAgIFxuICAgIGNvbnN0IGxhYmVsRm9yVGFza0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWxGb3JUYXNrQ29udGVudC5mb3IgPSAndGFzay1jb250ZW50JztcbiAgICBsYWJlbEZvclRhc2tDb250ZW50LnRleHRDb250ZW50ID0gJ1Rhc2s6J1xuICAgIFxuICAgIGNvbnN0IHRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHRhc2tDb250ZW50LnR5cGUgPSAndGV4dCc7XG4gICAgdGFza0NvbnRlbnQuaWQgPSAndGFzay1jb250ZW50JztcbiAgICB0YXNrQ29udGVudC5uYW1lID0gJ3Rhc2stY29udGVudCc7XG4gICAgdGFza0NvbnRlbnQucGxhY2Vob2xkZXIgPSAnRW50ZXIgVGFzayc7XG4gICAgdGFza0NvbnRlbnQucmVxdWlyZWQgPSB0cnVlO1xuICAgIFxuICAgIGNvbnN0IGxhYmVsRm9yRGF0ZT0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsRm9yRGF0ZS5mb3IgPSAnZGF0ZSc7XG4gICAgbGFiZWxGb3JEYXRlLnRleHRDb250ZW50ID0gJ0R1ZTonO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBkYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgZGF0ZS5pZCA9ICdkYXRlJztcbiAgICBkYXRlLm5hbWUgPSAnZGF0ZSc7XG4gICAgZGF0ZS5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBwcmlvcml0eVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eVRpdGxlLnRleHRDb250ZW50ID0gJ1ByaW9yaXR5Oic7XG5cbiAgICBjb25zdCBwcmlvcml0eU9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5pZCA9ICdwcmlvcml0eS1vcHRpb25zJztcblxuICAgIGNvbnN0IG9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG5vcm1hbFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIG5vcm1hbFJhZGlvLnR5cGUgPSBcInJhZGlvXCI7XG4gICAgbm9ybWFsUmFkaW8uaWQgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLm5hbWUgPSBcInByaW9yaXR5XCI7XG4gICAgbm9ybWFsUmFkaW8udmFsdWUgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IG5vcm1hbFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbm9ybWFsUmFkaW9MYWJlbC5mb3IgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvTGFiZWwudGV4dENvbnRlbnQgPSBcIk5vcm1hbFwiO1xuXG4gICAgY29uc3Qgb3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgaGlnaFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGhpZ2hSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgIGhpZ2hSYWRpby5pZCA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpby5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgIGhpZ2hSYWRpby52YWx1ZSA9IFwiaGlnaFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGhpZ2hSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGhpZ2hSYWRpb0xhYmVsLmZvciA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gXCJIaWdoXCI7XG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbC5mb3IgPSBcInByb2plY3RcIjtcbiAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbC50ZXh0Q29udGVudCA9IFwiUHJvamVjdDpcIlxuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGFzc2lnblRvUHJvamVjdC5uYW1lID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0LmlkID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0LnBsYWNlaG9sZGVyID0gXCJPcHRpb25hbFwiXG4gICAgYXNzaWduVG9Qcm9qZWN0LnNldEF0dHJpYnV0ZShcImxpc3RcIiwgXCJwcm9qZWN0LWxpc3RcIik7XG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkYXRhbGlzdFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdC5pZCA9IFwicHJvamVjdC1saXN0XCI7XG4gICBcbiAgICBjb25zdCBwcm9qZWN0T3B0aW9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgcHJvamVjdE9wdGlvbjEudmFsdWUgPSBcIkNvZGluZ1wiO1xuICAgIHByb2plY3RPcHRpb24xLnRleHRDb250ZW50ID0gXCJDb2RpbmdcIjsgXG5cbiAgICBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdC5hcHBlbmQocHJvamVjdE9wdGlvbjEpO1xuICAgIGFzc2lnblRvUHJvamVjdC5hcHBlbmQoYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QpO1xuXG4gICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzdWJtaXRCdG4udHlwZSA9IFwic3VibWl0XCI7XG4gICAgc3VibWl0QnRuLmlkID0gXCJtb2RhbC1zdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4udmFsdWUgPSBcIlN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9IFwiU3VibWl0XCI7XG5cbiAgICBvcHRpb24xLmFwcGVuZChub3JtYWxSYWRpbywgbm9ybWFsUmFkaW9MYWJlbCk7XG4gICAgb3B0aW9uMi5hcHBlbmQoaGlnaFJhZGlvLCBoaWdoUmFkaW9MYWJlbCk7XG4gICAgcHJpb3JpdHlPcHRpb25zLmFwcGVuZChvcHRpb24xLCBvcHRpb24yKTtcbiAgICB0YXNrRm9ybS5hcHBlbmQoXG4gICAgICAgIGVtcHR5RGl2LCBcbiAgICAgICAgY2xvc2VNb2RhbEJ1dHRvbiwgXG4gICAgICAgIGxhYmVsRm9yVGFza0NvbnRlbnQsIFxuICAgICAgICB0YXNrQ29udGVudCwgXG4gICAgICAgIGxhYmVsRm9yRGF0ZSwgXG4gICAgICAgIGRhdGUsIFxuICAgICAgICBwcmlvcml0eVRpdGxlLCBcbiAgICAgICAgcHJpb3JpdHlPcHRpb25zLCBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwsIFxuICAgICAgICBhc3NpZ25Ub1Byb2plY3QsXG4gICAgICAgIHN1Ym1pdEJ0bik7XG4gICAgYWRkVGFza01vZGFsQ29udGVudC5hcHBlbmQodGFza0Zvcm0pO1xuICAgIGFkZFRhc2tNb2RhbC5hcHBlbmQoYWRkVGFza01vZGFsQ29udGVudCk7XG4gICAgc29tZURpdi5hcHBlbmQoYWRkVGFza01vZGFsKTtcbn1cblxuLy9leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2lkZUJhcihhcnJheU9mUHJvamVjdE5hbWVzKVxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNpZGVCYXIoc29tZURpdikge1xuICAgIGNvbnN0IHNpZGViYXJTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gICAgc2lkZWJhclNlY3Rpb24uaWQgPSAnc2lkZWJhcic7XG4gICAgc2lkZWJhclNlY3Rpb24udGV4dENvbnRlbnQgPSBcIlVwY29taW5nIFRhc2tzXCI7XG5cbiAgICBjb25zdCBsaXN0QnlUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBcbiAgICBjb25zdCBsaXN0SXRlbTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW0xQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW0xQW5jaG9yLmlkID0gJ3RvZGF5cy10YXNrcyc7XG4gICAgaXRlbTFBbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtMUFuY2hvci50ZXh0Q29udGVudCA9IFwiVG9kYXlcIjtcbiAgICBsaXN0SXRlbTEuYXBwZW5kKGl0ZW0xQW5jaG9yKTtcblxuICAgIGNvbnN0IGxpc3RJdGVtMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgaXRlbTJBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaXRlbTJBbmNob3IuaWQgPSAndGhpcy13ZWVrJztcbiAgICBpdGVtMkFuY2hvci5ocmVmID0gJyMnO1xuICAgIGl0ZW0yQW5jaG9yLnRleHRDb250ZW50ID0gXCJUaGlzIFdlZWtcIjtcbiAgICBsaXN0SXRlbTIuYXBwZW5kKGl0ZW0yQW5jaG9yKTtcbiAgICBcbiAgICBjb25zdCBsaXN0SXRlbTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW0zQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW0zQW5jaG9yLmlkID0gJ2FsbC10YXNrcyc7XG4gICAgaXRlbTNBbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtM0FuY2hvci50ZXh0Q29udGVudCA9IFwiQWxsXCI7XG4gICAgbGlzdEl0ZW0zLmFwcGVuZChpdGVtM0FuY2hvcik7XG5cbiAgICBsaXN0QnlUaW1lLmFwcGVuZChsaXN0SXRlbTEsIGxpc3RJdGVtMiwgbGlzdEl0ZW0zKTtcblxuICAgIC8vSG93IHRvIGFkZCBCeSBQcm9qZWN0P1xuXG4gICAgc2lkZWJhclNlY3Rpb24uYXBwZW5kKGxpc3RCeVRpbWUpO1xuICAgIHNvbWVEaXYuYXBwZW5kKHNpZGViYXJTZWN0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckhlYWRlcihzb21lRGl2KSB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBhZGRUYXNrQnRuLmlkID0gXCJhZGQtYS10YXNrXCI7XG4gICAgYWRkVGFza0J0bi50ZXh0Q29udGVudCA9IFwiQWRkIFRhc2tcIjtcbiAgICBoZWFkZXIuYXBwZW5kKGFkZFRhc2tCdG4pO1xuICAgIHNvbWVEaXYucHJlcGVuZChoZWFkZXIpO1xufVxuXG4vKlxuPGhlYWRlcj5cbjxkaXY+XG4gICAgPGJ1dHRvbiBpZD1cImFkZC1hLXRhc2tcIj5BZGQgdGFzazwvYnV0dG9uPlxuPC9kaXY+XG48ZGl2PlxuICAgIDxidXR0b24gaWQ9XCJhZGQtYS1wcm9qZWN0XCI+QWRkIHByb2plY3Q8L2J1dHRvbj5cbjwvZGl2PlxuPC9oZWFkZXI+XG4qLyIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuZXhwb3J0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKGRhdGUsIGNvbnRlbnQsIHByaW9yaXR5KSB7IFxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLnByb2plY3QgPSBudWxsO1xuICAgICAgICB0aGlzLmlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwMDAwMCk7XG4gICAgfVxuXG4gICAgbWFya0RvbmUoKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBodG1sRm9ybWF0KCkge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBcIm5hbWVcIjtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRoaXMuY29tcGxldGVkO1xuICAgICAgICBjaGVja2JveC5pZCA9IHRoaXMuY29udGVudDtcbiAgICBcbiAgICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKCd0YXNrLW5hbWUnKTtcbiAgICAgICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0aGlzLmNvbnRlbnQ7XG5cbiAgICAgICAgY29uc3QgdGFza0R1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRhc2tEdWUuY2xhc3NMaXN0LmFkZCgndGFzay1kdWUtZGF0ZScpO1xuICAgICAgICB0YXNrRHVlLnRleHRDb250ZW50ID0gYER1ZTogJHt0aGlzLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7d2Vla2RheTogJ3Nob3J0JyB9KX0sXG4gICAgICAgICAgICR7IHRoaXMuZGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHsgbW9udGg6ICdzaG9ydCcgfSl9LiBcbiAgICAgICAgICAgICR7IHRoaXMuZGF0ZS5nZXREYXRlKCl9IGAgIFxuICAgIFxuICAgICAgICBjb25zdCBlZGl0VGFzayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgICAgICAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdlZGl0JztcbiAgICAgICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdFRhc2spO1xuICAgIFxuICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgICAgICAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gJ3JlbW92ZSc7XG4gICAgXG4gICAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgICAgICAgaWYgKHRoaXMucHJpb3JpdHkgPT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2ltcG9ydGFudCcpO1xuICAgICAgICB9IFxuICAgICAgICBjYXJkLmFwcGVuZChjaGVja2JveCwgdGFza05hbWUsIHRhc2tEdWUsIGVkaXRCdG4sIHJlbW92ZUJ0bik7XG4gICAgICAgIHJldHVybiAoY2FyZClcbiAgICB9XG5cblxuICAgIFxufTtcblxuXG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHsgcHJlcGFyZURPTSB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHsgTWFzdGVyTGlzdCB9IGZyb20gXCIuL21hc3Rlckxpc3RcIjtcbmltcG9ydCB7IHJlbmRlck1haW4sIHJlbmRlckFkZFRhc2tNb2RhbCwgcmVuZGVyU2lkZUJhciwgcmVuZGVySGVhZGVyIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5cblxuXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5jb25zdCBzaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyQ29udGFpbmVyXCIpO1xuY29uc3QgYWRkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3ItYWRkLXRhc2stbW9kYWxcIik7XG5cbnJlbmRlckhlYWRlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKSk7XG5yZW5kZXJBZGRUYXNrTW9kYWwoYWRkRGl2KTtcbnJlbmRlclNpZGVCYXIoc2lkZSk7XG4vL3ByZXBhcmVET00oKTtcblxuXG5jb25zdCB0b2RheXNUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kYXlzLXRhc2tzXCIpO1xudG9kYXlzVGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7cmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCAndG9kYXknKX0pO1xuXG5jb25zdCBhbGxUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWxsLXRhc2tzXCIpO1xuYWxsVGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7cmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCAnYWxsJyl9KTtcblxuY29uc3Qgc2FtcGxlVGFzayA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdGaW5pc2ggT2RpbiBQcm9qZWN0JywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2syID0gbmV3IFRhc2soICcyMDIyLTA5LTIzJywgJ1ByYWN0aWNlIEt1bmcgZnUnLCAnaGlnaCcgKTtcbmNvbnN0IHNhbXBsZVRhc2szID0gbmV3IFRhc2soICcyMDIyLTA5LTIzJywgJ0Nvb2sgYSBwaWUnLCAnbm9ybWFsJyApO1xuY29uc3Qgc2FtcGxlVGFzazQgPSBuZXcgVGFzayggJzIwMjItMDktMjknLCAnU2xlZXAnLCAnaGlnaCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s1ID0gbmV3IFRhc2soICcyMDIyLTA5LTIzJywgJ0xlYXJuIFJ1YnknLCAnbm9ybWFsJyApO1xuY29uc3Qgc2FtcGxlVGFzazYgPSBuZXcgVGFzayggJzIwMjItMDktMjYnLCAnQ29kZSBUZXRyaXMnLCAnaGlnaCcgKTtcblxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0O1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2spO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2syKTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMyk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazQpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s1KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNik7XG5tYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcbi8vbWFzdGVyTGlzdC5yZW1vdmVUYXNrKHNhbXBsZVRhc2szKTtcblxubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrLCAncHJvamVjdCcsICdDb2RpbmcnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazUsICdwcm9qZWN0JywgJ0NvZGluZycpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNiwgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2szLCAnY29tcGxldGVkJywgJ3RydWUnKTtcbnJlbmRlck1haW4obWFzdGVyTGlzdCwgbWFpbiwgJ2J5UHJvamVjdCcsICdDb2RpbmcnKTtcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9