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
function dom() {
  const main = document.querySelector('main');
  const body = document.querySelector('body');
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
      const nodeListOfProjectLinks = document.getElementById('list-by-project').children;
      const arr = [];
      for (const child of nodeListOfProjectLinks) {
        arr.push(child.firstChild);
      }
      return arr;
    },
    get sidebarProjectListRemoveBtns() {
      const nodeListOfProjectLinks = document.getElementById('list-by-project').children;
      const arr = [];
      for (const child of nodeListOfProjectLinks) {
        arr.push(child.lastChild);
      }
      return arr;
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
    const retrievedTask = _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data.filter((entry) => entry.id === parseInt(taskID, 10));
    if (this.checked) {
      console.log(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data);

      retrievedTask.isCompleted = true;
      box.target.parentElement.classList.add('is-completed');
      _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].editTask(retrievedTask, 'isCompleted', true);
      console.log(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data);
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
      const tasksToRemove = _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].produceProjectList(e.target.previousElementSibling.id);
      tasksToRemove.forEach((item) => _masterList__WEBPACK_IMPORTED_MODULE_0__["default"].removeTask(item));
      localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data));
      localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].displayedList));
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
      console.log(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].getListOfProjects());
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderSideBar)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].getListOfProjects());
      addSideProjectEventListeners();
      addMainEventListeners();
      console.log(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].getListOfProjects());
    } else {
      console.log('You pressed Cancel!');
    }
  };

  // SideBar Project Name ELs
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].sidebarProjectList) {
      const projectLink = item;
      projectLink.addEventListener('click', () => {
        _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].update('byProject', projectLink.id);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
        addMainEventListeners();
      });
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const item of _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].sidebarProjectListRemoveBtns) {
      const projectLinkRm = item;
      projectLinkRm.addEventListener('click', (e) => {
        if (_currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy === 'byProject' && _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject === projectLinkRm.previousElementSibling.id) {
          _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].update('all');
        }
        removeThis(e);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
        addMainEventListeners();
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderSideBar)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].getListOfProjects());
        addSideProjectEventListeners();
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
    // eslint-disable-next-line no-restricted-syntax
    for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskPriority) {
      option.value = null;
    }
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskProject.value = null;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"], _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__["default"].whichProject);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderSideBar)(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].getListOfProjects());
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
    // eslint-disable-next-line no-restricted-syntax
    for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__["default"].newTaskPriority) {
      option.value = null;
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







function freshStart() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const laterDay = new Date(today);
  laterDay.setDate(today.getDate() + 8);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const sampleTask = new _tasks__WEBPACK_IMPORTED_MODULE_0__["default"](today, 'Refactor tic-tac-toe program', 'normal');
  const sampleTask2 = new _tasks__WEBPACK_IMPORTED_MODULE_0__["default"](today, 'Buy milk', 'high');
  const sampleTask3 = new _tasks__WEBPACK_IMPORTED_MODULE_0__["default"](tomorrow, 'Buy birthday card', 'normal');
  const sampleTask4 = new _tasks__WEBPACK_IMPORTED_MODULE_0__["default"](tomorrow, 'Call mom', 'high');
  const sampleTask5 = new _tasks__WEBPACK_IMPORTED_MODULE_0__["default"](tomorrow, 'Do Ruby beginner tutorial', 'normal');
  const sampleTask6 = new _tasks__WEBPACK_IMPORTED_MODULE_0__["default"](dayAfterTomorrow, 'Vacuum', 'high');
  const sampleTask7 = new _tasks__WEBPACK_IMPORTED_MODULE_0__["default"](dayAfterTomorrow, 'Laundry', 'normal');
  const sampleTask8 = new _tasks__WEBPACK_IMPORTED_MODULE_0__["default"](dayAfterTomorrow, 'Practice piano', 'normal');
  const sampleTask9 = new _tasks__WEBPACK_IMPORTED_MODULE_0__["default"](today, 'Dog-sit for Kimmy', 'high');
  const sampleTask10 = new _tasks__WEBPACK_IMPORTED_MODULE_0__["default"](yesterday, 'Schedule dentist appointment', 'high');

  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(sampleTask);
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(sampleTask2);
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(sampleTask3);
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(sampleTask4);
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(sampleTask5);
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(sampleTask6);
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(sampleTask7);
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(sampleTask8);
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(sampleTask9);
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].addTask(sampleTask10);
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].sortByDate();

  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].editTask(sampleTask, 'project', 'Coding');
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].editTask(sampleTask2, 'project', 'Shopping');
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].editTask(sampleTask3, 'project', 'Shopping');
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].editTask(sampleTask5, 'project', 'Coding');
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].editTask(sampleTask6, 'project', 'Housework');
  _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].editTask(sampleTask7, 'project', 'Housework');

  // ***************

  // Cache DOM and render each section

  (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderSideBar)(_masterList__WEBPACK_IMPORTED_MODULE_3__["default"].getListOfProjects());
  (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderAddTaskModal)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__["default"].body, _masterList__WEBPACK_IMPORTED_MODULE_3__["default"].getListOfProjects());
  (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_3__["default"], _currentSettings__WEBPACK_IMPORTED_MODULE_5__["default"].viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_5__["default"].whichProject);

  // Add eventlisteners to header and modal
  (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addInitialEventListeners)();
  (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addSideProjectEventListeners)();
  (0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addMainEventListeners)();
  _DOMCache__WEBPACK_IMPORTED_MODULE_1__["default"].sidebarProjectListRemove;
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
    console.log(task[0].id);
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id == task[0].id) {
        this.data[i][attribute] = value;
        return;
      }
    }
  }

  sortByDate() {
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
/* harmony export */   "renderMain": () => (/* binding */ renderMain),
/* harmony export */   "renderSideBar": () => (/* binding */ renderSideBar)
/* harmony export */ });
/* harmony import */ var _DOMCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMCache */ "./src/DOMCache.js");
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");



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
  if (checkbox.checked) {
    checkbox.parentElement.classList.add('is-completed');
  } else if (checkbox.parentElement.classList.contains('is-completed')) {
    checkbox.parentElement.classList.remove('is-completed');
  }
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

