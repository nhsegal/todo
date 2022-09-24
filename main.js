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
    console.log('rendering modal')
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


function renderSideBar(arrayOfProjectNames) {
    
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



const main = document.querySelector("main");
const addDiv = document.querySelector("#for-add-task-modal");

(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderAddTaskModal)(addDiv);
(0,_dom__WEBPACK_IMPORTED_MODULE_1__.prepareDOM)();
(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(masterList, main, 'byProject', 'Coding');



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFhOztBQUU2QjtBQUNYO0FBQ087O0FBRS9CO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdDQUFJO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxxQkFBcUIseUNBQXlDO0FBQy9HLHVEQUF1RCx5Q0FBeUM7QUFDaEc7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN2Q2E7Ozs7QUFJYjtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q1k7O0FBRVo7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0JBQXdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNEJBQTRCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNEJBQTRCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR087QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzlNYTs7QUFFYjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxxQ0FBcUMsa0JBQWtCLEVBQUU7QUFDL0YsY0FBYyxzQ0FBc0MsZ0JBQWdCLEVBQUU7QUFDdEUsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7VUMxREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05hOztBQUVrQjtBQUNJO0FBQ087QUFDZ0I7Ozs7O0FBSzFEO0FBQ0EsaURBQWlELG1EQUFVLDRCQUE0Qjs7QUFFdkY7QUFDQSw4Q0FBOEMsbURBQVUsMEJBQTBCOztBQUVsRix1QkFBdUIsd0NBQUk7QUFDM0Isd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTs7QUFFNUIsdUJBQXVCLG1EQUFVO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBOztBQUVBLDJEQUFrQjtBQUNsQixnREFBVTtBQUNWLG1EQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9tYXN0ZXJMaXN0LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IE1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza3NcIjsgXG5pbXBvcnQgeyByZW5kZXJNYWluIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlRE9NICgpe1xuICAgIC8vIENhY2hlIHRoZSBET01cbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYS10YXNrXCIpO1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFzay1tb2RhbFwiKTtcbiAgICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbG9zZS1tb2RhbC1idXR0b25cIik7XG4gICAgY29uc3QgbW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsLXN1Ym1pdFwiKTtcbiAgICBjb25zdCBuZXdUYXNrQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1jb250ZW50XCIpO1xuICAgIGNvbnN0IG5ld1Rhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpO1xuICAgIGNvbnN0IG5ld1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9cHJpb3JpdHldJyk7XG5cbiAgICAvLyBBcnJheXMgZm9yIGV2ZW50c1xuICAgIGNvbnN0IHRhc2tMaXN0ID0gW107XG5cbiAgICAvLyBDYWxsYmFjayBmb3IgY3JlYXRlIHRhc2sgc3VibWl0XG4gICAgY29uc3QgdGFza1N1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBuZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2soIG5ld1Rhc2tEYXRlLnZhbHVlLCBuZXdUYXNrQ29udGVudC52YWx1ZSwgbmV3VGFza1ByaW9yaXR5VmFsdWUpO1xuICAgICAgICB0YXNrTGlzdC5wdXNoKG5ld1Rhc2spO1xuICAgICAgICByZW5kZXIodGFza0xpc3QpO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVudGxpc3RlbmVyc1xuICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgY29uc29sZS5sb2coJ2hlcmUnKTsgYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIikgfSk7XG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKSB9KTtcbiAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza1N1Ym1pdCk7XG4gICBcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5cblxuLy8gQ29uc3RydWN0b3IgdG8gbWFrZSB0YXNrIG9iamVjdHNcbmV4cG9ydCBjbGFzcyBNYXN0ZXJMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgfVxuXG4gICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIHJlbW92ZVRhc2sodGFzaykge1xuICAgICAgICBsZXQgdGVtcEFyciA9IFtdO1xuICAgICAgICB3aGlsZSAodGhpcy5kYXRhLmluZGV4T2YodGFzaykgPiAtMSkge1xuICAgICAgICAgICAgdGVtcEFyci5wdXNoKHRoaXMuZGF0YS5wb3AoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcEFyci5wb3AoKTtcbiAgICAgICAgd2hpbGUgKHRlbXBBcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEucHVzaCh0ZW1wQXJyLnBvcCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkaXRUYXNrKHRhc2ssIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhW3RoaXMuZGF0YS5pbmRleE9mKHRhc2spXVthdHRyaWJ1dGVdID0gdmFsdWU7IFxuICAgIH1cblxuICAgIHNvcnRCeURhdGUoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zb3J0KChhLGIpID0+IGEuZGF0ZSAtIGIuZGF0ZSk7XG4gICAgfVxuXG4gICAgcHJvZHVjZVByb2plY3RMaXN0KHByb2plY3QpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSB0aGlzLmRhdGEuZmlsdGVyKCAodGFzaykgPT4gdGFzay5wcm9qZWN0ID09IHByb2plY3QpO1xuICAgICAgICBwcm9qZWN0TGlzdC5zb3J0KChhLGIpID0+IGEuZGF0ZSAtIGIuZGF0ZSk7XG4gICAgICAgIHJldHVybiBwcm9qZWN0TGlzdDtcbiAgICB9XG5cbn0iLCJcInVzZSBzdHJpY3RcIlxuXG4vLyBDb21wbGV0ZSB0aGUgXCJ3ZWVrXCIgb3B0aW9uLiBBZGQgYSBcIlBhc3QgRHVlXCIgY2F0ZWdvcnlcbi8vIE1heWJlIHRoZSBzaWRlYmFyIHNob3VsZCBiZSByYWRpbyBidXR0b25zIFxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1haW4obWFzdGVyTGlzdCwgbWFpbiwgb3B0aW9uLCBwcm9qZWN0TmFtZSA9IG51bGwpIHtcbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCB0b2RheUdyb3VwID0gbnVsbDtcbiAgICAvLyBGaXJzdCByZW1vdmUgZXZlcnl0aGluZyBmcm9tIG1haW5cbiAgICB3aGlsZSAobWFpbi5maXJzdENoaWxkKSB7XG4gICAgICAgIG1haW4ucmVtb3ZlQ2hpbGQobWFpbi5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2cob3B0aW9uKVxuXG4gICAgc3dpdGNoKG9wdGlvbikge1xuICAgICAgICBjYXNlICdieVByb2plY3QnOlxuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBtYXN0ZXJMaXN0LnByb2R1Y2VQcm9qZWN0TGlzdChwcm9qZWN0TmFtZSk7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBwcm9qZWN0SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICBwcm9qZWN0SGVhZGluZy50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuICAgICAgICAgICAgbWFpbi5hcHBlbmQocHJvamVjdEhlYWRpbmcpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUuZ2V0RGF0ZSgpID09IHRvZGF5LmdldERhdGUoKSAmJiBwcm9qZWN0TGlzdFtpXS5kYXRlLmdldE1vbnRoKCkgPT0gdG9kYXkuZ2V0TW9udGgoKSAmJiB0b2RheUdyb3VwID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2RheUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnc3ViaGVhZGluZycpO1xuICAgICAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgICAgIGlmICgoIHByb2plY3RMaXN0W2ldLmRhdGUuZ2V0RGF0ZSgpICE9IHRvZGF5LmdldERhdGUoKSAmJiB0b2RheUdyb3VwID09IDEgKSB8fCAoIHByb2plY3RMaXN0W2ldLmRhdGUuZ2V0TW9udGgoKSAhPSB0b2RheS5nZXRNb250aCgpICYmIHRvZGF5R3JvdXAgPT0gMSApKSAge1xuICAgICAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChwcm9qZWN0TGlzdFtpXS5odG1sRm9ybWF0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgY2FzZSAndG9kYXknOlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXN0ZXJMaXN0LmRhdGEubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZS5nZXREYXRlKCkgPT0gdG9kYXkuZ2V0RGF0ZSgpICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldE1vbnRoKCkgPT0gdG9kYXkuZ2V0TW9udGgoKSAmJiB0b2RheUdyb3VwID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2RheUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgICAgIH07IFxuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldERhdGUoKSAhPSB0b2RheS5nZXREYXRlKCkpIHx8ICAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUuZ2V0TW9udGgoKSAhPSB0b2RheS5nZXRNb250aCgpKSApIHtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKG1hc3Rlckxpc3QuZGF0YVtpXS5odG1sRm9ybWF0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAndGhpc1dlZWsnOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZXJlJylcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFzdGVyTGlzdC5kYXRhLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUuZ2V0RGF0ZSgpID09IHRvZGF5LmdldERhdGUoKSAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZS5nZXRNb250aCgpID09IHRvZGF5LmdldE1vbnRoKCkgJiYgdG9kYXlHcm91cCA9PSBudWxsICkge1xuICAgICAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZS5nZXREYXRlKCkgIT0gdG9kYXkuZ2V0RGF0ZSgpICYmIHRvZGF5R3JvdXAgPT0gMSkgfHwgIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZS5nZXRNb250aCgpICE9IHRvZGF5LmdldE1vbnRoKCkgJiYgdG9kYXlHcm91cCA9PSAxKSApIHtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQobWFzdGVyTGlzdC5kYXRhW2ldLmh0bWxGb3JtYXQoKSk7XG4gICAgICAgICAgICBcblxuXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgfVxufVxuXG4vLyBNb2RpZnkgcmVuZGVyQWRkVGFza3NNb2RhbCB0byBhY2NlcHQgYW4gYXJyYXkgb2YgcHJvamVjdE5hbWVzIGFmdGVyIHNvbWVEaXYgXG4vLyBhbmQgdXNlIHRoaXMgYXJyYXkgYXMgdGhlIHNlbGVjdCBvcHRpb25zXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQWRkVGFza01vZGFsKHNvbWVEaXYpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyaW5nIG1vZGFsJylcbiAgICBjb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpO1xuICAgIGFkZFRhc2tNb2RhbC5pZCA9ICdhZGQtYS10YXNrLW1vZGFsJztcblxuICAgIGNvbnN0IGFkZFRhc2tNb2RhbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgdGFza0Zvcm0uaWQgPSAndGFzay1mb3JtJztcbiAgICBcbiAgICBjb25zdCBlbXB0eURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5pZCA9ICdjbG9zZS1tb2RhbC1idXR0b24nO1xuXG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzJztcbiAgICBcbiAgICBjb25zdCBsYWJlbEZvclRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsRm9yVGFza0NvbnRlbnQuZm9yID0gJ3Rhc2stY29udGVudCc7XG4gICAgbGFiZWxGb3JUYXNrQ29udGVudC50ZXh0Q29udGVudCA9ICdUYXNrOidcbiAgICBcbiAgICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0YXNrQ29udGVudC50eXBlID0gJ3RleHQnO1xuICAgIHRhc2tDb250ZW50LmlkID0gJ3Rhc2stY29udGVudCc7XG4gICAgdGFza0NvbnRlbnQubmFtZSA9ICd0YXNrLWNvbnRlbnQnO1xuICAgIHRhc2tDb250ZW50LnBsYWNlaG9sZGVyID0gJ0VudGVyIFRhc2snO1xuICAgIHRhc2tDb250ZW50LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBcbiAgICBjb25zdCBsYWJlbEZvckRhdGU9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBsYWJlbEZvckRhdGUuZm9yID0gJ2RhdGUnO1xuICAgIGxhYmVsRm9yRGF0ZS50ZXh0Q29udGVudCA9ICdEdWU6JztcblxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgZGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgIGRhdGUuaWQgPSAnZGF0ZSc7XG4gICAgZGF0ZS5uYW1lID0gJ2RhdGUnO1xuICAgIGRhdGUucmVxdWlyZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgcHJpb3JpdHlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJpb3JpdHlUaXRsZS50ZXh0Q29udGVudCA9ICdQcmlvcml0eTonO1xuXG4gICAgY29uc3QgcHJpb3JpdHlPcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eU9wdGlvbnMuaWQgPSAncHJpb3JpdHktb3B0aW9ucyc7XG5cbiAgICBjb25zdCBvcHRpb24xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBub3JtYWxSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBub3JtYWxSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgIG5vcm1hbFJhZGlvLmlkID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpby5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgIG5vcm1hbFJhZGlvLnZhbHVlID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpby5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBub3JtYWxSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIG5vcm1hbFJhZGlvTGFiZWwuZm9yID0gXCJub3JtYWxcIjtcbiAgICBub3JtYWxSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gXCJOb3JtYWxcIjtcblxuICAgIGNvbnN0IG9wdGlvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGhpZ2hSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBoaWdoUmFkaW8udHlwZSA9IFwicmFkaW9cIjtcbiAgICBoaWdoUmFkaW8uaWQgPSBcImhpZ2hcIjtcbiAgICBoaWdoUmFkaW8ubmFtZSA9IFwicHJpb3JpdHlcIjtcbiAgICBoaWdoUmFkaW8udmFsdWUgPSBcImhpZ2hcIjtcbiAgICBub3JtYWxSYWRpby5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBoaWdoUmFkaW9MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBoaWdoUmFkaW9MYWJlbC5mb3IgPSBcImhpZ2hcIjtcbiAgICBoaWdoUmFkaW9MYWJlbC50ZXh0Q29udGVudCA9IFwiSGlnaFwiO1xuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwuZm9yID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwudGV4dENvbnRlbnQgPSBcIlByb2plY3Q6XCJcblxuICAgIGNvbnN0IGFzc2lnblRvUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3QubmFtZSA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdC5pZCA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdC5wbGFjZWhvbGRlciA9IFwiT3B0aW9uYWxcIlxuICAgIGFzc2lnblRvUHJvamVjdC5zZXRBdHRyaWJ1dGUoXCJsaXN0XCIsIFwicHJvamVjdC1saXN0XCIpO1xuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGF0YWxpc3RcIik7XG4gICAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuaWQgPSBcInByb2plY3QtbGlzdFwiO1xuICAgXG4gICAgY29uc3QgcHJvamVjdE9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHByb2plY3RPcHRpb24xLnZhbHVlID0gXCJDb2RpbmdcIjtcbiAgICBwcm9qZWN0T3B0aW9uMS50ZXh0Q29udGVudCA9IFwiQ29kaW5nXCI7IFxuXG4gICAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuYXBwZW5kKHByb2plY3RPcHRpb24xKTtcbiAgICBhc3NpZ25Ub1Byb2plY3QuYXBwZW5kKGFzc2lnblRvUHJvamVjdERhdGFMaXN0KTtcblxuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc3VibWl0QnRuLnR5cGUgPSBcInN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi5pZCA9IFwibW9kYWwtc3VibWl0XCI7XG4gICAgc3VibWl0QnRuLnZhbHVlID0gXCJTdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xuXG4gICAgb3B0aW9uMS5hcHBlbmQobm9ybWFsUmFkaW8sIG5vcm1hbFJhZGlvTGFiZWwpO1xuICAgIG9wdGlvbjIuYXBwZW5kKGhpZ2hSYWRpbywgaGlnaFJhZGlvTGFiZWwpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5hcHBlbmQob3B0aW9uMSwgb3B0aW9uMik7XG4gICAgdGFza0Zvcm0uYXBwZW5kKFxuICAgICAgICBlbXB0eURpdiwgXG4gICAgICAgIGNsb3NlTW9kYWxCdXR0b24sIFxuICAgICAgICBsYWJlbEZvclRhc2tDb250ZW50LCBcbiAgICAgICAgdGFza0NvbnRlbnQsIFxuICAgICAgICBsYWJlbEZvckRhdGUsIFxuICAgICAgICBkYXRlLCBcbiAgICAgICAgcHJpb3JpdHlUaXRsZSwgXG4gICAgICAgIHByaW9yaXR5T3B0aW9ucywgXG4gICAgICAgIGFzc2lnblRvUHJvamVjdExhYmVsLCBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0LFxuICAgICAgICBzdWJtaXRCdG4pO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuYXBwZW5kKHRhc2tGb3JtKTtcbiAgICBhZGRUYXNrTW9kYWwuYXBwZW5kKGFkZFRhc2tNb2RhbENvbnRlbnQpO1xuICAgIHNvbWVEaXYuYXBwZW5kKGFkZFRhc2tNb2RhbCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNpZGVCYXIoYXJyYXlPZlByb2plY3ROYW1lcykge1xuICAgIFxufSIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuZXhwb3J0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKGRhdGUsIGNvbnRlbnQsIHByaW9yaXR5KSB7IFxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLnByb2plY3QgPSBudWxsO1xuICAgICAgICB0aGlzLmlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwMDAwMCk7XG4gICAgfVxuXG4gICAgbWFya0RvbmUoKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBodG1sRm9ybWF0KCkge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBcIm5hbWVcIjtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRoaXMuY29tcGxldGVkO1xuICAgICAgICBjaGVja2JveC5pZCA9IHRoaXMuY29udGVudDtcbiAgICBcbiAgICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKCd0YXNrLW5hbWUnKTtcbiAgICAgICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0aGlzLmNvbnRlbnQ7XG5cbiAgICAgICAgY29uc3QgdGFza0R1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRhc2tEdWUuY2xhc3NMaXN0LmFkZCgndGFzay1kdWUtZGF0ZScpO1xuICAgICAgICB0YXNrRHVlLnRleHRDb250ZW50ID0gYER1ZTogJHt0aGlzLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7d2Vla2RheTogJ3Nob3J0JyB9KX0sXG4gICAgICAgICAgICR7IHRoaXMuZGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHsgbW9udGg6ICdzaG9ydCcgfSl9LiBcbiAgICAgICAgICAgICR7IHRoaXMuZGF0ZS5nZXREYXRlKCl9IGAgIFxuICAgIFxuICAgICAgICBjb25zdCBlZGl0VGFzayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgICAgICAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdlZGl0JztcbiAgICAgICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdFRhc2spO1xuICAgIFxuICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgICAgICAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gJ3JlbW92ZSc7XG4gICAgXG4gICAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgICAgICAgaWYgKHRoaXMucHJpb3JpdHkgPT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2ltcG9ydGFudCcpO1xuICAgICAgICB9IFxuICAgICAgICBjYXJkLmFwcGVuZChjaGVja2JveCwgdGFza05hbWUsIHRhc2tEdWUsIGVkaXRCdG4sIHJlbW92ZUJ0bik7XG4gICAgICAgIHJldHVybiAoY2FyZClcbiAgICB9XG5cblxuICAgIFxufTtcblxuXG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHsgcHJlcGFyZURPTSB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHsgTWFzdGVyTGlzdCB9IGZyb20gXCIuL21hc3Rlckxpc3RcIjtcbmltcG9ydCB7IHJlbmRlck1haW4sIHJlbmRlckFkZFRhc2tNb2RhbCB9IGZyb20gXCIuL3JlbmRlclwiO1xuXG5cblxuXG5jb25zdCB0b2RheXNUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kYXlzLXRhc2tzXCIpO1xudG9kYXlzVGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7cmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCAndG9kYXknKX0pO1xuXG5jb25zdCBhbGxUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWxsLXRhc2tzXCIpO1xuYWxsVGFza3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7cmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCAnYWxsJyl9KTtcblxuY29uc3Qgc2FtcGxlVGFzayA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdGaW5pc2ggT2RpbiBQcm9qZWN0JywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2syID0gbmV3IFRhc2soICcyMDIyLTA5LTIzJywgJ1ByYWN0aWNlIEt1bmcgZnUnLCAnaGlnaCcgKTtcbmNvbnN0IHNhbXBsZVRhc2szID0gbmV3IFRhc2soICcyMDIyLTA5LTIzJywgJ0Nvb2sgYSBwaWUnLCAnbm9ybWFsJyApO1xuY29uc3Qgc2FtcGxlVGFzazQgPSBuZXcgVGFzayggJzIwMjItMDktMjknLCAnU2xlZXAnLCAnaGlnaCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s1ID0gbmV3IFRhc2soICcyMDIyLTA5LTIzJywgJ0xlYXJuIFJ1YnknLCAnbm9ybWFsJyApO1xuY29uc3Qgc2FtcGxlVGFzazYgPSBuZXcgVGFzayggJzIwMjItMDktMjYnLCAnQ29kZSBUZXRyaXMnLCAnaGlnaCcgKTtcblxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0O1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2spO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2syKTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMyk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazQpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s1KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNik7XG5tYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcbi8vbWFzdGVyTGlzdC5yZW1vdmVUYXNrKHNhbXBsZVRhc2szKTtcblxubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrLCAncHJvamVjdCcsICdDb2RpbmcnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazUsICdwcm9qZWN0JywgJ0NvZGluZycpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNiwgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2szLCAnY29tcGxldGVkJywgJ3RydWUnKTtcblxuXG5cbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbmNvbnN0IGFkZERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9yLWFkZC10YXNrLW1vZGFsXCIpO1xuXG5yZW5kZXJBZGRUYXNrTW9kYWwoYWRkRGl2KTtcbnByZXBhcmVET00oKTtcbnJlbmRlck1haW4obWFzdGVyTGlzdCwgbWFpbiwgJ2J5UHJvamVjdCcsICdDb2RpbmcnKTtcblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=