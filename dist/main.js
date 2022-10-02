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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const main = document.querySelector('main');
const body = document.querySelector('body');

function dom() {
  return {
    get header() {
      return document.querySelector('header');
    },
    get addTaskBtn() {
      return document.querySelector('#add-a-task');
    },
    get addTaskForm() {
      return document.querySelector('#task-form');
    },
    get addTaskModal() {
      return document.querySelector('#add-a-task-modal');
    },
    get closeModalButton() {
      return document.querySelector('#close-modal-button');
    },
    get newTaskContent() {
      return document.querySelector('#task-content');
    },
    get newTaskDate() {
      return document.querySelector('#date');
    },
    get newTaskPriority() {
      const nodeList = document.querySelectorAll('input[name=priority]');
      const arrayOfPriorities = [...nodeList];
      return arrayOfPriorities;
    },
    get newTaskProject() {
      return document.querySelector('#project');
    },
    main,
    body,
    get sideBar() {
      return document.querySelector('#sidebar');
    },
    get todaysTasksSideBar() {
      return document.querySelector('#todays-tasks');
    },
    get thisWeekSideBar() {
      return document.querySelector('#this-week');
    },
    get allTasksSideBar() {
      return document.querySelector('#all-tasks');
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
      const listitems = Array.from(document.querySelector('#sidebar').children[1].children);
      let queryStr = '';
      listitems.forEach((entry, index) => {
        queryStr = `${queryStr}#${entry.firstChild.id}`;
        if (listitems[index] < listitems.length - 1) {
          queryStr += ', ';
        }
      });
      if (queryStr === '') {
        console.log('null query');
        queryStr = null;
      }
      const nodeList = document.querySelectorAll(queryStr);
      const arrayOfProjectNames = [...nodeList];
      return arrayOfProjectNames;
    },
    get sidebarProjectListRemove() {
      const listitems = Array.from(document.querySelector('#sidebar').children[1].children);
      const listOfRemoveBtns = [];
      for (let i = 0; i < listitems.length; i++) {
        listOfRemoveBtns.push(listitems[i].lastChild);
      }
      return listOfRemoveBtns;
    },
  };
}
const DOM = dom();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);


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

function addCardEventListeners(task) {
  const checkbox = document.querySelectorAll(`[data-id="${task.id}"] input`);
  checkbox[0].addEventListener('change', function (box) {
    const taskID = box.target.getAttribute('data-id');
    const retrievedTask = _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data.filter((entry) => entry.id === taskID);
    if (this.checked) {
      retrievedTask.isCompleted = true;
      box.target.parentElement.classList.add('is-completed');
    } else {
      retrievedTask.isCompleted = false;
      box.target.parentElement.classList.remove('is-completed');
    }
  });

  const editTask = (e) => {
    editting = true;
    IDNumber = e.target.parentElement.getAttribute('data-id');
    const taskToEdit = _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data.filter((t) => parseInt(t.id, 10) === parseInt(IDNumber, 10))[0];
    const yyyy = taskToEdit.date.getFullYear();
    const mm = taskToEdit.date.getMonth() + 1;
    const dd = taskToEdit.date.getDate();
    let taskDate = String(10000 * yyyy + 100 * mm + dd);
    taskDate = `${taskDate.slice(0, 4)}-${taskDate.slice(4, 6)}-${taskDate.slice(6, 8)}`;
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskContent.value = taskToEdit.content;
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskDate.value = taskDate;
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskProject.value = taskToEdit.project;
    for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskPriority) {
      if (option.value === task.priority) {
        option.checked = true;
      }
    }
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].addTaskModal.classList.toggle('closed');
  };

  const removeTask = (e) => {
    const thisTask = _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data.filter((t) => parseInt(t.id, 10) === parseInt(e.target.parentElement.getAttribute('data-id'), 10));
    _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].removeTask(thisTask[0]);
    localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data));
    _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].displayedList.splice(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].displayedList.indexOf(thisTask[0]), 1);
    localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].displayedList));
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
    addMainEventListeners();
  };

  const editBtn = document.querySelectorAll(`[data-id="${task.id}"] button`)[0];
  editBtn.addEventListener('click', editTask);

  const removeBtn = document.querySelectorAll(`[data-id="${task.id}"] button`)[1];
  removeBtn.addEventListener('click', removeTask);
}

function addMainEventListeners() {
  for (const item of _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].displayedList) {
    addCardEventListeners(item);
  }
}

function addSideTimeEventListeners() {
  try {
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].todaysTasksSideBar.addEventListener('click', () => {
      _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].update('today', null);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
      addMainEventListeners();
    });

    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].thisWeekSideBar.addEventListener('click', () => {
      _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].update('this-week', null);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
      addMainEventListeners();
    });

    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].allTasksSideBar.addEventListener('click', () => {
      _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].update('all', null);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
      addMainEventListeners();
    });
  } catch {
    console.log('failed to add today/week/all ELs');
  }
}

function addSideProjectEventListeners() {
  const removeThis = function (e) {
    if (confirm('Delete this project and all tasks in it?')) {
      const tasksToRemove = _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].produceProjectList(e.target.id.slice(0, -6));
      tasksToRemove.forEach((item) => _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].removeTask(item));
      localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data));
      localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].displayedList));
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].body, _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].getListOfProjects());
      addSideProjectEventListeners();
      addSideTimeEventListeners();
      addMainEventListeners();
    } else {
      console.log('You pressed Cancel!');
    }
  };
  for (const item of _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].sidebarProjectListRemove) {
    item.addEventListener('click', removeThis);
  }
  // SideBar Project Name ELs
  try {
    for (const item of _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].sidebarProjectList) {
      const projectLink = item;
      projectLink.addEventListener('click', () => {
        _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].update('byProject', projectLink.id);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
        addMainEventListeners();
      });
    }
  } catch {
    console.log('failed to add ELs to projects');
  }
}

function addInitialEventListeners() {
//  *** AddTaskModal open, submit, and close btn ELs ***
  // Callback for Submit Button:
  const taskSubmit = function (e) {
    e.preventDefault();
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].addTaskModal.classList.toggle('closed');
    if (editting) {
      const taskToEdit = _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data.filter((t) => parseInt(t.id, 10) === parseInt(IDNumber, 10))[0];
      _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].editTask(taskToEdit, 'content', _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskContent.value);
      _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].editTask(taskToEdit, 'date', new Date(_DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskDate.value));
      const option = Array.from(_DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskPriority)
        .filter((priorityLevel) => priorityLevel.checked)[0];
      _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].editTask(taskToEdit, 'priority', option.value);
      _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].editTask(taskToEdit, 'project', _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskProject.value);
      localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data));
      localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].displayedList));
    } else {
      let newTaskPriorityValue = null;
      _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskPriority.forEach((option) => {
        if (option.checked) {
          newTaskPriorityValue = option.value;
        }
      });
      const newTask = new _tasks__WEBPACK_IMPORTED_MODULE_2__["default"](
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskDate.value,
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskContent.value,
        newTaskPriorityValue,
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskProject.value,
      );
      _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].addTask(newTask);
      localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data));
      localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].displayedList));
    }
    _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].sortByDate();
    // Clear the modal input fields when modal is submitted
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskContent.value = null;
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskDate.value = null;
    for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskPriority) {
      _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskPriorityValue = null;
    }
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskProject.value = null;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].body, _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].getListOfProjects());
    addSideProjectEventListeners();
    addSideTimeEventListeners();
    addMainEventListeners();
  };

  _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].addTaskBtn.addEventListener('click', () => {
    editting = false;
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].addTaskModal.classList.toggle('closed');
  });

  // Clear the modal input fields when modal is closed by the x
  _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].closeModalButton.addEventListener('click', () => {
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].addTaskModal.classList.toggle('closed');
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskContent.value = null;
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskDate.value = null;
    for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskPriority) {
      _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskPriorityValue = null;
    }
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskProject.value = null;
  });
  _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].addTaskForm.addEventListener('submit', taskSubmit);

  // Today, Week, and All sideBar ELs
  try {
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].todaysTasksSideBar.addEventListener('click', () => {
      _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].update('today', null);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
      addMainEventListeners();
    });

    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].thisWeekSideBar.addEventListener('click', () => {
      _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].update('this-week', null);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
      addMainEventListeners();
    });

    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].allTasksSideBar.addEventListener('click', () => {
      _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].update('all', null);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
      addMainEventListeners();
    });
  } catch {
    console.log('failed to add event listeners');
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const currentSettings = {
  viewBy: 'all',
  whichProject: null,

  update(newView, whichP = null) {
    this.viewBy = newView;
    this.whichProject = whichP;
  },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (currentSettings);


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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// There should only be one master list
let instance = null;

// Constructor to make task objects
class MasterList {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!');
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
    console.log('sorting');
    this.data
      .sort((a, b) => {
        const byDate = a.date - b.date;
        if (byDate !== 0) {
          return byDate;
        }
        if (a.priority.localeCompare(b.priority) !== 0) {
          return a.priority.localeCompare(b.priority);
        }
        return (a.content.toLowerCase().localeCompare(b.content.toLowerCase()));
      });
  }

  produceProjectList(project) {
    const projectList = this.data.filter((task) => task.project === project);
    projectList.sort((a, b) => a.date - b.date);
    return projectList;
  }

  getListOfProjects() {
    const allProjects = [];
    this.data.forEach((task) => {
      if (task.project != null && task.project !== '' && !allProjects.some((a) => a === task.project)) {
        allProjects.push(task.project);
      }
    });
    return allProjects;
  }
}

const masterList = new MasterList();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (masterList);


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


function renderCard(task) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'isCompletedCheckbox';
  checkbox.setAttribute('data-id', task.id);
  checkbox.checked = task.isCompleted;
  checkbox.id = task.content;

  const taskName = document.createElement('div');
  taskName.classList.add('task-name');
  taskName.setAttribute('data-id', task.id);
  taskName.textContent = task.content;

  const taskDue = document.createElement('div');
  taskDue.classList.add('task-due-date');
  taskDue.setAttribute('data-id', task.id);
  taskDue.textContent = `Due: ${task.date.toLocaleString('default', { weekday: 'short' })},
        ${task.date.toLocaleString('default', { month: 'short' })}. 
        ${task.date.getDate()} `;

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-task');
  editBtn.classList.add('material-icons');
  editBtn.setAttribute('data-id', task.id);
  editBtn.textContent = 'edit';

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-task');
  removeBtn.classList.add('material-icons');
  removeBtn.setAttribute('data-id', task.id);
  removeBtn.textContent = 'delete';

  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-id', task.id);
  if (task.priority === 'high') {
    card.classList.add('important');
  }
  card.append(checkbox, taskName, taskDue, editBtn, removeBtn);
  return (card);
}