function renderSideBar(arrayOfProjectNames) {
  console.log(arrayOfProjectNames);
  //  Changed to only render the by-project list
  //  The rest is in index.html

  // Remove the existingProjects
  while (_DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].sidebarProjectList.length) {
    _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].listByProject.removeChild(_DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].listByProject.lastChild);
  }

  const makeLink = function (name) {
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
    _DOMCache__WEBPACK_IMPORTED_MODULE_0__["default"].listByProject.append(listItem);
  };

  if (arrayOfProjectNames) {
    arrayOfProjectNames.forEach((a) => { makeLink(a); });
  }
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
  (0,_render__WEBPACK_IMPORTED_MODULE_4__.renderSideBar)(_masterList__WEBPACK_IMPORTED_MODULE_3__["default"].getListOfProjects());
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
  console.log('fresh start');
  (0,_freshStart__WEBPACK_IMPORTED_MODULE_1__["default"])();
  localStorage.setItem('instance', _masterList__WEBPACK_IMPORTED_MODULE_0__["default"]);
  localStorage.setItem('oldData', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].data));
  localStorage.setItem('oldDisplayList', JSON.stringify(_masterList__WEBPACK_IMPORTED_MODULE_0__["default"].displayedList));
} else {
  console.log('resume');
  (0,_resume__WEBPACK_IMPORTED_MODULE_2__["default"])();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2REFBZTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZEQUFlO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZEQUFlO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkRBQWU7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZEQUFlO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkRBQWU7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2REFBZTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLDJFQUE2QjtBQUN0QyxJQUFJLDJFQUE2QixDQUFDLHlFQUEyQjtBQUM3RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixLQUFLO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxzRUFBd0I7QUFDNUI7O0FBRUE7QUFDQSx5Q0FBeUMsY0FBYztBQUN2RDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2VTJCO0FBQ0U7QUFDNEU7QUFDbkU7QUFLcEI7QUFDOEI7O0FBRWhEO0FBQ0E7QUFDQSxrQkFBa0IsdUJBQXVCO0FBQ3pDLGtCQUFrQiw4Q0FBSTtBQUN0QjtBQUNBO0FBQ0EsSUFBSSw2REFBb0I7QUFDeEI7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQSxFQUFFLHNEQUFhLENBQUMscUVBQTRCO0FBQzVDLEVBQUUsMkRBQWtCLENBQUMsc0RBQVEsRUFBRSxxRUFBNEI7QUFDM0QsRUFBRSxtREFBVSxDQUFDLG1EQUFVLEVBQUUsK0RBQXNCLEVBQUUscUVBQTRCOztBQUU3RTtBQUNBLEVBQUUsaUVBQXdCO0FBQzFCLEVBQUUscUVBQTRCO0FBQzlCLEVBQUUsOERBQXFCO0FBQ3ZCLEVBQUUsMEVBQTRCO0FBQzlCOzs7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNkQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDQTtBQUNSOztBQUU5QjtBQUNBO0FBQ0EsRUFBRSx1REFBVTtBQUNaLG1DQUFtQyxtREFBVTtBQUM3QyxpREFBaUQsd0RBQWU7QUFDaEUsd0RBQXdELGlFQUF3QjtBQUNoRixFQUFFO0FBQ0Y7QUFDQSxFQUFFLG1EQUFNO0FBQ1IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL0RPTUNhY2hlLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvYWRkRUxzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvY3VycmVudFNldHRpbmdzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZnJlc2hTdGFydC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL21hc3Rlckxpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9yZXN1bWUuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBkb20oKSB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gIHJldHVybiB7XG4gICAgZ2V0IGhlYWRlcigpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcbiAgICB9LFxuICAgIGdldCBhZGRUYXNrQnRuKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtYS10YXNrJyk7XG4gICAgfSxcbiAgICBnZXQgYWRkVGFza0Zvcm0oKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xuICAgIH0sXG4gICAgZ2V0IGFkZFRhc2tNb2RhbCgpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLWEtdGFzay1tb2RhbCcpO1xuICAgIH0sXG4gICAgZ2V0IGNsb3NlTW9kYWxCdXR0b24oKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLW1vZGFsLWJ1dHRvbicpO1xuICAgIH0sXG4gICAgZ2V0IG5ld1Rhc2tDb250ZW50KCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWNvbnRlbnQnKTtcbiAgICB9LFxuICAgIGdldCBuZXdUYXNrRGF0ZSgpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpO1xuICAgIH0sXG4gICAgZ2V0IG5ld1Rhc2tQcmlvcml0eSgpIHtcbiAgICAgIGNvbnN0IG5vZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1wcmlvcml0eV0nKTtcbiAgICAgIGNvbnN0IGFycmF5T2ZQcmlvcml0aWVzID0gWy4uLm5vZGVMaXN0XTtcbiAgICAgIHJldHVybiBhcnJheU9mUHJpb3JpdGllcztcbiAgICB9LFxuICAgIGdldCBuZXdUYXNrUHJvamVjdCgpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xuICAgIH0sXG4gICAgbWFpbixcbiAgICBib2R5LFxuICAgIGdldCBzaWRlQmFyKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyJyk7XG4gICAgfSxcbiAgICBnZXQgdG9kYXlzVGFza3NTaWRlQmFyKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RheXMtdGFza3MnKTtcbiAgICB9LFxuICAgIGdldCB0aGlzV2Vla1NpZGVCYXIoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RoaXMtd2VlaycpO1xuICAgIH0sXG4gICAgZ2V0IGFsbFRhc2tzU2lkZUJhcigpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWxsLXRhc2tzJyk7XG4gICAgfSxcbiAgICBnZXQgY2FyZEVkaXRCdG5zKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0LXRhc2snKTtcbiAgICB9LFxuICAgIGdldCBjYXJkUmVtb3ZlQnRucygpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVtb3ZlLXRhc2snKTtcbiAgICB9LFxuICAgIGdldCBjYXJkQ2hlY2tCb3hzKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuYW1lPVwiaXNDb21wbGV0ZWRDaGVja2JveFwiXScpO1xuICAgIH0sXG4gICAgZ2V0IGxpc3RCeVByb2plY3QoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpc3QtYnktcHJvamVjdCcpO1xuICAgIH0sXG4gICAgZ2V0IHNpZGViYXJQcm9qZWN0TGlzdCgpIHtcbiAgICAgIGNvbnN0IG5vZGVMaXN0T2ZQcm9qZWN0TGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdC1ieS1wcm9qZWN0JykuY2hpbGRyZW47XG4gICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZUxpc3RPZlByb2plY3RMaW5rcykge1xuICAgICAgICBhcnIucHVzaChjaGlsZC5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSxcbiAgICBnZXQgc2lkZWJhclByb2plY3RMaXN0UmVtb3ZlQnRucygpIHtcbiAgICAgIGNvbnN0IG5vZGVMaXN0T2ZQcm9qZWN0TGlua3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdC1ieS1wcm9qZWN0JykuY2hpbGRyZW47XG4gICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZUxpc3RPZlByb2plY3RMaW5rcykge1xuICAgICAgICBhcnIucHVzaChjaGlsZC5sYXN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycjtcbiAgICB9LFxuICB9O1xufVxuY29uc3QgRE9NID0gZG9tKCk7XG5leHBvcnQgZGVmYXVsdCBET007XG4iLCJpbXBvcnQgbWFzdGVyTGlzdCBmcm9tICcuL21hc3Rlckxpc3QnO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyU2lkZUJhciB9IGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCBUYXNrIGZyb20gJy4vdGFza3MnO1xuaW1wb3J0IGN1cnJlbnRTZXR0aW5ncyBmcm9tICcuL2N1cnJlbnRTZXR0aW5ncyc7XG5pbXBvcnQgRE9NIGZyb20gJy4vRE9NQ2FjaGUnO1xuXG5sZXQgZWRpdHRpbmcgPSBmYWxzZTtcbmxldCBJRE51bWJlciA9IG51bGw7XG5cbmZ1bmN0aW9uIGFkZENhcmRFdmVudExpc3RlbmVycyh0YXNrKSB7XG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtaWQ9XCIke3Rhc2suaWR9XCJdIGlucHV0YCk7XG4gIGNoZWNrYm94WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChib3gpIHtcbiAgICBjb25zdCB0YXNrSUQgPSBib3gudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuICAgIGNvbnN0IHJldHJpZXZlZFRhc2sgPSBtYXN0ZXJMaXN0LmRhdGEuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuaWQgPT09IHBhcnNlSW50KHRhc2tJRCwgMTApKTtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICBjb25zb2xlLmxvZyhtYXN0ZXJMaXN0LmRhdGEpO1xuXG4gICAgICByZXRyaWV2ZWRUYXNrLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgIGJveC50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1jb21wbGV0ZWQnKTtcbiAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2socmV0cmlldmVkVGFzaywgJ2lzQ29tcGxldGVkJywgdHJ1ZSk7XG4gICAgICBjb25zb2xlLmxvZyhtYXN0ZXJMaXN0LmRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXRyaWV2ZWRUYXNrLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICBib3gudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtY29tcGxldGVkJyk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBlZGl0VGFzayA9IChlKSA9PiB7XG4gICAgZWRpdHRpbmcgPSB0cnVlO1xuICAgIElETnVtYmVyID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcbiAgICBjb25zdCB0YXNrVG9FZGl0ID0gbWFzdGVyTGlzdC5kYXRhXG4gICAgICAuZmlsdGVyKCh0KSA9PiBwYXJzZUludCh0LmlkLCAxMCkgPT09IHBhcnNlSW50KElETnVtYmVyLCAxMCkpWzBdO1xuICAgIGNvbnN0IHl5eXkgPSB0YXNrVG9FZGl0LmRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBtbSA9IHRhc2tUb0VkaXQuZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICBjb25zdCBkZCA9IHRhc2tUb0VkaXQuZGF0ZS5nZXREYXRlKCk7XG4gICAgbGV0IHRhc2tEYXRlID0gU3RyaW5nKDEwMDAwICogeXl5eSArIDEwMCAqIG1tICsgZGQpO1xuICAgIHRhc2tEYXRlID0gYCR7dGFza0RhdGUuc2xpY2UoMCwgNCl9LSR7dGFza0RhdGUuc2xpY2UoNCwgNil9LSR7dGFza0RhdGUuc2xpY2UoNiwgOCl9YDtcbiAgICBET00ubmV3VGFza0NvbnRlbnQudmFsdWUgPSB0YXNrVG9FZGl0LmNvbnRlbnQ7XG4gICAgRE9NLm5ld1Rhc2tEYXRlLnZhbHVlID0gdGFza0RhdGU7XG4gICAgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlID0gdGFza1RvRWRpdC5wcm9qZWN0O1xuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIERPTS5uZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgIGlmIChvcHRpb24udmFsdWUgPT09IHRhc2sucHJpb3JpdHkpIHtcbiAgICAgICAgb3B0aW9uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBET00uYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ2Nsb3NlZCcpO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVRhc2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRoaXNUYXNrID0gbWFzdGVyTGlzdC5kYXRhLmZpbHRlcigodCkgPT4gcGFyc2VJbnQodC5pZCwgMTApID09PSBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpLCAxMCkpO1xuICAgIG1hc3Rlckxpc3QucmVtb3ZlVGFzayh0aGlzVGFza1swXSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTtcbiAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3Quc3BsaWNlKG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5pbmRleE9mKHRoaXNUYXNrWzBdKSwgMSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG4gICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfTtcblxuICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtaWQ9XCIke3Rhc2suaWR9XCJdIGJ1dHRvbmApWzBdO1xuICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWRpdFRhc2spO1xuXG4gIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWlkPVwiJHt0YXNrLmlkfVwiXSBidXR0b25gKVsxXTtcbiAgcmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlVGFzayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKSB7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QpIHtcbiAgICBhZGRDYXJkRXZlbnRMaXN0ZW5lcnMoaXRlbSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNpZGVUaW1lRXZlbnRMaXN0ZW5lcnMoKSB7XG4gIHRyeSB7XG4gICAgRE9NLnRvZGF5c1Rhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RvZGF5JywgbnVsbCk7XG4gICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfSk7XG5cbiAgICBET00udGhpc1dlZWtTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgndGhpcy13ZWVrJywgbnVsbCk7XG4gICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfSk7XG5cbiAgICBET00uYWxsVGFza3NTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgnYWxsJywgbnVsbCk7XG4gICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfSk7XG4gIH0gY2F0Y2gge1xuICAgIGNvbnNvbGUubG9nKCdmYWlsZWQgdG8gYWRkIHRvZGF5L3dlZWsvYWxsIEVMcycpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCkge1xuICBjb25zdCByZW1vdmVUaGlzID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoY29uZmlybSgnRGVsZXRlIHRoaXMgcHJvamVjdCBhbmQgYWxsIHRhc2tzIGluIGl0PycpKSB7XG4gICAgICBjb25zdCB0YXNrc1RvUmVtb3ZlID0gbWFzdGVyTGlzdC5wcm9kdWNlUHJvamVjdExpc3QoZS50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5pZCk7XG4gICAgICB0YXNrc1RvUmVtb3ZlLmZvckVhY2goKGl0ZW0pID0+IG1hc3Rlckxpc3QucmVtb3ZlVGFzayhpdGVtKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGF0YScsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGF0YSkpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG4gICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGNvbnNvbGUubG9nKG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgICByZW5kZXJTaWRlQmFyKG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIGNvbnNvbGUubG9nKG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdZb3UgcHJlc3NlZCBDYW5jZWwhJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFNpZGVCYXIgUHJvamVjdCBOYW1lIEVMc1xuICB0cnkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBET00uc2lkZWJhclByb2plY3RMaXN0KSB7XG4gICAgICBjb25zdCBwcm9qZWN0TGluayA9IGl0ZW07XG4gICAgICBwcm9qZWN0TGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgnYnlQcm9qZWN0JywgcHJvamVjdExpbmsuaWQpO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgRE9NLnNpZGViYXJQcm9qZWN0TGlzdFJlbW92ZUJ0bnMpIHtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rUm0gPSBpdGVtO1xuICAgICAgcHJvamVjdExpbmtSbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGlmIChjdXJyZW50U2V0dGluZ3Mudmlld0J5ID09PSAnYnlQcm9qZWN0JyAmJiBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0ID09PSBwcm9qZWN0TGlua1JtLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuaWQpIHtcbiAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdhbGwnKTtcbiAgICAgICAgfVxuICAgICAgICByZW1vdmVUaGlzKGUpO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgcmVuZGVyU2lkZUJhcihtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgICAgICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIGNvbnNvbGUubG9nKCdmYWlsZWQgdG8gYWRkIEVMcyB0byBwcm9qZWN0cycpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMoKSB7XG4vLyAgKioqIEFkZFRhc2tNb2RhbCBvcGVuLCBzdWJtaXQsIGFuZCBjbG9zZSBidG4gRUxzICoqKlxuICAvLyBDYWxsYmFjayBmb3IgU3VibWl0IEJ1dHRvbjpcbiAgY29uc3QgdGFza1N1Ym1pdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnY2xvc2VkJyk7XG4gICAgaWYgKGVkaXR0aW5nKSB7XG4gICAgICBjb25zdCB0YXNrVG9FZGl0ID0gbWFzdGVyTGlzdC5kYXRhXG4gICAgICAgIC5maWx0ZXIoKHQpID0+IHBhcnNlSW50KHQuaWQsIDEwKSA9PT0gcGFyc2VJbnQoSUROdW1iZXIsIDEwKSlbMF07XG4gICAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHRhc2tUb0VkaXQsICdjb250ZW50JywgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlKTtcbiAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgJ2RhdGUnLCBuZXcgRGF0ZShET00ubmV3VGFza0RhdGUudmFsdWUpKTtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IEFycmF5LmZyb20oRE9NLm5ld1Rhc2tQcmlvcml0eSlcbiAgICAgICAgLmZpbHRlcigocHJpb3JpdHlMZXZlbCkgPT4gcHJpb3JpdHlMZXZlbC5jaGVja2VkKVswXTtcbiAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgJ3ByaW9yaXR5Jywgb3B0aW9uLnZhbHVlKTtcbiAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgJ3Byb2plY3QnLCBET00ubmV3VGFza1Byb2plY3QudmFsdWUpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsO1xuICAgICAgRE9NLm5ld1Rhc2tQcmlvcml0eS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbi5jaGVja2VkKSB7XG4gICAgICAgICAgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBvcHRpb24udmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKFxuICAgICAgICBET00ubmV3VGFza0RhdGUudmFsdWUsXG4gICAgICAgIERPTS5uZXdUYXNrQ29udGVudC52YWx1ZSxcbiAgICAgICAgbmV3VGFza1ByaW9yaXR5VmFsdWUsXG4gICAgICAgIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSxcbiAgICAgICk7XG4gICAgICBtYXN0ZXJMaXN0LmFkZFRhc2sobmV3VGFzayk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGF0YScsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGF0YSkpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG4gICAgfVxuICAgIG1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuICAgIC8vIENsZWFyIHRoZSBtb2RhbCBpbnB1dCBmaWVsZHMgd2hlbiBtb2RhbCBpcyBzdWJtaXR0ZWRcbiAgICBET00ubmV3VGFza0NvbnRlbnQudmFsdWUgPSBudWxsO1xuICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSA9IG51bGw7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgRE9NLm5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgb3B0aW9uLnZhbHVlID0gbnVsbDtcbiAgICB9XG4gICAgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlID0gbnVsbDtcbiAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICByZW5kZXJTaWRlQmFyKG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpO1xuICAgIGFkZFNpZGVUaW1lRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfTtcblxuICBET00uYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBlZGl0dGluZyA9IGZhbHNlO1xuICAgIERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnY2xvc2VkJyk7XG4gIH0pO1xuXG4gIC8vIENsZWFyIHRoZSBtb2RhbCBpbnB1dCBmaWVsZHMgd2hlbiBtb2RhbCBpcyBjbG9zZWQgYnkgdGhlIHhcbiAgRE9NLmNsb3NlTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdjbG9zZWQnKTtcbiAgICBET00ubmV3VGFza0NvbnRlbnQudmFsdWUgPSBudWxsO1xuICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSA9IG51bGw7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgRE9NLm5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgb3B0aW9uLnZhbHVlID0gbnVsbDtcbiAgICB9XG4gICAgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlID0gbnVsbDtcbiAgfSk7XG4gIERPTS5hZGRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0YXNrU3VibWl0KTtcblxuICAvLyBUb2RheSwgV2VlaywgYW5kIEFsbCBzaWRlQmFyIEVMc1xuICB0cnkge1xuICAgIERPTS50b2RheXNUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0b2RheScsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuXG4gICAgRE9NLnRoaXNXZWVrU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RoaXMtd2VlaycsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuXG4gICAgRE9NLmFsbFRhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2FsbCcsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCBldmVudCBsaXN0ZW5lcnMnKTtcbiAgfVxufVxuIiwiY29uc3QgY3VycmVudFNldHRpbmdzID0ge1xuICB2aWV3Qnk6ICdhbGwnLFxuICB3aGljaFByb2plY3Q6IG51bGwsXG5cbiAgdXBkYXRlKG5ld1ZpZXcsIHdoaWNoUCA9IG51bGwpIHtcbiAgICB0aGlzLnZpZXdCeSA9IG5ld1ZpZXc7XG4gICAgdGhpcy53aGljaFByb2plY3QgPSB3aGljaFA7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjdXJyZW50U2V0dGluZ3M7XG4iLCJpbXBvcnQgVGFzayBmcm9tICcuL3Rhc2tzJztcbmltcG9ydCBET00gZnJvbSAnLi9ET01DYWNoZSc7XG5pbXBvcnQgeyBhZGRNYWluRXZlbnRMaXN0ZW5lcnMsIGFkZEluaXRpYWxFdmVudExpc3RlbmVycywgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycyB9IGZyb20gJy4vYWRkRUxzJztcbmltcG9ydCBtYXN0ZXJMaXN0IGZyb20gJy4vbWFzdGVyTGlzdCc7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJBZGRUYXNrTW9kYWwsIHJlbmRlclNpZGVCYXIgfSBmcm9tICcuL3JlbmRlcic7XG5pbXBvcnQgY3VycmVudFNldHRpbmdzIGZyb20gJy4vY3VycmVudFNldHRpbmdzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZnJlc2hTdGFydCgpIHtcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgdG9tb3Jyb3cuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyAxKTtcbiAgY29uc3QgZGF5QWZ0ZXJUb21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgZGF5QWZ0ZXJUb21vcnJvdy5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDIpO1xuXG4gIGNvbnN0IGxhdGVyRGF5ID0gbmV3IERhdGUodG9kYXkpO1xuICBsYXRlckRheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDgpO1xuXG4gIGNvbnN0IHllc3RlcmRheSA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgeWVzdGVyZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMSk7XG5cbiAgY29uc3Qgc2FtcGxlVGFzayA9IG5ldyBUYXNrKHRvZGF5LCAnUmVmYWN0b3IgdGljLXRhYy10b2UgcHJvZ3JhbScsICdub3JtYWwnKTtcbiAgY29uc3Qgc2FtcGxlVGFzazIgPSBuZXcgVGFzayh0b2RheSwgJ0J1eSBtaWxrJywgJ2hpZ2gnKTtcbiAgY29uc3Qgc2FtcGxlVGFzazMgPSBuZXcgVGFzayh0b21vcnJvdywgJ0J1eSBiaXJ0aGRheSBjYXJkJywgJ25vcm1hbCcpO1xuICBjb25zdCBzYW1wbGVUYXNrNCA9IG5ldyBUYXNrKHRvbW9ycm93LCAnQ2FsbCBtb20nLCAnaGlnaCcpO1xuICBjb25zdCBzYW1wbGVUYXNrNSA9IG5ldyBUYXNrKHRvbW9ycm93LCAnRG8gUnVieSBiZWdpbm5lciB0dXRvcmlhbCcsICdub3JtYWwnKTtcbiAgY29uc3Qgc2FtcGxlVGFzazYgPSBuZXcgVGFzayhkYXlBZnRlclRvbW9ycm93LCAnVmFjdXVtJywgJ2hpZ2gnKTtcbiAgY29uc3Qgc2FtcGxlVGFzazcgPSBuZXcgVGFzayhkYXlBZnRlclRvbW9ycm93LCAnTGF1bmRyeScsICdub3JtYWwnKTtcbiAgY29uc3Qgc2FtcGxlVGFzazggPSBuZXcgVGFzayhkYXlBZnRlclRvbW9ycm93LCAnUHJhY3RpY2UgcGlhbm8nLCAnbm9ybWFsJyk7XG4gIGNvbnN0IHNhbXBsZVRhc2s5ID0gbmV3IFRhc2sodG9kYXksICdEb2ctc2l0IGZvciBLaW1teScsICdoaWdoJyk7XG4gIGNvbnN0IHNhbXBsZVRhc2sxMCA9IG5ldyBUYXNrKHllc3RlcmRheSwgJ1NjaGVkdWxlIGRlbnRpc3QgYXBwb2ludG1lbnQnLCAnaGlnaCcpO1xuXG4gIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrKTtcbiAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2syKTtcbiAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2szKTtcbiAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s0KTtcbiAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s1KTtcbiAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s2KTtcbiAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s3KTtcbiAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s4KTtcbiAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s5KTtcbiAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2sxMCk7XG4gIG1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuXG4gIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzaywgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG4gIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazIsICdwcm9qZWN0JywgJ1Nob3BwaW5nJyk7XG4gIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazMsICdwcm9qZWN0JywgJ1Nob3BwaW5nJyk7XG4gIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazUsICdwcm9qZWN0JywgJ0NvZGluZycpO1xuICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s2LCAncHJvamVjdCcsICdIb3VzZXdvcmsnKTtcbiAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNywgJ3Byb2plY3QnLCAnSG91c2V3b3JrJyk7XG5cbiAgLy8gKioqKioqKioqKioqKioqXG5cbiAgLy8gQ2FjaGUgRE9NIGFuZCByZW5kZXIgZWFjaCBzZWN0aW9uXG5cbiAgcmVuZGVyU2lkZUJhcihtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICByZW5kZXJBZGRUYXNrTW9kYWwoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG5cbiAgLy8gQWRkIGV2ZW50bGlzdGVuZXJzIHRvIGhlYWRlciBhbmQgbW9kYWxcbiAgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzKCk7XG4gIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gIERPTS5zaWRlYmFyUHJvamVjdExpc3RSZW1vdmU7XG59XG4iLCIvLyBUaGVyZSBzaG91bGQgb25seSBiZSBvbmUgbWFzdGVyIGxpc3RcbmxldCBpbnN0YW5jZSA9IG51bGw7XG5cbi8vIENvbnN0cnVjdG9yIHRvIG1ha2UgdGFzayBvYmplY3RzXG5jbGFzcyBNYXN0ZXJMaXN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW4gb25seSBjcmVhdGUgb25lIGluc3RhbmNlIScpO1xuICAgIH1cbiAgICBpbnN0YW5jZSA9IHRoaXM7XG4gICAgdGhpcy5kYXRhID0gW107XG4gICAgdGhpcy5kaXNwbGF5ZWRMaXN0ID0gW107XG4gIH1cblxuICBhZGRUYXNrKHRhc2spIHtcbiAgICB0aGlzLmRhdGEucHVzaCh0YXNrKTtcbiAgfVxuXG4gIHJlbW92ZVRhc2sodGFzaykge1xuICAgIHRoaXMuZGF0YS5zcGxpY2UodGhpcy5kYXRhLmluZGV4T2YodGFzayksIDEpO1xuICB9XG5cbiAgZWRpdFRhc2sodGFzaywgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKHRhc2tbMF0uaWQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5kYXRhW2ldLmlkID09IHRhc2tbMF0uaWQpIHtcbiAgICAgICAgdGhpcy5kYXRhW2ldW2F0dHJpYnV0ZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNvcnRCeURhdGUoKSB7XG4gICAgdGhpcy5kYXRhXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBieURhdGUgPSBhLmRhdGUgLSBiLmRhdGU7XG4gICAgICAgIGlmIChieURhdGUgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gYnlEYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhLnByaW9yaXR5LmxvY2FsZUNvbXBhcmUoYi5wcmlvcml0eSkgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eS5sb2NhbGVDb21wYXJlKGIucHJpb3JpdHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYS5jb250ZW50LnRvTG93ZXJDYXNlKCkubG9jYWxlQ29tcGFyZShiLmNvbnRlbnQudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcm9kdWNlUHJvamVjdExpc3QocHJvamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gdGhpcy5kYXRhLmZpbHRlcigodGFzaykgPT4gdGFzay5wcm9qZWN0ID09PSBwcm9qZWN0KTtcbiAgICBwcm9qZWN0TGlzdC5zb3J0KChhLCBiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgIHJldHVybiBwcm9qZWN0TGlzdDtcbiAgfVxuXG4gIGdldExpc3RPZlByb2plY3RzKCkge1xuICAgIGNvbnN0IGFsbFByb2plY3RzID0gW107XG4gICAgdGhpcy5kYXRhLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIGlmICh0YXNrLnByb2plY3QgIT0gbnVsbCAmJiB0YXNrLnByb2plY3QgIT09ICcnICYmICFhbGxQcm9qZWN0cy5zb21lKChhKSA9PiBhID09PSB0YXNrLnByb2plY3QpKSB7XG4gICAgICAgIGFsbFByb2plY3RzLnB1c2godGFzay5wcm9qZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYWxsUHJvamVjdHM7XG4gIH1cbn1cblxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0KCk7XG5leHBvcnQgZGVmYXVsdCBtYXN0ZXJMaXN0O1xuIiwiaW1wb3J0IERPTSBmcm9tICcuL0RPTUNhY2hlJztcbmltcG9ydCBtYXN0ZXJMaXN0IGZyb20gJy4vbWFzdGVyTGlzdCc7XG5cbmZ1bmN0aW9uIHJlbmRlckNhcmQodGFzaykge1xuICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICBjaGVja2JveC5uYW1lID0gJ2lzQ29tcGxldGVkQ2hlY2tib3gnO1xuICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgY2hlY2tib3guY2hlY2tlZCA9IHRhc2suaXNDb21wbGV0ZWQ7XG5cbiAgY2hlY2tib3guaWQgPSB0YXNrLmNvbnRlbnQ7XG5cbiAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFzay1uYW1lJyk7XG4gIHRhc2tOYW1lLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRhc2suY29udGVudDtcblxuICBjb25zdCB0YXNrRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRhc2tEdWUuY2xhc3NMaXN0LmFkZCgndGFzay1kdWUtZGF0ZScpO1xuICB0YXNrRHVlLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICB0YXNrRHVlLnRleHRDb250ZW50ID0gYER1ZTogJHt0YXNrLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7IHdlZWtkYXk6ICdzaG9ydCcgfSl9LFxuICAgICAgICAke3Rhc2suZGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHsgbW9udGg6ICdzaG9ydCcgfSl9LiBcbiAgICAgICAgJHt0YXNrLmRhdGUuZ2V0RGF0ZSgpfSBgO1xuXG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICBlZGl0QnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICBlZGl0QnRuLnRleHRDb250ZW50ID0gJ2VkaXQnO1xuXG4gIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gIHJlbW92ZUJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gJ2RlbGV0ZSc7XG5cbiAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgY2FyZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgaWYgKHRhc2sucHJpb3JpdHkgPT09ICdoaWdoJykge1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50Jyk7XG4gIH1cbiAgY2FyZC5hcHBlbmQoY2hlY2tib3gsIHRhc2tOYW1lLCB0YXNrRHVlLCBlZGl0QnRuLCByZW1vdmVCdG4pO1xuICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xuICAgIGNoZWNrYm94LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtY29tcGxldGVkJyk7XG4gIH0gZWxzZSBpZiAoY2hlY2tib3gucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWNvbXBsZXRlZCcpKSB7XG4gICAgY2hlY2tib3gucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1jb21wbGV0ZWQnKTtcbiAgfVxuICByZXR1cm4gKGNhcmQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBvcHRpb24sIGJ5UHJvamVjdE5hbWUgPSBudWxsKSB7XG4gIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IHRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xuICB0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDEpO1xuXG4gIGNvbnN0IHdlZWtGcm9tVG9kYXkgPSBuZXcgRGF0ZSh0b2RheSk7XG4gIHdlZWtGcm9tVG9kYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA3KTtcblxuICBsZXQgdG9kYXlHcm91cCA9IG51bGw7XG4gIGxldCBwYXN0RHVlID0gbnVsbDtcbiAgbGV0IHdlZWtHcm91cCA9IG51bGw7XG5cbiAgLy8gRmlyc3QgcmVtb3ZlIGV2ZXJ5dGhpbmcgZnJvbSBtYWluIGFuZCBmcm9tIGRpc3BsYXlMaXN0XG4gIHdoaWxlIChET00ubWFpbi5maXJzdENoaWxkKSB7XG4gICAgRE9NLm1haW4ucmVtb3ZlQ2hpbGQoRE9NLm1haW4uZmlyc3RDaGlsZCk7XG4gICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnNwbGljZSgwLCBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QubGVuZ3RoKTtcbiAgfVxuXG4gIGlmIChvcHRpb24gPT09ICdieVByb2plY3QnKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBtYXN0ZXJMaXN0LnByb2R1Y2VQcm9qZWN0TGlzdChieVByb2plY3ROYW1lKTtcbiAgICBjb25zdCBwcm9qZWN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByb2plY3RIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICBwcm9qZWN0SGVhZGluZy50ZXh0Q29udGVudCA9IGJ5UHJvamVjdE5hbWU7XG4gICAgRE9NLm1haW4uYXBwZW5kKHByb2plY3RIZWFkaW5nKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocHJvamVjdExpc3RbaV0uZGF0ZSA+PSB0b2RheSAmJiBwcm9qZWN0TGlzdFtpXS5kYXRlIDw9IHRvZGF5ICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdzdWJoZWFkaW5nJyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgfVxuICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUgPiB0b2RheSAmJiB0b2RheUdyb3VwID09PSAxKSB7XG4gICAgICAgIHRvZGF5R3JvdXAgPSBudWxsO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cbiAgICAgIERPTS5tYWluLmFwcGVuZChyZW5kZXJDYXJkKHByb2plY3RMaXN0W2ldKSk7XG4gICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QucHVzaChwcm9qZWN0TGlzdFtpXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFzdGVyTGlzdC5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgb3B0aW9uID09PSAndG9kYXknKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiBvcHRpb24gPT09ICd0aGlzLXdlZWsnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUGFzdC1EdWUgVW5kb25lIEJsb2NrXG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b2RheVxuICAgICAgICAmJiBwYXN0RHVlID09IG51bGxcbiAgICAgICAgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmlzQ29tcGxldGVkID09PSBmYWxzZSkge1xuICAgICAgICBwYXN0RHVlID0gMTtcbiAgICAgICAgY29uc3QgcGFzdER1ZUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcGFzdER1ZUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICBwYXN0RHVlSGVhZGluZy50ZXh0Q29udGVudCA9ICdQYXN0IER1ZSc7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZChwYXN0RHVlSGVhZGluZyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSAmJiBwYXN0RHVlID09PSAxKSB7XG4gICAgICAgIHBhc3REdWUgPSAyO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cblxuICAgICAgLy8gVG9kYXkgQmxvY2tcbiAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheVxuICAgICAgICAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8IHRvbW9ycm93XG4gICAgICAgICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgdG9kYXlHcm91cCA9PSAxKSB7XG4gICAgICAgIHRvZGF5R3JvdXAgPSAyO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDw9IHdlZWtGcm9tVG9kYXlcbiAgICAgICAgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3dcbiAgICAgICAgJiYgd2Vla0dyb3VwID09IG51bGwpIHtcbiAgICAgICAgd2Vla0dyb3VwID0gMTtcbiAgICAgICAgY29uc3Qgd2Vla0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgd2Vla0hlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICB3ZWVrSGVhZGluZy50ZXh0Q29udGVudCA9ICdUaGlzIFdlZWsnO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQod2Vla0hlYWRpbmcpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPiB3ZWVrRnJvbVRvZGF5ICYmIHdlZWtHcm91cCA9PT0gMSkge1xuICAgICAgICB3ZWVrR3JvdXAgPSAyO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChtYXN0ZXJMaXN0LmRhdGFbaV0uaXNDb21wbGV0ZWQgPT09IGZhbHNlXG4gICAgICAgICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9kYXkpXG4gICAgICAgIHx8IG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5KSB7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZChyZW5kZXJDYXJkKG1hc3Rlckxpc3QuZGF0YVtpXSkpO1xuICAgICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QucHVzaChtYXN0ZXJMaXN0LmRhdGFbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQWRkVGFza01vZGFsKHNvbWVEaXYsIGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbCcpO1xuICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnY2xvc2VkJyk7XG4gIGFkZFRhc2tNb2RhbC5pZCA9ICdhZGQtYS10YXNrLW1vZGFsJztcblxuICBjb25zdCBhZGRUYXNrTW9kYWxDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFkZFRhc2tNb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuXG4gIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICB0YXNrRm9ybS5pZCA9ICd0YXNrLWZvcm0nO1xuXG4gIGNvbnN0IGVtcHR5RGl2MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbXB0eURpdjEudGV4dENvbnRlbnQgPSAnICc7XG4gIGNvbnN0IGVtcHR5RGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbXB0eURpdjIudGV4dENvbnRlbnQgPSAnICc7XG4gIGNvbnN0IGNsb3NlTW9kYWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2xvc2VNb2RhbEJ1dHRvbi5pZCA9ICdjbG9zZS1tb2RhbC1idXR0b24nO1xuXG4gIGNsb3NlTW9kYWxCdXR0b24uaW5uZXJIVE1MID0gJyZ0aW1lcyc7XG5cbiAgY29uc3QgZW1wdHlEaXYzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGVtcHR5RGl2My50ZXh0Q29udGVudCA9ICcgJztcbiAgY29uc3QgbGFiZWxGb3JUYXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGxhYmVsRm9yVGFza0NvbnRlbnQuZm9yID0gJ3Rhc2stY29udGVudCc7XG4gIGxhYmVsRm9yVGFza0NvbnRlbnQudGV4dENvbnRlbnQgPSAnVGFzazonO1xuXG4gIGNvbnN0IHRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgdGFza0NvbnRlbnQudHlwZSA9ICd0ZXh0JztcbiAgdGFza0NvbnRlbnQuaWQgPSAndGFzay1jb250ZW50JztcbiAgdGFza0NvbnRlbnQubmFtZSA9ICd0YXNrLWNvbnRlbnQnO1xuICB0YXNrQ29udGVudC5wbGFjZWhvbGRlciA9ICdFbnRlciBUYXNrJztcbiAgdGFza0NvbnRlbnQucmVxdWlyZWQgPSB0cnVlO1xuICBjb25zdCBlbXB0eURpdjQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZW1wdHlEaXY0LnRleHRDb250ZW50ID0gJyAnO1xuXG4gIGNvbnN0IGxhYmVsRm9yRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGxhYmVsRm9yRGF0ZS5mb3IgPSAnZGF0ZSc7XG4gIGxhYmVsRm9yRGF0ZS50ZXh0Q29udGVudCA9ICdEdWU6JztcbiAgY29uc3QgZW1wdHlEaXY1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGVtcHR5RGl2NS50ZXh0Q29udGVudCA9ICcgJztcblxuICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgZGF0ZS50eXBlID0gJ2RhdGUnO1xuICBkYXRlLmlkID0gJ2RhdGUnO1xuICBkYXRlLm5hbWUgPSAnZGF0ZSc7XG4gIGRhdGUucmVxdWlyZWQgPSB0cnVlO1xuICBjb25zdCBlbXB0eURpdjYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZW1wdHlEaXY2LnRleHRDb250ZW50ID0gJyAnO1xuXG4gIGNvbnN0IHByaW9yaXR5VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJpb3JpdHlUaXRsZS50ZXh0Q29udGVudCA9ICdQcmlvcml0eTonO1xuXG4gIGNvbnN0IHByaW9yaXR5T3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcmlvcml0eU9wdGlvbnMuaWQgPSAncHJpb3JpdHktb3B0aW9ucyc7XG5cbiAgY29uc3Qgb3B0aW9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBub3JtYWxSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIG5vcm1hbFJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICBub3JtYWxSYWRpby5pZCA9ICdub3JtYWwnO1xuICBub3JtYWxSYWRpby5uYW1lID0gJ3ByaW9yaXR5JztcbiAgbm9ybWFsUmFkaW8udmFsdWUgPSAnbm9ybWFsJztcbiAgbm9ybWFsUmFkaW8ucmVxdWlyZWQgPSB0cnVlO1xuXG4gIGNvbnN0IG5vcm1hbFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBub3JtYWxSYWRpb0xhYmVsLmZvciA9ICdub3JtYWwnO1xuICBub3JtYWxSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gJ05vcm1hbCc7XG5cbiAgY29uc3Qgb3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBoaWdoUmFkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBoaWdoUmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gIGhpZ2hSYWRpby5pZCA9ICdoaWdoJztcbiAgaGlnaFJhZGlvLm5hbWUgPSAncHJpb3JpdHknO1xuICBoaWdoUmFkaW8udmFsdWUgPSAnaGlnaCc7XG4gIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICBjb25zdCBoaWdoUmFkaW9MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGhpZ2hSYWRpb0xhYmVsLmZvciA9ICdoaWdoJztcbiAgaGlnaFJhZGlvTGFiZWwudGV4dENvbnRlbnQgPSAnSGlnaCc7XG5cbiAgY29uc3QgYXNzaWduVG9Qcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBhc3NpZ25Ub1Byb2plY3RMYWJlbC5mb3IgPSAncHJvamVjdCc7XG4gIGFzc2lnblRvUHJvamVjdExhYmVsLnRleHRDb250ZW50ID0gJ1Byb2plY3Q6JztcblxuICBjb25zdCBhc3NpZ25Ub1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBhc3NpZ25Ub1Byb2plY3QubmFtZSA9ICdwcm9qZWN0JztcbiAgYXNzaWduVG9Qcm9qZWN0LmlkID0gJ3Byb2plY3QnO1xuICBhc3NpZ25Ub1Byb2plY3QucGxhY2Vob2xkZXIgPSAnT3B0aW9uYWwnO1xuICBhc3NpZ25Ub1Byb2plY3Quc2V0QXR0cmlidXRlKCdsaXN0JywgJ3Byb2plY3QtbGlzdCcpO1xuXG4gIGNvbnN0IGFzc2lnblRvUHJvamVjdERhdGFMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGF0YWxpc3QnKTtcbiAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuaWQgPSAncHJvamVjdC1saXN0JztcblxuICBhcnJheU9mUHJvamVjdE5hbWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgb3B0aW9uLnZhbHVlID0gZW50cnk7XG4gICAgb3B0aW9uLnRleHRDb250ZW50ID0gZW50cnk7XG4gICAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuYXBwZW5kKG9wdGlvbik7XG4gIH0pO1xuXG4gIGFzc2lnblRvUHJvamVjdC5hcHBlbmQoYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QpO1xuXG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBzdWJtaXRCdG4udHlwZSA9ICdzdWJtaXQnO1xuICBzdWJtaXRCdG4uaWQgPSAnbW9kYWwtc3VibWl0JztcbiAgc3VibWl0QnRuLnZhbHVlID0gJ1N1Ym1pdCc7XG4gIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9ICdTdWJtaXQnO1xuXG4gIG9wdGlvbjEuYXBwZW5kKG5vcm1hbFJhZGlvLCBub3JtYWxSYWRpb0xhYmVsKTtcbiAgb3B0aW9uMi5hcHBlbmQoaGlnaFJhZGlvLCBoaWdoUmFkaW9MYWJlbCk7XG4gIHByaW9yaXR5T3B0aW9ucy5hcHBlbmQob3B0aW9uMSwgb3B0aW9uMik7XG4gIHRhc2tGb3JtLmFwcGVuZChcbiAgICBlbXB0eURpdjEsXG4gICAgZW1wdHlEaXYyLFxuICAgIGNsb3NlTW9kYWxCdXR0b24sXG4gICAgbGFiZWxGb3JUYXNrQ29udGVudCxcbiAgICB0YXNrQ29udGVudCxcbiAgICBlbXB0eURpdjMsXG4gICAgbGFiZWxGb3JEYXRlLFxuICAgIGRhdGUsXG4gICAgZW1wdHlEaXY0LFxuXG4gICAgcHJpb3JpdHlUaXRsZSxcbiAgICBwcmlvcml0eU9wdGlvbnMsXG4gICAgZW1wdHlEaXY1LFxuXG4gICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwsXG4gICAgYXNzaWduVG9Qcm9qZWN0LFxuICAgIGVtcHR5RGl2NixcblxuICAgIHN1Ym1pdEJ0bixcbiAgKTtcbiAgYWRkVGFza01vZGFsQ29udGVudC5hcHBlbmQodGFza0Zvcm0pO1xuICBhZGRUYXNrTW9kYWwuYXBwZW5kKGFkZFRhc2tNb2RhbENvbnRlbnQpO1xuICBzb21lRGl2LmFwcGVuZChhZGRUYXNrTW9kYWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2lkZUJhcihhcnJheU9mUHJvamVjdE5hbWVzKSB7XG4gIGNvbnNvbGUubG9nKGFycmF5T2ZQcm9qZWN0TmFtZXMpO1xuICAvLyAgQ2hhbmdlZCB0byBvbmx5IHJlbmRlciB0aGUgYnktcHJvamVjdCBsaXN0XG4gIC8vICBUaGUgcmVzdCBpcyBpbiBpbmRleC5odG1sXG5cbiAgLy8gUmVtb3ZlIHRoZSBleGlzdGluZ1Byb2plY3RzXG4gIHdoaWxlIChET00uc2lkZWJhclByb2plY3RMaXN0Lmxlbmd0aCkge1xuICAgIERPTS5saXN0QnlQcm9qZWN0LnJlbW92ZUNoaWxkKERPTS5saXN0QnlQcm9qZWN0Lmxhc3RDaGlsZCk7XG4gIH1cblxuICBjb25zdCBtYWtlTGluayA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW1BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaXRlbUFuY2hvci5pZCA9IG5hbWU7XG4gICAgaXRlbUFuY2hvci5ocmVmID0gJyMnO1xuICAgIGl0ZW1BbmNob3IudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIGNvbnN0IHJlbW92ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgcmVtb3ZlUHJvamVjdEJ0bi5pZCA9IGAke25hbWV9UmVtb3ZlYDtcbiAgICByZW1vdmVQcm9qZWN0QnRuLmhyZWYgPSAnIyc7XG4gICAgcmVtb3ZlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICAgIHJlbW92ZVByb2plY3RCdG4udGV4dENvbnRlbnQgPSAnZGVsZXRlJztcbiAgICBsaXN0SXRlbS5hcHBlbmQoaXRlbUFuY2hvciwgcmVtb3ZlUHJvamVjdEJ0bik7XG4gICAgRE9NLmxpc3RCeVByb2plY3QuYXBwZW5kKGxpc3RJdGVtKTtcbiAgfTtcblxuICBpZiAoYXJyYXlPZlByb2plY3ROYW1lcykge1xuICAgIGFycmF5T2ZQcm9qZWN0TmFtZXMuZm9yRWFjaCgoYSkgPT4geyBtYWtlTGluayhhKTsgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBUYXNrIGZyb20gJy4vdGFza3MnO1xuaW1wb3J0IERPTSBmcm9tICcuL0RPTUNhY2hlJztcbmltcG9ydCB7IGFkZE1haW5FdmVudExpc3RlbmVycywgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzLCBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi9hZGRFTHMnO1xuaW1wb3J0IG1hc3Rlckxpc3QgZnJvbSAnLi9tYXN0ZXJMaXN0JztcbmltcG9ydCB7XG4gIHJlbmRlck1haW4sXG4gIHJlbmRlckFkZFRhc2tNb2RhbCxcbiAgcmVuZGVyU2lkZUJhcixcbn0gZnJvbSAnLi9yZW5kZXInO1xuaW1wb3J0IGN1cnJlbnRTZXR0aW5ncyBmcm9tICcuL2N1cnJlbnRTZXR0aW5ncyc7XG5cbmZ1bmN0aW9uIG15RnVuY3Rpb24oZGF0YUZyb21TZXJ2ZXIpIHtcbiAgY29uc3QgcGFyc2VkSlNPTiA9IEpTT04ucGFyc2UoZGF0YUZyb21TZXJ2ZXIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnNlZEpTT04ubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0ID0gbmV3IFRhc2socGFyc2VkSlNPTltpXS5kYXRlLCBwYXJzZWRKU09OW2ldLmNvbnRlbnQsIHBhcnNlZEpTT05baV0ucHJpb3JpdHkpO1xuICAgIHQucHJvamVjdCA9IHBhcnNlZEpTT05baV0ucHJvamVjdDtcbiAgICB0LmNvbXBsZXRlZCA9IHBhcnNlZEpTT05baV0uY29tcGxldGVkO1xuICAgIG1hc3Rlckxpc3QuZGF0YS5wdXNoKHQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc3VtZSgpIHtcbiAgY29uc3Qgb2xkSlNPTiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvbGREYXRhJyk7XG4gIG15RnVuY3Rpb24ob2xkSlNPTik7XG4gIHJlbmRlclNpZGVCYXIobWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTtcbiAgcmVuZGVyQWRkVGFza01vZGFsKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuXG4gIC8vIEFkZCBldmVudGxpc3RlbmVycyB0byBoZWFkZXIgYW5kIG1vZGFsXG4gIGFkZEluaXRpYWxFdmVudExpc3RlbmVycygpO1xuICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICBET00uc2lkZWJhclByb2plY3RMaXN0UmVtb3ZlO1xufVxuIiwiLy8gQ29uc3RydWN0b3IgdG8gbWFrZSB0YXNrIG9iamVjdHNcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihkYXRlLCBjb250ZW50LCBwcmlvcml0eSwgcHJvamVjdCA9IG51bGwpIHtcbiAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICB0aGlzLmlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMDAwKTtcbiAgfVxuXG4gIG1hcmtEb25lKCkge1xuICAgIHRoaXMuaXNDb21wbGV0ZWQgPSB0cnVlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBtYXN0ZXJMaXN0IGZyb20gJy4vbWFzdGVyTGlzdCc7XG5pbXBvcnQgZnJlc2hTdGFydCBmcm9tICcuL2ZyZXNoU3RhcnQnO1xuaW1wb3J0IHJlc3VtZSBmcm9tICcuL3Jlc3VtZSc7XG5cbmlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ29sZERhdGEnKSkge1xuICBjb25zb2xlLmxvZygnZnJlc2ggc3RhcnQnKTtcbiAgZnJlc2hTdGFydCgpO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5zdGFuY2UnLCBtYXN0ZXJMaXN0KTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG59IGVsc2Uge1xuICBjb25zb2xlLmxvZygncmVzdW1lJyk7XG4gIHJlc3VtZSgpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9