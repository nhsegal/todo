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



//import { Project } from "./tasks";



(0,_dom__WEBPACK_IMPORTED_MODULE_1__.prepareDOM)();

const sampleTask = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-24', 'Finish Odin Project', 'normal' );
const sampleTask2 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-23', 'Practice Kung fu', 'high' );
const sampleTask3 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-23', 'Cook a pie', 'normal' );
const sampleTask4 = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task( '2022-09-29', 'Sleep', 'high' );

const masterList = [];
masterList.push(sampleTask);
masterList.push(sampleTask2);
masterList.push(sampleTask3);
masterList.push(sampleTask4);
masterList.sort((a,b) => a.date - b.date);

const main = document.querySelector("main");



function renderMain() {
    let today = new Date();
    let todayGroup = null;
    for (let i = 0; i < masterList.length; i++){
        if (masterList[i].date.getDate() == today.getDate() && masterList[i].date.getMonth() == today.getMonth() && todayGroup == null ) {
            todayGroup = 1;
            const todayHeading = document.createElement("div");
            todayHeading.classList.add('heading');
            todayHeading.textContent = 'Today';
            main.append(todayHeading);
        }; 

        if ((masterList[i].date.getDate() != today.getDate() && todayGroup == 1) ||  (masterList[i].date.getMonth() != today.getMonth() && todayGroup == 1) ) {
            todayGroup = null;
            const lineBreak = document.createElement('hr');
            main.append(lineBreak);
        }; 

        main.append(masterList[i].htmlFormat());
    }
   
}


