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
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");



//import { Project } from "./tasks";

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
        const newTask = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( newTaskDate.value, newTaskContent.value, newTaskPriorityValue);
        taskList.push(newTask);
        render(taskList);
    }

    // Add eventlisteners
    addTaskBtn.addEventListener("click", () => { addTaskModal.classList.toggle("closed")});
    closeModalButton.addEventListener("click", ()=>{ addTaskModal.classList.toggle("closed")});
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
        this.data[this.data.indexOf(task)].attribute = value; 
    }

    sortByDate() {
        this.data.sort((a,b) => a.date - b.date);
        console.log(this.data);
    }

    produceProjectList(project) {
        const projectList = this.data.filter.call(this, (task) => task.project == project);
        return projectList
    }

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
        card.append(checkbox, taskName, editBtn, removeBtn);
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



//import { Project } from "./tasks";




(0,_dom__WEBPACK_IMPORTED_MODULE_1__.prepareDOM)();

const sampleTask = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-24', 'Finish Odin Project', 'normal' );
const sampleTask2 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-23', 'Practice Kung fu', 'high' );
const sampleTask3 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-23', 'Cook a pie', 'normal' );
const sampleTask4 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-29', 'Sleep', 'high' );

const masterList = new _masterList__WEBPACK_IMPORTED_MODULE_2__.MasterList;
masterList.addTask(sampleTask);
masterList.addTask(sampleTask2);
masterList.addTask(sampleTask3);
masterList.addTask(sampleTask4);
masterList.sortByDate();
//masterList.removeTask(sampleTask3);

//masterList.editTask(sampleTask);


const main = document.querySelector("main");

function renderMain() {
    let today = new Date();
    let todayGroup = null;
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
   
}