function renderMain(masterList, option, byProjectName = null) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const weekFromToday = new Date(today);
  weekFromToday.setDate(today.getDate() + 7);

  let todayGroup = null;
  let pastDue = null;
  let weekGroup = null;

  // First remove everything from main and from displayList
  while (_DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.firstChild) {
    _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.removeChild(_DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.firstChild);
    masterList.displayedList.splice(0, masterList.displayedList.length);
  }

  if (option === 'byProject') {
    const projectList = masterList.produceProjectList(byProjectName);
    const projectHeading = document.createElement('div');
    projectHeading.classList.add('heading');
    projectHeading.textContent = byProjectName;
    _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.append(projectHeading);
    for (let i = 0; i < projectList.length; i++) {
      if (projectList[i].date >= today && projectList[i].date <= today && todayGroup == null) {
        todayGroup = 1;
        const todayHeading = document.createElement('div');
        todayHeading.classList.add('subheading');
        todayHeading.textContent = 'Today';
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.append(todayHeading);
      }
      if (projectList[i].date > today && todayGroup === 1) {
        todayGroup = null;
        const lineBreak = document.createElement('hr');
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.append(lineBreak);
      }
      _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.append(renderCard(projectList[i]));
      masterList.displayedList.push(projectList[i]);
    }
  } else {
    for (let i = 0; i < masterList.data.length; i++) {
      if (masterList.data[i].date >= tomorrow && option === 'today') {
        return;
      }

      if (masterList.data[i].date > weekFromToday && option === 'this-week') {
        return;
      }

      // Past-Due Undone Block
      if (masterList.data[i].date < today
        && pastDue == null
        && masterList.data[i].isCompleted === false) {
        pastDue = 1;
        const pastDueHeading = document.createElement('div');
        pastDueHeading.classList.add('heading');
        pastDueHeading.textContent = 'Past Due';
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.append(pastDueHeading);
      }

      if (masterList.data[i].date >= today && pastDue === 1) {
        pastDue = 2;
        const lineBreak = document.createElement('hr');
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.append(lineBreak);
      }

      // Today Block
      if (masterList.data[i].date >= today
        && masterList.data[i].date < tomorrow
        && todayGroup == null) {
        todayGroup = 1;
        const todayHeading = document.createElement('div');
        todayHeading.classList.add('heading');
        todayHeading.textContent = 'Today';
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.append(todayHeading);
      }

      if (masterList.data[i].date >= tomorrow && todayGroup == 1) {
        todayGroup = 2;
        const lineBreak = document.createElement('hr');
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.append(lineBreak);
      }

      if (masterList.data[i].date <= weekFromToday
        && masterList.data[i].date >= tomorrow
        && weekGroup == null) {
        weekGroup = 1;
        const weekHeading = document.createElement('div');
        weekHeading.classList.add('heading');
        weekHeading.textContent = 'This Week';
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.append(weekHeading);
      }

      if (masterList.data[i].date > weekFromToday && weekGroup === 1) {
        weekGroup = 2;
        const lineBreak = document.createElement('hr');
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.append(lineBreak);
      }

      if ((masterList.data[i].isCompleted === false
        && masterList.data[i].date < today)
        || masterList.data[i].date >= today) {
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].main.append(renderCard(masterList.data[i]));
        masterList.displayedList.push(masterList.data[i]);
      }
    }
  }
}

function renderAddTaskModal(someDiv, arrayOfProjectNames) {
  const addTaskModal = document.createElement('div');
  addTaskModal.classList.add('modal');
  addTaskModal.classList.add('closed');
  addTaskModal.id = 'add-a-task-modal';

  const addTaskModalContent = document.createElement('div');
  addTaskModalContent.classList.add('modal-content');

  const taskForm = document.createElement('form');
  taskForm.id = 'task-form';

  const emptyDiv1 = document.createElement('div');
  emptyDiv1.textContent = ' ';
  const emptyDiv2 = document.createElement('div');
  emptyDiv2.textContent = ' ';
  const closeModalButton = document.createElement('div');
  closeModalButton.id = 'close-modal-button';

  closeModalButton.innerHTML = '&times';

  const emptyDiv3 = document.createElement('div');
  emptyDiv3.textContent = ' ';
  const labelForTaskContent = document.createElement('label');
  labelForTaskContent.for = 'task-content';
  labelForTaskContent.textContent = 'Task:';

  const taskContent = document.createElement('input');
  taskContent.type = 'text';
  taskContent.id = 'task-content';
  taskContent.name = 'task-content';
  taskContent.placeholder = 'Enter Task';
  taskContent.required = true;
  const emptyDiv4 = document.createElement('div');
  emptyDiv4.textContent = ' ';

  const labelForDate = document.createElement('label');
  labelForDate.for = 'date';
  labelForDate.textContent = 'Due:';
  const emptyDiv5 = document.createElement('div');
  emptyDiv5.textContent = ' ';

  const date = document.createElement('input');
  date.type = 'date';
  date.id = 'date';
  date.name = 'date';
  date.required = true;
  const emptyDiv6 = document.createElement('div');
  emptyDiv6.textContent = ' ';

  const priorityTitle = document.createElement('div');
  priorityTitle.textContent = 'Priority:';

  const priorityOptions = document.createElement('div');
  priorityOptions.id = 'priority-options';

  const option1 = document.createElement('div');
  const normalRadio = document.createElement('input');
  normalRadio.type = 'radio';
  normalRadio.id = 'normal';
  normalRadio.name = 'priority';
  normalRadio.value = 'normal';
  normalRadio.required = true;

  const normalRadioLabel = document.createElement('label');
  normalRadioLabel.for = 'normal';
  normalRadioLabel.textContent = 'Normal';

  const option2 = document.createElement('div');
  const highRadio = document.createElement('input');
  highRadio.type = 'radio';
  highRadio.id = 'high';
  highRadio.name = 'priority';
  highRadio.value = 'high';
  normalRadio.required = true;

  const highRadioLabel = document.createElement('label');
  highRadioLabel.for = 'high';
  highRadioLabel.textContent = 'High';

  const assignToProjectLabel = document.createElement('label');
  assignToProjectLabel.for = 'project';
  assignToProjectLabel.textContent = 'Project:';

  const assignToProject = document.createElement('input');
  assignToProject.name = 'project';
  assignToProject.id = 'project';
  assignToProject.placeholder = 'Optional';
  assignToProject.setAttribute('list', 'project-list');

  const assignToProjectDataList = document.createElement('datalist');
  assignToProjectDataList.id = 'project-list';

  arrayOfProjectNames.forEach((entry) => {
    const option = document.createElement('option');
    option.value = entry;
    option.textContent = entry;
    assignToProjectDataList.append(option);
  });

  assignToProject.append(assignToProjectDataList);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.id = 'modal-submit';
  submitBtn.value = 'Submit';
  submitBtn.textContent = 'Submit';

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

    submitBtn,
  );
  addTaskModalContent.append(taskForm);
  addTaskModal.append(addTaskModalContent);
  someDiv.append(addTaskModal);
}

