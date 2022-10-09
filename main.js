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
    this.data[this.data.indexOf(task)][attribute] = value;
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
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ0E7QUFDUjs7QUFFOUI7QUFDQSxFQUFFLHVEQUFVO0FBQ1osbUNBQW1DLG1EQUFVO0FBQzdDLGlEQUFpRCx3REFBZTtBQUNoRSx3REFBd0QsaUVBQXdCO0FBQ2hGLEVBQUU7QUFDRixFQUFFLG1EQUFNO0FBQ1IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL0RPTUNhY2hlLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvYWRkRUxzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvY3VycmVudFNldHRpbmdzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZnJlc2hTdGFydC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL21hc3Rlckxpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9yZXN1bWUuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuZnVuY3Rpb24gZG9tKCkge1xuICByZXR1cm4ge1xuICAgIGdldCBoZWFkZXIoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XG4gICAgfSxcbiAgICBnZXQgYWRkVGFza0J0bigpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLWEtdGFzaycpO1xuICAgIH0sXG4gICAgZ2V0IGFkZFRhc2tGb3JtKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgICB9LFxuICAgIGdldCBhZGRUYXNrTW9kYWwoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1hLXRhc2stbW9kYWwnKTtcbiAgICB9LFxuICAgIGdldCBjbG9zZU1vZGFsQnV0dG9uKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZS1tb2RhbC1idXR0b24nKTtcbiAgICB9LFxuICAgIGdldCBuZXdUYXNrQ29udGVudCgpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1jb250ZW50Jyk7XG4gICAgfSxcbiAgICBnZXQgbmV3VGFza0RhdGUoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKTtcbiAgICB9LFxuICAgIGdldCBuZXdUYXNrUHJpb3JpdHkoKSB7XG4gICAgICBjb25zdCBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9cHJpb3JpdHldJyk7XG4gICAgICBjb25zdCBhcnJheU9mUHJpb3JpdGllcyA9IFsuLi5ub2RlTGlzdF07XG4gICAgICByZXR1cm4gYXJyYXlPZlByaW9yaXRpZXM7XG4gICAgfSxcbiAgICBnZXQgbmV3VGFza1Byb2plY3QoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcbiAgICB9LFxuICAgIG1haW4sXG4gICAgYm9keSxcbiAgICBnZXQgc2lkZUJhcigpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhcicpO1xuICAgIH0sXG4gICAgZ2V0IHRvZGF5c1Rhc2tzU2lkZUJhcigpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kYXlzLXRhc2tzJyk7XG4gICAgfSxcbiAgICBnZXQgdGhpc1dlZWtTaWRlQmFyKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aGlzLXdlZWsnKTtcbiAgICB9LFxuICAgIGdldCBhbGxUYXNrc1NpZGVCYXIoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FsbC10YXNrcycpO1xuICAgIH0sXG4gICAgZ2V0IGNhcmRFZGl0QnRucygpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdC10YXNrJyk7XG4gICAgfSxcbiAgICBnZXQgY2FyZFJlbW92ZUJ0bnMoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlbW92ZS10YXNrJyk7XG4gICAgfSxcbiAgICBnZXQgY2FyZENoZWNrQm94cygpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbbmFtZT1cImlzQ29tcGxldGVkQ2hlY2tib3hcIl0nKTtcbiAgICB9LFxuICAgIGdldCBsaXN0QnlQcm9qZWN0KCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0LWJ5LXByb2plY3QnKTtcbiAgICB9LFxuICAgIGdldCBzaWRlYmFyUHJvamVjdExpc3QoKSB7XG4gICAgICAvLyBJIG5lZWQgdGhlIGFuY2hvciB0YWdzIG5leHRlZCBpbnNpZGUgdGhlIGxpJ3NcbiAgICAgIGNvbnN0IGxpc3RpdGVtcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXInKS5jaGlsZHJlblsxXS5jaGlsZHJlbik7XG4gICAgICBsZXQgcXVlcnlTdHIgPSAnJztcbiAgICAgIGxpc3RpdGVtcy5mb3JFYWNoKChlbnRyeSwgaW5kZXgpID0+IHtcbiAgICAgICAgcXVlcnlTdHIgPSBgJHtxdWVyeVN0cn0jJHtlbnRyeS5maXJzdENoaWxkLmlkfWA7XG4gICAgICAgIGlmIChsaXN0aXRlbXNbaW5kZXhdIDwgbGlzdGl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBxdWVyeVN0ciArPSAnLCAnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChxdWVyeVN0ciA9PT0gJycpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ25vIHByb2plY3RzPycpO1xuICAgICAgICBxdWVyeVN0ciA9IG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBub2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnlTdHIpO1xuICAgICAgY29uc3QgYXJyYXlPZlByb2plY3ROYW1lcyA9IFsuLi5ub2RlTGlzdF07XG4gICAgICByZXR1cm4gYXJyYXlPZlByb2plY3ROYW1lcztcbiAgICB9LFxuICAgIGdldCBzaWRlYmFyUHJvamVjdExpc3RSZW1vdmUoKSB7XG4gICAgICBjb25zdCBsaXN0aXRlbXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyJykuY2hpbGRyZW5bMV0uY2hpbGRyZW4pO1xuICAgICAgY29uc3QgbGlzdE9mUmVtb3ZlQnRucyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0aXRlbXMubGVuZ3RoO1xuICAgICAgKSB7XG4gICAgICAgIGxpc3RPZlJlbW92ZUJ0bnMucHVzaChsaXN0aXRlbXNbaV0ubGFzdENoaWxkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsaXN0T2ZSZW1vdmVCdG5zO1xuICAgIH0sXG4gIH07XG59XG5jb25zdCBET00gPSBkb20oKTtcbmV4cG9ydCBkZWZhdWx0IERPTTtcbiIsImltcG9ydCBtYXN0ZXJMaXN0IGZyb20gJy4vbWFzdGVyTGlzdCc7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJTaWRlQmFyIH0gZnJvbSAnLi9yZW5kZXInO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQgY3VycmVudFNldHRpbmdzIGZyb20gJy4vY3VycmVudFNldHRpbmdzJztcbmltcG9ydCBET00gZnJvbSAnLi9ET01DYWNoZSc7XG5cbmxldCBlZGl0dGluZyA9IGZhbHNlO1xubGV0IElETnVtYmVyID0gbnVsbDtcblxuZnVuY3Rpb24gYWRkQ2FyZEV2ZW50TGlzdGVuZXJzKHRhc2spIHtcbiAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1pZD1cIiR7dGFzay5pZH1cIl0gaW5wdXRgKTtcbiAgY2hlY2tib3hbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGJveCkge1xuICAgIGNvbnN0IHRhc2tJRCA9IGJveC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgY29uc3QgcmV0cmlldmVkVGFzayA9IG1hc3Rlckxpc3QuZGF0YS5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5pZCA9PT0gdGFza0lEKTtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICByZXRyaWV2ZWRUYXNrLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgIGJveC50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1jb21wbGV0ZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0cmlldmVkVGFzay5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgYm94LnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWNvbXBsZXRlZCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgZWRpdFRhc2sgPSAoZSkgPT4ge1xuICAgIGVkaXR0aW5nID0gdHJ1ZTtcbiAgICBJRE51bWJlciA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgY29uc3QgdGFza1RvRWRpdCA9IG1hc3Rlckxpc3QuZGF0YVxuICAgICAgLmZpbHRlcigodCkgPT4gcGFyc2VJbnQodC5pZCwgMTApID09PSBwYXJzZUludChJRE51bWJlciwgMTApKVswXTtcbiAgICBjb25zdCB5eXl5ID0gdGFza1RvRWRpdC5kYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgbW0gPSB0YXNrVG9FZGl0LmRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgZGQgPSB0YXNrVG9FZGl0LmRhdGUuZ2V0RGF0ZSgpO1xuICAgIGxldCB0YXNrRGF0ZSA9IFN0cmluZygxMDAwMCAqIHl5eXkgKyAxMDAgKiBtbSArIGRkKTtcbiAgICB0YXNrRGF0ZSA9IGAke3Rhc2tEYXRlLnNsaWNlKDAsIDQpfS0ke3Rhc2tEYXRlLnNsaWNlKDQsIDYpfS0ke3Rhc2tEYXRlLnNsaWNlKDYsIDgpfWA7XG4gICAgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlID0gdGFza1RvRWRpdC5jb250ZW50O1xuICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSA9IHRhc2tEYXRlO1xuICAgIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSA9IHRhc2tUb0VkaXQucHJvamVjdDtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBET00ubmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICBpZiAob3B0aW9uLnZhbHVlID09PSB0YXNrLnByaW9yaXR5KSB7XG4gICAgICAgIG9wdGlvbi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdjbG9zZWQnKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVUYXNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0aGlzVGFzayA9IG1hc3Rlckxpc3QuZGF0YS5maWx0ZXIoKHQpID0+IHBhcnNlSW50KHQuaWQsIDEwKSA9PT0gcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSwgMTApKTtcbiAgICBtYXN0ZXJMaXN0LnJlbW92ZVRhc2sodGhpc1Rhc2tbMF0pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7XG4gICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnNwbGljZShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QuaW5kZXhPZih0aGlzVGFza1swXSksIDEpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xuICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gIH07XG5cbiAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWlkPVwiJHt0YXNrLmlkfVwiXSBidXR0b25gKVswXTtcbiAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRUYXNrKTtcblxuICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1pZD1cIiR7dGFzay5pZH1cIl0gYnV0dG9uYClbMV07XG4gIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZVRhc2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCkge1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSB7XG4gICAgYWRkQ2FyZEV2ZW50TGlzdGVuZXJzKGl0ZW0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTaWRlVGltZUV2ZW50TGlzdGVuZXJzKCkge1xuICB0cnkge1xuICAgIERPTS50b2RheXNUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0b2RheScsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuXG4gICAgRE9NLnRoaXNXZWVrU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RoaXMtd2VlaycsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuXG4gICAgRE9NLmFsbFRhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2FsbCcsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCB0b2RheS93ZWVrL2FsbCBFTHMnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpIHtcbiAgY29uc3QgcmVtb3ZlVGhpcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGNvbmZpcm0oJ0RlbGV0ZSB0aGlzIHByb2plY3QgYW5kIGFsbCB0YXNrcyBpbiBpdD8nKSkge1xuICAgICAgY29uc3QgdGFza3NUb1JlbW92ZSA9IG1hc3Rlckxpc3QucHJvZHVjZVByb2plY3RMaXN0KGUudGFyZ2V0LmlkLnNsaWNlKDAsIC02KSk7XG4gICAgICB0YXNrc1RvUmVtb3ZlLmZvckVhY2goKGl0ZW0pID0+IG1hc3Rlckxpc3QucmVtb3ZlVGFzayhpdGVtKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGF0YScsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGF0YSkpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG4gICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIERPTS5tYWluLCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIHJlbmRlclNpZGVCYXIoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICBhZGRTaWRlVGltZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1lvdSBwcmVzc2VkIENhbmNlbCEnKTtcbiAgICB9XG4gIH07XG4gIGZvciAoY29uc3QgaXRlbSBvZiBET00uc2lkZWJhclByb2plY3RMaXN0UmVtb3ZlKSB7XG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZVRoaXMpO1xuICB9XG4gIC8vIFNpZGVCYXIgUHJvamVjdCBOYW1lIEVMc1xuICB0cnkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBET00uc2lkZWJhclByb2plY3RMaXN0KSB7XG4gICAgICBjb25zdCBwcm9qZWN0TGluayA9IGl0ZW07XG4gICAgICBwcm9qZWN0TGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgnYnlQcm9qZWN0JywgcHJvamVjdExpbmsuaWQpO1xuICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBhZGQgRUxzIHRvIHByb2plY3RzJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEluaXRpYWxFdmVudExpc3RlbmVycygpIHtcbi8vICAqKiogQWRkVGFza01vZGFsIG9wZW4sIHN1Ym1pdCwgYW5kIGNsb3NlIGJ0biBFTHMgKioqXG4gIC8vIENhbGxiYWNrIGZvciBTdWJtaXQgQnV0dG9uOlxuICBjb25zdCB0YXNrU3VibWl0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdjbG9zZWQnKTtcbiAgICBpZiAoZWRpdHRpbmcpIHtcbiAgICAgIGNvbnN0IHRhc2tUb0VkaXQgPSBtYXN0ZXJMaXN0LmRhdGFcbiAgICAgICAgLmZpbHRlcigodCkgPT4gcGFyc2VJbnQodC5pZCwgMTApID09PSBwYXJzZUludChJRE51bWJlciwgMTApKVswXTtcbiAgICAgIG1hc3Rlckxpc3QuZWRpdFRhc2sodGFza1RvRWRpdCwgJ2NvbnRlbnQnLCBET00ubmV3VGFza0NvbnRlbnQudmFsdWUpO1xuICAgICAgbWFzdGVyTGlzdC5lZGl0VGFzayh0YXNrVG9FZGl0LCAnZGF0ZScsIG5ldyBEYXRlKERPTS5uZXdUYXNrRGF0ZS52YWx1ZSkpO1xuICAgICAgY29uc3Qgb3B0aW9uID0gQXJyYXkuZnJvbShET00ubmV3VGFza1ByaW9yaXR5KVxuICAgICAgICAuZmlsdGVyKChwcmlvcml0eUxldmVsKSA9PiBwcmlvcml0eUxldmVsLmNoZWNrZWQpWzBdO1xuICAgICAgbWFzdGVyTGlzdC5lZGl0VGFzayh0YXNrVG9FZGl0LCAncHJpb3JpdHknLCBvcHRpb24udmFsdWUpO1xuICAgICAgbWFzdGVyTGlzdC5lZGl0VGFzayh0YXNrVG9FZGl0LCAncHJvamVjdCcsIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGF0YScsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGF0YSkpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERpc3BsYXlMaXN0JywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG51bGw7XG4gICAgICBET00ubmV3VGFza1ByaW9yaXR5LmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQpIHtcbiAgICAgICAgICBuZXdUYXNrUHJpb3JpdHlWYWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2soXG4gICAgICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSxcbiAgICAgICAgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlLFxuICAgICAgICBuZXdUYXNrUHJpb3JpdHlWYWx1ZSxcbiAgICAgICAgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlLFxuICAgICAgKTtcbiAgICAgIG1hc3Rlckxpc3QuYWRkVGFzayhuZXdUYXNrKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGlzcGxheUxpc3QnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QpKTtcbiAgICB9XG4gICAgbWFzdGVyTGlzdC5zb3J0QnlEYXRlKCk7XG4gICAgLy8gQ2xlYXIgdGhlIG1vZGFsIGlucHV0IGZpZWxkcyB3aGVuIG1vZGFsIGlzIHN1Ym1pdHRlZFxuICAgIERPTS5uZXdUYXNrQ29udGVudC52YWx1ZSA9IG51bGw7XG4gICAgRE9NLm5ld1Rhc2tEYXRlLnZhbHVlID0gbnVsbDtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBET00ubmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICBET00ubmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsO1xuICAgIH1cbiAgICBET00ubmV3VGFza1Byb2plY3QudmFsdWUgPSBudWxsO1xuICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgRE9NLm1haW4sIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgIHJlbmRlclNpZGVCYXIoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpO1xuICAgIGFkZFNpZGVUaW1lRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfTtcblxuICBET00uYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBlZGl0dGluZyA9IGZhbHNlO1xuICAgIERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnY2xvc2VkJyk7XG4gIH0pO1xuXG4gIC8vIENsZWFyIHRoZSBtb2RhbCBpbnB1dCBmaWVsZHMgd2hlbiBtb2RhbCBpcyBjbG9zZWQgYnkgdGhlIHhcbiAgRE9NLmNsb3NlTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdjbG9zZWQnKTtcbiAgICBET00ubmV3VGFza0NvbnRlbnQudmFsdWUgPSBudWxsO1xuICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSA9IG51bGw7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgRE9NLm5ld1Rhc2tQcmlvcml0eSkge1xuICAgICAgRE9NLm5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDtcbiAgICB9XG4gICAgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlID0gbnVsbDtcbiAgfSk7XG4gIERPTS5hZGRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0YXNrU3VibWl0KTtcblxuICAvLyBUb2RheSwgV2VlaywgYW5kIEFsbCBzaWRlQmFyIEVMc1xuICB0cnkge1xuICAgIERPTS50b2RheXNUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0b2RheScsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuXG4gICAgRE9NLnRoaXNXZWVrU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RoaXMtd2VlaycsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuXG4gICAgRE9NLmFsbFRhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2FsbCcsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCBldmVudCBsaXN0ZW5lcnMnKTtcbiAgfVxufVxuIiwiY29uc3QgY3VycmVudFNldHRpbmdzID0ge1xuICB2aWV3Qnk6ICdhbGwnLFxuICB3aGljaFByb2plY3Q6IG51bGwsXG5cbiAgdXBkYXRlKG5ld1ZpZXcsIHdoaWNoUCA9IG51bGwpIHtcbiAgICB0aGlzLnZpZXdCeSA9IG5ld1ZpZXc7XG4gICAgdGhpcy53aGljaFByb2plY3QgPSB3aGljaFA7XG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQgY3VycmVudFNldHRpbmdzO1xuIiwiXCJ1c2Ugc3RyaWN0XCJcblxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01DYWNoZVwiO1xuaW1wb3J0IHsgYWRkTWFpbkV2ZW50TGlzdGVuZXJzLCBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMsIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9hZGRFTHNcIjtcbmltcG9ydCB7IG1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJBZGRUYXNrTW9kYWwsIHJlbmRlclNpZGVCYXIsIHJlbmRlckhlYWRlciB9IGZyb20gXCIuL3JlbmRlclwiO1xuaW1wb3J0IHsgY3VycmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY3VycmVudFNldHRpbmdzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZyZXNoU3RhcnQoKSB7IFxuICAgIFxuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICBsZXQgdG9tb3Jyb3cgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyAxKTtcbiAgICBsZXQgZGF5QWZ0ZXJUb21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICBkYXlBZnRlclRvbW9ycm93LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgMik7XG5cbiAgICBsZXQgbGF0ZXJEYXkgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgbGF0ZXJEYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA4KTtcblxuICAgIGxldCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgeWVzdGVyZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gMSk7XG5cbiAgICBjb25zdCBzYW1wbGVUYXNrID0gbmV3IFRhc2soIHRvZGF5LCAnUmVmYWN0b3IgdGljLXRhYy10b2UgcHJvZ3JhbScsICdub3JtYWwnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazIgPSBuZXcgVGFzayggdG9kYXksICdCdXkgbWlsaycsICdoaWdoJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2szID0gbmV3IFRhc2soIHRvbW9ycm93LCAnQnV5IGJpcnRoZGF5IGNhcmQnLCAnbm9ybWFsJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2s0ID0gbmV3IFRhc2soIHRvbW9ycm93LCAnQ2FsbCBtb20nLCAnaGlnaCcgKTsgXG4gICAgY29uc3Qgc2FtcGxlVGFzazUgPSBuZXcgVGFzayggdG9tb3Jyb3csICdEbyBSdWJ5IGJlZ2lubmVyIHR1dG9yaWFsJywgJ25vcm1hbCcgKTtcbiAgICBjb25zdCBzYW1wbGVUYXNrNiA9IG5ldyBUYXNrKCBkYXlBZnRlclRvbW9ycm93LCAnVmFjdXVtJywgJ2hpZ2gnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazcgPSBuZXcgVGFzayggZGF5QWZ0ZXJUb21vcnJvdywgJ0xhdW5kcnknLCAnbm9ybWFsJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2s4ID0gbmV3IFRhc2soIGRheUFmdGVyVG9tb3Jyb3csICdQcmFjdGljZSBwaWFubycsICdub3JtYWwnICk7XG4gICAgY29uc3Qgc2FtcGxlVGFzazkgPSBuZXcgVGFzayggdG9kYXksICdEb2ctc2l0IGZvciBLaW1teScsICdoaWdoJyApO1xuICAgIGNvbnN0IHNhbXBsZVRhc2sxMCA9IG5ldyBUYXNrKCB5ZXN0ZXJkYXksICdTY2hlZHVsZSBkZW50aXN0IGFwcG9pbnRtZW50JywgJ2hpZ2gnICk7XG5cbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzayk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2syKTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazMpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNCk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s1KTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazYpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNyk7XG4gICAgbWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s4KTtcbiAgICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazkpO1xuICAgIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMTApO1xuICAgIG1hc3Rlckxpc3Quc29ydEJ5RGF0ZSgpO1xuXG5cbiAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2ssICdwcm9qZWN0JywgJ0NvZGluZycpO1xuICAgIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazIsICdwcm9qZWN0JywgJ1Nob3BwaW5nJyk7XG4gICAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrMywgJ3Byb2plY3QnLCAnU2hvcHBpbmcnKTtcbiAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s1LCAncHJvamVjdCcsICdDb2RpbmcnKTtcbiAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s2LCAncHJvamVjdCcsICdIb3VzZXdvcmsnKTtcbiAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s3LCAncHJvamVjdCcsICdIb3VzZXdvcmsnKTtcblxuICAgIC8vICoqKioqKioqKioqKioqKlxuXG4gICAgLy8gQ2FjaGUgRE9NIGFuZCByZW5kZXIgZWFjaCBzZWN0aW9uXG4gICAgY29uc29sZS5sb2cobWFzdGVyTGlzdC5kYXRhKTtcblxuICAgIHJlbmRlckhlYWRlcihET00uYm9keSk7XG4gICAgcmVuZGVyU2lkZUJhcihET00uYm9keSwgbWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTtcbiAgICByZW5kZXJBZGRUYXNrTW9kYWwoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcblxuICAgIC8vIEFkZCBldmVudGxpc3RlbmVycyB0byBoZWFkZXIgYW5kIG1vZGFsXG4gICAgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpO1xuICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIERPTS5zaWRlYmFyUHJvamVjdExpc3RSZW1vdmU7XG59IiwiLy8gVGhlcmUgc2hvdWxkIG9ubHkgYmUgb25lIG1hc3RlciBsaXN0XG5sZXQgaW5zdGFuY2UgPSBudWxsO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuY2xhc3MgTWFzdGVyTGlzdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2FuIG9ubHkgY3JlYXRlIG9uZSBpbnN0YW5jZSEnKTtcbiAgICB9XG4gICAgaW5zdGFuY2UgPSB0aGlzO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIHRoaXMuZGlzcGxheWVkTGlzdCA9IFtdO1xuICB9XG5cbiAgYWRkVGFzayh0YXNrKSB7XG4gICAgdGhpcy5kYXRhLnB1c2godGFzayk7XG4gIH1cblxuICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICB0aGlzLmRhdGEuc3BsaWNlKHRoaXMuZGF0YS5pbmRleE9mKHRhc2spLCAxKTtcbiAgfVxuXG4gIGVkaXRUYXNrKHRhc2ssIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICB0aGlzLmRhdGFbdGhpcy5kYXRhLmluZGV4T2YodGFzayldW2F0dHJpYnV0ZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHNvcnRCeURhdGUoKSB7XG4gICAgdGhpcy5kYXRhXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBieURhdGUgPSBhLmRhdGUgLSBiLmRhdGU7XG4gICAgICAgIGlmIChieURhdGUgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gYnlEYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhLnByaW9yaXR5LmxvY2FsZUNvbXBhcmUoYi5wcmlvcml0eSkgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eS5sb2NhbGVDb21wYXJlKGIucHJpb3JpdHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYS5jb250ZW50LnRvTG93ZXJDYXNlKCkubG9jYWxlQ29tcGFyZShiLmNvbnRlbnQudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcm9kdWNlUHJvamVjdExpc3QocHJvamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gdGhpcy5kYXRhLmZpbHRlcigodGFzaykgPT4gdGFzay5wcm9qZWN0ID09PSBwcm9qZWN0KTtcbiAgICBwcm9qZWN0TGlzdC5zb3J0KChhLCBiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgIHJldHVybiBwcm9qZWN0TGlzdDtcbiAgfVxuXG4gIGdldExpc3RPZlByb2plY3RzKCkge1xuICAgIGNvbnN0IGFsbFByb2plY3RzID0gW107XG4gICAgdGhpcy5kYXRhLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIGlmICh0YXNrLnByb2plY3QgIT0gbnVsbCAmJiB0YXNrLnByb2plY3QgIT09ICcnICYmICFhbGxQcm9qZWN0cy5zb21lKChhKSA9PiBhID09PSB0YXNrLnByb2plY3QpKSB7XG4gICAgICAgIGFsbFByb2plY3RzLnB1c2godGFzay5wcm9qZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYWxsUHJvamVjdHM7XG4gIH1cbn1cblxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0KCk7XG5leHBvcnQgZGVmYXVsdCBtYXN0ZXJMaXN0O1xuIiwiaW1wb3J0IERPTSBmcm9tICcuL0RPTUNhY2hlJztcblxuZnVuY3Rpb24gcmVuZGVyQ2FyZCh0YXNrKSB7XG4gIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gIGNoZWNrYm94Lm5hbWUgPSAnaXNDb21wbGV0ZWRDaGVja2JveCc7XG4gIGNoZWNrYm94LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICBjaGVja2JveC5jaGVja2VkID0gdGFzay5pc0NvbXBsZXRlZDtcbiAgY2hlY2tib3guaWQgPSB0YXNrLmNvbnRlbnQ7XG5cbiAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFzay1uYW1lJyk7XG4gIHRhc2tOYW1lLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRhc2suY29udGVudDtcblxuICBjb25zdCB0YXNrRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRhc2tEdWUuY2xhc3NMaXN0LmFkZCgndGFzay1kdWUtZGF0ZScpO1xuICB0YXNrRHVlLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICB0YXNrRHVlLnRleHRDb250ZW50ID0gYER1ZTogJHt0YXNrLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7IHdlZWtkYXk6ICdzaG9ydCcgfSl9LFxuICAgICAgICAke3Rhc2suZGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHsgbW9udGg6ICdzaG9ydCcgfSl9LiBcbiAgICAgICAgJHt0YXNrLmRhdGUuZ2V0RGF0ZSgpfSBgO1xuXG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICBlZGl0QnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICBlZGl0QnRuLnRleHRDb250ZW50ID0gJ2VkaXQnO1xuXG4gIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gIHJlbW92ZUJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gJ2RlbGV0ZSc7XG5cbiAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgY2FyZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgaWYgKHRhc2sucHJpb3JpdHkgPT09ICdoaWdoJykge1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnaW1wb3J0YW50Jyk7XG4gIH1cbiAgY2FyZC5hcHBlbmQoY2hlY2tib3gsIHRhc2tOYW1lLCB0YXNrRHVlLCBlZGl0QnRuLCByZW1vdmVCdG4pO1xuICByZXR1cm4gKGNhcmQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBvcHRpb24sIGJ5UHJvamVjdE5hbWUgPSBudWxsKSB7XG4gIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IHRvbW9ycm93ID0gbmV3IERhdGUodG9kYXkpO1xuICB0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDEpO1xuXG4gIGNvbnN0IHdlZWtGcm9tVG9kYXkgPSBuZXcgRGF0ZSh0b2RheSk7XG4gIHdlZWtGcm9tVG9kYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA3KTtcblxuICBsZXQgdG9kYXlHcm91cCA9IG51bGw7XG4gIGxldCBwYXN0RHVlID0gbnVsbDtcbiAgbGV0IHdlZWtHcm91cCA9IG51bGw7XG5cbiAgLy8gRmlyc3QgcmVtb3ZlIGV2ZXJ5dGhpbmcgZnJvbSBtYWluIGFuZCBmcm9tIGRpc3BsYXlMaXN0XG4gIHdoaWxlIChET00ubWFpbi5maXJzdENoaWxkKSB7XG4gICAgRE9NLm1haW4ucmVtb3ZlQ2hpbGQoRE9NLm1haW4uZmlyc3RDaGlsZCk7XG4gICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnNwbGljZSgwLCBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QubGVuZ3RoKTtcbiAgfVxuXG4gIGlmIChvcHRpb24gPT09ICdieVByb2plY3QnKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBtYXN0ZXJMaXN0LnByb2R1Y2VQcm9qZWN0TGlzdChieVByb2plY3ROYW1lKTtcbiAgICBjb25zdCBwcm9qZWN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByb2plY3RIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICBwcm9qZWN0SGVhZGluZy50ZXh0Q29udGVudCA9IGJ5UHJvamVjdE5hbWU7XG4gICAgRE9NLm1haW4uYXBwZW5kKHByb2plY3RIZWFkaW5nKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocHJvamVjdExpc3RbaV0uZGF0ZSA+PSB0b2RheSAmJiBwcm9qZWN0TGlzdFtpXS5kYXRlIDw9IHRvZGF5ICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdzdWJoZWFkaW5nJyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgfVxuICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUgPiB0b2RheSAmJiB0b2RheUdyb3VwID09PSAxKSB7XG4gICAgICAgIHRvZGF5R3JvdXAgPSBudWxsO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cbiAgICAgIERPTS5tYWluLmFwcGVuZChyZW5kZXJDYXJkKHByb2plY3RMaXN0W2ldKSk7XG4gICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QucHVzaChwcm9qZWN0TGlzdFtpXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFzdGVyTGlzdC5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgb3B0aW9uID09PSAndG9kYXknKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiBvcHRpb24gPT09ICd0aGlzLXdlZWsnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUGFzdC1EdWUgVW5kb25lIEJsb2NrXG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b2RheVxuICAgICAgICAmJiBwYXN0RHVlID09IG51bGxcbiAgICAgICAgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmlzQ29tcGxldGVkID09PSBmYWxzZSkge1xuICAgICAgICBwYXN0RHVlID0gMTtcbiAgICAgICAgY29uc3QgcGFzdER1ZUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcGFzdER1ZUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICBwYXN0RHVlSGVhZGluZy50ZXh0Q29udGVudCA9ICdQYXN0IER1ZSc7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZChwYXN0RHVlSGVhZGluZyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSAmJiBwYXN0RHVlID09PSAxKSB7XG4gICAgICAgIHBhc3REdWUgPSAyO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cblxuICAgICAgLy8gVG9kYXkgQmxvY2tcbiAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheVxuICAgICAgICAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8IHRvbW9ycm93XG4gICAgICAgICYmIHRvZGF5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZCh0b2RheUhlYWRpbmcpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3cgJiYgdG9kYXlHcm91cCA9PSAxKSB7XG4gICAgICAgIHRvZGF5R3JvdXAgPSAyO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDw9IHdlZWtGcm9tVG9kYXlcbiAgICAgICAgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9tb3Jyb3dcbiAgICAgICAgJiYgd2Vla0dyb3VwID09IG51bGwpIHtcbiAgICAgICAgd2Vla0dyb3VwID0gMTtcbiAgICAgICAgY29uc3Qgd2Vla0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgd2Vla0hlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICB3ZWVrSGVhZGluZy50ZXh0Q29udGVudCA9ICdUaGlzIFdlZWsnO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQod2Vla0hlYWRpbmcpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPiB3ZWVrRnJvbVRvZGF5ICYmIHdlZWtHcm91cCA9PT0gMSkge1xuICAgICAgICB3ZWVrR3JvdXAgPSAyO1xuICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChtYXN0ZXJMaXN0LmRhdGFbaV0uaXNDb21wbGV0ZWQgPT09IGZhbHNlXG4gICAgICAgICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9kYXkpXG4gICAgICAgIHx8IG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5KSB7XG4gICAgICAgIERPTS5tYWluLmFwcGVuZChyZW5kZXJDYXJkKG1hc3Rlckxpc3QuZGF0YVtpXSkpO1xuICAgICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QucHVzaChtYXN0ZXJMaXN0LmRhdGFbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQWRkVGFza01vZGFsKHNvbWVEaXYsIGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFkZFRhc2tNb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbCcpO1xuICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnY2xvc2VkJyk7XG4gIGFkZFRhc2tNb2RhbC5pZCA9ICdhZGQtYS10YXNrLW1vZGFsJztcblxuICBjb25zdCBhZGRUYXNrTW9kYWxDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFkZFRhc2tNb2RhbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuXG4gIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICB0YXNrRm9ybS5pZCA9ICd0YXNrLWZvcm0nO1xuXG4gIGNvbnN0IGVtcHR5RGl2MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbXB0eURpdjEudGV4dENvbnRlbnQgPSAnICc7XG4gIGNvbnN0IGVtcHR5RGl2MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbXB0eURpdjIudGV4dENvbnRlbnQgPSAnICc7XG4gIGNvbnN0IGNsb3NlTW9kYWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2xvc2VNb2RhbEJ1dHRvbi5pZCA9ICdjbG9zZS1tb2RhbC1idXR0b24nO1xuXG4gIGNsb3NlTW9kYWxCdXR0b24uaW5uZXJIVE1MID0gJyZ0aW1lcyc7XG5cbiAgY29uc3QgZW1wdHlEaXYzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGVtcHR5RGl2My50ZXh0Q29udGVudCA9ICcgJztcbiAgY29uc3QgbGFiZWxGb3JUYXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGxhYmVsRm9yVGFza0NvbnRlbnQuZm9yID0gJ3Rhc2stY29udGVudCc7XG4gIGxhYmVsRm9yVGFza0NvbnRlbnQudGV4dENvbnRlbnQgPSAnVGFzazonO1xuXG4gIGNvbnN0IHRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgdGFza0NvbnRlbnQudHlwZSA9ICd0ZXh0JztcbiAgdGFza0NvbnRlbnQuaWQgPSAndGFzay1jb250ZW50JztcbiAgdGFza0NvbnRlbnQubmFtZSA9ICd0YXNrLWNvbnRlbnQnO1xuICB0YXNrQ29udGVudC5wbGFjZWhvbGRlciA9ICdFbnRlciBUYXNrJztcbiAgdGFza0NvbnRlbnQucmVxdWlyZWQgPSB0cnVlO1xuICBjb25zdCBlbXB0eURpdjQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZW1wdHlEaXY0LnRleHRDb250ZW50ID0gJyAnO1xuXG4gIGNvbnN0IGxhYmVsRm9yRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGxhYmVsRm9yRGF0ZS5mb3IgPSAnZGF0ZSc7XG4gIGxhYmVsRm9yRGF0ZS50ZXh0Q29udGVudCA9ICdEdWU6JztcbiAgY29uc3QgZW1wdHlEaXY1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGVtcHR5RGl2NS50ZXh0Q29udGVudCA9ICcgJztcblxuICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgZGF0ZS50eXBlID0gJ2RhdGUnO1xuICBkYXRlLmlkID0gJ2RhdGUnO1xuICBkYXRlLm5hbWUgPSAnZGF0ZSc7XG4gIGRhdGUucmVxdWlyZWQgPSB0cnVlO1xuICBjb25zdCBlbXB0eURpdjYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZW1wdHlEaXY2LnRleHRDb250ZW50ID0gJyAnO1xuXG4gIGNvbnN0IHByaW9yaXR5VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJpb3JpdHlUaXRsZS50ZXh0Q29udGVudCA9ICdQcmlvcml0eTonO1xuXG4gIGNvbnN0IHByaW9yaXR5T3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcmlvcml0eU9wdGlvbnMuaWQgPSAncHJpb3JpdHktb3B0aW9ucyc7XG5cbiAgY29uc3Qgb3B0aW9uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBub3JtYWxSYWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIG5vcm1hbFJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICBub3JtYWxSYWRpby5pZCA9ICdub3JtYWwnO1xuICBub3JtYWxSYWRpby5uYW1lID0gJ3ByaW9yaXR5JztcbiAgbm9ybWFsUmFkaW8udmFsdWUgPSAnbm9ybWFsJztcbiAgbm9ybWFsUmFkaW8ucmVxdWlyZWQgPSB0cnVlO1xuXG4gIGNvbnN0IG5vcm1hbFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBub3JtYWxSYWRpb0xhYmVsLmZvciA9ICdub3JtYWwnO1xuICBub3JtYWxSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gJ05vcm1hbCc7XG5cbiAgY29uc3Qgb3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBoaWdoUmFkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBoaWdoUmFkaW8udHlwZSA9ICdyYWRpbyc7XG4gIGhpZ2hSYWRpby5pZCA9ICdoaWdoJztcbiAgaGlnaFJhZGlvLm5hbWUgPSAncHJpb3JpdHknO1xuICBoaWdoUmFkaW8udmFsdWUgPSAnaGlnaCc7XG4gIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICBjb25zdCBoaWdoUmFkaW9MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gIGhpZ2hSYWRpb0xhYmVsLmZvciA9ICdoaWdoJztcbiAgaGlnaFJhZGlvTGFiZWwudGV4dENvbnRlbnQgPSAnSGlnaCc7XG5cbiAgY29uc3QgYXNzaWduVG9Qcm9qZWN0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBhc3NpZ25Ub1Byb2plY3RMYWJlbC5mb3IgPSAncHJvamVjdCc7XG4gIGFzc2lnblRvUHJvamVjdExhYmVsLnRleHRDb250ZW50ID0gJ1Byb2plY3Q6JztcblxuICBjb25zdCBhc3NpZ25Ub1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBhc3NpZ25Ub1Byb2plY3QubmFtZSA9ICdwcm9qZWN0JztcbiAgYXNzaWduVG9Qcm9qZWN0LmlkID0gJ3Byb2plY3QnO1xuICBhc3NpZ25Ub1Byb2plY3QucGxhY2Vob2xkZXIgPSAnT3B0aW9uYWwnO1xuICBhc3NpZ25Ub1Byb2plY3Quc2V0QXR0cmlidXRlKCdsaXN0JywgJ3Byb2plY3QtbGlzdCcpO1xuXG4gIGNvbnN0IGFzc2lnblRvUHJvamVjdERhdGFMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGF0YWxpc3QnKTtcbiAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuaWQgPSAncHJvamVjdC1saXN0JztcblxuICBhcnJheU9mUHJvamVjdE5hbWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgb3B0aW9uLnZhbHVlID0gZW50cnk7XG4gICAgb3B0aW9uLnRleHRDb250ZW50ID0gZW50cnk7XG4gICAgYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QuYXBwZW5kKG9wdGlvbik7XG4gIH0pO1xuXG4gIGFzc2lnblRvUHJvamVjdC5hcHBlbmQoYXNzaWduVG9Qcm9qZWN0RGF0YUxpc3QpO1xuXG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBzdWJtaXRCdG4udHlwZSA9ICdzdWJtaXQnO1xuICBzdWJtaXRCdG4uaWQgPSAnbW9kYWwtc3VibWl0JztcbiAgc3VibWl0QnRuLnZhbHVlID0gJ1N1Ym1pdCc7XG4gIHN1Ym1pdEJ0bi50ZXh0Q29udGVudCA9ICdTdWJtaXQnO1xuXG4gIG9wdGlvbjEuYXBwZW5kKG5vcm1hbFJhZGlvLCBub3JtYWxSYWRpb0xhYmVsKTtcbiAgb3B0aW9uMi5hcHBlbmQoaGlnaFJhZGlvLCBoaWdoUmFkaW9MYWJlbCk7XG4gIHByaW9yaXR5T3B0aW9ucy5hcHBlbmQob3B0aW9uMSwgb3B0aW9uMik7XG4gIHRhc2tGb3JtLmFwcGVuZChcbiAgICBlbXB0eURpdjEsXG4gICAgZW1wdHlEaXYyLFxuICAgIGNsb3NlTW9kYWxCdXR0b24sXG4gICAgbGFiZWxGb3JUYXNrQ29udGVudCxcbiAgICB0YXNrQ29udGVudCxcbiAgICBlbXB0eURpdjMsXG4gICAgbGFiZWxGb3JEYXRlLFxuICAgIGRhdGUsXG4gICAgZW1wdHlEaXY0LFxuXG4gICAgcHJpb3JpdHlUaXRsZSxcbiAgICBwcmlvcml0eU9wdGlvbnMsXG4gICAgZW1wdHlEaXY1LFxuXG4gICAgYXNzaWduVG9Qcm9qZWN0TGFiZWwsXG4gICAgYXNzaWduVG9Qcm9qZWN0LFxuICAgIGVtcHR5RGl2NixcblxuICAgIHN1Ym1pdEJ0bixcbiAgKTtcbiAgYWRkVGFza01vZGFsQ29udGVudC5hcHBlbmQodGFza0Zvcm0pO1xuICBhZGRUYXNrTW9kYWwuYXBwZW5kKGFkZFRhc2tNb2RhbENvbnRlbnQpO1xuICBzb21lRGl2LmFwcGVuZChhZGRUYXNrTW9kYWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2lkZUJhcihzb21lRGl2LCBhcnJheU9mUHJvamVjdE5hbWVzKSB7XG4gIGlmIChET00uc2lkZUJhcikge1xuICAgIERPTS5zaWRlQmFyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoRE9NLnNpZGVCYXIpO1xuICB9XG4gIGNvbnN0IHNpZGViYXJTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICBzaWRlYmFyU2VjdGlvbi5pZCA9ICdzaWRlYmFyJztcbiAgY29uc3QgbGlzdEJ5VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGNvbnN0IGxpc3RJdGVtMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gIGNvbnN0IGl0ZW0xQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gIGNvbnN0IHRvZGF5SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgdG9kYXlJY29uLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gIHRvZGF5SWNvbi50ZXh0Q29udGVudCA9ICd0b2RheSc7XG5cbiAgaXRlbTFBbmNob3IuaWQgPSAndG9kYXlzLXRhc2tzJztcbiAgaXRlbTFBbmNob3IuaHJlZiA9ICcjJztcbiAgaXRlbTFBbmNob3IudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICBpdGVtMUFuY2hvci5wcmVwZW5kKHRvZGF5SWNvbik7XG4gIGxpc3RJdGVtMS5hcHBlbmQoaXRlbTFBbmNob3IpO1xuXG4gIGNvbnN0IHdlZWtJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICB3ZWVrSWNvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICB3ZWVrSWNvbi50ZXh0Q29udGVudCA9ICdkYXRlX3JhbmdlJztcbiAgY29uc3QgbGlzdEl0ZW0yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgY29uc3QgaXRlbTJBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGl0ZW0yQW5jaG9yLmlkID0gJ3RoaXMtd2Vlayc7XG4gIGl0ZW0yQW5jaG9yLmhyZWYgPSAnIyc7XG4gIGl0ZW0yQW5jaG9yLnRleHRDb250ZW50ID0gJ1RoaXMgV2Vlayc7XG4gIGl0ZW0yQW5jaG9yLnByZXBlbmQod2Vla0ljb24pO1xuICBsaXN0SXRlbTIuYXBwZW5kKGl0ZW0yQW5jaG9yKTtcblxuICBjb25zdCBtb250aEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gIG1vbnRoSWNvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICBtb250aEljb24udGV4dENvbnRlbnQgPSAnY2FsZW5kYXJfbW9udGgnO1xuICBjb25zdCBsaXN0SXRlbTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBjb25zdCBpdGVtM0FuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgaXRlbTNBbmNob3IuaWQgPSAnYWxsLXRhc2tzJztcbiAgaXRlbTNBbmNob3IuaHJlZiA9ICcjJztcbiAgaXRlbTNBbmNob3IudGV4dENvbnRlbnQgPSAnQWxsJztcbiAgaXRlbTNBbmNob3IucHJlcGVuZChtb250aEljb24pO1xuICBsaXN0SXRlbTMuYXBwZW5kKGl0ZW0zQW5jaG9yKTtcblxuICBsaXN0QnlUaW1lLmFwcGVuZChsaXN0SXRlbTEsIGxpc3RJdGVtMiwgbGlzdEl0ZW0zKTtcblxuICBjb25zdCBsaXN0QnlQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgbGlzdEJ5UHJvamVjdC5pZCA9ICdsaXN0LWJ5LXByb2plY3QnO1xuICBjb25zdCBtYWtlTGluayA9IGZ1bmN0aW9uIChuYW1lLCBkaXYpIHtcbiAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgaXRlbUFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpdGVtQW5jaG9yLmlkID0gbmFtZTtcbiAgICBpdGVtQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgaXRlbUFuY2hvci50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgY29uc3QgcmVtb3ZlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICByZW1vdmVQcm9qZWN0QnRuLmlkID0gYCR7bmFtZX1SZW1vdmVgO1xuICAgIHJlbW92ZVByb2plY3RCdG4uaHJlZiA9ICcjJztcbiAgICByZW1vdmVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gICAgcmVtb3ZlUHJvamVjdEJ0bi50ZXh0Q29udGVudCA9ICdkZWxldGUnO1xuICAgIGxpc3RJdGVtLmFwcGVuZChpdGVtQW5jaG9yLCByZW1vdmVQcm9qZWN0QnRuKTtcbiAgICBkaXYuYXBwZW5kKGxpc3RJdGVtKTtcbiAgfTtcbiAgaWYgKGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgICBhcnJheU9mUHJvamVjdE5hbWVzLmZvckVhY2goKGEpID0+IHsgbWFrZUxpbmsoYSwgbGlzdEJ5UHJvamVjdCk7IH0pO1xuICB9XG4gIHNpZGViYXJTZWN0aW9uLmFwcGVuZChsaXN0QnlUaW1lLCBsaXN0QnlQcm9qZWN0KTtcbiAgc29tZURpdi5hcHBlbmQoc2lkZWJhclNlY3Rpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVySGVhZGVyKHNvbWVEaXYpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYWRkVGFza0J0bi5pZCA9ICdhZGQtYS10YXNrJztcbiAgYWRkVGFza0J0bi50ZXh0Q29udGVudCA9ICdBZGQgVGFzayc7XG4gIGhlYWRlci5hcHBlbmQoYWRkVGFza0J0bik7XG4gIHNvbWVEaXYucHJlcGVuZChoZWFkZXIpO1xufVxuIiwiaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQgRE9NIGZyb20gJy4vRE9NQ2FjaGUnO1xuaW1wb3J0IHsgYWRkTWFpbkV2ZW50TGlzdGVuZXJzLCBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMsIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2FkZEVMcyc7XG5pbXBvcnQgbWFzdGVyTGlzdCBmcm9tICcuL21hc3Rlckxpc3QnO1xuaW1wb3J0IHtcbiAgcmVuZGVyTWFpbixcbiAgcmVuZGVyQWRkVGFza01vZGFsLFxuICByZW5kZXJTaWRlQmFyLFxuICByZW5kZXJIZWFkZXIsXG59IGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCBjdXJyZW50U2V0dGluZ3MgZnJvbSAnLi9jdXJyZW50U2V0dGluZ3MnO1xuXG5mdW5jdGlvbiBteUZ1bmN0aW9uKGRhdGFGcm9tU2VydmVyKSB7XG4gIGNvbnN0IHBhcnNlZEpTT04gPSBKU09OLnBhcnNlKGRhdGFGcm9tU2VydmVyKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJzZWRKU09OLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdCA9IG5ldyBUYXNrKHBhcnNlZEpTT05baV0uZGF0ZSwgcGFyc2VkSlNPTltpXS5jb250ZW50LCBwYXJzZWRKU09OW2ldLnByaW9yaXR5KTtcbiAgICB0LnByb2plY3QgPSBwYXJzZWRKU09OW2ldLnByb2plY3Q7XG4gICAgdC5jb21wbGV0ZWQgPSBwYXJzZWRKU09OW2ldLmNvbXBsZXRlZDtcbiAgICBtYXN0ZXJMaXN0LmRhdGEucHVzaCh0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXN1bWUoKSB7XG4gIGNvbnN0IG9sZEpTT04gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb2xkRGF0YScpO1xuICBteUZ1bmN0aW9uKG9sZEpTT04pO1xuICByZW5kZXJIZWFkZXIoRE9NLmJvZHkpO1xuICByZW5kZXJTaWRlQmFyKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICByZW5kZXJBZGRUYXNrTW9kYWwoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG5cbiAgLy8gQWRkIGV2ZW50bGlzdGVuZXJzIHRvIGhlYWRlciBhbmQgbW9kYWxcbiAgYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzKCk7XG4gIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gIERPTS5zaWRlYmFyUHJvamVjdExpc3RSZW1vdmU7XG59XG4iLCIvLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKGRhdGUsIGNvbnRlbnQsIHByaW9yaXR5LCBwcm9qZWN0ID0gbnVsbCkge1xuICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIHRoaXMuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApO1xuICB9XG5cbiAgbWFya0RvbmUoKSB7XG4gICAgdGhpcy5pc0NvbXBsZXRlZCA9IHRydWU7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IG1hc3Rlckxpc3QgZnJvbSAnLi9tYXN0ZXJMaXN0JztcbmltcG9ydCBmcmVzaFN0YXJ0IGZyb20gJy4vZnJlc2hTdGFydCc7XG5pbXBvcnQgcmVzdW1lIGZyb20gJy4vcmVzdW1lJztcblxuaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb2xkRGF0YScpKSB7XG4gIGZyZXNoU3RhcnQoKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luc3RhbmNlJywgbWFzdGVyTGlzdCk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xufSBlbHNlIHtcbiAgcmVzdW1lKCk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
=======
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBLFFBQVEsNkRBQWU7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2REFBZTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkRBQWU7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2REFBZTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZEQUFlO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVMsMkVBQTZCO0FBQ3RDLElBQUksMkVBQTZCLENBQUMseUVBQTJCO0FBQzdEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLEtBQUs7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHNFQUF3QjtBQUM1Qjs7QUFFQTtBQUNBLHlDQUF5QyxjQUFjO0FBQ3ZEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pVMkI7QUFDRTtBQUM0RTtBQUNuRTtBQUtwQjtBQUM4Qjs7QUFFaEQ7QUFDQTtBQUNBLGtCQUFrQix1QkFBdUI7QUFDekMsa0JBQWtCLDhDQUFJO0FBQ3RCO0FBQ0E7QUFDQSxJQUFJLDZEQUFvQjtBQUN4QjtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBLEVBQUUsc0RBQWEsQ0FBQyxxRUFBNEI7QUFDNUMsRUFBRSwyREFBa0IsQ0FBQyxzREFBUSxFQUFFLHFFQUE0QjtBQUMzRCxFQUFFLG1EQUFVLENBQUMsbURBQVUsRUFBRSwrREFBc0IsRUFBRSxxRUFBNEI7O0FBRTdFO0FBQ0EsRUFBRSxpRUFBd0I7QUFDMUIsRUFBRSxxRUFBNEI7QUFDOUIsRUFBRSw4REFBcUI7QUFDdkIsRUFBRSwwRUFBNEI7QUFDOUI7Ozs7Ozs7Ozs7Ozs7OztBQ2pDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05zQztBQUNBO0FBQ1I7O0FBRTlCO0FBQ0E7QUFDQSxFQUFFLHVEQUFVO0FBQ1osbUNBQW1DLG1EQUFVO0FBQzdDLGlEQUFpRCx3REFBZTtBQUNoRSx3REFBd0QsaUVBQXdCO0FBQ2hGLEVBQUU7QUFDRjtBQUNBLEVBQUUsbURBQU07QUFDUiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvRE9NQ2FjaGUuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9hZGRFTHMuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9jdXJyZW50U2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9mcmVzaFN0YXJ0LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvbWFzdGVyTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3JlbmRlci5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Jlc3VtZS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGRvbSgpIHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgcmV0dXJuIHtcbiAgICBnZXQgaGVhZGVyKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuICAgIH0sXG4gICAgZ2V0IGFkZFRhc2tCdG4oKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1hLXRhc2snKTtcbiAgICB9LFxuICAgIGdldCBhZGRUYXNrRm9ybSgpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XG4gICAgfSxcbiAgICBnZXQgYWRkVGFza01vZGFsKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtYS10YXNrLW1vZGFsJyk7XG4gICAgfSxcbiAgICBnZXQgY2xvc2VNb2RhbEJ1dHRvbigpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9kYWwtYnV0dG9uJyk7XG4gICAgfSxcbiAgICBnZXQgbmV3VGFza0NvbnRlbnQoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stY29udGVudCcpO1xuICAgIH0sXG4gICAgZ2V0IG5ld1Rhc2tEYXRlKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJyk7XG4gICAgfSxcbiAgICBnZXQgbmV3VGFza1ByaW9yaXR5KCkge1xuICAgICAgY29uc3Qgbm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXByaW9yaXR5XScpO1xuICAgICAgY29uc3QgYXJyYXlPZlByaW9yaXRpZXMgPSBbLi4ubm9kZUxpc3RdO1xuICAgICAgcmV0dXJuIGFycmF5T2ZQcmlvcml0aWVzO1xuICAgIH0sXG4gICAgZ2V0IG5ld1Rhc2tQcm9qZWN0KCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XG4gICAgfSxcbiAgICBtYWluLFxuICAgIGJvZHksXG4gICAgZ2V0IHNpZGVCYXIoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXInKTtcbiAgICB9LFxuICAgIGdldCB0b2RheXNUYXNrc1NpZGVCYXIoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZGF5cy10YXNrcycpO1xuICAgIH0sXG4gICAgZ2V0IHRoaXNXZWVrU2lkZUJhcigpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhpcy13ZWVrJyk7XG4gICAgfSxcbiAgICBnZXQgYWxsVGFza3NTaWRlQmFyKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhbGwtdGFza3MnKTtcbiAgICB9LFxuICAgIGdldCBjYXJkRWRpdEJ0bnMoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVkaXQtdGFzaycpO1xuICAgIH0sXG4gICAgZ2V0IGNhcmRSZW1vdmVCdG5zKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZW1vdmUtdGFzaycpO1xuICAgIH0sXG4gICAgZ2V0IGNhcmRDaGVja0JveHMoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW25hbWU9XCJpc0NvbXBsZXRlZENoZWNrYm94XCJdJyk7XG4gICAgfSxcbiAgICBnZXQgbGlzdEJ5UHJvamVjdCgpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGlzdC1ieS1wcm9qZWN0Jyk7XG4gICAgfSxcbiAgICBnZXQgc2lkZWJhclByb2plY3RMaXN0KCkge1xuICAgICAgY29uc3Qgbm9kZUxpc3RPZlByb2plY3RMaW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0LWJ5LXByb2plY3QnKS5jaGlsZHJlbjtcbiAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlTGlzdE9mUHJvamVjdExpbmtzKSB7XG4gICAgICAgIGFyci5wdXNoKGNoaWxkLmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycjtcbiAgICB9LFxuICAgIGdldCBzaWRlYmFyUHJvamVjdExpc3RSZW1vdmVCdG5zKCkge1xuICAgICAgY29uc3Qgbm9kZUxpc3RPZlByb2plY3RMaW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0LWJ5LXByb2plY3QnKS5jaGlsZHJlbjtcbiAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlTGlzdE9mUHJvamVjdExpbmtzKSB7XG4gICAgICAgIGFyci5wdXNoKGNoaWxkLmxhc3RDaGlsZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0sXG4gIH07XG59XG5jb25zdCBET00gPSBkb20oKTtcbmV4cG9ydCBkZWZhdWx0IERPTTtcbiIsImltcG9ydCBtYXN0ZXJMaXN0IGZyb20gJy4vbWFzdGVyTGlzdCc7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJTaWRlQmFyIH0gZnJvbSAnLi9yZW5kZXInO1xuaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQgY3VycmVudFNldHRpbmdzIGZyb20gJy4vY3VycmVudFNldHRpbmdzJztcbmltcG9ydCBET00gZnJvbSAnLi9ET01DYWNoZSc7XG5cbmxldCBlZGl0dGluZyA9IGZhbHNlO1xubGV0IElETnVtYmVyID0gbnVsbDtcblxuZnVuY3Rpb24gYWRkQ2FyZEV2ZW50TGlzdGVuZXJzKHRhc2spIHtcbiAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1pZD1cIiR7dGFzay5pZH1cIl0gaW5wdXRgKTtcbiAgY2hlY2tib3hbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGJveCkge1xuICAgIGNvbnN0IHRhc2tJRCA9IGJveC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgY29uc3QgcmV0cmlldmVkVGFzayA9IG1hc3Rlckxpc3QuZGF0YS5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5pZCA9PT0gdGFza0lEKTtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICByZXRyaWV2ZWRUYXNrLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgIGJveC50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1jb21wbGV0ZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0cmlldmVkVGFzay5pc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgYm94LnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWNvbXBsZXRlZCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgZWRpdFRhc2sgPSAoZSkgPT4ge1xuICAgIGVkaXR0aW5nID0gdHJ1ZTtcbiAgICBJRE51bWJlciA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XG4gICAgY29uc3QgdGFza1RvRWRpdCA9IG1hc3Rlckxpc3QuZGF0YVxuICAgICAgLmZpbHRlcigodCkgPT4gcGFyc2VJbnQodC5pZCwgMTApID09PSBwYXJzZUludChJRE51bWJlciwgMTApKVswXTtcbiAgICBjb25zdCB5eXl5ID0gdGFza1RvRWRpdC5kYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgbW0gPSB0YXNrVG9FZGl0LmRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgZGQgPSB0YXNrVG9FZGl0LmRhdGUuZ2V0RGF0ZSgpO1xuICAgIGxldCB0YXNrRGF0ZSA9IFN0cmluZygxMDAwMCAqIHl5eXkgKyAxMDAgKiBtbSArIGRkKTtcbiAgICB0YXNrRGF0ZSA9IGAke3Rhc2tEYXRlLnNsaWNlKDAsIDQpfS0ke3Rhc2tEYXRlLnNsaWNlKDQsIDYpfS0ke3Rhc2tEYXRlLnNsaWNlKDYsIDgpfWA7XG4gICAgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlID0gdGFza1RvRWRpdC5jb250ZW50O1xuICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSA9IHRhc2tEYXRlO1xuICAgIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSA9IHRhc2tUb0VkaXQucHJvamVjdDtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBET00ubmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICBpZiAob3B0aW9uLnZhbHVlID09PSB0YXNrLnByaW9yaXR5KSB7XG4gICAgICAgIG9wdGlvbi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdjbG9zZWQnKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVUYXNrID0gKGUpID0+IHtcbiAgICBjb25zdCB0aGlzVGFzayA9IG1hc3Rlckxpc3QuZGF0YS5maWx0ZXIoKHQpID0+IHBhcnNlSW50KHQuaWQsIDEwKSA9PT0gcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSwgMTApKTtcbiAgICBtYXN0ZXJMaXN0LnJlbW92ZVRhc2sodGhpc1Rhc2tbMF0pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7XG4gICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnNwbGljZShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QuaW5kZXhPZih0aGlzVGFza1swXSksIDEpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xuICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gIH07XG5cbiAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWlkPVwiJHt0YXNrLmlkfVwiXSBidXR0b25gKVswXTtcbiAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVkaXRUYXNrKTtcblxuICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1pZD1cIiR7dGFzay5pZH1cIl0gYnV0dG9uYClbMV07XG4gIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZVRhc2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCkge1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0KSB7XG4gICAgYWRkQ2FyZEV2ZW50TGlzdGVuZXJzKGl0ZW0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTaWRlVGltZUV2ZW50TGlzdGVuZXJzKCkge1xuICB0cnkge1xuICAgIERPTS50b2RheXNUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0b2RheScsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuXG4gICAgRE9NLnRoaXNXZWVrU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RoaXMtd2VlaycsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuXG4gICAgRE9NLmFsbFRhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2FsbCcsIG51bGwpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCB0b2RheS93ZWVrL2FsbCBFTHMnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpIHtcbiAgY29uc3QgcmVtb3ZlVGhpcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGNvbmZpcm0oJ0RlbGV0ZSB0aGlzIHByb2plY3QgYW5kIGFsbCB0YXNrcyBpbiBpdD8nKSkge1xuICAgICAgY29uc3QgdGFza3NUb1JlbW92ZSA9IG1hc3Rlckxpc3QucHJvZHVjZVByb2plY3RMaXN0KGUudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuaWQpO1xuICAgICAgdGFza3NUb1JlbW92ZS5mb3JFYWNoKChpdGVtKSA9PiBtYXN0ZXJMaXN0LnJlbW92ZVRhc2soaXRlbSkpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xuICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBET00ubWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICBjb25zb2xlLmxvZyhtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgICAgcmVuZGVyU2lkZUJhcihtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgICAgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpO1xuICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICBjb25zb2xlLmxvZyhtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnWW91IHByZXNzZWQgQ2FuY2VsIScpO1xuICAgIH1cbiAgfTtcblxuICAvLyBTaWRlQmFyIFByb2plY3QgTmFtZSBFTHNcbiAgdHJ5IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgRE9NLnNpZGViYXJQcm9qZWN0TGlzdCkge1xuICAgICAgY29uc3QgcHJvamVjdExpbmsgPSBpdGVtO1xuICAgICAgcHJvamVjdExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2J5UHJvamVjdCcsIHByb2plY3RMaW5rLmlkKTtcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIERPTS5zaWRlYmFyUHJvamVjdExpc3RSZW1vdmVCdG5zKSB7XG4gICAgICBjb25zdCBwcm9qZWN0TGlua1JtID0gaXRlbTtcbiAgICAgIHByb2plY3RMaW5rUm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudFNldHRpbmdzLnZpZXdCeSA9PT0gJ2J5UHJvamVjdCcgJiYgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCA9PT0gcHJvamVjdExpbmtSbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmlkKSB7XG4gICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgnYWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVtb3ZlVGhpcyhlKTtcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHJlbmRlclNpZGVCYXIobWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTtcbiAgICAgICAgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCBFTHMgdG8gcHJvamVjdHMnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzKCkge1xuLy8gICoqKiBBZGRUYXNrTW9kYWwgb3Blbiwgc3VibWl0LCBhbmQgY2xvc2UgYnRuIEVMcyAqKipcbiAgLy8gQ2FsbGJhY2sgZm9yIFN1Ym1pdCBCdXR0b246XG4gIGNvbnN0IHRhc2tTdWJtaXQgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBET00uYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ2Nsb3NlZCcpO1xuICAgIGlmIChlZGl0dGluZykge1xuICAgICAgY29uc3QgdGFza1RvRWRpdCA9IG1hc3Rlckxpc3QuZGF0YVxuICAgICAgICAuZmlsdGVyKCh0KSA9PiBwYXJzZUludCh0LmlkLCAxMCkgPT09IHBhcnNlSW50KElETnVtYmVyLCAxMCkpWzBdO1xuICAgICAgbWFzdGVyTGlzdC5lZGl0VGFzayh0YXNrVG9FZGl0LCAnY29udGVudCcsIERPTS5uZXdUYXNrQ29udGVudC52YWx1ZSk7XG4gICAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHRhc2tUb0VkaXQsICdkYXRlJywgbmV3IERhdGUoRE9NLm5ld1Rhc2tEYXRlLnZhbHVlKSk7XG4gICAgICBjb25zdCBvcHRpb24gPSBBcnJheS5mcm9tKERPTS5uZXdUYXNrUHJpb3JpdHkpXG4gICAgICAgIC5maWx0ZXIoKHByaW9yaXR5TGV2ZWwpID0+IHByaW9yaXR5TGV2ZWwuY2hlY2tlZClbMF07XG4gICAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHRhc2tUb0VkaXQsICdwcmlvcml0eScsIG9wdGlvbi52YWx1ZSk7XG4gICAgICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHRhc2tUb0VkaXQsICdwcm9qZWN0JywgRE9NLm5ld1Rhc2tQcm9qZWN0LnZhbHVlKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnb2xkRGlzcGxheUxpc3QnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDtcbiAgICAgIERPTS5uZXdUYXNrUHJpb3JpdHkuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb24uY2hlY2tlZCkge1xuICAgICAgICAgIG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhcbiAgICAgICAgRE9NLm5ld1Rhc2tEYXRlLnZhbHVlLFxuICAgICAgICBET00ubmV3VGFza0NvbnRlbnQudmFsdWUsXG4gICAgICAgIG5ld1Rhc2tQcmlvcml0eVZhbHVlLFxuICAgICAgICBET00ubmV3VGFza1Byb2plY3QudmFsdWUsXG4gICAgICApO1xuICAgICAgbWFzdGVyTGlzdC5hZGRUYXNrKG5ld1Rhc2spO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29sZERhdGEnLCBKU09OLnN0cmluZ2lmeShtYXN0ZXJMaXN0LmRhdGEpKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xuICAgIH1cbiAgICBtYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcbiAgICAvLyBDbGVhciB0aGUgbW9kYWwgaW5wdXQgZmllbGRzIHdoZW4gbW9kYWwgaXMgc3VibWl0dGVkXG4gICAgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlID0gbnVsbDtcbiAgICBET00ubmV3VGFza0RhdGUudmFsdWUgPSBudWxsO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIERPTS5uZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IG51bGw7XG4gICAgfVxuICAgIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSA9IG51bGw7XG4gICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBET00ubWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgcmVuZGVyU2lkZUJhcihtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICAgIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICBhZGRTaWRlVGltZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gIH07XG5cbiAgRE9NLmFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZWRpdHRpbmcgPSBmYWxzZTtcbiAgICBET00uYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ2Nsb3NlZCcpO1xuICB9KTtcblxuICAvLyBDbGVhciB0aGUgbW9kYWwgaW5wdXQgZmllbGRzIHdoZW4gbW9kYWwgaXMgY2xvc2VkIGJ5IHRoZSB4XG4gIERPTS5jbG9zZU1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnY2xvc2VkJyk7XG4gICAgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlID0gbnVsbDtcbiAgICBET00ubmV3VGFza0RhdGUudmFsdWUgPSBudWxsO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIERPTS5uZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IG51bGw7XG4gICAgfVxuICAgIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSA9IG51bGw7XG4gIH0pO1xuICBET00uYWRkVGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGFza1N1Ym1pdCk7XG5cbiAgLy8gVG9kYXksIFdlZWssIGFuZCBBbGwgc2lkZUJhciBFTHNcbiAgdHJ5IHtcbiAgICBET00udG9kYXlzVGFza3NTaWRlQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgndG9kYXknLCBudWxsKTtcbiAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9KTtcblxuICAgIERPTS50aGlzV2Vla1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0aGlzLXdlZWsnLCBudWxsKTtcbiAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9KTtcblxuICAgIERPTS5hbGxUYXNrc1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCdhbGwnLCBudWxsKTtcbiAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9KTtcbiAgfSBjYXRjaCB7XG4gICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBhZGQgZXZlbnQgbGlzdGVuZXJzJyk7XG4gIH1cbn1cbiIsImNvbnN0IGN1cnJlbnRTZXR0aW5ncyA9IHtcbiAgdmlld0J5OiAnYWxsJyxcbiAgd2hpY2hQcm9qZWN0OiBudWxsLFxuXG4gIHVwZGF0ZShuZXdWaWV3LCB3aGljaFAgPSBudWxsKSB7XG4gICAgdGhpcy52aWV3QnkgPSBuZXdWaWV3O1xuICAgIHRoaXMud2hpY2hQcm9qZWN0ID0gd2hpY2hQO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY3VycmVudFNldHRpbmdzO1xuIiwiaW1wb3J0IFRhc2sgZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQgRE9NIGZyb20gJy4vRE9NQ2FjaGUnO1xuaW1wb3J0IHsgYWRkTWFpbkV2ZW50TGlzdGVuZXJzLCBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMsIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2FkZEVMcyc7XG5pbXBvcnQgbWFzdGVyTGlzdCBmcm9tICcuL21hc3Rlckxpc3QnO1xuaW1wb3J0IHsgcmVuZGVyTWFpbiwgcmVuZGVyQWRkVGFza01vZGFsLCByZW5kZXJTaWRlQmFyIH0gZnJvbSAnLi9yZW5kZXInO1xuaW1wb3J0IGN1cnJlbnRTZXR0aW5ncyBmcm9tICcuL2N1cnJlbnRTZXR0aW5ncyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZyZXNoU3RhcnQoKSB7XG4gIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgY29uc3QgdG9tb3Jyb3cgPSBuZXcgRGF0ZSh0b2RheSk7XG4gIHRvbW9ycm93LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgMSk7XG4gIGNvbnN0IGRheUFmdGVyVG9tb3Jyb3cgPSBuZXcgRGF0ZSh0b2RheSk7XG4gIGRheUFmdGVyVG9tb3Jyb3cuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyAyKTtcblxuICBjb25zdCBsYXRlckRheSA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgbGF0ZXJEYXkuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgKyA4KTtcblxuICBjb25zdCB5ZXN0ZXJkYXkgPSBuZXcgRGF0ZSh0b2RheSk7XG4gIHllc3RlcmRheS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDEpO1xuXG4gIGNvbnN0IHNhbXBsZVRhc2sgPSBuZXcgVGFzayh0b2RheSwgJ1JlZmFjdG9yIHRpYy10YWMtdG9lIHByb2dyYW0nLCAnbm9ybWFsJyk7XG4gIGNvbnN0IHNhbXBsZVRhc2syID0gbmV3IFRhc2sodG9kYXksICdCdXkgbWlsaycsICdoaWdoJyk7XG4gIGNvbnN0IHNhbXBsZVRhc2szID0gbmV3IFRhc2sodG9tb3Jyb3csICdCdXkgYmlydGhkYXkgY2FyZCcsICdub3JtYWwnKTtcbiAgY29uc3Qgc2FtcGxlVGFzazQgPSBuZXcgVGFzayh0b21vcnJvdywgJ0NhbGwgbW9tJywgJ2hpZ2gnKTtcbiAgY29uc3Qgc2FtcGxlVGFzazUgPSBuZXcgVGFzayh0b21vcnJvdywgJ0RvIFJ1YnkgYmVnaW5uZXIgdHV0b3JpYWwnLCAnbm9ybWFsJyk7XG4gIGNvbnN0IHNhbXBsZVRhc2s2ID0gbmV3IFRhc2soZGF5QWZ0ZXJUb21vcnJvdywgJ1ZhY3V1bScsICdoaWdoJyk7XG4gIGNvbnN0IHNhbXBsZVRhc2s3ID0gbmV3IFRhc2soZGF5QWZ0ZXJUb21vcnJvdywgJ0xhdW5kcnknLCAnbm9ybWFsJyk7XG4gIGNvbnN0IHNhbXBsZVRhc2s4ID0gbmV3IFRhc2soZGF5QWZ0ZXJUb21vcnJvdywgJ1ByYWN0aWNlIHBpYW5vJywgJ25vcm1hbCcpO1xuICBjb25zdCBzYW1wbGVUYXNrOSA9IG5ldyBUYXNrKHRvZGF5LCAnRG9nLXNpdCBmb3IgS2ltbXknLCAnaGlnaCcpO1xuICBjb25zdCBzYW1wbGVUYXNrMTAgPSBuZXcgVGFzayh5ZXN0ZXJkYXksICdTY2hlZHVsZSBkZW50aXN0IGFwcG9pbnRtZW50JywgJ2hpZ2gnKTtcblxuICBtYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzayk7XG4gIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMik7XG4gIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMyk7XG4gIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNCk7XG4gIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNSk7XG4gIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNik7XG4gIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNyk7XG4gIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrOCk7XG4gIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrOSk7XG4gIG1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMTApO1xuICBtYXN0ZXJMaXN0LnNvcnRCeURhdGUoKTtcblxuICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2ssICdwcm9qZWN0JywgJ0NvZGluZycpO1xuICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2syLCAncHJvamVjdCcsICdTaG9wcGluZycpO1xuICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2szLCAncHJvamVjdCcsICdTaG9wcGluZycpO1xuICBtYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2s1LCAncHJvamVjdCcsICdDb2RpbmcnKTtcbiAgbWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNiwgJ3Byb2plY3QnLCAnSG91c2V3b3JrJyk7XG4gIG1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazcsICdwcm9qZWN0JywgJ0hvdXNld29yaycpO1xuXG4gIC8vICoqKioqKioqKioqKioqKlxuXG4gIC8vIENhY2hlIERPTSBhbmQgcmVuZGVyIGVhY2ggc2VjdGlvblxuXG4gIHJlbmRlclNpZGVCYXIobWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTtcbiAgcmVuZGVyQWRkVGFza01vZGFsKERPTS5ib2R5LCBtYXN0ZXJMaXN0LmdldExpc3RPZlByb2plY3RzKCkpO1xuICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuXG4gIC8vIEFkZCBldmVudGxpc3RlbmVycyB0byBoZWFkZXIgYW5kIG1vZGFsXG4gIGFkZEluaXRpYWxFdmVudExpc3RlbmVycygpO1xuICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICBET00uc2lkZWJhclByb2plY3RMaXN0UmVtb3ZlO1xufVxuIiwiLy8gVGhlcmUgc2hvdWxkIG9ubHkgYmUgb25lIG1hc3RlciBsaXN0XG5sZXQgaW5zdGFuY2UgPSBudWxsO1xuXG4vLyBDb25zdHJ1Y3RvciB0byBtYWtlIHRhc2sgb2JqZWN0c1xuY2xhc3MgTWFzdGVyTGlzdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgY2FuIG9ubHkgY3JlYXRlIG9uZSBpbnN0YW5jZSEnKTtcbiAgICB9XG4gICAgaW5zdGFuY2UgPSB0aGlzO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIHRoaXMuZGlzcGxheWVkTGlzdCA9IFtdO1xuICB9XG5cbiAgYWRkVGFzayh0YXNrKSB7XG4gICAgdGhpcy5kYXRhLnB1c2godGFzayk7XG4gIH1cblxuICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICB0aGlzLmRhdGEuc3BsaWNlKHRoaXMuZGF0YS5pbmRleE9mKHRhc2spLCAxKTtcbiAgfVxuXG4gIGVkaXRUYXNrKHRhc2ssIGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICB0aGlzLmRhdGFbdGhpcy5kYXRhLmluZGV4T2YodGFzayldW2F0dHJpYnV0ZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHNvcnRCeURhdGUoKSB7XG4gICAgdGhpcy5kYXRhXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBieURhdGUgPSBhLmRhdGUgLSBiLmRhdGU7XG4gICAgICAgIGlmIChieURhdGUgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gYnlEYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhLnByaW9yaXR5LmxvY2FsZUNvbXBhcmUoYi5wcmlvcml0eSkgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eS5sb2NhbGVDb21wYXJlKGIucHJpb3JpdHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYS5jb250ZW50LnRvTG93ZXJDYXNlKCkubG9jYWxlQ29tcGFyZShiLmNvbnRlbnQudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcm9kdWNlUHJvamVjdExpc3QocHJvamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gdGhpcy5kYXRhLmZpbHRlcigodGFzaykgPT4gdGFzay5wcm9qZWN0ID09PSBwcm9qZWN0KTtcbiAgICBwcm9qZWN0TGlzdC5zb3J0KChhLCBiKSA9PiBhLmRhdGUgLSBiLmRhdGUpO1xuICAgIHJldHVybiBwcm9qZWN0TGlzdDtcbiAgfVxuXG4gIGdldExpc3RPZlByb2plY3RzKCkge1xuICAgIGNvbnN0IGFsbFByb2plY3RzID0gW107XG4gICAgdGhpcy5kYXRhLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIGlmICh0YXNrLnByb2plY3QgIT0gbnVsbCAmJiB0YXNrLnByb2plY3QgIT09ICcnICYmICFhbGxQcm9qZWN0cy5zb21lKChhKSA9PiBhID09PSB0YXNrLnByb2plY3QpKSB7XG4gICAgICAgIGFsbFByb2plY3RzLnB1c2godGFzay5wcm9qZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYWxsUHJvamVjdHM7XG4gIH1cbn1cblxuY29uc3QgbWFzdGVyTGlzdCA9IG5ldyBNYXN0ZXJMaXN0KCk7XG5leHBvcnQgZGVmYXVsdCBtYXN0ZXJMaXN0O1xuIiwiaW1wb3J0IERPTSBmcm9tICcuL0RPTUNhY2hlJztcbmltcG9ydCBtYXN0ZXJMaXN0IGZyb20gJy4vbWFzdGVyTGlzdCc7XG5cbmZ1bmN0aW9uIHJlbmRlckNhcmQodGFzaykge1xuICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICBjaGVja2JveC5uYW1lID0gJ2lzQ29tcGxldGVkQ2hlY2tib3gnO1xuICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgY2hlY2tib3guY2hlY2tlZCA9IHRhc2suaXNDb21wbGV0ZWQ7XG4gIGNoZWNrYm94LmlkID0gdGFzay5jb250ZW50O1xuXG4gIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoJ3Rhc2stbmFtZScpO1xuICB0YXNrTmFtZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0YXNrLmNvbnRlbnQ7XG5cbiAgY29uc3QgdGFza0R1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0YXNrRHVlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZHVlLWRhdGUnKTtcbiAgdGFza0R1ZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgdGFza0R1ZS50ZXh0Q29udGVudCA9IGBEdWU6ICR7dGFzay5kYXRlLnRvTG9jYWxlU3RyaW5nKCdkZWZhdWx0JywgeyB3ZWVrZGF5OiAnc2hvcnQnIH0pfSxcbiAgICAgICAgJHt0YXNrLmRhdGUudG9Mb2NhbGVTdHJpbmcoJ2RlZmF1bHQnLCB7IG1vbnRoOiAnc2hvcnQnIH0pfS4gXG4gICAgICAgICR7dGFzay5kYXRlLmdldERhdGUoKX0gYDtcblxuICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGVkaXRCdG4uY2xhc3NMaXN0LmFkZCgnZWRpdC10YXNrJyk7XG4gIGVkaXRCdG4uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnKTtcbiAgZWRpdEJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdlZGl0JztcblxuICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZS10YXNrJyk7XG4gIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICByZW1vdmVCdG4uc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gIHJlbW92ZUJ0bi50ZXh0Q29udGVudCA9ICdkZWxldGUnO1xuXG4gIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2FyZC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XG4gIGNhcmQuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gIGlmICh0YXNrLnByaW9yaXR5ID09PSAnaGlnaCcpIHtcbiAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2ltcG9ydGFudCcpO1xuICB9XG4gIGNhcmQuYXBwZW5kKGNoZWNrYm94LCB0YXNrTmFtZSwgdGFza0R1ZSwgZWRpdEJ0biwgcmVtb3ZlQnRuKTtcbiAgcmV0dXJuIChjYXJkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1haW4obWFzdGVyTGlzdCwgb3B0aW9uLCBieVByb2plY3ROYW1lID0gbnVsbCkge1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICBjb25zdCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcblxuICBjb25zdCB3ZWVrRnJvbVRvZGF5ID0gbmV3IERhdGUodG9kYXkpO1xuICB3ZWVrRnJvbVRvZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNyk7XG5cbiAgbGV0IHRvZGF5R3JvdXAgPSBudWxsO1xuICBsZXQgcGFzdER1ZSA9IG51bGw7XG4gIGxldCB3ZWVrR3JvdXAgPSBudWxsO1xuXG4gIC8vIEZpcnN0IHJlbW92ZSBldmVyeXRoaW5nIGZyb20gbWFpbiBhbmQgZnJvbSBkaXNwbGF5TGlzdFxuICB3aGlsZSAoRE9NLm1haW4uZmlyc3RDaGlsZCkge1xuICAgIERPTS5tYWluLnJlbW92ZUNoaWxkKERPTS5tYWluLmZpcnN0Q2hpbGQpO1xuICAgIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5zcGxpY2UoMCwgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0Lmxlbmd0aCk7XG4gIH1cblxuICBpZiAob3B0aW9uID09PSAnYnlQcm9qZWN0Jykge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gbWFzdGVyTGlzdC5wcm9kdWNlUHJvamVjdExpc3QoYnlQcm9qZWN0TmFtZSk7XG4gICAgY29uc3QgcHJvamVjdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9qZWN0SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgcHJvamVjdEhlYWRpbmcudGV4dENvbnRlbnQgPSBieVByb2plY3ROYW1lO1xuICAgIERPTS5tYWluLmFwcGVuZChwcm9qZWN0SGVhZGluZyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUgPj0gdG9kYXkgJiYgcHJvamVjdExpc3RbaV0uZGF0ZSA8PSB0b2RheSAmJiB0b2RheUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgdG9kYXlHcm91cCA9IDE7XG4gICAgICAgIGNvbnN0IHRvZGF5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnc3ViaGVhZGluZycpO1xuICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9qZWN0TGlzdFtpXS5kYXRlID4gdG9kYXkgJiYgdG9kYXlHcm91cCA9PT0gMSkge1xuICAgICAgICB0b2RheUdyb3VwID0gbnVsbDtcbiAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgRE9NLm1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICB9XG4gICAgICBET00ubWFpbi5hcHBlbmQocmVuZGVyQ2FyZChwcm9qZWN0TGlzdFtpXSkpO1xuICAgICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnB1c2gocHJvamVjdExpc3RbaV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hc3Rlckxpc3QuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93ICYmIG9wdGlvbiA9PT0gJ3RvZGF5Jykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+IHdlZWtGcm9tVG9kYXkgJiYgb3B0aW9uID09PSAndGhpcy13ZWVrJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFBhc3QtRHVlIFVuZG9uZSBCbG9ja1xuICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9kYXlcbiAgICAgICAgJiYgcGFzdER1ZSA9PSBudWxsXG4gICAgICAgICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5pc0NvbXBsZXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcGFzdER1ZSA9IDE7XG4gICAgICAgIGNvbnN0IHBhc3REdWVIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBhc3REdWVIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgcGFzdER1ZUhlYWRpbmcudGV4dENvbnRlbnQgPSAnUGFzdCBEdWUnO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQocGFzdER1ZUhlYWRpbmcpO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9kYXkgJiYgcGFzdER1ZSA9PT0gMSkge1xuICAgICAgICBwYXN0RHVlID0gMjtcbiAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgRE9NLm1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRvZGF5IEJsb2NrXG4gICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9kYXlcbiAgICAgICAgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b21vcnJvd1xuICAgICAgICAmJiB0b2RheUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgdG9kYXlHcm91cCA9IDE7XG4gICAgICAgIGNvbnN0IHRvZGF5SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnaGVhZGluZycpO1xuICAgICAgICB0b2RheUhlYWRpbmcudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93ICYmIHRvZGF5R3JvdXAgPT0gMSkge1xuICAgICAgICB0b2RheUdyb3VwID0gMjtcbiAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgRE9NLm1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8PSB3ZWVrRnJvbVRvZGF5XG4gICAgICAgICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93XG4gICAgICAgICYmIHdlZWtHcm91cCA9PSBudWxsKSB7XG4gICAgICAgIHdlZWtHcm91cCA9IDE7XG4gICAgICAgIGNvbnN0IHdlZWtIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHdlZWtIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgd2Vla0hlYWRpbmcudGV4dENvbnRlbnQgPSAnVGhpcyBXZWVrJztcbiAgICAgICAgRE9NLm1haW4uYXBwZW5kKHdlZWtIZWFkaW5nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID4gd2Vla0Zyb21Ub2RheSAmJiB3ZWVrR3JvdXAgPT09IDEpIHtcbiAgICAgICAgd2Vla0dyb3VwID0gMjtcbiAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgRE9NLm1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICB9XG5cbiAgICAgIGlmICgobWFzdGVyTGlzdC5kYXRhW2ldLmlzQ29tcGxldGVkID09PSBmYWxzZVxuICAgICAgICAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA8IHRvZGF5KVxuICAgICAgICB8fCBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b2RheSkge1xuICAgICAgICBET00ubWFpbi5hcHBlbmQocmVuZGVyQ2FyZChtYXN0ZXJMaXN0LmRhdGFbaV0pKTtcbiAgICAgICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnB1c2gobWFzdGVyTGlzdC5kYXRhW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFkZFRhc2tNb2RhbChzb21lRGl2LCBhcnJheU9mUHJvamVjdE5hbWVzKSB7XG4gIGNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcbiAgYWRkVGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpO1xuICBhZGRUYXNrTW9kYWwuaWQgPSAnYWRkLWEtdGFzay1tb2RhbCc7XG5cbiAgY29uc3QgYWRkVGFza01vZGFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBhZGRUYXNrTW9kYWxDb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcblxuICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgdGFza0Zvcm0uaWQgPSAndGFzay1mb3JtJztcblxuICBjb25zdCBlbXB0eURpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZW1wdHlEaXYxLnRleHRDb250ZW50ID0gJyAnO1xuICBjb25zdCBlbXB0eURpdjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZW1wdHlEaXYyLnRleHRDb250ZW50ID0gJyAnO1xuICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNsb3NlTW9kYWxCdXR0b24uaWQgPSAnY2xvc2UtbW9kYWwtYnV0dG9uJztcblxuICBjbG9zZU1vZGFsQnV0dG9uLmlubmVySFRNTCA9ICcmdGltZXMnO1xuXG4gIGNvbnN0IGVtcHR5RGl2MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbXB0eURpdjMudGV4dENvbnRlbnQgPSAnICc7XG4gIGNvbnN0IGxhYmVsRm9yVGFza0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBsYWJlbEZvclRhc2tDb250ZW50LmZvciA9ICd0YXNrLWNvbnRlbnQnO1xuICBsYWJlbEZvclRhc2tDb250ZW50LnRleHRDb250ZW50ID0gJ1Rhc2s6JztcblxuICBjb25zdCB0YXNrQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIHRhc2tDb250ZW50LnR5cGUgPSAndGV4dCc7XG4gIHRhc2tDb250ZW50LmlkID0gJ3Rhc2stY29udGVudCc7XG4gIHRhc2tDb250ZW50Lm5hbWUgPSAndGFzay1jb250ZW50JztcbiAgdGFza0NvbnRlbnQucGxhY2Vob2xkZXIgPSAnRW50ZXIgVGFzayc7XG4gIHRhc2tDb250ZW50LnJlcXVpcmVkID0gdHJ1ZTtcbiAgY29uc3QgZW1wdHlEaXY0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGVtcHR5RGl2NC50ZXh0Q29udGVudCA9ICcgJztcblxuICBjb25zdCBsYWJlbEZvckRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBsYWJlbEZvckRhdGUuZm9yID0gJ2RhdGUnO1xuICBsYWJlbEZvckRhdGUudGV4dENvbnRlbnQgPSAnRHVlOic7XG4gIGNvbnN0IGVtcHR5RGl2NSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBlbXB0eURpdjUudGV4dENvbnRlbnQgPSAnICc7XG5cbiAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGRhdGUudHlwZSA9ICdkYXRlJztcbiAgZGF0ZS5pZCA9ICdkYXRlJztcbiAgZGF0ZS5uYW1lID0gJ2RhdGUnO1xuICBkYXRlLnJlcXVpcmVkID0gdHJ1ZTtcbiAgY29uc3QgZW1wdHlEaXY2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGVtcHR5RGl2Ni50ZXh0Q29udGVudCA9ICcgJztcblxuICBjb25zdCBwcmlvcml0eVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByaW9yaXR5VGl0bGUudGV4dENvbnRlbnQgPSAnUHJpb3JpdHk6JztcblxuICBjb25zdCBwcmlvcml0eU9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcHJpb3JpdHlPcHRpb25zLmlkID0gJ3ByaW9yaXR5LW9wdGlvbnMnO1xuXG4gIGNvbnN0IG9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3Qgbm9ybWFsUmFkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBub3JtYWxSYWRpby50eXBlID0gJ3JhZGlvJztcbiAgbm9ybWFsUmFkaW8uaWQgPSAnbm9ybWFsJztcbiAgbm9ybWFsUmFkaW8ubmFtZSA9ICdwcmlvcml0eSc7XG4gIG5vcm1hbFJhZGlvLnZhbHVlID0gJ25vcm1hbCc7XG4gIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICBjb25zdCBub3JtYWxSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgbm9ybWFsUmFkaW9MYWJlbC5mb3IgPSAnbm9ybWFsJztcbiAgbm9ybWFsUmFkaW9MYWJlbC50ZXh0Q29udGVudCA9ICdOb3JtYWwnO1xuXG4gIGNvbnN0IG9wdGlvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgaGlnaFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgaGlnaFJhZGlvLnR5cGUgPSAncmFkaW8nO1xuICBoaWdoUmFkaW8uaWQgPSAnaGlnaCc7XG4gIGhpZ2hSYWRpby5uYW1lID0gJ3ByaW9yaXR5JztcbiAgaGlnaFJhZGlvLnZhbHVlID0gJ2hpZ2gnO1xuICBub3JtYWxSYWRpby5yZXF1aXJlZCA9IHRydWU7XG5cbiAgY29uc3QgaGlnaFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICBoaWdoUmFkaW9MYWJlbC5mb3IgPSAnaGlnaCc7XG4gIGhpZ2hSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gJ0hpZ2gnO1xuXG4gIGNvbnN0IGFzc2lnblRvUHJvamVjdExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgYXNzaWduVG9Qcm9qZWN0TGFiZWwuZm9yID0gJ3Byb2plY3QnO1xuICBhc3NpZ25Ub1Byb2plY3RMYWJlbC50ZXh0Q29udGVudCA9ICdQcm9qZWN0Oic7XG5cbiAgY29uc3QgYXNzaWduVG9Qcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgYXNzaWduVG9Qcm9qZWN0Lm5hbWUgPSAncHJvamVjdCc7XG4gIGFzc2lnblRvUHJvamVjdC5pZCA9ICdwcm9qZWN0JztcbiAgYXNzaWduVG9Qcm9qZWN0LnBsYWNlaG9sZGVyID0gJ09wdGlvbmFsJztcbiAgYXNzaWduVG9Qcm9qZWN0LnNldEF0dHJpYnV0ZSgnbGlzdCcsICdwcm9qZWN0LWxpc3QnKTtcblxuICBjb25zdCBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RhdGFsaXN0Jyk7XG4gIGFzc2lnblRvUHJvamVjdERhdGFMaXN0LmlkID0gJ3Byb2plY3QtbGlzdCc7XG5cbiAgYXJyYXlPZlByb2plY3ROYW1lcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIG9wdGlvbi52YWx1ZSA9IGVudHJ5O1xuICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGVudHJ5O1xuICAgIGFzc2lnblRvUHJvamVjdERhdGFMaXN0LmFwcGVuZChvcHRpb24pO1xuICB9KTtcblxuICBhc3NpZ25Ub1Byb2plY3QuYXBwZW5kKGFzc2lnblRvUHJvamVjdERhdGFMaXN0KTtcblxuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgc3VibWl0QnRuLnR5cGUgPSAnc3VibWl0JztcbiAgc3VibWl0QnRuLmlkID0gJ21vZGFsLXN1Ym1pdCc7XG4gIHN1Ym1pdEJ0bi52YWx1ZSA9ICdTdWJtaXQnO1xuICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSAnU3VibWl0JztcblxuICBvcHRpb24xLmFwcGVuZChub3JtYWxSYWRpbywgbm9ybWFsUmFkaW9MYWJlbCk7XG4gIG9wdGlvbjIuYXBwZW5kKGhpZ2hSYWRpbywgaGlnaFJhZGlvTGFiZWwpO1xuICBwcmlvcml0eU9wdGlvbnMuYXBwZW5kKG9wdGlvbjEsIG9wdGlvbjIpO1xuICB0YXNrRm9ybS5hcHBlbmQoXG4gICAgZW1wdHlEaXYxLFxuICAgIGVtcHR5RGl2MixcbiAgICBjbG9zZU1vZGFsQnV0dG9uLFxuICAgIGxhYmVsRm9yVGFza0NvbnRlbnQsXG4gICAgdGFza0NvbnRlbnQsXG4gICAgZW1wdHlEaXYzLFxuICAgIGxhYmVsRm9yRGF0ZSxcbiAgICBkYXRlLFxuICAgIGVtcHR5RGl2NCxcblxuICAgIHByaW9yaXR5VGl0bGUsXG4gICAgcHJpb3JpdHlPcHRpb25zLFxuICAgIGVtcHR5RGl2NSxcblxuICAgIGFzc2lnblRvUHJvamVjdExhYmVsLFxuICAgIGFzc2lnblRvUHJvamVjdCxcbiAgICBlbXB0eURpdjYsXG5cbiAgICBzdWJtaXRCdG4sXG4gICk7XG4gIGFkZFRhc2tNb2RhbENvbnRlbnQuYXBwZW5kKHRhc2tGb3JtKTtcbiAgYWRkVGFza01vZGFsLmFwcGVuZChhZGRUYXNrTW9kYWxDb250ZW50KTtcbiAgc29tZURpdi5hcHBlbmQoYWRkVGFza01vZGFsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNpZGVCYXIoYXJyYXlPZlByb2plY3ROYW1lcykge1xuICBjb25zb2xlLmxvZyhhcnJheU9mUHJvamVjdE5hbWVzKTtcbiAgLy8gIENoYW5nZWQgdG8gb25seSByZW5kZXIgdGhlIGJ5LXByb2plY3QgbGlzdFxuICAvLyAgVGhlIHJlc3QgaXMgaW4gaW5kZXguaHRtbFxuXG4gIC8vIFJlbW92ZSB0aGUgZXhpc3RpbmdQcm9qZWN0c1xuICB3aGlsZSAoRE9NLnNpZGViYXJQcm9qZWN0TGlzdC5sZW5ndGgpIHtcbiAgICBET00ubGlzdEJ5UHJvamVjdC5yZW1vdmVDaGlsZChET00ubGlzdEJ5UHJvamVjdC5sYXN0Q2hpbGQpO1xuICB9XG5cbiAgY29uc3QgbWFrZUxpbmsgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBpdGVtQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW1BbmNob3IuaWQgPSBuYW1lO1xuICAgIGl0ZW1BbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtQW5jaG9yLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICBjb25zdCByZW1vdmVQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHJlbW92ZVByb2plY3RCdG4uaWQgPSBgJHtuYW1lfVJlbW92ZWA7XG4gICAgcmVtb3ZlUHJvamVjdEJ0bi5ocmVmID0gJyMnO1xuICAgIHJlbW92ZVByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnKTtcbiAgICByZW1vdmVQcm9qZWN0QnRuLnRleHRDb250ZW50ID0gJ2RlbGV0ZSc7XG4gICAgbGlzdEl0ZW0uYXBwZW5kKGl0ZW1BbmNob3IsIHJlbW92ZVByb2plY3RCdG4pO1xuICAgIERPTS5saXN0QnlQcm9qZWN0LmFwcGVuZChsaXN0SXRlbSk7XG4gIH07XG5cbiAgaWYgKGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgICBhcnJheU9mUHJvamVjdE5hbWVzLmZvckVhY2goKGEpID0+IHsgbWFrZUxpbmsoYSk7IH0pO1xuICB9XG59XG4iLCJpbXBvcnQgVGFzayBmcm9tICcuL3Rhc2tzJztcbmltcG9ydCBET00gZnJvbSAnLi9ET01DYWNoZSc7XG5pbXBvcnQgeyBhZGRNYWluRXZlbnRMaXN0ZW5lcnMsIGFkZEluaXRpYWxFdmVudExpc3RlbmVycywgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycyB9IGZyb20gJy4vYWRkRUxzJztcbmltcG9ydCBtYXN0ZXJMaXN0IGZyb20gJy4vbWFzdGVyTGlzdCc7XG5pbXBvcnQge1xuICByZW5kZXJNYWluLFxuICByZW5kZXJBZGRUYXNrTW9kYWwsXG4gIHJlbmRlclNpZGVCYXIsXG59IGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCBjdXJyZW50U2V0dGluZ3MgZnJvbSAnLi9jdXJyZW50U2V0dGluZ3MnO1xuXG5mdW5jdGlvbiBteUZ1bmN0aW9uKGRhdGFGcm9tU2VydmVyKSB7XG4gIGNvbnN0IHBhcnNlZEpTT04gPSBKU09OLnBhcnNlKGRhdGFGcm9tU2VydmVyKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJzZWRKU09OLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdCA9IG5ldyBUYXNrKHBhcnNlZEpTT05baV0uZGF0ZSwgcGFyc2VkSlNPTltpXS5jb250ZW50LCBwYXJzZWRKU09OW2ldLnByaW9yaXR5KTtcbiAgICB0LnByb2plY3QgPSBwYXJzZWRKU09OW2ldLnByb2plY3Q7XG4gICAgdC5jb21wbGV0ZWQgPSBwYXJzZWRKU09OW2ldLmNvbXBsZXRlZDtcbiAgICBtYXN0ZXJMaXN0LmRhdGEucHVzaCh0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXN1bWUoKSB7XG4gIGNvbnN0IG9sZEpTT04gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb2xkRGF0YScpO1xuICBteUZ1bmN0aW9uKG9sZEpTT04pO1xuICByZW5kZXJTaWRlQmFyKG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG4gIHJlbmRlckFkZFRhc2tNb2RhbChET00uYm9keSwgbWFzdGVyTGlzdC5nZXRMaXN0T2ZQcm9qZWN0cygpKTtcbiAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcblxuICAvLyBBZGQgZXZlbnRsaXN0ZW5lcnMgdG8gaGVhZGVyIGFuZCBtb2RhbFxuICBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMoKTtcbiAgYWRkU2lkZVByb2plY3RFdmVudExpc3RlbmVycygpO1xuICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgRE9NLnNpZGViYXJQcm9qZWN0TGlzdFJlbW92ZTtcbn1cbiIsIi8vIENvbnN0cnVjdG9yIHRvIG1ha2UgdGFzayBvYmplY3RzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IoZGF0ZSwgY29udGVudCwgcHJpb3JpdHksIHByb2plY3QgPSBudWxsKSB7XG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICB0aGlzLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgdGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMCk7XG4gIH1cblxuICBtYXJrRG9uZSgpIHtcbiAgICB0aGlzLmlzQ29tcGxldGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbWFzdGVyTGlzdCBmcm9tICcuL21hc3Rlckxpc3QnO1xuaW1wb3J0IGZyZXNoU3RhcnQgZnJvbSAnLi9mcmVzaFN0YXJ0JztcbmltcG9ydCByZXN1bWUgZnJvbSAnLi9yZXN1bWUnO1xuXG5pZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdvbGREYXRhJykpIHtcbiAgY29uc29sZS5sb2coJ2ZyZXNoIHN0YXJ0Jyk7XG4gIGZyZXNoU3RhcnQoKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luc3RhbmNlJywgbWFzdGVyTGlzdCk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREYXRhJywgSlNPTi5zdHJpbmdpZnkobWFzdGVyTGlzdC5kYXRhKSk7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvbGREaXNwbGF5TGlzdCcsIEpTT04uc3RyaW5naWZ5KG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkpO1xufSBlbHNlIHtcbiAgY29uc29sZS5sb2coJ3Jlc3VtZScpO1xuICByZXN1bWUoKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
>>>>>>> experimental