renderMain();



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBYTs7QUFFa0I7QUFDL0IsV0FBVyxVQUFVOztBQUVkO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0NBQUk7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELHdDQUF3QztBQUN6RixxREFBcUQsd0NBQXdDO0FBQzdGO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDYTs7OztBQUliO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUN2Q2E7O0FBRWI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7VUNwREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWtCO0FBQy9CLFdBQVcsVUFBVTtBQUNjO0FBQ087OztBQUcxQyxnREFBVTs7QUFFVix1QkFBdUIsd0NBQUk7QUFDM0Isd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7O0FBRTVCLHVCQUF1QixtREFBVTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvbWFzdGVyTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza3NcIjtcbi8vaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuL3Rhc2tzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlRE9NICgpe1xuICAgIC8vIENhY2hlIHRoZSBET01cbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYS10YXNrXCIpO1xuICAgIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFzay1tb2RhbFwiKTtcbiAgICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbG9zZS1tb2RhbC1idXR0b25cIik7XG4gICAgY29uc3QgbW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsLXN1Ym1pdFwiKTtcbiAgICBjb25zdCBuZXdUYXNrQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1jb250ZW50XCIpO1xuICAgIGNvbnN0IG5ld1Rhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpO1xuICAgIGNvbnN0IG5ld1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9cHJpb3JpdHldJyk7XG4gICBcblxuICAgIC8vIEFycmF5cyBmb3IgZXZlbnRzXG4gICAgY29uc3QgdGFza0xpc3QgPSBbXTtcblxuICAgIC8vIENhbGxiYWNrIGZvciBjcmVhdGUgdGFzayBzdWJtaXRcbiAgICBjb25zdCB0YXNrU3VibWl0ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIG5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBvcHRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayggbmV3VGFza0RhdGUudmFsdWUsIG5ld1Rhc2tDb250ZW50LnZhbHVlLCBuZXdUYXNrUHJpb3JpdHlWYWx1ZSk7XG4gICAgICAgIHRhc2tMaXN0LnB1c2gobmV3VGFzayk7XG4gICAgICAgIHJlbmRlcih0YXNrTGlzdCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGV2ZW50bGlzdGVuZXJzXG4gICAgYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKX0pO1xuICAgIGNsb3NlTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57IGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpfSk7XG4gICAgbW9kYWxTdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRhc2tTdWJtaXQpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cblxuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuZXhwb3J0IGNsYXNzIE1hc3Rlckxpc3Qge1xuICAgIGNvbnN0cnVjdG9yKCkgeyBcbiAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICB9XG5cbiAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy5kYXRhLnB1c2godGFzayk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVGFzayh0YXNrKSB7XG4gICAgICAgIGxldCB0ZW1wQXJyID0gW107XG4gICAgICAgIHdoaWxlICh0aGlzLmRhdGEuaW5kZXhPZih0YXNrKSA+IC0xKSB7XG4gICAgICAgICAgICB0ZW1wQXJyLnB1c2godGhpcy5kYXRhLnBvcCgpKTtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wQXJyLnBvcCgpO1xuICAgICAgICB3aGlsZSAodGVtcEFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoKHRlbXBBcnIucG9wKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRpdFRhc2sodGFzaywgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmRhdGFbdGhpcy5kYXRhLmluZGV4T2YodGFzayldLmF0dHJpYnV0ZSA9IHZhbHVlOyBcbiAgICB9XG5cbiAgICBzb3J0QnlEYXRlKCkge1xuICAgICAgICB0aGlzLmRhdGEuc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpO1xuICAgIH1cblxuICAgIHByb2R1Y2VQcm9qZWN0TGlzdChwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gdGhpcy5kYXRhLmZpbHRlci5jYWxsKHRoaXMsICh0YXNrKSA9PiB0YXNrLnByb2plY3QgPT0gcHJvamVjdCk7XG4gICAgICAgIHJldHVybiBwcm9qZWN0TGlzdFxuICAgIH1cblxufSIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuZXhwb3J0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKGRhdGUsIGNvbnRlbnQsIHByaW9yaXR5KSB7IFxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLnByb2plY3QgPSBudWxsO1xuICAgICAgICB0aGlzLmlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwMDAwMCk7XG4gICAgfVxuXG4gICAgbWFya0RvbmUoKSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBodG1sRm9ybWF0KCkge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgICAgIGNoZWNrYm94Lm5hbWUgPSBcIm5hbWVcIjtcbiAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRoaXMuY29tcGxldGVkO1xuICAgICAgICBjaGVja2JveC5pZCA9IHRoaXMuY29udGVudDtcbiAgICBcbiAgICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKCd0YXNrLW5hbWUnKTtcbiAgICAgICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgXG4gICAgICAgIGNvbnN0IGVkaXRUYXNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoJ2VkaXQtdGFzaycpO1xuICAgICAgICBlZGl0QnRuLnRleHRDb250ZW50ID0gJ2VkaXQnO1xuICAgICAgICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlZGl0VGFzayk7XG4gICAgXG4gICAgICAgIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtdGFzaycpO1xuICAgICAgICByZW1vdmVCdG4udGV4dENvbnRlbnQgPSAncmVtb3ZlJztcbiAgICBcbiAgICAgICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgICAgICBpZiAodGhpcy5wcmlvcml0eSA9PSAnaGlnaCcpIHtcbiAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50Jyk7XG4gICAgICAgIH0gXG4gICAgICAgIGNhcmQuYXBwZW5kKGNoZWNrYm94LCB0YXNrTmFtZSwgZWRpdEJ0biwgcmVtb3ZlQnRuKTtcbiAgICAgICAgcmV0dXJuIChjYXJkKVxuICAgIH1cblxuXG4gICAgXG59O1xuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7XG4vL2ltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHsgcHJlcGFyZURPTSB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHsgTWFzdGVyTGlzdCB9IGZyb20gXCIuL21hc3Rlckxpc3RcIjtcblxuXG5wcmVwYXJlRE9NKCk7XG5cbmNvbnN0IHNhbXBsZVRhc2sgPSBuZXcgVGFzayggJzIwMjItMDktMjQnLCAnRmluaXNoIE9kaW4gUHJvamVjdCcsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrMiA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdQcmFjdGljZSBLdW5nIGZ1JywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrMyA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdDb29rIGEgcGllJywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s0ID0gbmV3IFRhc2soICcyMDIyLTA5LTI5JywgJ1NsZWVwJywgJ2hpZ2gnICk7XG5cbmNvbnN0IG1hc3Rlckxpc3QgPSBuZXcgTWFzdGVyTGlzdDtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrKTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMik7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazMpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s0KTtcbm1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuLy9tYXN0ZXJMaXN0LnJlbW92ZVRhc2soc2FtcGxlVGFzazMpO1xuXG4vL21hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzayk7XG5cblxuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG5mdW5jdGlvbiByZW5kZXJNYWluKCkge1xuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IHRvZGF5R3JvdXAgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFzdGVyTGlzdC5kYXRhLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldERhdGUoKSA9PSB0b2RheS5nZXREYXRlKCkgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUuZ2V0TW9udGgoKSA9PSB0b2RheS5nZXRNb250aCgpICYmIHRvZGF5R3JvdXAgPT0gbnVsbCApIHtcbiAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgbWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgICAgIFxuICAgICAgICB9OyBcblxuICAgICAgICBpZiAoKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldERhdGUoKSAhPSB0b2RheS5nZXREYXRlKCkgJiYgdG9kYXlHcm91cCA9PSAxKSB8fCAgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldE1vbnRoKCkgIT0gdG9kYXkuZ2V0TW9udGgoKSAmJiB0b2RheUdyb3VwID09IDEpICkge1xuICAgICAgICAgICAgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgbWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgfTsgXG5cbiAgICAgICAgbWFpbi5hcHBlbmQobWFzdGVyTGlzdC5kYXRhW2ldLmh0bWxGb3JtYXQoKSk7XG4gICAgfVxuICAgXG59XG5cblxucmVuZGVyTWFpbigpO1xuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==