function renderSideBar(someDiv, arrayOfProjectNames) {
  if (_DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].sideBar) {
    _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].sideBar.parentElement.removeChild(_DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].sideBar);
  }
  const sidebarSection = document.createElement('section');
  sidebarSection.id = 'sidebar';
  const listByTime = document.createElement('ul');
  const listItem1 = document.createElement('li');
  const item1Anchor = document.createElement('a');

  const todayIcon = document.createElement('i');
  todayIcon.classList.add('material-icons');
  todayIcon.textContent = 'today';

  item1Anchor.id = 'todays-tasks';
  item1Anchor.href = '#';
  item1Anchor.textContent = 'Today';
  item1Anchor.prepend(todayIcon);
  listItem1.append(item1Anchor);

  const weekIcon = document.createElement('i');
  weekIcon.classList.add('material-icons');
  weekIcon.textContent = 'date_range';
  const listItem2 = document.createElement('li');
  const item2Anchor = document.createElement('a');
  item2Anchor.id = 'this-week';
  item2Anchor.href = '#';
  item2Anchor.textContent = 'This Week';
  item2Anchor.prepend(weekIcon);
  listItem2.append(item2Anchor);

  const monthIcon = document.createElement('i');
  monthIcon.classList.add('material-icons');
  monthIcon.textContent = 'calendar_month';
  const listItem3 = document.createElement('li');
  const item3Anchor = document.createElement('a');
  item3Anchor.id = 'all-tasks';
  item3Anchor.href = '#';
  item3Anchor.textContent = 'All';
  item3Anchor.prepend(monthIcon);
  listItem3.append(item3Anchor);

  listByTime.append(listItem1, listItem2, listItem3);

  const listByProject = document.createElement('ul');
  listByProject.id = 'list-by-project';
  const makeLink = function (name, div) {
    const listItem = document.createElement('li');
    const itemAnchor = document.createElement('a');
    itemAnchor.id = name;
    itemAnchor.href = '#';
    itemAnchor.textContent = name;
    const removeProjectBtn = document.createElement('a');
    removeProjectBtn.id = `${name}Remove`;
    removeProjectBtn.href = '#';
    removeProjectBtn.classList.add('material-icons');
    removeProjectBtn.textContent = 'delete';
    listItem.append(itemAnchor, removeProjectBtn);
    div.append(listItem);
  };
  if (arrayOfProjectNames) {
    arrayOfProjectNames.forEach((a) => { makeLink(a, listByProject); });
  }
  sidebarSection.append(listByTime, listByProject);
  someDiv.append(sidebarSection);
}

function renderHeader(someDiv) {
  const header = document.createElement('header');
  const addTaskBtn = document.createElement('button');
  addTaskBtn.id = 'add-a-task';
  addTaskBtn.textContent = 'Add Task';
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







function myFunction(dataFromServer) {
  const parsedJSON = JSON.parse(dataFromServer);
  for (let i = 0; i < parsedJSON.length; i++) {
    const t = new _tasks__WEBPACK_IMPORTED_MODULE_0__["default"](parsedJSON[i].date, parsedJSON[i].content, parsedJSON[i].priority);
    t.project = parsedJSON[i].project;
    t.completed = parsedJSON[i].completed;
    _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].data.push(t);
  }
}

function resume() {
  const oldJSON = localStorage.getItem('oldData');
  myFunction(oldJSON);
  (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderHeader)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__["default"].body);
  (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__["default"].body, _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].getListOfProjects());
  (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderAddTaskModal)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__["default"].body, _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].getListOfProjects());
  (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_3__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_5__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_5__["default"].whichProject);

  // Add eventlisteners to header and modal
  (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addInitialEventListeners)();
  (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addSideProjectEventListeners)();
  (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addMainEventListeners)();
  _DOMCache__WEBPACK_IMPORTED_MODULE_1__["default"].sidebarProjectListRemove;
}


/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
// Constructor to make task objects
class Task {
  constructor(date, content, priority, project = null) {
    this.date = new Date(date);
    this.content = content;
    this.isCompleted = false;
    this.priority = priority;
    this.project = project;
    this.id = Math.floor(Math.random() * 100000000);
  }

  markDone() {
    this.isCompleted = true;
  }
}


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
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _freshStart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./freshStart */ "./src/freshStart.js");
/* harmony import */ var _resume__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resume */ "./src/resume.js");




