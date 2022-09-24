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
    priorityTitle.textContent = 'Priority';

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
    assignToProjectLabel.textContent = "Assign to a project:"

    const assignToProject = document.createElement("select");
    assignToProject.name = "project";
    assignToProject.id = "project";

    const projectOption1 = document.createElement("option");
    projectOption1.value = "";
    projectOption1.selected = true;
    projectOption1.hidden = true;
    projectOption1.textContent = "Choose here"; 

    const projectOption2 = document.createElement("option");
    projectOption2.value = "Coding";
    projectOption2.textContent = "Coding"; 

    assignToProject.append(projectOption1, projectOption2);

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


function renderSideBar() {
    
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFhOztBQUU2QjtBQUNYO0FBQ087O0FBRS9CO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHdDQUFJO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxxQkFBcUIseUNBQXlDO0FBQy9HLHVEQUF1RCx5Q0FBeUM7QUFDaEc7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN2Q2E7Ozs7QUFJYjtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q1k7OztBQUdMO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix3QkFBd0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw0QkFBNEI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw0QkFBNEI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMvTWE7O0FBRWI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0MscUNBQXFDLGtCQUFrQixFQUFFO0FBQy9GLGNBQWMsc0NBQXNDLGdCQUFnQixFQUFFO0FBQ3RFLGVBQWUscUJBQXFCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7O1VDMURBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOYTs7QUFFa0I7QUFDSTtBQUNPO0FBQ2dCOzs7OztBQUsxRDtBQUNBLGlEQUFpRCxtREFBVSw0QkFBNEI7O0FBRXZGO0FBQ0EsOENBQThDLG1EQUFVLDBCQUEwQjs7QUFFbEYsdUJBQXVCLHdDQUFJO0FBQzNCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7O0FBRTVCLHVCQUF1QixtREFBVTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTs7QUFFQSwyREFBa0I7QUFDbEIsZ0RBQVU7QUFDVixtREFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvbWFzdGVyTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3JlbmRlci5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBNYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7IFxuaW1wb3J0IHsgcmVuZGVyTWFpbiB9IGZyb20gXCIuL3JlbmRlclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZURPTSAoKXtcbiAgICAvLyBDYWNoZSB0aGUgRE9NXG4gICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFza1wiKTtcbiAgICBjb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1hLXRhc2stbW9kYWxcIik7XG4gICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2UtbW9kYWwtYnV0dG9uXCIpO1xuICAgIGNvbnN0IG1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbC1zdWJtaXRcIik7XG4gICAgY29uc3QgbmV3VGFza0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stY29udGVudFwiKTtcbiAgICBjb25zdCBuZXdUYXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKTtcbiAgICBjb25zdCBuZXdUYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXByaW9yaXR5XScpO1xuXG4gICAgLy8gQXJyYXlzIGZvciBldmVudHNcbiAgICBjb25zdCB0YXNrTGlzdCA9IFtdO1xuXG4gICAgLy8gQ2FsbGJhY2sgZm9yIGNyZWF0ZSB0YXNrIHN1Ym1pdFxuICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgbmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKCBuZXdUYXNrRGF0ZS52YWx1ZSwgbmV3VGFza0NvbnRlbnQudmFsdWUsIG5ld1Rhc2tQcmlvcml0eVZhbHVlKTtcbiAgICAgICAgdGFza0xpc3QucHVzaChuZXdUYXNrKTtcbiAgICAgICAgcmVuZGVyKHRhc2tMaXN0KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlbnRsaXN0ZW5lcnNcbiAgICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IGNvbnNvbGUubG9nKCdoZXJlJyk7IGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpIH0pO1xuICAgIGNsb3NlTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIikgfSk7XG4gICAgbW9kYWxTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tTdWJtaXQpO1xuICAgXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuXG5cbi8vIENvbnN0cnVjdG9yIHRvIG1ha2UgdGFzayBvYmplY3RzXG5leHBvcnQgY2xhc3MgTWFzdGVyTGlzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7IFxuICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIH1cblxuICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICB0aGlzLmRhdGEucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgbGV0IHRlbXBBcnIgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRoaXMuZGF0YS5pbmRleE9mKHRhc2spID4gLTEpIHtcbiAgICAgICAgICAgIHRlbXBBcnIucHVzaCh0aGlzLmRhdGEucG9wKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRlbXBBcnIucG9wKCk7XG4gICAgICAgIHdoaWxlICh0ZW1wQXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2godGVtcEFyci5wb3AoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGl0VGFzayh0YXNrLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGF0YVt0aGlzLmRhdGEuaW5kZXhPZih0YXNrKV1bYXR0cmlidXRlXSA9IHZhbHVlOyBcbiAgICB9XG5cbiAgICBzb3J0QnlEYXRlKCkge1xuICAgICAgICB0aGlzLmRhdGEuc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgIH1cblxuICAgIHByb2R1Y2VQcm9qZWN0TGlzdChwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gdGhpcy5kYXRhLmZpbHRlciggKHRhc2spID0+IHRhc2sucHJvamVjdCA9PSBwcm9qZWN0KTtcbiAgICAgICAgcHJvamVjdExpc3Quc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgICAgICByZXR1cm4gcHJvamVjdExpc3Q7XG4gICAgfVxuXG59IiwiXCJ1c2Ugc3RyaWN0XCJcblxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCBvcHRpb24sIHByb2plY3ROYW1lID0gbnVsbCkge1xuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IHRvZGF5R3JvdXAgPSBudWxsO1xuICAgIC8vIEZpcnN0IHJlbW92ZSBldmVyeXRoaW5nIGZyb20gbWFpblxuICAgIHdoaWxlIChtYWluLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgbWFpbi5yZW1vdmVDaGlsZChtYWluLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhvcHRpb24pXG5cbiAgICBzd2l0Y2gob3B0aW9uKSB7XG4gICAgICAgXG4gICAgICAgIGNhc2UgJ2J5UHJvamVjdCc6XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IG1hc3Rlckxpc3QucHJvZHVjZVByb2plY3RMaXN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHByb2plY3RIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgICAgIHByb2plY3RIZWFkaW5nLnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XG4gICAgICAgICAgICBtYWluLmFwcGVuZChwcm9qZWN0SGVhZGluZyk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdExpc3RbaV0uZGF0ZS5nZXREYXRlKCkgPT0gdG9kYXkuZ2V0RGF0ZSgpICYmIHByb2plY3RMaXN0W2ldLmRhdGUuZ2V0TW9udGgoKSA9PSB0b2RheS5nZXRNb250aCgpICYmIHRvZGF5R3JvdXAgPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvZGF5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdzdWJoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKHRvZGF5SGVhZGluZyk7XG4gICAgICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICAgICAgaWYgKCggcHJvamVjdExpc3RbaV0uZGF0ZS5nZXREYXRlKCkgIT0gdG9kYXkuZ2V0RGF0ZSgpICYmIHRvZGF5R3JvdXAgPT0gMSApIHx8ICggcHJvamVjdExpc3RbaV0uZGF0ZS5nZXRNb250aCgpICE9IHRvZGF5LmdldE1vbnRoKCkgJiYgdG9kYXlHcm91cCA9PSAxICkpICB7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKHByb2plY3RMaXN0W2ldLmh0bWxGb3JtYXQoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGNhc2UgJ3RvZGF5JzpcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXN0ZXJMaXN0LmRhdGEubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZS5nZXREYXRlKCkgPT0gdG9kYXkuZ2V0RGF0ZSgpICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldE1vbnRoKCkgPT0gdG9kYXkuZ2V0TW9udGgoKSAmJiB0b2RheUdyb3VwID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2RheUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgICAgIH07IFxuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldERhdGUoKSAhPSB0b2RheS5nZXREYXRlKCkpIHx8ICAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUuZ2V0TW9udGgoKSAhPSB0b2RheS5nZXRNb250aCgpKSApIHtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKG1hc3Rlckxpc3QuZGF0YVtpXS5odG1sRm9ybWF0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAndGhpc1dlZWsnOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZXJlJylcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFzdGVyTGlzdC5kYXRhLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUuZ2V0RGF0ZSgpID09IHRvZGF5LmdldERhdGUoKSAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZS5nZXRNb250aCgpID09IHRvZGF5LmdldE1vbnRoKCkgJiYgdG9kYXlHcm91cCA9PSBudWxsICkge1xuICAgICAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZS5nZXREYXRlKCkgIT0gdG9kYXkuZ2V0RGF0ZSgpICYmIHRvZGF5R3JvdXAgPT0gMSkgfHwgIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZS5nZXRNb250aCgpICE9IHRvZGF5LmdldE1vbnRoKCkgJiYgdG9kYXlHcm91cCA9PSAxKSApIHtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgICAgIG1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQobWFzdGVyTGlzdC5kYXRhW2ldLmh0bWxGb3JtYXQoKSk7XG4gICAgICAgICAgICBcblxuXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQWRkVGFza01vZGFsKHNvbWVEaXYpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyaW5nIG1vZGFsJylcbiAgICBjb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG4gICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpO1xuICAgIGFkZFRhc2tNb2RhbC5pZCA9ICdhZGQtYS10YXNrLW1vZGFsJztcblxuICAgIGNvbnN0IGFkZFRhc2tNb2RhbENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgdGFza0Zvcm0uaWQgPSAndGFzay1mb3JtJztcbiAgICBcbiAgICBjb25zdCBlbXB0eURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5pZCA9ICdjbG9zZS1tb2RhbC1idXR0b24nO1xuXG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5pbm5lckhUTUwgPSAnJnRpbWVzJztcbiAgICBcbiAgICBjb25zdCBsYWJlbEZvclRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsRm9yVGFza0NvbnRlbnQuZm9yID0gJ3Rhc2stY29udGVudCc7XG4gICAgbGFiZWxGb3JUYXNrQ29udGVudC50ZXh0Q29udGVudCA9ICdUYXNrOidcbiAgICBcbiAgICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0YXNrQ29udGVudC50eXBlID0gJ3RleHQnO1xuICAgIHRhc2tDb250ZW50LmlkID0gJ3Rhc2stY29udGVudCc7XG4gICAgdGFza0NvbnRlbnQubmFtZSA9ICd0YXNrLWNvbnRlbnQnO1xuICAgIHRhc2tDb250ZW50LnBsYWNlaG9sZGVyID0gJ0VudGVyIFRhc2snO1xuICAgIHRhc2tDb250ZW50LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBcbiAgICBjb25zdCBsYWJlbEZvckRhdGU9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBsYWJlbEZvckRhdGUuZm9yID0gJ2RhdGUnO1xuICAgIGxhYmVsRm9yRGF0ZS50ZXh0Q29udGVudCA9ICdEdWU6JztcblxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgZGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgIGRhdGUuaWQgPSAnZGF0ZSc7XG4gICAgZGF0ZS5uYW1lID0gJ2RhdGUnO1xuICAgIGRhdGUucmVxdWlyZWQgPSB0cnVlO1xuXG4gICAgY29uc3QgcHJpb3JpdHlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJpb3JpdHlUaXRsZS50ZXh0Q29udGVudCA9ICdQcmlvcml0eSc7XG5cbiAgICBjb25zdCBwcmlvcml0eU9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5pZCA9ICdwcmlvcml0eS1vcHRpb25zJztcblxuICAgIGNvbnN0IG9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG5vcm1hbFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIG5vcm1hbFJhZGlvLnR5cGUgPSBcInJhZGlvXCI7XG4gICAgbm9ybWFsUmFkaW8uaWQgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLm5hbWUgPSBcInByaW9yaXR5XCI7XG4gICAgbm9ybWFsUmFkaW8udmFsdWUgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IG5vcm1hbFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbm9ybWFsUmFkaW9MYWJlbC5mb3IgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvTGFiZWwudGV4dENvbnRlbnQgPSBcIk5vcm1hbFwiO1xuXG4gICAgY29uc3Qgb3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgaGlnaFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGhpZ2hSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgIGhpZ2hSYWRpby5pZCA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpby5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgIGhpZ2hSYWRpby52YWx1ZSA9IFwiaGlnaFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGhpZ2hSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGhpZ2hSYWRpb0xhYmVsLmZvciA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gXCJIaWdoXCI7XG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbC5mb3IgPSBcInByb2plY3RcIjtcbiAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbC50ZXh0Q29udGVudCA9IFwiQXNzaWduIHRvIGEgcHJvamVjdDpcIlxuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3QubmFtZSA9IFwicHJvamVjdFwiO1xuICAgIGFzc2lnblRvUHJvamVjdC5pZCA9IFwicHJvamVjdFwiO1xuXG4gICAgY29uc3QgcHJvamVjdE9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHByb2plY3RPcHRpb24xLnZhbHVlID0gXCJcIjtcbiAgICBwcm9qZWN0T3B0aW9uMS5zZWxlY3RlZCA9IHRydWU7XG4gICAgcHJvamVjdE9wdGlvbjEuaGlkZGVuID0gdHJ1ZTtcbiAgICBwcm9qZWN0T3B0aW9uMS50ZXh0Q29udGVudCA9IFwiQ2hvb3NlIGhlcmVcIjsgXG5cbiAgICBjb25zdCBwcm9qZWN0T3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgcHJvamVjdE9wdGlvbjIudmFsdWUgPSBcIkNvZGluZ1wiO1xuICAgIHByb2plY3RPcHRpb24yLnRleHRDb250ZW50ID0gXCJDb2RpbmdcIjsgXG5cbiAgICBhc3NpZ25Ub1Byb2plY3QuYXBwZW5kKHByb2plY3RPcHRpb24xLCBwcm9qZWN0T3B0aW9uMik7XG5cbiAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHN1Ym1pdEJ0bi50eXBlID0gXCJzdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4uaWQgPSBcIm1vZGFsLXN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi52YWx1ZSA9IFwiU3VibWl0XCI7XG4gICAgc3VibWl0QnRuLnRleHRDb250ZW50ID0gXCJTdWJtaXRcIjtcblxuXG4gICAgb3B0aW9uMS5hcHBlbmQobm9ybWFsUmFkaW8sIG5vcm1hbFJhZGlvTGFiZWwpO1xuICAgIG9wdGlvbjIuYXBwZW5kKGhpZ2hSYWRpbywgaGlnaFJhZGlvTGFiZWwpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5hcHBlbmQob3B0aW9uMSwgb3B0aW9uMik7XG4gICAgdGFza0Zvcm0uYXBwZW5kKFxuICAgICAgICBlbXB0eURpdiwgXG4gICAgICAgIGNsb3NlTW9kYWxCdXR0b24sIFxuICAgICAgICBsYWJlbEZvclRhc2tDb250ZW50LCBcbiAgICAgICAgdGFza0NvbnRlbnQsIFxuICAgICAgICBsYWJlbEZvckRhdGUsIFxuICAgICAgICBkYXRlLCBcbiAgICAgICAgcHJpb3JpdHlUaXRsZSwgXG4gICAgICAgIHByaW9yaXR5T3B0aW9ucywgXG4gICAgICAgIGFzc2lnblRvUHJvamVjdExhYmVsLCBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0LFxuICAgICAgICBzdWJtaXRCdG4pO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuYXBwZW5kKHRhc2tGb3JtKTtcbiAgICBhZGRUYXNrTW9kYWwuYXBwZW5kKGFkZFRhc2tNb2RhbENvbnRlbnQpO1xuICAgIHNvbWVEaXYuYXBwZW5kKGFkZFRhc2tNb2RhbCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNpZGVCYXIoKSB7XG4gICAgXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIENvbnN0cnVjdG9yIHRvIG1ha2UgdGFzayBvYmplY3RzXG5leHBvcnQgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IoZGF0ZSwgY29udGVudCwgcHJpb3JpdHkpIHsgXG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IG51bGw7XG4gICAgICAgIHRoaXMuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDAwMDAwKTtcbiAgICB9XG5cbiAgICBtYXJrRG9uZSgpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGh0bWxGb3JtYXQoKSB7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY2hlY2tib3gudHlwZSA9IFwiY2hlY2tib3hcIjtcbiAgICAgICAgY2hlY2tib3gubmFtZSA9IFwibmFtZVwiO1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdGhpcy5jb21wbGV0ZWQ7XG4gICAgICAgIGNoZWNrYm94LmlkID0gdGhpcy5jb250ZW50O1xuICAgIFxuICAgICAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoJ3Rhc2stbmFtZScpO1xuICAgICAgICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRoaXMuY29udGVudDtcblxuICAgICAgICBjb25zdCB0YXNrRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGFza0R1ZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWR1ZS1kYXRlJyk7XG4gICAgICAgIHRhc2tEdWUudGV4dENvbnRlbnQgPSBgRHVlOiAke3RoaXMuZGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHt3ZWVrZGF5OiAnc2hvcnQnIH0pfSxcbiAgICAgICAgICAgJHsgdGhpcy5kYXRlLnRvTG9jYWxlU3RyaW5nKCdkZWZhdWx0JywgeyBtb250aDogJ3Nob3J0JyB9KX0uIFxuICAgICAgICAgICAgJHsgdGhpcy5kYXRlLmdldERhdGUoKX0gYCAgXG4gICAgXG4gICAgICAgIGNvbnN0IGVkaXRUYXNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoJ2VkaXQtdGFzaycpO1xuICAgICAgICBlZGl0QnRuLnRleHRDb250ZW50ID0gJ2VkaXQnO1xuICAgICAgICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlZGl0VGFzayk7XG4gICAgXG4gICAgICAgIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtdGFzaycpO1xuICAgICAgICByZW1vdmVCdG4udGV4dENvbnRlbnQgPSAncmVtb3ZlJztcbiAgICBcbiAgICAgICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgICAgICBpZiAodGhpcy5wcmlvcml0eSA9PSAnaGlnaCcpIHtcbiAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50Jyk7XG4gICAgICAgIH0gXG4gICAgICAgIGNhcmQuYXBwZW5kKGNoZWNrYm94LCB0YXNrTmFtZSwgdGFza0R1ZSwgZWRpdEJ0biwgcmVtb3ZlQnRuKTtcbiAgICAgICAgcmV0dXJuIChjYXJkKVxuICAgIH1cblxuXG4gICAgXG59O1xuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgeyBwcmVwYXJlRE9NIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgeyBNYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyQWRkVGFza01vZGFsIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5cblxuXG5cbmNvbnN0IHRvZGF5c1Rhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2RheXMtdGFza3NcIik7XG50b2RheXNUYXNrcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtyZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sICd0b2RheScpfSk7XG5cbmNvbnN0IGFsbFRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhbGwtdGFza3NcIik7XG5hbGxUYXNrcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtyZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sICdhbGwnKX0pO1xuXG5jb25zdCBzYW1wbGVUYXNrID0gbmV3IFRhc2soICcyMDIyLTA5LTIzJywgJ0ZpbmlzaCBPZGluIFByb2plY3QnLCAnbm9ybWFsJyApO1xuY29uc3Qgc2FtcGxlVGFzazIgPSBuZXcgVGFzayggJzIwMjItMDktMjMnLCAnUHJhY3RpY2UgS3VuZyBmdScsICdoaWdoJyApO1xuY29uc3Qgc2FtcGxlVGFzazMgPSBuZXcgVGFzayggJzIwMjItMDktMjMnLCAnQ29vayBhIHBpZScsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrNCA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yOScsICdTbGVlcCcsICdoaWdoJyApO1xuY29uc3Qgc2FtcGxlVGFzazUgPSBuZXcgVGFzayggJzIwMjItMDktMjMnLCAnTGVhcm4gUnVieScsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrNiA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yNicsICdDb2RlIFRldHJpcycsICdoaWdoJyApO1xuXG5jb25zdCBtYXN0ZXJMaXN0ID0gbmV3IE1hc3Rlckxpc3Q7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzayk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazIpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2szKTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNCk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazUpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s2KTtcbm1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuLy9tYXN0ZXJMaXN0LnJlbW92ZVRhc2soc2FtcGxlVGFzazMpO1xuXG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2ssICdwcm9qZWN0JywgJ0NvZGluZycpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNSwgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s2LCAncHJvamVjdCcsICdDb2RpbmcnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazMsICdjb21wbGV0ZWQnLCAndHJ1ZScpO1xuXG5cblxuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuY29uc3QgYWRkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3ItYWRkLXRhc2stbW9kYWxcIik7XG5cbnJlbmRlckFkZFRhc2tNb2RhbChhZGREaXYpO1xucHJlcGFyZURPTSgpO1xucmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBtYWluLCAnYnlQcm9qZWN0JywgJ0NvZGluZycpO1xuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==