renderMain();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBYTs7QUFFa0I7QUFDL0IsV0FBVyxVQUFVOztBQUVkO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0NBQUk7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELHdDQUF3QztBQUN6RixxREFBcUQsd0NBQXdDO0FBQzdGO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7OztVQ3BEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05hOztBQUVrQjtBQUMvQixXQUFXLFVBQVU7QUFDYzs7O0FBR25DLGdEQUFVOztBQUVWLHVCQUF1Qix3Q0FBSTtBQUMzQix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuLy9pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vdGFza3NcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVET00gKCl7XG4gICAgLy8gQ2FjaGUgdGhlIERPTVxuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1hLXRhc2tcIik7XG4gICAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYS10YXNrLW1vZGFsXCIpO1xuICAgIGNvbnN0IGNsb3NlTW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb3NlLW1vZGFsLWJ1dHRvblwiKTtcbiAgICBjb25zdCBtb2RhbFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWwtc3VibWl0XCIpO1xuICAgIGNvbnN0IG5ld1Rhc2tDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWNvbnRlbnRcIik7XG4gICAgY29uc3QgbmV3VGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhdGVcIik7XG4gICAgY29uc3QgbmV3VGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1wcmlvcml0eV0nKTtcbiAgIFxuXG4gICAgLy8gQXJyYXlzIGZvciBldmVudHNcbiAgICBjb25zdCB0YXNrTGlzdCA9IFtdO1xuXG4gICAgLy8gQ2FsbGJhY2sgZm9yIGNyZWF0ZSB0YXNrIHN1Ym1pdFxuICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDtcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2YgbmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKCBuZXdUYXNrRGF0ZS52YWx1ZSwgbmV3VGFza0NvbnRlbnQudmFsdWUsIG5ld1Rhc2tQcmlvcml0eVZhbHVlKTtcbiAgICAgICAgdGFza0xpc3QucHVzaChuZXdUYXNrKTtcbiAgICAgICAgcmVuZGVyKHRhc2tMaXN0KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlbnRsaXN0ZW5lcnNcbiAgICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpfSk7XG4gICAgY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PnsgYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIil9KTtcbiAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGFza1N1Ym1pdCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gQ29uc3RydWN0b3IgdG8gbWFrZSB0YXNrIG9iamVjdHNcbmV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRlLCBjb250ZW50LCBwcmlvcml0eSkgeyBcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMDAwMDApO1xuICAgIH1cblxuICAgIG1hcmtEb25lKCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaHRtbEZvcm1hdCgpIHtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICBjaGVja2JveC5uYW1lID0gXCJuYW1lXCI7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0aGlzLmNvbXBsZXRlZDtcbiAgICAgICAgY2hlY2tib3guaWQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgXG4gICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFzay1uYW1lJyk7XG4gICAgICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGhpcy5jb250ZW50O1xuICAgIFxuICAgICAgICBjb25zdCBlZGl0VGFzayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgICAgICAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdlZGl0JztcbiAgICAgICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdFRhc2spO1xuICAgIFxuICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgICAgICAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gJ3JlbW92ZSc7XG4gICAgXG4gICAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgICAgICAgaWYgKHRoaXMucHJpb3JpdHkgPT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2ltcG9ydGFudCcpO1xuICAgICAgICB9IFxuICAgICAgICBjYXJkLmFwcGVuZChjaGVja2JveCwgdGFza05hbWUsIGVkaXRCdG4sIHJlbW92ZUJ0bik7XG4gICAgICAgIHJldHVybiAoY2FyZClcbiAgICB9XG5cblxuICAgIFxufTtcblxuXG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuLy9pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCB7IHByZXBhcmVET00gfSBmcm9tIFwiLi9kb21cIjtcblxuXG5wcmVwYXJlRE9NKCk7XG5cbmNvbnN0IHNhbXBsZVRhc2sgPSBuZXcgVGFzayggJzIwMjItMDktMjQnLCAnRmluaXNoIE9kaW4gUHJvamVjdCcsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrMiA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdQcmFjdGljZSBLdW5nIGZ1JywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrMyA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdDb29rIGEgcGllJywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s0ID0gbmV3IFRhc2soICcyMDIyLTA5LTI5JywgJ1NsZWVwJywgJ2hpZ2gnICk7XG5cbmNvbnN0IG1hc3Rlckxpc3QgPSBbXTtcbm1hc3Rlckxpc3QucHVzaChzYW1wbGVUYXNrKTtcbm1hc3Rlckxpc3QucHVzaChzYW1wbGVUYXNrMik7XG5tYXN0ZXJMaXN0LnB1c2goc2FtcGxlVGFzazMpO1xubWFzdGVyTGlzdC5wdXNoKHNhbXBsZVRhc2s0KTtcbm1hc3Rlckxpc3Quc29ydCgoYSxiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cblxuXG5mdW5jdGlvbiByZW5kZXJNYWluKCkge1xuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IHRvZGF5R3JvdXAgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFzdGVyTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmIChtYXN0ZXJMaXN0W2ldLmRhdGUuZ2V0RGF0ZSgpID09IHRvZGF5LmdldERhdGUoKSAmJiBtYXN0ZXJMaXN0W2ldLmRhdGUuZ2V0TW9udGgoKSA9PSB0b2RheS5nZXRNb250aCgpICYmIHRvZGF5R3JvdXAgPT0gbnVsbCApIHtcbiAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgbWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgICAgfTsgXG5cbiAgICAgICAgaWYgKChtYXN0ZXJMaXN0W2ldLmRhdGUuZ2V0RGF0ZSgpICE9IHRvZGF5LmdldERhdGUoKSAmJiB0b2RheUdyb3VwID09IDEpIHx8ICAobWFzdGVyTGlzdFtpXS5kYXRlLmdldE1vbnRoKCkgIT0gdG9kYXkuZ2V0TW9udGgoKSAmJiB0b2RheUdyb3VwID09IDEpICkge1xuICAgICAgICAgICAgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgbWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgfTsgXG5cbiAgICAgICAgbWFpbi5hcHBlbmQobWFzdGVyTGlzdFtpXS5odG1sRm9ybWF0KCkpO1xuICAgIH1cbiAgIFxufVxuXG5cbnJlbmRlck1haW4oKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==