if (!localStorage.getItem('oldData')) {
  (0,_freshStart__WEBPACK_IMPORTED_MODULE_1__["default"])();
  localStorage.setItem('instance', _masterList__WEBPACK_IMPORTED_MODULE_0__["default"]);
  localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data));
  localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].displayedList));
} else {
  (0,_resume__WEBPACK_IMPORTED_MODULE_2__["default"])();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLFFBQVEsNkRBQWU7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2REFBZTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkRBQWU7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2REFBZTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZEQUFlO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQLE1BQU0seURBQVc7QUFDakIsSUFBSSxtRkFBcUMsQ0FBQyx5REFBVztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLEtBQUs7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlXMkI7QUFDRTtBQUM0RTtBQUNuRTtBQU1wQjtBQUM4Qjs7QUFFaEQ7QUFDQTtBQUNBLGtCQUFrQix1QkFBdUI7QUFDekMsa0JBQWtCLDhDQUFJO0FBQ3RCO0FBQ0E7QUFDQSxJQUFJLDZEQUFvQjtBQUN4QjtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBLEVBQUUscURBQVksQ0FBQyxzREFBUTtBQUN2QixFQUFFLHNEQUFhLENBQUMsc0RBQVEsRUFBRSxxRUFBNEI7QUFDdEQsRUFBRSwyREFBa0IsQ0FBQyxzREFBUSxFQUFFLHFFQUE0QjtBQUMzRCxFQUFFLG1EQUFVLENBQUMsbURBQVUsRUFBRSwrREFBc0IsRUFBRSxxRUFBNEI7O0FBRTdFO0FBQ0EsRUFBRSxpRUFBd0I7QUFDMUIsRUFBRSxxRUFBNEI7QUFDOUIsRUFBRSw4REFBcUI7QUFDdkIsRUFBRSwwRUFBNEI7QUFDOUI7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05zQztBQUNBO0FBQ1I7O0FBRTlCO0FBQ0EsRUFBRSx1REFBVTtBQUNaLG1DQUFtQyxtREFBVTtBQUM3QyxpREFBaUQsd0RBQWU7QUFDaEUsd0RBQXdELGlFQUF3QjtBQUNoRixFQUFFO0FBQ0YsRUFBRSxtREFBTTtBQUNSIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9ET01DYWNoZS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2FkZEVMcy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2N1cnJlbnRTZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2ZyZXNoU3RhcnQuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9tYXN0ZXJMaXN0LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvcmVzdW1lLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbmZ1bmN0aW9uIGRvbSgpIHtcbiAgcmV0dXJuIHtcbiAgICBnZXQgaGVhZGVyKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuICAgIH0sXG4gICAgZ2V0IGFkZFRhc2tCdG4oKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1hLXRhc2snKTtcbiAgICB9LFxuICAgIGdldCBhZGRUYXNrRm9ybSgpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XG4gICAgfSxcbiAgICBnZXQgYWRkVGFza01vZGFsKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtYS10YXNrLW1vZGFsJyk7XG4gICAgfSxcbiAgICBnZXQgY2xvc2VNb2RhbEJ1dHRvbigpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9kYWwtYnV0dG9uJyk7XG4gICAgfSxcbiAgICBnZXQgbmV3VGFza0NvbnRlbnQoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stY29udGVudCcpO1xuICAgIH0sXG4gICAgZ2V0IG5ld1Rhc2tEYXRlKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJyk7XG4gICAgfSxcbiAgICBnZXQgbmV3VGFza1ByaW9yaXR5KCkge1xuICAgICAgY29uc3Qgbm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXByaW9yaXR5XScpO1xuICAgICAgY29uc3QgYXJyYXlPZlByaW9yaXRpZXMgPSBbLi4ubm9kZUxpc3RdO1xuICAgICAgcmV0dXJuIGFycmF5T2ZQcmlvcml0aWVzO1xuICAgIH0sXG4gICAgZ2V0IG5ld1Rhc2tQcm9qZWN0KCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XG4gICAgfSxcbiAgICBtYWluLFxuICAgIGJvZHksXG4gICAgZ2V0IHNpZGVCYXIoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXInKTtcbiAgICB9LFxuICAgIGdldCB0b2RheXNUYXNrc1NpZGVCYXIoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZGF5cy10YXNrcycpO1xuICAgIH0sXG4gICAgZ2V0IHRoaXNXZWVrU2lkZUJhcigpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhpcy13ZWVrJyk7XG4gICAgfSxcbiAgICBnZXQgYWxsVGFza3NTaWRlQmFyKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhbGwtdGFza3MnKTtcbiAgICB9LFxuICAgIGdldCBjYXJkRWRpdEJ0bnMoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXQtdGFzaycpO1xuICAgIH0sXG4gICAgZ2V0IGNhcmRSZW1vdmVCdG5zKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZW1vdmUtdGFzaycpO1xuICAgIH0sXG4gICAgZ2V0IGNhcmRDaGVja0JveHMoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW25hbWU9XCJpc0NvbXBsZXRlZENoZWNrYm94XCJdJyk7XG4gICAgfSxcbiAgICBnZXQgbGlzdEJ5UHJvamVjdCgpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGlzdC1ieS1wcm9qZWN0Jyk7XG4gICAgfSxcbiAgICBnZXQgc2lkZWJhclByb2plY3RMaXN0KCkge1xuICAgICAgLy8gSSBuZWVkIHRoZSBhbmNob3IgdGFncyBuZXh0ZWQgaW5zaWRlIHRoZSBsaSdzXG4gICAgICBjb25zdCBsaXN0aXRlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyJykuY2hpbGRyZW5bMV0uY2hpbGRyZW4pO1xuICAgICAgbGV0IHF1ZXJ5U3RyID0gJyc7XG4gICAgICBsaXN0aXRlbXMuZm9yRWFjaCgoZW50cnksIGluZGV4KSA9PiB7XG4gICAgICAgIHF1ZXJ5U3RyID0gYCR7cXVlcnlTdHJ9IyR7ZW50cnkuZmlyc3RDaGlsZC5pZH1gO1xuICAgICAgICBpZiAobGlzdGl0ZW1zW2luZGV4XSA8IGxpc3RpdGVtcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgcXVlcnlTdHIgKz0gJywgJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocXVlcnlTdHIgPT09ICcnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdudWxsIHF1ZXJ5Jyk7XG4gICAgICAgIHF1ZXJ5U3RyID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeVN0cik7XG4gICAgICBjb25zdCBhcnJheU9mUHJvamVjdE5hbWVzID0gWy4uLm5vZGVMaXN0XTtcbiAgICAgIHJldHVybiBhcnJheU9mUHJvamVjdE5hbWVzO1xuICAgIH0sXG4gICAgZ2V0IHNpZGViYXJQcm9qZWN0TGlzdFJlbW92ZSgpIHtcbiAgICAgIGNvbnN0IGxpc3RpdGVtcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXInKS5jaGlsZHJlblsxXS5jaGlsZHJlbik7XG4gICAgICBjb25zdCBsaXN0T2ZSZW1vdmVCdG5zID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsaXN0T2ZSZW1vdmVCdG5zLnB1c2gobGlzdGl0ZW1zW2ldLmxhc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdE9mUmVtb3ZlQnRucztcbiAgICB9LFxuICB9O1xufVxuY29uc3QgRE9NID0gZG9tKCk7XG5leHBvcnQgZGVmYXVsdCBET007XG4iLCJpbXBvcnQgbWFzdGVyTGlzdCBmcm9tICcuL21hc3Rlckxpc3QnO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyU2lkZUJhciB9IGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCBUYXNrIGZyb20gJy4vdGFza3MnO1xuaW1wb3J0IGN1cnJlbnRTZXR0aW5ncyBmcm9tICcuL2N1cnJlbnRTZXR0aW5ncyc7XG5pbXBvcnQgRE9NIGZyb20gJy4vRE9NQ2FjaGUnO1xuXG5sZXQgZWRpdHRpbmcgPSBmYWxzZTtcbmxldCBJRE51bWJlciA9IG51bGw7XG5cbmZ1bmN0aW9uIGFkZENhcmRFdmVudExpc3RlbmVycyh0YXNrKSB7XG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtaWQ9XCIke3Rhc2suaWR9XCJdIGlucHV0YCk7XG4gIGNoZWNrYm94WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChib3gpIHtcbiAgICBjb25zdCB0YXNrSUQgPSBib3gudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuICAgIGNvbnN0IHJldHJpZXZlZFRhc2sgPSBtYXN0ZXJMaXN0LmRhdGEuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuaWQgPT09IHRhc2tJRCk7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgcmV0cmlldmVkVGFzay5pc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICBib3gudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtY29tcGxldGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHJpZXZlZFRhc2suaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgIGJveC50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1jb21wbGV0ZWQnKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGVkaXRUYXNrID0gKGUpID0+IHtcbiAgICBlZGl0dGluZyA9IHRydWU7XG4gICAgSUROdW1iZXIgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuICAgIGNvbnN0IHRhc2tUb0VkaXQgPSBtYXN0ZXJMaXN0LmRhdGFcbiAgICAgIC5maWx0ZXIoKHQpID0+IHBhcnNlSW50KHQuaWQsIDEwKSA9PT0gcGFyc2VJbnQoSUROdW1iZXIsIDEwKSlbMF07XG4gICAgY29uc3QgeXl5eSA9IHRhc2tUb0VkaXQuZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IG1tID0gdGFza1RvRWRpdC5kYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IGRkID0gdGFza1RvRWRpdC5kYXRlLmdldERhdGUoKTtcbiAgICBsZXQgdGFza0RhdGUgPSBTdHJpbmcoMTAwMDAgKiB5eXl5ICsgMTAwICogbW0gKyBkZCk7XG4gICAgdGFza0RhdGUgPSBgJHt0YXNrRGF0ZS5zbGljZSgwLCA0KX0tJHt0YXNrRGF0ZS5zbGljZSg0LCA2KX0tJHt0YXNrRGF0ZS5zbGljZSg2LCA4KX1gO1xuICAgIERPTS5uZXdUYXNrQ29udGVudC52YWx1ZSA9IHRhc2tUb0VkaXQuY29udGVudDtcbiAgICBET00ubmV3VGFza0RhdGUudmFsdWUgPSB0YXNrRGF0ZTtcbiAgICBET00ubmV3VGFza1Byb2plY3QudmFsdWUgPSB0YXNrVG9FZGl0LnByb2plY3Q7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgRE9NLm5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgaWYgKG9wdGlvbi52YWx1ZSA9PT0gdGFzay5wcmlvcml0eSkge1xuICAgICAgICBvcHRpb24uY2hlY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnY2xvc2VkJyk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlVGFzayA9IChlKSA9PiB7XG4gICAgY29uc3QgdGhpc1Rhc2sgPSBtYXN0ZXJMaXN0LmRhdGEuZmlsdGVyKCh0KSA9PiBwYXJzZUludCh0LmlkLCAxMCkgPT09IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyksIDEwKSk7XG4gICAgbWFzdGVyTGlzdC5yZW1vdmVUYXNrKHRoaXNUYXNrWzBdKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGF0YScsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGF0YSkpO1xuICAgIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5zcGxpY2UobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LmluZGV4T2YodGhpc1Rhc2tbMF0pLCAxKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGlzcGxheUxpc3QnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QpKTtcbiAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICB9O1xuXG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1pZD1cIiR7dGFzay5pZH1cIl0gYnV0dG9uYClbMF07XG4gIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlZGl0VGFzayk7XG5cbiAgY29uc3QgcmVtb3ZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtaWQ9XCIke3Rhc2suaWR9XCJdIGJ1dHRvbmApWzFdO1xuICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVUYXNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZE1haW5FdmVudExpc3RlbmVycygpIHtcbiAgZm9yIChjb25zdCBpdGVtIG9mIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkge1xuICAgIGFkZENhcmRFdmVudExpc3RlbmVycyhpdGVtKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2lkZVRpbWVFdmVudExpc3RlbmVycygpIHtcbiAgdHJ5IHtcbiAgICBET00udG9kYXlzVGFza3NTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgndG9kYXknLCBudWxsKTtcbiAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9KTtcblxuICAgIERPTS50aGlzV2Vla1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0aGlzLXdlZWsnLCBudWxsKTtcbiAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9KTtcblxuICAgIERPTS5hbGxUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdhbGwnLCBudWxsKTtcbiAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9KTtcbiAgfSBjYXRjaCB7XG4gICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBhZGQgdG9kYXkvd2Vlay9hbGwgRUxzJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gIGNvbnN0IHJlbW92ZVRoaXMgPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChjb25maXJtKCdEZWxldGUgdGhpcyBwcm9qZWN0IGFuZCBhbGwgdGFza3MgaW4gaXQ/JykpIHtcbiAgICAgIGNvbnN0IHRhc2tzVG9SZW1vdmUgPSBtYXN0ZXJMaXN0LnByb2R1Y2VQcm9qZWN0TGlzdChlLnRhcmdldC5pZC5zbGljZSgwLCAtNikpO1xuICAgICAgdGFza3NUb1JlbW92ZS5mb3JFYWNoKChpdGVtKSA9PiBtYXN0ZXJMaXN0LnJlbW92ZVRhc2soaXRlbSkpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBET00ubWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICByZW5kZXJTaWRlQmFyKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgICAgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpO1xuICAgICAgYWRkU2lkZVRpbWVFdmVudExpc3RlbmVycygpO1xuICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdZb3UgcHJlc3NlZCBDYW5jZWwhJyk7XG4gICAgfVxuICB9O1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgRE9NLnNpZGViYXJQcm9qZWN0TGlzdFJlbW92ZSkge1xuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVUaGlzKTtcbiAgfVxuICAvLyBTaWRlQmFyIFByb2plY3QgTmFtZSBFTHNcbiAgdHJ5IHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgRE9NLnNpZGViYXJQcm9qZWN0TGlzdCkge1xuICAgICAgY29uc3QgcHJvamVjdExpbmsgPSBpdGVtO1xuICAgICAgcHJvamVjdExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2J5UHJvamVjdCcsIHByb2plY3RMaW5rLmlkKTtcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIGNvbnNvbGUubG9nKCdmYWlsZWQgdG8gYWRkIEVMcyB0byBwcm9qZWN0cycpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMoKSB7XG4vLyAgKioqIEFkZFRhc2tNb2RhbCBvcGVuLCBzdWJtaXQsIGFuZCBjbG9zZSBidG4gRUxzICoqKlxuICAvLyBDYWxsYmFjayBmb3IgU3VibWl0IEJ1dHRvbjpcbiAgY29uc3QgdGFza1N1Ym1pdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnY2xvc2VkJyk7XG4gICAgaWYgKGVkaXR0aW5nKSB7XG4gICAgICBjb25zdCB0YXNrVG9FZGl0ID0gbWFzdGVyTGlzdC5kYXRhXG4gICAgICAgIC5maWx0ZXIoKHQpID0+IHBhcnNlSW50KHQuaWQsIDEwKSA9PT0gcGFyc2VJbnQoSUROdW1iZXIsIDEwKSlbMF07XG4gICAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHRhc2tUb0VkaXQsICdjb250ZW50JywgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlKTtcbiAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgJ2RhdGUnLCBuZXcgRGF0ZShET00ubmV3VGFza0RhdGUudmFsdWUpKTtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IEFycmF5LmZyb20oRE9NLm5ld1Rhc2tQcmlvcml0eSlcbiAgICAgICAgLmZpbHRlcigocHJpb3JpdHlMZXZlbCkgPT4gcHJpb3JpdHlMZXZlbC5jaGVja2VkKVswXTtcbiAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgJ3ByaW9yaXR5Jywgb3B0aW9uLnZhbHVlKTtcbiAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgJ3Byb2plY3QnLCBET00ubmV3VGFza1Byb2plY3QudmFsdWUpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsO1xuICAgICAgRE9NLm5ld1Rhc2tQcmlvcml0eS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbi5jaGVja2VkKSB7XG4gICAgICAgICAgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBvcHRpb24udmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKFxuICAgICAgICBET00ubmV3VGFza0RhdGUudmFsdWUsXG4gICAgICAgIERPTS5uZXdUYXNrQ29udGVudC52YWx1ZSxcbiAgICAgICAgbmV3VGFza1ByaW9yaXR5VmFsdWUsXG4gICAgICAgIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSxcbiAgICAgICk7XG4gICAgICBtYXN0ZXJMaXN0LmFkZFRhc2sobmV3VGFzayk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGF0YScsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGF0YSkpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG4gICAgfVxuICAgIG1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuICAgIC8vIENsZWFyIHRoZSBtb2RhbCBpbnB1dCBmaWVsZHMgd2hlbiBtb2RhbCBpcyBzdWJtaXR0ZWRcbiAgICBET00ubmV3VGFza0NvbnRlbnQudmFsdWUgPSBudWxsO1xuICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSA9IG51bGw7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgRE9NLm5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgRE9NLm5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDtcbiAgICB9XG4gICAgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlID0gbnVsbDtcbiAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICByZW5kZXJTaWRlQmFyKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBhZGRTaWRlVGltZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gIH07XG5cbiAgRE9NLmFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZWRpdHRpbmcgPSBmYWxzZTtcbiAgICBET00uYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ2Nsb3NlZCcpO1xuICB9KTtcblxuICAvLyBDbGVhciB0aGUgbW9kYWwgaW5wdXQgZmllbGRzIHdoZW4gbW9kYWwgaXMgY2xvc2VkIGJ5IHRoZSB4XG4gIERPTS5jbG9zZU1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnY2xvc2VkJyk7XG4gICAgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlID0gbnVsbDtcbiAgICBET00ubmV3VGFza0RhdGUudmFsdWUgPSBudWxsO1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIERPTS5uZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgIERPTS5uZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG51bGw7XG4gICAgfVxuICAgIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSA9IG51bGw7XG4gIH0pO1xuICBET00uYWRkVGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGFza1N1Ym1pdCk7XG5cbiAgLy8gVG9kYXksIFdlZWssIGFuZCBBbGwgc2lkZUJhciBFTHNcbiAgdHJ5IHtcbiAgICBET00udG9kYXlzVGFza3NTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgndG9kYXknLCBudWxsKTtcbiAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9KTtcblxuICAgIERPTS50aGlzV2Vla1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0aGlzLXdlZWsnLCBudWxsKTtcbiAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9KTtcblxuICAgIERPTS5hbGxUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdhbGwnLCBudWxsKTtcbiAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9KTtcbiAgfSBjYXRjaCB7XG4gICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBhZGQgZXZlbnQgbGlzdGVuZXJzJyk7XG4gIH1cbn1cbiIsImNvbnN0IGN1cnJlbnRTZXR0aW5ncyA9IHtcbiAgdmlld0J5OiAnYWxsJyxcbiAgd2hpY2hQcm9qZWN0OiBudWxsLFxuXG4gIHVwZGF0ZShuZXdWaWV3LCB3aGljaFAgPSBudWxsKSB7XG4gICAgdGhpcy52aWV3QnkgPSBuZXdWaWV3O1xuICAgIHRoaXMud2hpY2hQcm9qZWN0ID0gd2hpY2hQO1xuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IGN1cnJlbnRTZXR0aW5ncztcbiIsIlwidXNlIHN0cmljdFwiXG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4vRE9NQ2FjaGVcIjtcbmltcG9ydCB7IGFkZE1haW5FdmVudExpc3RlbmVycywgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzLCBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vYWRkRUxzXCI7XG5pbXBvcnQgeyBtYXN0ZXJMaXN0IH0gZnJvbSBcIi4vbWFzdGVyTGlzdFwiO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyQWRkVGFza01vZGFsLCByZW5kZXJTaWRlQmFyLCByZW5kZXJIZWFkZXIgfSBmcm9tIFwiLi9yZW5kZXJcIjtcbmltcG9ydCB7IGN1cnJlbnRTZXR0aW5ncyB9IGZyb20gXCIuL2N1cnJlbnRTZXR0aW5nc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmcmVzaFN0YXJ0KCkgeyBcbiAgICBcbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgbGV0IHRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xuICAgIHRvbW9ycm93LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgMSk7XG4gICAgbGV0IGRheUFmdGVyVG9tb3Jyb3cgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgZGF5QWZ0ZXJUb21vcnJvdy5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDIpO1xuXG4gICAgbGV0IGxhdGVyRGF5ID0gbmV3IERhdGUodG9kYXkpO1xuICAgIGxhdGVyRGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgOCk7XG5cbiAgICBsZXQgeWVzdGVyZGF5ID0gbmV3IERhdGUodG9kYXkpO1xuICAgIHllc3RlcmRheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDEpO1xuXG4gICAgY29uc3Qgc2FtcGxlVGFzayA9IG5ldyBUYXNrKCB0b2RheSwgJ1JlZmFjdG9yIHRpYy10YWMtdG9lIHByb2dyYW0nLCAnbm9ybWFsJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2syID0gbmV3IFRhc2soIHRvZGF5LCAnQnV5IG1pbGsnLCAnaGlnaCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrMyA9IG5ldyBUYXNrKCB0b21vcnJvdywgJ0J1eSBiaXJ0aGRheSBjYXJkJywgJ25vcm1hbCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrNCA9IG5ldyBUYXNrKCB0b21vcnJvdywgJ0NhbGwgbW9tJywgJ2hpZ2gnICk7IFxuICAgIGNvbnN0IHNhbXBsZVRhc2s1ID0gbmV3IFRhc2soIHRvbW9ycm93LCAnRG8gUnVieSBiZWdpbm5lciB0dXRvcmlhbCcsICdub3JtYWwnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazYgPSBuZXcgVGFzayggZGF5QWZ0ZXJUb21vcnJvdywgJ1ZhY3V1bScsICdoaWdoJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2s3ID0gbmV3IFRhc2soIGRheUFmdGVyVG9tb3Jyb3csICdMYXVuZHJ5JywgJ25vcm1hbCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrOCA9IG5ldyBUYXNrKCBkYXlBZnRlclRvbW9ycm93LCAnUHJhY3RpY2UgcGlhbm8nLCAnbm9ybWFsJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2s5ID0gbmV3IFRhc2soIHRvZGF5LCAnRG9nLXNpdCBmb3IgS2ltbXknLCAnaGlnaCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrMTAgPSBuZXcgVGFzayggeWVzdGVyZGF5LCAnU2NoZWR1bGUgZGVudGlzdCBhcHBvaW50bWVudCcsICdoaWdoJyApO1xuXG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2spO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMik7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2szKTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazQpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNSk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s2KTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazcpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrOCk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s5KTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazEwKTtcbiAgICBtYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcblxuXG4gICAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrLCAncHJvamVjdCcsICdDb2RpbmcnKTtcbiAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2syLCAncHJvamVjdCcsICdTaG9wcGluZycpO1xuICAgIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazMsICdwcm9qZWN0JywgJ1Nob3BwaW5nJyk7XG4gICAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNSwgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG4gICAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNiwgJ3Byb2plY3QnLCAnSG91c2V3b3JrJyk7XG4gICAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNywgJ3Byb2plY3QnLCAnSG91c2V3b3JrJyk7XG5cbiAgICAvLyAqKioqKioqKioqKioqKipcblxuICAgIC8vIENhY2hlIERPTSBhbmQgcmVuZGVyIGVhY2ggc2VjdGlvblxuICAgIGNvbnNvbGUubG9nKG1hc3Rlckxpc3QuZGF0YSk7XG5cbiAgICByZW5kZXJIZWFkZXIoRE9NLmJvZHkpO1xuICAgIHJlbmRlclNpZGVCYXIoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgcmVuZGVyQWRkVGFza01vZGFsKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG5cbiAgICAvLyBBZGQgZXZlbnRsaXN0ZW5lcnMgdG8gaGVhZGVyIGFuZCBtb2RhbFxuICAgIGFkZEluaXRpYWxFdmVudExpc3RlbmVycygpO1xuICAgIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBET00uc2lkZWJhclByb2plY3RMaXN0UmVtb3ZlO1xufSIsIi8vIFRoZXJlIHNob3VsZCBvbmx5IGJlIG9uZSBtYXN0ZXIgbGlzdFxubGV0IGluc3RhbmNlID0gbnVsbDtcblxuLy8gQ29uc3RydWN0b3IgdG8gbWFrZSB0YXNrIG9iamVjdHNcbmNsYXNzIE1hc3Rlckxpc3Qge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbiBvbmx5IGNyZWF0ZSBvbmUgaW5zdGFuY2UhJyk7XG4gICAgfVxuICAgIGluc3RhbmNlID0gdGhpcztcbiAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICB0aGlzLmRpc3BsYXllZExpc3QgPSBbXTtcbiAgfVxuXG4gIGFkZFRhc2sodGFzaykge1xuICAgIHRoaXMuZGF0YS5wdXNoKHRhc2spO1xuICB9XG5cbiAgcmVtb3ZlVGFzayh0YXNrKSB7XG4gICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZih0YXNrKSwgMSk7XG4gIH1cblxuICBlZGl0VGFzayh0YXNrLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgdGhpcy5kYXRhW3RoaXMuZGF0YS5pbmRleE9mKHRhc2spXVthdHRyaWJ1dGVdID0gdmFsdWU7XG4gIH1cblxuICBzb3J0QnlEYXRlKCkge1xuICAgIGNvbnNvbGUubG9nKCdzb3J0aW5nJyk7XG4gICAgdGhpcy5kYXRhXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBieURhdGUgPSBhLmRhdGUgLSBiLmRhdGU7XG4gICAgICAgIGlmIChieURhdGUgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gYnlEYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhLnByaW9yaXR5LmxvY2FsZUNvbXBhcmUoYi5wcmlvcml0eSkgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eS5sb2NhbGVDb21wYXJlKGIucHJpb3JpdHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYS5jb250ZW50LnRvTG93ZXJDYXNlKCkubG9jYWxlQ29tcGFyZShiLmNvbnRlbnQudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcm9kdWNlUHJvamVjdExpc3QocHJvamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gdGhpcy5kYXRhLmZpbHRlcigodGFzaykgPT4gdGFzay5wcm9qZWN0ID09PSBwcm9qZWN0KTtcbiAgICBwcm9qZWN0TGlzdC5zb3J0KChhLCBiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgIHJldHVybiBwcm9qZWN0TGlzdDtcbiAgfVxuXG4gIGdldExpc3RPZlByb2plY3RzKCkge1xuICAgIGNvbnN0IGFsbFByb2plY3RzID0gW107XG4gICAgdGhpcy5kYXRhLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIGlmICh0YXNrLnByb2plY3QgIT0gbnVsbCAmJiB0YXNrLnByb2plY3QgIT09ICcnICYmICFhbGxQcm9qZWN0cy5zb21lKChhKSA9PiBhID09PSB0YXNrLnByb2plY3QpKSB7XG4gICAgICAgIGFsbFByb2plY3RzLnB1c2godGFzay5wcm9qZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYWxsUHJvamVjdHM7XG4gIH1cbn1cblxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0KCk7XG5leHBvcnQgZGVmYXVsdCBtYXN0ZXJMaXN0O1xuIiwiaW1wb3J0IERPTSBmcm9tICcuL0RPTUNhY2hlJztcblxuZnVuY3Rpb24gcmVuZGVyQ2FyZCh0YXNrKSB7XG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gIGNoZWNrYm94Lm5hbWUgPSAnaXNDb21wbGV0ZWRDaGVja2JveCc7XG4gIGNoZWNrYm94LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICBjaGVja2JveC5jaGVja2VkID0gdGFzay5pc0NvbXBsZXRlZDtcbiAgY2hlY2tib3guaWQgPSB0YXNrLmNvbnRlbnQ7XG5cbiAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFzay1uYW1lJyk7XG4gIHRhc2tOYW1lLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRhc2suY29udGVudDtcblxuICBjb25zdCB0YXNrRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRhc2tEdWUuY2xhc3NMaXN0LmFkZCgndGFzay1kdWUtZGF0ZScpO1xuICB0YXNrRHVlLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICB0YXNrRHVlLnRleHRDb250ZW50ID0gYER1ZTogJHt0YXNrLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7IHdlZWtkYXk6ICdzaG9ydCcgfSl9LFxuICAgICAgICAke3Rhc2suZGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHsgbW9udGg6ICdzaG9ydCcgfSl9LiBcbiAgICAgICAgJHt0YXNrLmRhdGUuZ2V0RGF0ZSgpfSBgO1xuXG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICBlZGl0QnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICBlZGl0QnRuLnRleHRDb250ZW50ID0gJ2VkaXQnO1xuXG4gIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gIHJlbW92ZUJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gJ2RlbGV0ZSc7XG5cbiAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgY2FyZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgaWYgKHRhc2sucHJpb3JpdHkgPT09ICdoaWdoJykge1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50Jyk7XG4gIH1cbiAgY2FyZC5hcHBlbmQoY2hlY2tib3gsIHRhc2tOYW1lLCB0YXNrRHVlLCBlZGl0QnRuLCByZW1vdmVCdG4pO1xuICByZXR1cm4gKGNhcmQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBvcHRpb24sIGJ5UHJvamVjdE5hbWUgPSBudWxsKSB7XG4gIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IHRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xuICB0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDEpO1xuXG4gIGNvbnN0IHdlZWtGcm9tVG9kYXkgPSBuZXcgRGF0ZSh0b2RheSk7XG4gIHdlZWtGcm9tVG9kYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA3KTtcblxuICBsZXQgdG9kYXlHcm91cCA9IG51bGw7XG4gIGxldCBwYXN0RHVlID0gbnVsbDtcbiAgbGV0IHdlZWtHcm91cCA9IG51bGw7XG5cbiAgLy8gRmlyc3QgcmVtb3ZlIGV2ZXJ5dGhpbmcgZnJvbSBtYWluIGFuZCBmcm9tIGRpc3BsYXlMaXN0XG4gIHdoaWxlIChET00ubWFpbi5maXJzdENoaWxkKSB7XG4gICAgRE9NLm1haW4ucmVtb3ZlQ2hpbGQoRE9NLm1haW4uZmlyc3RDaGlsZCk7XG4gICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnNwbGljZSgwLCBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QubGVuZ3RoKTtcbiAgfVxuXG4gIGlmIChvcHRpb24gPT09ICdieVByb2plY3QnKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBtYXN0ZXJMaXN0LnByb2R1Y2VQcm9qZWN0TGlzdChieVByb2plY3ROYW1lKTtcbiAgICBjb25zdCBwcm9qZWN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByb2plY3RIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICBwcm9qZWN0SGVhZGluZy50ZXh0Q29udGVudCA9IGJ5UHJvamVjdE5hbWU7XG4gICAgRE9NLm1haW4uYXBwZW5kKHByb2plY3RIZWFkaW5nKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocHJvamVjdExpc3RbaV0uZGF0ZSA+PSB0b2RheSAmJiBwcm9qZWN0TGlzdFtpXS5kYXRlIDw9IHRvZGF5ICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdzdWJoZWFkaW5nJyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgfVxuICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUgPiB0b2RheSAmJiB0b2RheUdyb3VwID09PSAxKSB7XG4gICAgICAgIHRvZGF5R3JvdXAgPSBudWxsO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cbiAgICAgIERPTS5tYWluLmFwcGVuZChyZW5kZXJDYXJkKHByb2plY3RMaXN0W2ldKSk7XG4gICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QucHVzaChwcm9qZWN0TGlzdFtpXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFzdGVyTGlzdC5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgb3B0aW9uID09PSAndG9kYXknKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiBvcHRpb24gPT09ICd0aGlzLXdlZWsnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUGFzdC1EdWUgVW5kb25lIEJsb2NrXG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b2RheVxuICAgICAgICAmJiBwYXN0RHVlID09IG51bGxcbiAgICAgICAgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmlzQ29tcGxldGVkID09PSBmYWxzZSkge1xuICAgICAgICBwYXN0RHVlID0gMTtcbiAgICAgICAgY29uc3QgcGFzdER1ZUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcGFzdER1ZUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICBwYXN0RHVlSGVhZGluZy50ZXh0Q29udGVudCA9ICdQYXN0IER1ZSc7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZChwYXN0RHVlSGVhZGluZyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSAmJiBwYXN0RHVlID09PSAxKSB7XG4gICAgICAgIHBhc3REdWUgPSAyO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cblxuICAgICAgLy8gVG9kYXkgQmxvY2tcbiAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheVxuICAgICAgICAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8IHRvbW9ycm93XG4gICAgICAgICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgdG9kYXlHcm91cCA9PSAxKSB7XG4gICAgICAgIHRvZGF5R3JvdXAgPSAyO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDw9IHdlZWtGcm9tVG9kYXlcbiAgICAgICAgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3dcbiAgICAgICAgJiYgd2Vla0dyb3VwID09IG51bGwpIHtcbiAgICAgICAgd2Vla0dyb3VwID0gMTtcbiAgICAgICAgY29uc3Qgd2Vla0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgd2Vla0hlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICB3ZWVrSGVhZGluZy50ZXh0Q29udGVudCA9ICdUaGlzIFdlZWsnO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQod2Vla0hlYWRpbmcpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPiB3ZWVrRnJvbVRvZGF5ICYmIHdlZWtHcm91cCA9PT0gMSkge1xuICAgICAgICB3ZWVrR3JvdXAgPSAyO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChtYXN0ZXJMaXN0LmRhdGFbaV0uaXNDb21wbGV0ZWQgPT09IGZhbHNlXG4gICAgICAgICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9kYXkpXG4gICAgICAgIHx8IG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5KSB7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZChyZW5kZXJDYXJkKG1hc3Rlckxpc3QuZGF0YVtpXSkpO1xuICAgICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QucHVzaChtYXN0ZXJMaXN0LmRhdGFbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQWRkVGFza01vZGFsKHNvbWVEaXYsIGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbCcpO1xuICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnY2xvc2VkJyk7XG4gIGFkZFRhc2tNb2RhbC5pZCA9ICdhZGQtYS10YXNrLW1vZGFsJztcblxuICBjb25zdCBhZGRUYXNrTW9kYWxDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFkZFRhc2tNb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuXG4gIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICB0YXNrRm9ybS5pZCA9ICd0YXNrLWZvcm0nO1xuXG4gIGNvbnN0IGVtcHR5RGl2MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbXB0eURpdjEudGV4dENvbnRlbnQgPSAnICc7XG4gIGNvbnN0IGVtcHR5RGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbXB0eURpdjIudGV4dENvbnRlbnQgPSAnICc7XG4gIGNvbnN0IGNsb3NlTW9kYWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2xvc2VNb2RhbEJ1dHRvbi5pZCA9ICdjbG9zZS1tb2RhbC1idXR0b24nO1xuXG4gIGNsb3NlTW9kYWxCdXR0b24uaW5uZXJIVE1MID0gJyZ0aW1lcyc7XG5cbiAgY29uc3QgZW1wdHlEaXYzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGVtcHR5RGl2My50ZXh0Q29udGVudCA9ICcgJztcbiAgY29uc3QgbGFiZWxGb3JUYXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGxhYmVsRm9yVGFza0NvbnRlbnQuZm9yID0gJ3Rhc2stY29udGVudCc7XG4gIGxhYmVsRm9yVGFza0NvbnRlbnQudGV4dENvbnRlbnQgPSAnVGFzazonO1xuXG4gIGNvbnN0IHRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgdGFza0NvbnRlbnQudHlwZSA9ICd0ZXh0JztcbiAgdGFza0NvbnRlbnQuaWQgPSAndGFzay1jb250ZW50JztcbiAgdGFza0NvbnRlbnQubmFtZSA9ICd0YXNrLWNvbnRlbnQnO1xuICB0YXNrQ29udGVudC5wbGFjZWhvbGRlciA9ICdFbnRlciBUYXNrJztcbiAgdGFza0NvbnRlbnQucmVxdWlyZWQgPSB0cnVlO1xuICBjb25zdCBlbXB0eURpdjQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZW1wdHlEaXY0LnRleHRDb250ZW50ID0gJyAnO1xuXG4gIGNvbnN0IGxhYmVsRm9yRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGxhYmVsRm9yRGF0ZS5mb3IgPSAnZGF0ZSc7XG4gIGxhYmVsRm9yRGF0ZS50ZXh0Q29udGVudCA9ICdEdWU6JztcbiAgY29uc3QgZW1wdHlEaXY1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGVtcHR5RGl2NS50ZXh0Q29udGVudCA9ICcgJztcblxuICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgZGF0ZS50eXBlID0gJ2RhdGUnO1xuICBkYXRlLmlkID0gJ2RhdGUnO1xuICBkYXRlLm5hbWUgPSAnZGF0ZSc7XG4gIGRhdGUucmVxdWlyZWQgPSB0cnVlO1xuICBjb25zdCBlbXB0eURpdjYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZW1wdHlEaXY2LnRleHRDb250ZW50ID0gJyAnO1xuXG4gIGNvbnN0IHByaW9yaXR5VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJpb3JpdHlUaXRsZS50ZXh0Q29udGVudCA9ICdQcmlvcml0eTonO1xuXG4gIGNvbnN0IHByaW9yaXR5T3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcmlvcml0eU9wdGlvbnMuaWQgPSAncHJpb3JpdHktb3B0aW9ucyc7XG5cbiAgY29uc3Qgb3B0aW9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBub3JtYWxSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIG5vcm1hbFJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICBub3JtYWxSYWRpby5pZCA9ICdub3JtYWwnO1xuICBub3JtYWxSYWRpby5uYW1lID0gJ3ByaW9yaXR5JztcbiAgbm9ybWFsUmFkaW8udmFsdWUgPSAnbm9ybWFsJztcbiAgbm9ybWFsUmFkaW8ucmVxdWlyZWQgPSB0cnVlO1xuXG4gIGNvbnN0IG5vcm1hbFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBub3JtYWxSYWRpb0xhYmVsLmZvciA9ICdub3JtYWwnO1xuICBub3JtYWxSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gJ05vcm1hbCc7XG5cbiAgY29uc3Qgb3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBoaWdoUmFkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBoaWdoUmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gIGhpZ2hSYWRpby5pZCA9ICdoaWdoJztcbiAgaGlnaFJhZGlvLm5hbWUgPSAncHJpb3JpdHknO1xuICBoaWdoUmFkaW8udmFsdWUgPSAnaGlnaCc7XG4gIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICBjb25zdCBoaWdoUmFkaW9MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGhpZ2hSYWRpb0xhYmVsLmZvciA9ICdoaWdoJztcbiAgaGlnaFJhZGlvTGFiZWwudGV4dENvbnRlbnQgPSAnSGlnaCc7XG5cbiAgY29uc3QgYXNzaWduVG9Qcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBhc3NpZ25Ub1Byb2plY3RMYWJlbC5mb3IgPSAncHJvamVjdCc7XG4gIGFzc2lnblRvUHJvamVjdExhYmVsLnRleHRDb250ZW50ID0gJ1Byb2plY3Q6JztcblxuICBjb25zdCBhc3NpZ25Ub1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBhc3NpZ25Ub1Byb2plY3QubmFtZSA9ICdwcm9qZWN0JztcbiAgYXNzaWduVG9Qcm9qZWN0LmlkID0gJ3Byb2plY3QnO1xuICBhc3NpZ25Ub1Byb2plY3QucGxhY2Vob2xkZXIgPSAnT3B0aW9uYWwnO1xuICBhc3NpZ25Ub1Byb2plY3Quc2V0QXR0cmlidXRlKCdsaXN0JywgJ3Byb2plY3QtbGlzdCcpO1xuXG4gIGNvbnN0IGFzc2lnblRvUHJvamVjdERhdGFMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGF0YWxpc3QnKTtcbiAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuaWQgPSAncHJvamVjdC1saXN0JztcblxuICBhcnJheU9mUHJvamVjdE5hbWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgb3B0aW9uLnZhbHVlID0gZW50cnk7XG4gICAgb3B0aW9uLnRleHRDb250ZW50ID0gZW50cnk7XG4gICAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuYXBwZW5kKG9wdGlvbik7XG4gIH0pO1xuXG4gIGFzc2lnblRvUHJvamVjdC5hcHBlbmQoYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QpO1xuXG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBzdWJtaXRCdG4udHlwZSA9ICdzdWJtaXQnO1xuICBzdWJtaXRCdG4uaWQgPSAnbW9kYWwtc3VibWl0JztcbiAgc3VibWl0QnRuLnZhbHVlID0gJ1N1Ym1pdCc7XG4gIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9ICdTdWJtaXQnO1xuXG4gIG9wdGlvbjEuYXBwZW5kKG5vcm1hbFJhZGlvLCBub3JtYWxSYWRpb0xhYmVsKTtcbiAgb3B0aW9uMi5hcHBlbmQoaGlnaFJhZGlvLCBoaWdoUmFkaW9MYWJlbCk7XG4gIHByaW9yaXR5T3B0aW9ucy5hcHBlbmQob3B0aW9uMSwgb3B0aW9uMik7XG4gIHRhc2tGb3JtLmFwcGVuZChcbiAgICBlbXB0eURpdjEsXG4gICAgZW1wdHlEaXYyLFxuICAgIGNsb3NlTW9kYWxCdXR0b24sXG4gICAgbGFiZWxGb3JUYXNrQ29udGVudCxcbiAgICB0YXNrQ29udGVudCxcbiAgICBlbXB0eURpdjMsXG4gICAgbGFiZWxGb3JEYXRlLFxuICAgIGRhdGUsXG4gICAgZW1wdHlEaXY0LFxuXG4gICAgcHJpb3JpdHlUaXRsZSxcbiAgICBwcmlvcml0eU9wdGlvbnMsXG4gICAgZW1wdHlEaXY1LFxuXG4gICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwsXG4gICAgYXNzaWduVG9Qcm9qZWN0LFxuICAgIGVtcHR5RGl2NixcblxuICAgIHN1Ym1pdEJ0bixcbiAgKTtcbiAgYWRkVGFza01vZGFsQ29udGVudC5hcHBlbmQodGFza0Zvcm0pO1xuICBhZGRUYXNrTW9kYWwuYXBwZW5kKGFkZFRhc2tNb2RhbENvbnRlbnQpO1xuICBzb21lRGl2LmFwcGVuZChhZGRUYXNrTW9kYWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2lkZUJhcihzb21lRGl2LCBhcnJheU9mUHJvamVjdE5hbWVzKSB7XG4gIGlmIChET00uc2lkZUJhcikge1xuICAgIERPTS5zaWRlQmFyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoRE9NLnNpZGVCYXIpO1xuICB9XG4gIGNvbnN0IHNpZGViYXJTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICBzaWRlYmFyU2VjdGlvbi5pZCA9ICdzaWRlYmFyJztcbiAgY29uc3QgbGlzdEJ5VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGNvbnN0IGxpc3RJdGVtMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gIGNvbnN0IGl0ZW0xQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gIGNvbnN0IHRvZGF5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgdG9kYXlJY29uLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gIHRvZGF5SWNvbi50ZXh0Q29udGVudCA9ICd0b2RheSc7XG5cbiAgaXRlbTFBbmNob3IuaWQgPSAndG9kYXlzLXRhc2tzJztcbiAgaXRlbTFBbmNob3IuaHJlZiA9ICcjJztcbiAgaXRlbTFBbmNob3IudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICBpdGVtMUFuY2hvci5wcmVwZW5kKHRvZGF5SWNvbik7XG4gIGxpc3RJdGVtMS5hcHBlbmQoaXRlbTFBbmNob3IpO1xuXG4gIGNvbnN0IHdlZWtJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICB3ZWVrSWNvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICB3ZWVrSWNvbi50ZXh0Q29udGVudCA9ICdkYXRlX3JhbmdlJztcbiAgY29uc3QgbGlzdEl0ZW0yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgY29uc3QgaXRlbTJBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGl0ZW0yQW5jaG9yLmlkID0gJ3RoaXMtd2Vlayc7XG4gIGl0ZW0yQW5jaG9yLmhyZWYgPSAnIyc7XG4gIGl0ZW0yQW5jaG9yLnRleHRDb250ZW50ID0gJ1RoaXMgV2Vlayc7XG4gIGl0ZW0yQW5jaG9yLnByZXBlbmQod2Vla0ljb24pO1xuICBsaXN0SXRlbTIuYXBwZW5kKGl0ZW0yQW5jaG9yKTtcblxuICBjb25zdCBtb250aEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gIG1vbnRoSWNvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICBtb250aEljb24udGV4dENvbnRlbnQgPSAnY2FsZW5kYXJfbW9udGgnO1xuICBjb25zdCBsaXN0SXRlbTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBjb25zdCBpdGVtM0FuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgaXRlbTNBbmNob3IuaWQgPSAnYWxsLXRhc2tzJztcbiAgaXRlbTNBbmNob3IuaHJlZiA9ICcjJztcbiAgaXRlbTNBbmNob3IudGV4dENvbnRlbnQgPSAnQWxsJztcbiAgaXRlbTNBbmNob3IucHJlcGVuZChtb250aEljb24pO1xuICBsaXN0SXRlbTMuYXBwZW5kKGl0ZW0zQW5jaG9yKTtcblxuICBsaXN0QnlUaW1lLmFwcGVuZChsaXN0SXRlbTEsIGxpc3RJdGVtMiwgbGlzdEl0ZW0zKTtcblxuICBjb25zdCBsaXN0QnlQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgbGlzdEJ5UHJvamVjdC5pZCA9ICdsaXN0LWJ5LXByb2plY3QnO1xuICBjb25zdCBtYWtlTGluayA9IGZ1bmN0aW9uIChuYW1lLCBkaXYpIHtcbiAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgaXRlbUFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpdGVtQW5jaG9yLmlkID0gbmFtZTtcbiAgICBpdGVtQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgaXRlbUFuY2hvci50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgY29uc3QgcmVtb3ZlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICByZW1vdmVQcm9qZWN0QnRuLmlkID0gYCR7bmFtZX1SZW1vdmVgO1xuICAgIHJlbW92ZVByb2plY3RCdG4uaHJlZiA9ICcjJztcbiAgICByZW1vdmVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gICAgcmVtb3ZlUHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICdkZWxldGUnO1xuICAgIGxpc3RJdGVtLmFwcGVuZChpdGVtQW5jaG9yLCByZW1vdmVQcm9qZWN0QnRuKTtcbiAgICBkaXYuYXBwZW5kKGxpc3RJdGVtKTtcbiAgfTtcbiAgaWYgKGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgICBhcnJheU9mUHJvamVjdE5hbWVzLmZvckVhY2goKGEpID0+IHsgbWFrZUxpbmsoYSwgbGlzdEJ5UHJvamVjdCk7IH0pO1xuICB9XG4gIHNpZGViYXJTZWN0aW9uLmFwcGVuZChsaXN0QnlUaW1lLCBsaXN0QnlQcm9qZWN0KTtcbiAgc29tZURpdi5hcHBlbmQoc2lkZWJhclNlY3Rpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVySGVhZGVyKHNvbWVEaXYpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYWRkVGFza0J0bi5pZCA9ICdhZGQtYS10YXNrJztcbiAgYWRkVGFza0J0bi50ZXh0Q29udGVudCA9ICdBZGQgVGFzayc7XG4gIGhlYWRlci5hcHBlbmQoYWRkVGFza0J0bik7XG4gIHNvbWVEaXYucHJlcGVuZChoZWFkZXIpO1xufVxuIiwiaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQgRE9NIGZyb20gJy4vRE9NQ2FjaGUnO1xuaW1wb3J0IHsgYWRkTWFpbkV2ZW50TGlzdGVuZXJzLCBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMsIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2FkZEVMcyc7XG5pbXBvcnQgbWFzdGVyTGlzdCBmcm9tICcuL21hc3Rlckxpc3QnO1xuaW1wb3J0IHtcbiAgcmVuZGVyTWFpbixcbiAgcmVuZGVyQWRkVGFza01vZGFsLFxuICByZW5kZXJTaWRlQmFyLFxuICByZW5kZXJIZWFkZXIsXG59IGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCBjdXJyZW50U2V0dGluZ3MgZnJvbSAnLi9jdXJyZW50U2V0dGluZ3MnO1xuXG5mdW5jdGlvbiBteUZ1bmN0aW9uKGRhdGFGcm9tU2VydmVyKSB7XG4gIGNvbnN0IHBhcnNlZEpTT04gPSBKU09OLnBhcnNlKGRhdGFGcm9tU2VydmVyKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJzZWRKU09OLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdCA9IG5ldyBUYXNrKHBhcnNlZEpTT05baV0uZGF0ZSwgcGFyc2VkSlNPTltpXS5jb250ZW50LCBwYXJzZWRKU09OW2ldLnByaW9yaXR5KTtcbiAgICB0LnByb2plY3QgPSBwYXJzZWRKU09OW2ldLnByb2plY3Q7XG4gICAgdC5jb21wbGV0ZWQgPSBwYXJzZWRKU09OW2ldLmNvbXBsZXRlZDtcbiAgICBtYXN0ZXJMaXN0LmRhdGEucHVzaCh0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXN1bWUoKSB7XG4gIGNvbnN0IG9sZEpTT04gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb2xkRGF0YScpO1xuICBteUZ1bmN0aW9uKG9sZEpTT04pO1xuICByZW5kZXJIZWFkZXIoRE9NLmJvZHkpO1xuICByZW5kZXJTaWRlQmFyKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICByZW5kZXJBZGRUYXNrTW9kYWwoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG5cbiAgLy8gQWRkIGV2ZW50bGlzdGVuZXJzIHRvIGhlYWRlciBhbmQgbW9kYWxcbiAgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzKCk7XG4gIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gIERPTS5zaWRlYmFyUHJvamVjdExpc3RSZW1vdmU7XG59XG4iLCIvLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKGRhdGUsIGNvbnRlbnQsIHByaW9yaXR5LCBwcm9qZWN0ID0gbnVsbCkge1xuICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIHRoaXMuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApO1xuICB9XG5cbiAgbWFya0RvbmUoKSB7XG4gICAgdGhpcy5pc0NvbXBsZXRlZCA9IHRydWU7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IG1hc3Rlckxpc3QgZnJvbSAnLi9tYXN0ZXJMaXN0JztcbmltcG9ydCBmcmVzaFN0YXJ0IGZyb20gJy4vZnJlc2hTdGFydCc7XG5pbXBvcnQgcmVzdW1lIGZyb20gJy4vcmVzdW1lJztcblxuaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb2xkRGF0YScpKSB7XG4gIGZyZXNoU3RhcnQoKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luc3RhbmNlJywgbWFzdGVyTGlzdCk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xufSBlbHNlIHtcbiAgcmVzdW1lKCk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=