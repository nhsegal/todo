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
        this.data[this.data.indexOf(task)][attribute] = value; 
    }

    sortByDate() {
        this.data.sort((a,b) => a.date - b.date);
        console.log(this.data);
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
/* harmony export */   "renderMain": () => (/* binding */ renderMain)
/* harmony export */ });



function renderMain(masterList, main, option, projectName = null) {
    let today = new Date();
    let todayGroup = null;
    switch(option) {
        case 'byProject':
           
            const projectList = masterList.produceProjectList(projectName);
            console.log(projectList);
            for (let i = 0; i < projectList.length; i++){
                if (projectList[i].date.getDate() == today.getDate() && projectList[i].date.getMonth() == today.getMonth() && todayGroup == null ) {
                    todayGroup = 1;
                    const todayHeading = document.createElement("div");
                    todayHeading.classList.add('heading');
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

            break;
        
        case 'today':
            break;

        case 'thisWeek':
            break;
        
        default:
            
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
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ "./src/render.js");








(0,_dom__WEBPACK_IMPORTED_MODULE_1__.prepareDOM)();

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
console.log(sampleTask.project)
masterList.editTask(sampleTask, 'project', 'coding');
masterList.editTask(sampleTask5, 'project', 'coding');
masterList.editTask(sampleTask6, 'project', 'coding');
masterList.editTask(sampleTask3, 'completed', 'true');

console.log(masterList);

const main = document.querySelector("main");


(0,_render__WEBPACK_IMPORTED_MODULE_3__.renderMain)(masterList, main, 'byProject', 'coding');



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBYTs7QUFFa0I7O0FBRXhCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsd0NBQUk7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELHdDQUF3QztBQUN6RixxREFBcUQsd0NBQXdDO0FBQzdGO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JDYTs7OztBQUliO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQ3hDWTs7O0FBR0w7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix3QkFBd0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDRCQUE0QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxRGE7O0FBRWI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7VUNwREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05hOztBQUVrQjtBQUNJO0FBQ087QUFDSjs7O0FBR3RDLGdEQUFVOztBQUVWLHVCQUF1Qix3Q0FBSTtBQUMzQix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJOztBQUU1Qix1QkFBdUIsbURBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBLG1EQUFVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9tYXN0ZXJMaXN0LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZURPTSAoKXtcbiAgICAvLyBDYWNoZSB0aGUgRE9NXG4gICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFza1wiKTtcbiAgICBjb25zdCBhZGRUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1hLXRhc2stbW9kYWxcIik7XG4gICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2UtbW9kYWwtYnV0dG9uXCIpO1xuICAgIGNvbnN0IG1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbC1zdWJtaXRcIik7XG4gICAgY29uc3QgbmV3VGFza0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stY29udGVudFwiKTtcbiAgICBjb25zdCBuZXdUYXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGF0ZVwiKTtcbiAgICBjb25zdCBuZXdUYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXByaW9yaXR5XScpO1xuICAgXG5cbiAgICAvLyBBcnJheXMgZm9yIGV2ZW50c1xuICAgIGNvbnN0IHRhc2tMaXN0ID0gW107XG5cbiAgICAvLyBDYWxsYmFjayBmb3IgY3JlYXRlIHRhc2sgc3VibWl0XG4gICAgY29uc3QgdGFza1N1Ym1pdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBuZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb24uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2soIG5ld1Rhc2tEYXRlLnZhbHVlLCBuZXdUYXNrQ29udGVudC52YWx1ZSwgbmV3VGFza1ByaW9yaXR5VmFsdWUpO1xuICAgICAgICB0YXNrTGlzdC5wdXNoKG5ld1Rhc2spO1xuICAgICAgICByZW5kZXIodGFza0xpc3QpO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVudGxpc3RlbmVyc1xuICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIil9KTtcbiAgICBjbG9zZU1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+eyBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKX0pO1xuICAgIG1vZGFsU3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0YXNrU3VibWl0KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5cblxuLy8gQ29uc3RydWN0b3IgdG8gbWFrZSB0YXNrIG9iamVjdHNcbmV4cG9ydCBjbGFzcyBNYXN0ZXJMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgfVxuXG4gICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIHJlbW92ZVRhc2sodGFzaykge1xuICAgICAgICBsZXQgdGVtcEFyciA9IFtdO1xuICAgICAgICB3aGlsZSAodGhpcy5kYXRhLmluZGV4T2YodGFzaykgPiAtMSkge1xuICAgICAgICAgICAgdGVtcEFyci5wdXNoKHRoaXMuZGF0YS5wb3AoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcEFyci5wb3AoKTtcbiAgICAgICAgd2hpbGUgKHRlbXBBcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEucHVzaCh0ZW1wQXJyLnBvcCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkaXRUYXNrKHRhc2ssIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhW3RoaXMuZGF0YS5pbmRleE9mKHRhc2spXVthdHRyaWJ1dGVdID0gdmFsdWU7IFxuICAgIH1cblxuICAgIHNvcnRCeURhdGUoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5zb3J0KChhLGIpID0+IGEuZGF0ZSAtIGIuZGF0ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgcHJvZHVjZVByb2plY3RMaXN0KHByb2plY3QpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSB0aGlzLmRhdGEuZmlsdGVyKCAodGFzaykgPT4gdGFzay5wcm9qZWN0ID09IHByb2plY3QpO1xuICAgICAgICBwcm9qZWN0TGlzdC5zb3J0KChhLGIpID0+IGEuZGF0ZSAtIGIuZGF0ZSk7XG4gICAgICAgIHJldHVybiBwcm9qZWN0TGlzdDtcbiAgICB9XG5cbn0iLCJcInVzZSBzdHJpY3RcIlxuXG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG1haW4sIG9wdGlvbiwgcHJvamVjdE5hbWUgPSBudWxsKSB7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBsZXQgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgc3dpdGNoKG9wdGlvbikge1xuICAgICAgICBjYXNlICdieVByb2plY3QnOlxuICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gbWFzdGVyTGlzdC5wcm9kdWNlUHJvamVjdExpc3QocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvamVjdExpc3QpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUuZ2V0RGF0ZSgpID09IHRvZGF5LmdldERhdGUoKSAmJiBwcm9qZWN0TGlzdFtpXS5kYXRlLmdldE1vbnRoKCkgPT0gdG9kYXkuZ2V0TW9udGgoKSAmJiB0b2RheUdyb3VwID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2RheUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgICAgIH07IFxuICAgICAgICAgICAgICAgIGlmICgoIHByb2plY3RMaXN0W2ldLmRhdGUuZ2V0RGF0ZSgpICE9IHRvZGF5LmdldERhdGUoKSAmJiB0b2RheUdyb3VwID09IDEgKSB8fCAoIHByb2plY3RMaXN0W2ldLmRhdGUuZ2V0TW9udGgoKSAhPSB0b2RheS5nZXRNb250aCgpICYmIHRvZGF5R3JvdXAgPT0gMSApKSAge1xuICAgICAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChwcm9qZWN0TGlzdFtpXS5odG1sRm9ybWF0KCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICAgIGNhc2UgJ3RvZGF5JzpcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3RoaXNXZWVrJzpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXN0ZXJMaXN0LmRhdGEubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZS5nZXREYXRlKCkgPT0gdG9kYXkuZ2V0RGF0ZSgpICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldE1vbnRoKCkgPT0gdG9kYXkuZ2V0TW9udGgoKSAmJiB0b2RheUdyb3VwID09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5R3JvdXAgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2RheUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICAgICAgICAgICAgICBtYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgICAgICAgICAgIH07IFxuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldERhdGUoKSAhPSB0b2RheS5nZXREYXRlKCkgJiYgdG9kYXlHcm91cCA9PSAxKSB8fCAgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlLmdldE1vbnRoKCkgIT0gdG9kYXkuZ2V0TW9udGgoKSAmJiB0b2RheUdyb3VwID09IDEpICkge1xuICAgICAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICAgICAgbWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgICAgICBtYWluLmFwcGVuZChtYXN0ZXJMaXN0LmRhdGFbaV0uaHRtbEZvcm1hdCgpKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgfSBcbiAgIFxuICAgXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gQ29uc3RydWN0b3IgdG8gbWFrZSB0YXNrIG9iamVjdHNcbmV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRlLCBjb250ZW50LCBwcmlvcml0eSkgeyBcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMDAwMDApO1xuICAgIH1cblxuICAgIG1hcmtEb25lKCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaHRtbEZvcm1hdCgpIHtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICBjaGVja2JveC5uYW1lID0gXCJuYW1lXCI7XG4gICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0aGlzLmNvbXBsZXRlZDtcbiAgICAgICAgY2hlY2tib3guaWQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgXG4gICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFzay1uYW1lJyk7XG4gICAgICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGhpcy5jb250ZW50O1xuICAgIFxuICAgICAgICBjb25zdCBlZGl0VGFzayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgICAgICAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdlZGl0JztcbiAgICAgICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdFRhc2spO1xuICAgIFxuICAgICAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgICAgICAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gJ3JlbW92ZSc7XG4gICAgXG4gICAgICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgICAgICAgaWYgKHRoaXMucHJpb3JpdHkgPT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2ltcG9ydGFudCcpO1xuICAgICAgICB9IFxuICAgICAgICBjYXJkLmFwcGVuZChjaGVja2JveCwgdGFza05hbWUsIGVkaXRCdG4sIHJlbW92ZUJ0bik7XG4gICAgICAgIHJldHVybiAoY2FyZClcbiAgICB9XG5cblxuICAgIFxufTtcblxuXG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHsgcHJlcGFyZURPTSB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHsgTWFzdGVyTGlzdCB9IGZyb20gXCIuL21hc3Rlckxpc3RcIjtcbmltcG9ydCB7IHJlbmRlck1haW4gfSBmcm9tIFwiLi9yZW5kZXJcIjtcblxuXG5wcmVwYXJlRE9NKCk7XG5cbmNvbnN0IHNhbXBsZVRhc2sgPSBuZXcgVGFzayggJzIwMjItMDktMjMnLCAnRmluaXNoIE9kaW4gUHJvamVjdCcsICdub3JtYWwnICk7XG5jb25zdCBzYW1wbGVUYXNrMiA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdQcmFjdGljZSBLdW5nIGZ1JywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrMyA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdDb29rIGEgcGllJywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s0ID0gbmV3IFRhc2soICcyMDIyLTA5LTI5JywgJ1NsZWVwJywgJ2hpZ2gnICk7XG5jb25zdCBzYW1wbGVUYXNrNSA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdMZWFybiBSdWJ5JywgJ25vcm1hbCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s2ID0gbmV3IFRhc2soICcyMDIyLTA5LTI2JywgJ0NvZGUgVGV0cmlzJywgJ2hpZ2gnICk7XG5cbmNvbnN0IG1hc3Rlckxpc3QgPSBuZXcgTWFzdGVyTGlzdDtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrKTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMik7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazMpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s0KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNSk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazYpO1xubWFzdGVyTGlzdC5zb3J0QnlEYXRlKCk7XG4vL21hc3Rlckxpc3QucmVtb3ZlVGFzayhzYW1wbGVUYXNrMyk7XG5jb25zb2xlLmxvZyhzYW1wbGVUYXNrLnByb2plY3QpXG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2ssICdwcm9qZWN0JywgJ2NvZGluZycpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNSwgJ3Byb2plY3QnLCAnY29kaW5nJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s2LCAncHJvamVjdCcsICdjb2RpbmcnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazMsICdjb21wbGV0ZWQnLCAndHJ1ZScpO1xuXG5jb25zb2xlLmxvZyhtYXN0ZXJMaXN0KTtcblxuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG5cbnJlbmRlck1haW4obWFzdGVyTGlzdCwgbWFpbiwgJ2J5UHJvamVjdCcsICdjb2RpbmcnKTtcblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=