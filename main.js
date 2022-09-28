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
/* harmony export */   "DOM": () => (/* binding */ DOM)
/* harmony export */ });

const main = document.querySelector('main');
const body = document.querySelector('body');

function dom() {
    return {
        get header() {
            return document.querySelector("header");
        }, 
        get addTaskBtn() {
            return document.querySelector("#add-a-task");
        }, 
        get addTaskForm() { 
            return document.querySelector("#task-form");
        }, 
        get addTaskModal() { 
            return document.querySelector("#add-a-task-modal");
        }, 
        get closeModalButton() { 
            return document.querySelector("#close-modal-button");
        }, 
        get newTaskContent() { 
            return document.querySelector("#task-content");
        }, 
        get newTaskDate() { 
            return document.querySelector("#date");
        },
        get newTaskPriority() { 
            return document.querySelectorAll('input[name=priority]');
        },  
        get newTaskProject() { 
            return document.querySelector('#project');
        },          
        main,
        body, 
        get sideBar() { 
            return document.querySelector("#sidebar");
        }, 
        get todaysTasksSideBar (){
            return document.querySelector("#todays-tasks");
        },
        get thisWeekSideBar() {
            return document.querySelector("#this-week");
        }, 
        get allTasksSideBar() {
            return document.querySelector("#all-tasks");
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
        get sidebarProjectList() {
            // I need the anchor tags nexted inside the li's
         
            const listitems = this.sideBar.children[1].children;
            const arrayOfProjectLinks = [];
            for (let i = 0; i< listitems.length; i++){
                arrayOfProjectLinks.push(listitems[i].children);
            }
            
            return arrayOfProjectLinks
        },
    }
 }

const DOM = dom();

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
/* harmony export */   "addSideProjectEventListeners": () => (/* binding */ addSideProjectEventListeners)
/* harmony export */ });
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");
/* harmony import */ var _DOMCache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DOMCache */ "./src/DOMCache.js");




 



function addInitialEventListeners(){ 
//  *** AddTaskModal open, submit, and close btn ELs ***

    // callback for submit
    const taskSubmit = function(e) {
        e.preventDefault();
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskModal.classList.toggle("closed");
        let newTaskPriorityValue = null;
        for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriority) {
            if (option.checked) {
                _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriorityValue = option.value;
            }
        }
   
        const newTask = new _tasks__WEBPACK_IMPORTED_MODULE_2__.Task( _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskDate.value, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskContent.value, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriorityValue, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskProject.value);
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.addTask(newTask);
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.sortByDate();
        // Clear the modal input fields 
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskContent.value = null;
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskDate.value = null;
        for (const option of _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskPriority) {
            newTaskPriorityValue = null;            
        }
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.newTaskProject.value = null;
        
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.main, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.getListOfProjects()); 
        addSideProjectEventListeners();
        addMainEventListeners();
    }

    _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskBtn.addEventListener("click", () => { _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskModal.classList.toggle("closed") });
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.closeModalButton.addEventListener("click", () => { _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskModal.classList.toggle("closed") });
    _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.addTaskForm.addEventListener("submit", taskSubmit);  
    
    //Today, Week, and All sideBar ELs
    try {
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.todaysTasksSideBar.addEventListener("click", function(){ 
      
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('today', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
            addMainEventListeners();
        });
         
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.thisWeekSideBar.addEventListener("click", function(){
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('this-week', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
            addMainEventListeners();
        });
      
        _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.allTasksSideBar.addEventListener("click", function(){
            _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('all', null);
            (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
            addMainEventListeners();
        });
           
    }
    catch {
        console.log('failed to add event listeners');
    }

}

function addCardEventListeners(task){
    const checkbox = document.querySelectorAll(`[data-id="${task.id}"] input`);
    checkbox[0].addEventListener('change', function(e) {
        let taskID = e.target.getAttribute('data-id')
        let task = _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data.filter((e)=> e.id == taskID);
        if (this.checked) {
            task.completed = true;
            console.log(e.target.parentElement)
            e.target.parentElement.classList.add("completed");
            console.log(task);
        } else {
            task.completed = false;
            e.target.parentElement.classList.remove("completed");
            console.log(e.target.getAttribute('data-id'));
        }
    });

    const editTask = function(e) {
        console.log(e.target.parentElement.getAttribute("data-id"));
    }

    const removeTask = function(e) {
        const thisTask = _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.data.filter( (t) => t.id == e.target.parentElement.getAttribute("data-id"));
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.removeTask(thisTask[0]);
        _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList.splice(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList.indexOf(thisTask[0]), 1);
        // reRender();
        // reAttachEl();
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
        addMainEventListeners();
    }
    
    const editBtn = document.querySelectorAll(`[data-id="${task.id}"] button`)[0];
    editBtn.addEventListener("click", editTask);
    
    const removeBtn = document.querySelectorAll(`[data-id="${task.id}"] button`)[1];
    removeBtn.addEventListener("click", removeTask);
} 

function addMainEventListeners(){
    for (let item of _masterList__WEBPACK_IMPORTED_MODULE_0__.masterList.displayedList) {
        addCardEventListeners(item);
    }
}


function addSideProjectEventListeners(){
    // SideBar Project Name ELs
    try {
       for (let i = 0; i < _DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.sidebarProjectList.length; i++) {
           const projectLink = (_DOMCache__WEBPACK_IMPORTED_MODULE_4__.DOM.sidebarProjectList[i][0]);
            projectLink.addEventListener('click', function() {
                console.log('there')
                _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.update('byProject', projectLink.id);
                (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_0__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_3__.currentSettings.whichProject);
                addMainEventListeners();
            });
       }
    }

    catch {
        console.log('failed to add el to projects')
    }
    //Remove project button ? 
}
 


/***/ }),

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

/***/ "./src/masterList.js":
/*!***************************!*\
  !*** ./src/masterList.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "masterList": () => (/* binding */ masterList)
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

const masterList = new MasterList;

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

;

function renderCard(task) {
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "isCompletedCheckbox";
    checkbox.setAttribute('data-id', task.id);
    checkbox.checked = task.completed;
    checkbox.id = task.content;
    
    const taskName = document.createElement("div");
    taskName.classList.add('task-name');
    taskName.setAttribute('data-id', task.id);
    taskName.textContent = task.content;

    const taskDue = document.createElement("div");
    taskDue.classList.add('task-due-date');
    taskDue.setAttribute('data-id', task.id);
    taskDue.textContent = `Due: ${task.date.toLocaleString('default', {weekday: 'short' })},
        ${ task.date.toLocaleString('default', { month: 'short' })}. 
        ${ task.date.getDate()} `  
    
    const editBtn = document.createElement("button");
    editBtn.classList.add('edit-task');
    editBtn.setAttribute('data-id', task.id);
    editBtn.textContent = 'edit';
    //editBtn.addEventListener("click", editTask);
    
    const removeBtn = document.createElement("button");
    removeBtn.classList.add('remove-task');
    removeBtn.setAttribute('data-id', task.id);
    removeBtn.textContent = 'remove';
    //removeBtn.addEventListener("click", removeTask);
    
    const card = document.createElement("div");
    card.classList.add('card');
    card.setAttribute('data-id', task.id);
    if (task.priority == 'high') {
        card.classList.add('important');
    } 
    card.append(checkbox, taskName, taskDue, editBtn, removeBtn);
    return (card)
}

function renderMain(masterList, option, byProjectName = null) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let weekFromToday= new Date(today);
    weekFromToday.setDate(today.getDate() + 7);

    let todayGroup = null;
    let pastDue = null;
    let weekGroup = null;

    // First remove everything from main and from displayList
    while (_DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.firstChild) {
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.removeChild(_DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.firstChild);
        masterList.displayedList.splice(0, masterList.displayedList.length);
    }

    if (option === 'byProject'){
        const projectList = masterList.produceProjectList(byProjectName);
        const projectHeading = document.createElement("div");
        projectHeading.classList.add('heading');
        projectHeading.textContent = byProjectName;
        _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(projectHeading);
        for (let i = 0; i < projectList.length; i++){
            if (projectList[i].date >= today && projectList[i].date <= today && todayGroup == null) {
                todayGroup = 1;
                const todayHeading = document.createElement("div");
                todayHeading.classList.add('subheading');
                todayHeading.textContent = 'Today';
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(todayHeading);
            } 
            if (projectList[i].date > today && todayGroup == 1)  {
                todayGroup = null;
                const lineBreak = document.createElement('hr');
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(lineBreak);
            }
            _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(renderCard(projectList[i]));
            masterList.displayedList.push(projectList[i]);
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
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(pastDueHeading);
            }
         
            if (masterList.data[i].date >= today && pastDue == 1) {
                pastDue = 2;
                const lineBreak = document.createElement('hr');
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(lineBreak);
            }

            // Today Block
            if (masterList.data[i].date >= today && masterList.data[i].date < tomorrow && todayGroup == null) {
                todayGroup = 1;
                const todayHeading = document.createElement("div");
                todayHeading.classList.add('heading');
                todayHeading.textContent = 'Today';
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(todayHeading);
            } 

            if (masterList.data[i].date >= tomorrow && todayGroup == 1) {
                todayGroup = 2;
                const lineBreak = document.createElement('hr');
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(lineBreak);
            }

            if (masterList.data[i].date <= weekFromToday && masterList.data[i].date >= tomorrow && weekGroup == null) {
                weekGroup = 1;
                const weekHeading = document.createElement("div");
                weekHeading.classList.add('heading');
                weekHeading.textContent = 'This Week';
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(weekHeading);
            } 

            if (masterList.data[i].date > weekFromToday && weekGroup == 1) {
                weekGroup = 2;
                const lineBreak = document.createElement('hr');
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(lineBreak);
            }; 

           
            if ((masterList.data[i].completed === false && masterList.data[i].date < today) || masterList.data[i].date >= today){
                _DOMCache__WEBPACK_IMPORTED_MODULE_0__.DOM.main.append(renderCard(masterList.data[i]));
                masterList.displayedList.push(masterList.data[i]);
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

function renderSideBar(someDiv, arrayOfProjectNames) {
    const sidebarSection = document.createElement("section");
    sidebarSection.id = 'sidebar';
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

    if (document.querySelector("#list-by-project")) {
        const deleteThis = document.querySelector("#list-by-project");
        deleteThis.parentNode.removeChild(deleteThis);
    }

    const listByProject = document.createElement('ul');
    listByProject.id = 'list-by-project';
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


//const main = document.querySelector('main');

// Constructor to make task objects
class Task {

    constructor(date, content, priority, project = null) { 
        this.date = new Date(date);
        this.content = content;
        this.completed = false;
        this.priority = priority;
        this.project = project;
        this.id = Math.floor(Math.random()*100000000);
    }

    markDone() {
        this.completed = true;
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
/* harmony import */ var _DOMCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMCache */ "./src/DOMCache.js");
/* harmony import */ var _addELs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addELs */ "./src/addELs.js");
/* harmony import */ var _masterList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./masterList */ "./src/masterList.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _currentSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./currentSettings */ "./src/currentSettings.js");










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

_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask2);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask3);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask4);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask5);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask6);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask7);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask8);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.addTask(sampleTask9);
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.sortByDate();


_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask, 'project', 'Coding');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask5, 'project', 'Coding');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask6, 'project', 'Coding');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask3, 'completed', 'true');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask8, 'project', 'Health');
_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.editTask(sampleTask9, 'project', 'Health');

// ***************


// Cache DOM and render each section
//const body = document.querySelector("body");
//const main = document.querySelector("main");

(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderHeader)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body);
(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderSideBar)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.getListOfProjects());
(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderAddTaskModal)(_DOMCache__WEBPACK_IMPORTED_MODULE_1__.DOM.body, _masterList__WEBPACK_IMPORTED_MODULE_3__.masterList.getListOfProjects());
(0,_render__WEBPACK_IMPORTED_MODULE_4__.renderMain)(_masterList__WEBPACK_IMPORTED_MODULE_3__.masterList, _currentSettings__WEBPACK_IMPORTED_MODULE_5__.currentSettings.viewBy, _currentSettings__WEBPACK_IMPORTED_MODULE_5__.currentSettings.whichProject);

// Add eventlisteners to header and modal
(0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addInitialEventListeners)();
(0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addSideProjectEventListeners)();
(0,_addELs__WEBPACK_IMPORTED_MODULE_2__.addMainEventListeners)();








})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ05hOztBQUVrQjtBQUNFO0FBQ3dFO0FBQy9EO0FBQzZDO0FBQ25DOzs7QUFHcEQ7O0FBRUEsdUJBQXVCLHdDQUFJO0FBQzNCO0FBQ0Esd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTtBQUM1Qix3QkFBd0Isd0NBQUk7QUFDNUIsd0JBQXdCLHdDQUFJO0FBQzVCLHdCQUF3Qix3Q0FBSTs7QUFFNUIsMkRBQWtCO0FBQ2xCLDJEQUFrQjtBQUNsQiwyREFBa0I7QUFDbEIsMkRBQWtCO0FBQ2xCLDJEQUFrQjtBQUNsQiwyREFBa0I7QUFDbEIsMkRBQWtCO0FBQ2xCLDJEQUFrQjtBQUNsQiwyREFBa0I7QUFDbEIsOERBQXFCOzs7QUFHckIsNERBQW1CO0FBQ25CLDREQUFtQjtBQUNuQiw0REFBbUI7QUFDbkIsNERBQW1CO0FBQ25CLDREQUFtQjtBQUNuQiw0REFBbUI7O0FBRW5COzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUEscURBQVksQ0FBQywrQ0FBUTtBQUNyQixzREFBYSxDQUFDLCtDQUFRLEVBQUUscUVBQTRCO0FBQ3BELDJEQUFrQixDQUFDLCtDQUFRLEVBQUUscUVBQTRCO0FBQ3pELG1EQUFVLENBQUMsbURBQVUsRUFBRSxvRUFBc0IsRUFBRSwwRUFBNEI7O0FBRTNFO0FBQ0EsaUVBQXdCO0FBQ3hCLHFFQUE0QjtBQUM1Qiw4REFBcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL0RPTUNhY2hlLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvYWRkRUxzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvY3VycmVudFNldHRpbmdzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvbWFzdGVyTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3JlbmRlci5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbmNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbmZ1bmN0aW9uIGRvbSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQgaGVhZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgYWRkVGFza0J0bigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1hLXRhc2tcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgYWRkVGFza0Zvcm0oKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1mb3JtXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IGFkZFRhc2tNb2RhbCgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtYS10YXNrLW1vZGFsXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IGNsb3NlTW9kYWxCdXR0b24oKSB7IFxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2UtbW9kYWwtYnV0dG9uXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IG5ld1Rhc2tDb250ZW50KCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stY29udGVudFwiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBuZXdUYXNrRGF0ZSgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlXCIpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbmV3VGFza1ByaW9yaXR5KCkgeyBcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPXByaW9yaXR5XScpO1xuICAgICAgICB9LCAgXG4gICAgICAgIGdldCBuZXdUYXNrUHJvamVjdCgpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcbiAgICAgICAgfSwgICAgICAgICAgXG4gICAgICAgIG1haW4sXG4gICAgICAgIGJvZHksIFxuICAgICAgICBnZXQgc2lkZUJhcigpIHsgXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyXCIpO1xuICAgICAgICB9LCBcbiAgICAgICAgZ2V0IHRvZGF5c1Rhc2tzU2lkZUJhciAoKXtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZGF5cy10YXNrc1wiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHRoaXNXZWVrU2lkZUJhcigpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RoaXMtd2Vla1wiKTtcbiAgICAgICAgfSwgXG4gICAgICAgIGdldCBhbGxUYXNrc1NpZGVCYXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhbGwtdGFza3NcIik7XG4gICAgICAgIH0sIFxuICAgICAgICBnZXQgY2FyZEVkaXRCdG5zKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0LXRhc2snKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGNhcmRSZW1vdmVCdG5zKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZW1vdmUtdGFzaycpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgY2FyZENoZWNrQm94cygpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbbmFtZT1cImlzQ29tcGxldGVkQ2hlY2tib3hcIl0nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IHNpZGViYXJQcm9qZWN0TGlzdCgpIHtcbiAgICAgICAgICAgIC8vIEkgbmVlZCB0aGUgYW5jaG9yIHRhZ3MgbmV4dGVkIGluc2lkZSB0aGUgbGknc1xuICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBsaXN0aXRlbXMgPSB0aGlzLnNpZGVCYXIuY2hpbGRyZW5bMV0uY2hpbGRyZW47XG4gICAgICAgICAgICBjb25zdCBhcnJheU9mUHJvamVjdExpbmtzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaTwgbGlzdGl0ZW1zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBhcnJheU9mUHJvamVjdExpbmtzLnB1c2gobGlzdGl0ZW1zW2ldLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGFycmF5T2ZQcm9qZWN0TGlua3NcbiAgICAgICAgfSxcbiAgICB9XG4gfVxuXG5leHBvcnQgY29uc3QgRE9NID0gZG9tKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJTaWRlQmFyIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza3NcIjsgXG5pbXBvcnQgeyBjdXJyZW50U2V0dGluZ3MgfSBmcm9tIFwiLi9jdXJyZW50U2V0dGluZ3NcIjtcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTUNhY2hlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMoKXsgXG4vLyAgKioqIEFkZFRhc2tNb2RhbCBvcGVuLCBzdWJtaXQsIGFuZCBjbG9zZSBidG4gRUxzICoqKlxuXG4gICAgLy8gY2FsbGJhY2sgZm9yIHN1Ym1pdFxuICAgIGNvbnN0IHRhc2tTdWJtaXQgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgRE9NLmFkZFRhc2tNb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwiY2xvc2VkXCIpO1xuICAgICAgICBsZXQgbmV3VGFza1ByaW9yaXR5VmFsdWUgPSBudWxsO1xuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBET00ubmV3VGFza1ByaW9yaXR5KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBET00ubmV3VGFza1ByaW9yaXR5VmFsdWUgPSBvcHRpb24udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgIFxuICAgICAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2soIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSwgRE9NLm5ld1Rhc2tDb250ZW50LnZhbHVlLCBET00ubmV3VGFza1ByaW9yaXR5VmFsdWUsIERPTS5uZXdUYXNrUHJvamVjdC52YWx1ZSk7XG4gICAgICAgIG1hc3Rlckxpc3QuYWRkVGFzayhuZXdUYXNrKTtcbiAgICAgICAgbWFzdGVyTGlzdC5zb3J0QnlEYXRlKCk7XG4gICAgICAgIC8vIENsZWFyIHRoZSBtb2RhbCBpbnB1dCBmaWVsZHMgXG4gICAgICAgIERPTS5uZXdUYXNrQ29udGVudC52YWx1ZSA9IG51bGw7XG4gICAgICAgIERPTS5uZXdUYXNrRGF0ZS52YWx1ZSA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIERPTS5uZXdUYXNrUHJpb3JpdHkpIHtcbiAgICAgICAgICAgIG5ld1Rhc2tQcmlvcml0eVZhbHVlID0gbnVsbDsgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBET00ubmV3VGFza1Byb2plY3QudmFsdWUgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBET00ubWFpbiwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgIHJlbmRlclNpZGVCYXIoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7IFxuICAgICAgICBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIERPTS5hZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7IERPTS5hZGRUYXNrTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKSB9KTtcbiAgICBET00uY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyBET00uYWRkVGFza01vZGFsLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIikgfSk7XG4gICAgRE9NLmFkZFRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGFza1N1Ym1pdCk7ICBcbiAgICBcbiAgICAvL1RvZGF5LCBXZWVrLCBhbmQgQWxsIHNpZGVCYXIgRUxzXG4gICAgdHJ5IHtcbiAgICAgICAgRE9NLnRvZGF5c1Rhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXsgXG4gICAgICBcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ3RvZGF5JywgbnVsbCk7XG4gICAgICAgICAgICByZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAgXG4gICAgICAgIERPTS50aGlzV2Vla1NpZGVCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjdXJyZW50U2V0dGluZ3MudXBkYXRlKCd0aGlzLXdlZWsnLCBudWxsKTtcbiAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSk7XG4gICAgICBcbiAgICAgICAgRE9NLmFsbFRhc2tzU2lkZUJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGN1cnJlbnRTZXR0aW5ncy51cGRhdGUoJ2FsbCcsIG51bGwpO1xuICAgICAgICAgICAgcmVuZGVyTWFpbihtYXN0ZXJMaXN0LCBjdXJyZW50U2V0dGluZ3Mudmlld0J5LCBjdXJyZW50U2V0dGluZ3Mud2hpY2hQcm9qZWN0KTtcbiAgICAgICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgICAgICB9KTtcbiAgICAgICAgICAgXG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZhaWxlZCB0byBhZGQgZXZlbnQgbGlzdGVuZXJzJyk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGFkZENhcmRFdmVudExpc3RlbmVycyh0YXNrKXtcbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWlkPVwiJHt0YXNrLmlkfVwiXSBpbnB1dGApO1xuICAgIGNoZWNrYm94WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IHRhc2tJRCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpXG4gICAgICAgIGxldCB0YXNrID0gbWFzdGVyTGlzdC5kYXRhLmZpbHRlcigoZSk9PiBlLmlkID09IHRhc2tJRCk7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRhc2suY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQpXG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2suY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjb21wbGV0ZWRcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGVkaXRUYXNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZVRhc2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbnN0IHRoaXNUYXNrID0gbWFzdGVyTGlzdC5kYXRhLmZpbHRlciggKHQpID0+IHQuaWQgPT0gZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpKTtcbiAgICAgICAgbWFzdGVyTGlzdC5yZW1vdmVUYXNrKHRoaXNUYXNrWzBdKTtcbiAgICAgICAgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0LnNwbGljZShtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QuaW5kZXhPZih0aGlzVGFza1swXSksIDEpO1xuICAgICAgICAvLyByZVJlbmRlcigpO1xuICAgICAgICAvLyByZUF0dGFjaEVsKCk7XG4gICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgIGFkZE1haW5FdmVudExpc3RlbmVycygpO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtaWQ9XCIke3Rhc2suaWR9XCJdIGJ1dHRvbmApWzBdO1xuICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVkaXRUYXNrKTtcbiAgICBcbiAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1pZD1cIiR7dGFzay5pZH1cIl0gYnV0dG9uYClbMV07XG4gICAgcmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW1vdmVUYXNrKTtcbn0gXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRNYWluRXZlbnRMaXN0ZW5lcnMoKXtcbiAgICBmb3IgKGxldCBpdGVtIG9mIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdCkge1xuICAgICAgICBhZGRDYXJkRXZlbnRMaXN0ZW5lcnMoaXRlbSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCl7XG4gICAgLy8gU2lkZUJhciBQcm9qZWN0IE5hbWUgRUxzXG4gICAgdHJ5IHtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IERPTS5zaWRlYmFyUHJvamVjdExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgY29uc3QgcHJvamVjdExpbmsgPSAoRE9NLnNpZGViYXJQcm9qZWN0TGlzdFtpXVswXSk7XG4gICAgICAgICAgICBwcm9qZWN0TGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGVyZScpXG4gICAgICAgICAgICAgICAgY3VycmVudFNldHRpbmdzLnVwZGF0ZSgnYnlQcm9qZWN0JywgcHJvamVjdExpbmsuaWQpO1xuICAgICAgICAgICAgICAgIHJlbmRlck1haW4obWFzdGVyTGlzdCwgY3VycmVudFNldHRpbmdzLnZpZXdCeSwgY3VycmVudFNldHRpbmdzLndoaWNoUHJvamVjdCk7XG4gICAgICAgICAgICAgICAgYWRkTWFpbkV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICB9XG4gICAgfVxuXG4gICAgY2F0Y2gge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGFkZCBlbCB0byBwcm9qZWN0cycpXG4gICAgfVxuICAgIC8vUmVtb3ZlIHByb2plY3QgYnV0dG9uID8gXG59XG4gXG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNvbnN0IGN1cnJlbnRTZXR0aW5ncyA9IHtcbiAgICB2aWV3Qnk6ICdhbGwnLFxuICAgIHdoaWNoUHJvamVjdDogbnVsbCxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24obmV3Vmlldywgd2hpY2hQID0gbnVsbCkge1xuICAgICAgICB0aGlzLnZpZXdCeSA9IG5ld1ZpZXc7XG4gICAgICAgIHRoaXMud2hpY2hQcm9qZWN0ID0gd2hpY2hQO1xuICAgIH1cblxufSIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBUaGVyZSBzaG91bGQgb25seSBiZSBvbmUgbWFzdGVyIGxpc3RcbmxldCBpbnN0YW5jZSA9IG51bGw7XG5cbi8vIENvbnN0cnVjdG9yIHRvIG1ha2UgdGFzayBvYmplY3RzXG5jbGFzcyBNYXN0ZXJMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbiBvbmx5IGNyZWF0ZSBvbmUgaW5zdGFuY2UhXCIpO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICAgIHRoaXMuZGlzcGxheWVkTGlzdCA9IFtdO1xuICAgIH1cblxuICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICB0aGlzLmRhdGEucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy5kYXRhLnNwbGljZSh0aGlzLmRhdGEuaW5kZXhPZih0YXNrKSwgMSk7XG4gICAgfVxuXG4gICAgZWRpdFRhc2sodGFzaywgYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmRhdGFbdGhpcy5kYXRhLmluZGV4T2YodGFzayldW2F0dHJpYnV0ZV0gPSB2YWx1ZTsgXG4gICAgfVxuXG4gICAgc29ydEJ5RGF0ZSgpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNvcnQoKGEsYikgPT4gYS5kYXRlIC0gYi5kYXRlKTtcbiAgICB9XG5cbiAgICBwcm9kdWNlUHJvamVjdExpc3QocHJvamVjdCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IHRoaXMuZGF0YS5maWx0ZXIoICh0YXNrKSA9PiB0YXNrLnByb2plY3QgPT0gcHJvamVjdCk7XG4gICAgICAgIHByb2plY3RMaXN0LnNvcnQoKGEsYikgPT4gYS5kYXRlIC0gYi5kYXRlKTtcbiAgICAgICAgcmV0dXJuIHByb2plY3RMaXN0O1xuICAgIH1cblxuICAgIGdldExpc3RPZlByb2plY3RzKCkge1xuICAgICAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCggKHRhc2spPT4ge1xuICAgICAgICAgICAgaWYgKHRhc2sucHJvamVjdCAhPSBudWxsICYmICFhbGxQcm9qZWN0cy5zb21lKChhKT0+IGE9PT10YXNrLnByb2plY3QpKXtcbiAgICAgICAgICAgICAgICBhbGxQcm9qZWN0cy5wdXNoKHRhc2sucHJvamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gIClcbiAgICAgICAgcmV0dXJuIGFsbFByb2plY3RzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1hc3Rlckxpc3QgPSBuZXcgTWFzdGVyTGlzdDsiLCJcInVzZSBzdHJpY3RcIlxuaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4vRE9NQ2FjaGVcIjtcblxuZnVuY3Rpb24gcmVuZGVyQ2FyZCh0YXNrKSB7XG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgY2hlY2tib3gubmFtZSA9IFwiaXNDb21wbGV0ZWRDaGVja2JveFwiO1xuICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0YXNrLmNvbXBsZXRlZDtcbiAgICBjaGVja2JveC5pZCA9IHRhc2suY29udGVudDtcbiAgICBcbiAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZCgndGFzay1uYW1lJyk7XG4gICAgdGFza05hbWUuc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0YXNrLmNvbnRlbnQ7XG5cbiAgICBjb25zdCB0YXNrRHVlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRHVlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZHVlLWRhdGUnKTtcbiAgICB0YXNrRHVlLnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRhc2suaWQpO1xuICAgIHRhc2tEdWUudGV4dENvbnRlbnQgPSBgRHVlOiAke3Rhc2suZGF0ZS50b0xvY2FsZVN0cmluZygnZGVmYXVsdCcsIHt3ZWVrZGF5OiAnc2hvcnQnIH0pfSxcbiAgICAgICAgJHsgdGFzay5kYXRlLnRvTG9jYWxlU3RyaW5nKCdkZWZhdWx0JywgeyBtb250aDogJ3Nob3J0JyB9KX0uIFxuICAgICAgICAkeyB0YXNrLmRhdGUuZ2V0RGF0ZSgpfSBgICBcbiAgICBcbiAgICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoJ2VkaXQtdGFzaycpO1xuICAgIGVkaXRCdG4uc2V0QXR0cmlidXRlKCdkYXRhLWlkJywgdGFzay5pZCk7XG4gICAgZWRpdEJ0bi50ZXh0Q29udGVudCA9ICdlZGl0JztcbiAgICAvL2VkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVkaXRUYXNrKTtcbiAgICBcbiAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtdGFzaycpO1xuICAgIHJlbW92ZUJ0bi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgICByZW1vdmVCdG4udGV4dENvbnRlbnQgPSAncmVtb3ZlJztcbiAgICAvL3JlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVtb3ZlVGFzayk7XG4gICAgXG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XG4gICAgY2FyZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCB0YXNrLmlkKTtcbiAgICBpZiAodGFzay5wcmlvcml0eSA9PSAnaGlnaCcpIHtcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdpbXBvcnRhbnQnKTtcbiAgICB9IFxuICAgIGNhcmQuYXBwZW5kKGNoZWNrYm94LCB0YXNrTmFtZSwgdGFza0R1ZSwgZWRpdEJ0biwgcmVtb3ZlQnRuKTtcbiAgICByZXR1cm4gKGNhcmQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJNYWluKG1hc3Rlckxpc3QsIG9wdGlvbiwgYnlQcm9qZWN0TmFtZSA9IG51bGwpIHtcbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHRvZGF5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgIGxldCB0b21vcnJvdyA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICB0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDEpO1xuXG4gICAgbGV0IHdlZWtGcm9tVG9kYXk9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICB3ZWVrRnJvbVRvZGF5LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNyk7XG5cbiAgICBsZXQgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgbGV0IHBhc3REdWUgPSBudWxsO1xuICAgIGxldCB3ZWVrR3JvdXAgPSBudWxsO1xuXG4gICAgLy8gRmlyc3QgcmVtb3ZlIGV2ZXJ5dGhpbmcgZnJvbSBtYWluIGFuZCBmcm9tIGRpc3BsYXlMaXN0XG4gICAgd2hpbGUgKERPTS5tYWluLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgRE9NLm1haW4ucmVtb3ZlQ2hpbGQoRE9NLm1haW4uZmlyc3RDaGlsZCk7XG4gICAgICAgIG1hc3Rlckxpc3QuZGlzcGxheWVkTGlzdC5zcGxpY2UoMCwgbWFzdGVyTGlzdC5kaXNwbGF5ZWRMaXN0Lmxlbmd0aCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbiA9PT0gJ2J5UHJvamVjdCcpe1xuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IG1hc3Rlckxpc3QucHJvZHVjZVByb2plY3RMaXN0KGJ5UHJvamVjdE5hbWUpO1xuICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHByb2plY3RIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgcHJvamVjdEhlYWRpbmcudGV4dENvbnRlbnQgPSBieVByb2plY3ROYW1lO1xuICAgICAgICBET00ubWFpbi5hcHBlbmQocHJvamVjdEhlYWRpbmcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TGlzdFtpXS5kYXRlID49IHRvZGF5ICYmIHByb2plY3RMaXN0W2ldLmRhdGUgPD0gdG9kYXkgJiYgdG9kYXlHcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IDE7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0b2RheUhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnc3ViaGVhZGluZycpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKHRvZGF5SGVhZGluZyk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgaWYgKHByb2plY3RMaXN0W2ldLmRhdGUgPiB0b2RheSAmJiB0b2RheUdyb3VwID09IDEpICB7XG4gICAgICAgICAgICAgICAgdG9kYXlHcm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUJyZWFrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaHInKTtcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQobGluZUJyZWFrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZChyZW5kZXJDYXJkKHByb2plY3RMaXN0W2ldKSk7XG4gICAgICAgICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QucHVzaChwcm9qZWN0TGlzdFtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXN0ZXJMaXN0LmRhdGEubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvbW9ycm93ICYmIG9wdGlvbiA9PT0gXCJ0b2RheVwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTsgXG5cbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+IHdlZWtGcm9tVG9kYXkgJiYgb3B0aW9uID09PSBcInRoaXMtd2Vla1wiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTsgXG5cblxuICAgICAgICAgICAgLy8gUGFzdC1EdWUgVW5kb25lIEJsb2NrXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b2RheSAgJiYgcGFzdER1ZSA9PSBudWxsICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5jb21wbGV0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcGFzdER1ZSA9IDE7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFzdER1ZUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHBhc3REdWVIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICBwYXN0RHVlSGVhZGluZy50ZXh0Q29udGVudCA9ICdQYXN0IER1ZSc7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKHBhc3REdWVIZWFkaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIFxuICAgICAgICAgICAgaWYgKG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5ICYmIHBhc3REdWUgPT0gMSkge1xuICAgICAgICAgICAgICAgIHBhc3REdWUgPSAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVCcmVhayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hyJyk7XG4gICAgICAgICAgICAgICAgRE9NLm1haW4uYXBwZW5kKGxpbmVCcmVhayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRvZGF5IEJsb2NrXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPj0gdG9kYXkgJiYgbWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPCB0b21vcnJvdyAmJiB0b2RheUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RheUhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHRvZGF5SGVhZGluZy5jbGFzc0xpc3QuYWRkKCdoZWFkaW5nJyk7XG4gICAgICAgICAgICAgICAgdG9kYXlIZWFkaW5nLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQodG9kYXlIZWFkaW5nKTtcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGlmIChtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b21vcnJvdyAmJiB0b2RheUdyb3VwID09IDEpIHtcbiAgICAgICAgICAgICAgICB0b2RheUdyb3VwID0gMjtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPD0gd2Vla0Zyb21Ub2RheSAmJiBtYXN0ZXJMaXN0LmRhdGFbaV0uZGF0ZSA+PSB0b21vcnJvdyAmJiB3ZWVrR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHdlZWtHcm91cCA9IDE7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2Vla0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIHdlZWtIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2hlYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB3ZWVrSGVhZGluZy50ZXh0Q29udGVudCA9ICdUaGlzIFdlZWsnO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZCh3ZWVrSGVhZGluZyk7XG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBpZiAobWFzdGVyTGlzdC5kYXRhW2ldLmRhdGUgPiB3ZWVrRnJvbVRvZGF5ICYmIHdlZWtHcm91cCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgd2Vla0dyb3VwID0gMjtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lQnJlYWsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICAgICAgICAgIERPTS5tYWluLmFwcGVuZChsaW5lQnJlYWspO1xuICAgICAgICAgICAgfTsgXG5cbiAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoKG1hc3Rlckxpc3QuZGF0YVtpXS5jb21wbGV0ZWQgPT09IGZhbHNlICYmIG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlIDwgdG9kYXkpIHx8IG1hc3Rlckxpc3QuZGF0YVtpXS5kYXRlID49IHRvZGF5KXtcbiAgICAgICAgICAgICAgICBET00ubWFpbi5hcHBlbmQocmVuZGVyQ2FyZChtYXN0ZXJMaXN0LmRhdGFbaV0pKTtcbiAgICAgICAgICAgICAgICBtYXN0ZXJMaXN0LmRpc3BsYXllZExpc3QucHVzaChtYXN0ZXJMaXN0LmRhdGFbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFkZFRhc2tNb2RhbChzb21lRGl2LCBhcnJheU9mUHJvamVjdE5hbWVzKSB7XG4gICAgY29uc3QgYWRkVGFza01vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcbiAgICBhZGRUYXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnY2xvc2VkJyk7XG4gICAgYWRkVGFza01vZGFsLmlkID0gJ2FkZC1hLXRhc2stbW9kYWwnO1xuXG4gICAgY29uc3QgYWRkVGFza01vZGFsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYWRkVGFza01vZGFsQ29udGVudC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250ZW50Jyk7XG4gICAgXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICB0YXNrRm9ybS5pZCA9ICd0YXNrLWZvcm0nO1xuICAgIFxuICAgIGNvbnN0IGVtcHR5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBjbG9zZU1vZGFsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlkID0gJ2Nsb3NlLW1vZGFsLWJ1dHRvbic7XG5cbiAgICBjbG9zZU1vZGFsQnV0dG9uLmlubmVySFRNTCA9ICcmdGltZXMnO1xuICAgIFxuICAgIGNvbnN0IGxhYmVsRm9yVGFza0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWxGb3JUYXNrQ29udGVudC5mb3IgPSAndGFzay1jb250ZW50JztcbiAgICBsYWJlbEZvclRhc2tDb250ZW50LnRleHRDb250ZW50ID0gJ1Rhc2s6J1xuICAgIFxuICAgIGNvbnN0IHRhc2tDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHRhc2tDb250ZW50LnR5cGUgPSAndGV4dCc7XG4gICAgdGFza0NvbnRlbnQuaWQgPSAndGFzay1jb250ZW50JztcbiAgICB0YXNrQ29udGVudC5uYW1lID0gJ3Rhc2stY29udGVudCc7XG4gICAgdGFza0NvbnRlbnQucGxhY2Vob2xkZXIgPSAnRW50ZXIgVGFzayc7XG4gICAgdGFza0NvbnRlbnQucmVxdWlyZWQgPSB0cnVlO1xuICAgIFxuICAgIGNvbnN0IGxhYmVsRm9yRGF0ZT0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsRm9yRGF0ZS5mb3IgPSAnZGF0ZSc7XG4gICAgbGFiZWxGb3JEYXRlLnRleHRDb250ZW50ID0gJ0R1ZTonO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBkYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgZGF0ZS5pZCA9ICdkYXRlJztcbiAgICBkYXRlLm5hbWUgPSAnZGF0ZSc7XG4gICAgZGF0ZS5yZXF1aXJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBwcmlvcml0eVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcmlvcml0eVRpdGxlLnRleHRDb250ZW50ID0gJ1ByaW9yaXR5Oic7XG5cbiAgICBjb25zdCBwcmlvcml0eU9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5pZCA9ICdwcmlvcml0eS1vcHRpb25zJztcblxuICAgIGNvbnN0IG9wdGlvbjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IG5vcm1hbFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIG5vcm1hbFJhZGlvLnR5cGUgPSBcInJhZGlvXCI7XG4gICAgbm9ybWFsUmFkaW8uaWQgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLm5hbWUgPSBcInByaW9yaXR5XCI7XG4gICAgbm9ybWFsUmFkaW8udmFsdWUgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IG5vcm1hbFJhZGlvTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbm9ybWFsUmFkaW9MYWJlbC5mb3IgPSBcIm5vcm1hbFwiO1xuICAgIG5vcm1hbFJhZGlvTGFiZWwudGV4dENvbnRlbnQgPSBcIk5vcm1hbFwiO1xuXG4gICAgY29uc3Qgb3B0aW9uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgaGlnaFJhZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGhpZ2hSYWRpby50eXBlID0gXCJyYWRpb1wiO1xuICAgIGhpZ2hSYWRpby5pZCA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpby5uYW1lID0gXCJwcmlvcml0eVwiO1xuICAgIGhpZ2hSYWRpby52YWx1ZSA9IFwiaGlnaFwiO1xuICAgIG5vcm1hbFJhZGlvLnJlcXVpcmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IGhpZ2hSYWRpb0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGhpZ2hSYWRpb0xhYmVsLmZvciA9IFwiaGlnaFwiO1xuICAgIGhpZ2hSYWRpb0xhYmVsLnRleHRDb250ZW50ID0gXCJIaWdoXCI7XG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbC5mb3IgPSBcInByb2plY3RcIjtcbiAgICBhc3NpZ25Ub1Byb2plY3RMYWJlbC50ZXh0Q29udGVudCA9IFwiUHJvamVjdDpcIlxuXG4gICAgY29uc3QgYXNzaWduVG9Qcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGFzc2lnblRvUHJvamVjdC5uYW1lID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0LmlkID0gXCJwcm9qZWN0XCI7XG4gICAgYXNzaWduVG9Qcm9qZWN0LnBsYWNlaG9sZGVyID0gXCJPcHRpb25hbFwiXG4gICAgYXNzaWduVG9Qcm9qZWN0LnNldEF0dHJpYnV0ZShcImxpc3RcIiwgXCJwcm9qZWN0LWxpc3RcIik7XG5cbiAgICBjb25zdCBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkYXRhbGlzdFwiKTtcbiAgICBhc3NpZ25Ub1Byb2plY3REYXRhTGlzdC5pZCA9IFwicHJvamVjdC1saXN0XCI7XG4gICBcbiAgICBhcnJheU9mUHJvamVjdE5hbWVzLmZvckVhY2goIChlbnRyeSkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGVudHJ5O1xuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBlbnRyeTsgXG4gICAgICAgIGFzc2lnblRvUHJvamVjdERhdGFMaXN0LmFwcGVuZChvcHRpb24pO1xuICAgIH0pXG5cbiAgICBhc3NpZ25Ub1Byb2plY3QuYXBwZW5kKGFzc2lnblRvUHJvamVjdERhdGFMaXN0KTtcblxuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc3VibWl0QnRuLnR5cGUgPSBcInN1Ym1pdFwiO1xuICAgIHN1Ym1pdEJ0bi5pZCA9IFwibW9kYWwtc3VibWl0XCI7XG4gICAgc3VibWl0QnRuLnZhbHVlID0gXCJTdWJtaXRcIjtcbiAgICBzdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xuXG4gICAgb3B0aW9uMS5hcHBlbmQobm9ybWFsUmFkaW8sIG5vcm1hbFJhZGlvTGFiZWwpO1xuICAgIG9wdGlvbjIuYXBwZW5kKGhpZ2hSYWRpbywgaGlnaFJhZGlvTGFiZWwpO1xuICAgIHByaW9yaXR5T3B0aW9ucy5hcHBlbmQob3B0aW9uMSwgb3B0aW9uMik7XG4gICAgdGFza0Zvcm0uYXBwZW5kKFxuICAgICAgICBlbXB0eURpdiwgXG4gICAgICAgIGNsb3NlTW9kYWxCdXR0b24sIFxuICAgICAgICBsYWJlbEZvclRhc2tDb250ZW50LCBcbiAgICAgICAgdGFza0NvbnRlbnQsIFxuICAgICAgICBsYWJlbEZvckRhdGUsIFxuICAgICAgICBkYXRlLCBcbiAgICAgICAgcHJpb3JpdHlUaXRsZSwgXG4gICAgICAgIHByaW9yaXR5T3B0aW9ucywgXG4gICAgICAgIGFzc2lnblRvUHJvamVjdExhYmVsLCBcbiAgICAgICAgYXNzaWduVG9Qcm9qZWN0LFxuICAgICAgICBzdWJtaXRCdG4pO1xuICAgIGFkZFRhc2tNb2RhbENvbnRlbnQuYXBwZW5kKHRhc2tGb3JtKTtcbiAgICBhZGRUYXNrTW9kYWwuYXBwZW5kKGFkZFRhc2tNb2RhbENvbnRlbnQpO1xuICAgIHNvbWVEaXYuYXBwZW5kKGFkZFRhc2tNb2RhbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTaWRlQmFyKHNvbWVEaXYsIGFycmF5T2ZQcm9qZWN0TmFtZXMpIHtcbiAgICBjb25zdCBzaWRlYmFyU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICAgIHNpZGViYXJTZWN0aW9uLmlkID0gJ3NpZGViYXInO1xuICAgIGNvbnN0IGxpc3RCeVRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIGNvbnN0IGxpc3RJdGVtMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY29uc3QgaXRlbTFBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgaXRlbTFBbmNob3IuaWQgPSAndG9kYXlzLXRhc2tzJztcbiAgICBpdGVtMUFuY2hvci5ocmVmID0gJyMnO1xuICAgIGl0ZW0xQW5jaG9yLnRleHRDb250ZW50ID0gXCJUb2RheVwiO1xuXG4gICAgbGlzdEl0ZW0xLmFwcGVuZChpdGVtMUFuY2hvcik7XG5cbiAgICBjb25zdCBsaXN0SXRlbTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNvbnN0IGl0ZW0yQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGl0ZW0yQW5jaG9yLmlkID0gJ3RoaXMtd2Vlayc7XG4gICAgaXRlbTJBbmNob3IuaHJlZiA9ICcjJztcbiAgICBpdGVtMkFuY2hvci50ZXh0Q29udGVudCA9IFwiVGhpcyBXZWVrXCI7XG4gICAgbGlzdEl0ZW0yLmFwcGVuZChpdGVtMkFuY2hvcik7XG4gICAgXG4gICAgY29uc3QgbGlzdEl0ZW0zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBpdGVtM0FuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBpdGVtM0FuY2hvci5pZCA9ICdhbGwtdGFza3MnO1xuICAgIGl0ZW0zQW5jaG9yLmhyZWYgPSAnIyc7XG4gICAgaXRlbTNBbmNob3IudGV4dENvbnRlbnQgPSBcIkFsbFwiO1xuICAgIGxpc3RJdGVtMy5hcHBlbmQoaXRlbTNBbmNob3IpO1xuXG4gICAgbGlzdEJ5VGltZS5hcHBlbmQobGlzdEl0ZW0xLCBsaXN0SXRlbTIsIGxpc3RJdGVtMyk7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaXN0LWJ5LXByb2plY3RcIikpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlVGhpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdC1ieS1wcm9qZWN0XCIpO1xuICAgICAgICBkZWxldGVUaGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZGVsZXRlVGhpcyk7XG4gICAgfVxuXG4gICAgY29uc3QgbGlzdEJ5UHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgbGlzdEJ5UHJvamVjdC5pZCA9ICdsaXN0LWJ5LXByb2plY3QnO1xuICAgIGNvbnN0IG1ha2VMaW5rID0gZnVuY3Rpb24obmFtZSwgZGl2KSB7XG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgY29uc3QgaXRlbUFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgaXRlbUFuY2hvci5pZCA9IG5hbWU7XG4gICAgICAgIGl0ZW1BbmNob3IuaHJlZiA9ICcjJztcbiAgICAgICAgaXRlbUFuY2hvci50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZChpdGVtQW5jaG9yKTtcbiAgICAgICAgZGl2LmFwcGVuZChsaXN0SXRlbSk7XG4gICAgfVxuICAgIGlmIChhcnJheU9mUHJvamVjdE5hbWVzKXtcbiAgICAgICAgYXJyYXlPZlByb2plY3ROYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGEpeyBtYWtlTGluayhhLCBsaXN0QnlQcm9qZWN0KSB9ICk7XG4gICAgfVxuICAgIHNpZGViYXJTZWN0aW9uLmFwcGVuZChsaXN0QnlUaW1lLCBsaXN0QnlQcm9qZWN0KTtcbiAgICBzb21lRGl2LmFwcGVuZChzaWRlYmFyU2VjdGlvbik7ICAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJIZWFkZXIoc29tZURpdikge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYWRkVGFza0J0bi5pZCA9IFwiYWRkLWEtdGFza1wiO1xuICAgIGFkZFRhc2tCdG4udGV4dENvbnRlbnQgPSBcIkFkZCBUYXNrXCI7XG4gICAgaGVhZGVyLmFwcGVuZChhZGRUYXNrQnRuKTtcbiAgICBzb21lRGl2LnByZXBlbmQoaGVhZGVyKTtcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcblxuLy8gQ29uc3RydWN0b3IgdG8gbWFrZSB0YXNrIG9iamVjdHNcbmV4cG9ydCBjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGUsIGNvbnRlbnQsIHByaW9yaXR5LCBwcm9qZWN0ID0gbnVsbCkgeyBcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMDAwMDApO1xuICAgIH1cblxuICAgIG1hcmtEb25lKCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgfVxuXG59O1xuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7XG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01DYWNoZVwiO1xuaW1wb3J0IHsgYWRkTWFpbkV2ZW50TGlzdGVuZXJzLCBhZGRJbml0aWFsRXZlbnRMaXN0ZW5lcnMsIGFkZFNpZGVQcm9qZWN0RXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9hZGRFTHNcIjtcbmltcG9ydCB7IG1hc3Rlckxpc3QgfSBmcm9tIFwiLi9tYXN0ZXJMaXN0XCI7XG5pbXBvcnQgeyByZW5kZXJNYWluLCByZW5kZXJBZGRUYXNrTW9kYWwsIHJlbmRlclNpZGVCYXIsIHJlbmRlckhlYWRlciB9IGZyb20gXCIuL3JlbmRlclwiO1xuaW1wb3J0IHsgY3VycmVudFNldHRpbmdzIH0gZnJvbSBcIi4vY3VycmVudFNldHRpbmdzXCI7XG5cblxuLy8gICMjIyMjIyMjIyMjICAgICBTYW1wbGUgdGFza3MgdG8gdGVzdCB0aGUgYXBwICAgICAjIyMjIyMjIyMjIyBcblxuY29uc3Qgc2FtcGxlVGFzayA9IG5ldyBUYXNrKCAnMjAyMi0wOS0yMycsICdGaW5pc2ggT2RpbiBQcm9qZWN0JywgJ25vcm1hbCcgKTtcbnNhbXBsZVRhc2suY29tcGxldGVkID0gdHJ1ZTtcbmNvbnN0IHNhbXBsZVRhc2syID0gbmV3IFRhc2soICcyMDIyLTA5LTIzJywgJ1ByYWN0aWNlIEt1bmcgZnUnLCAnaGlnaCcgKTtcbmNvbnN0IHNhbXBsZVRhc2szID0gbmV3IFRhc2soICcyMDIyLTA5LTI2JywgJ0Nvb2sgYSBwaWUnLCAnbm9ybWFsJyApO1xuY29uc3Qgc2FtcGxlVGFzazQgPSBuZXcgVGFzayggJzIwMjItMDktMjYnLCAnU2xlZXAnLCAnaGlnaCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s1ID0gbmV3IFRhc2soICcyMDIyLTA5LTI4JywgJ0xlYXJuIFJ1YnknLCAnbm9ybWFsJyApO1xuY29uc3Qgc2FtcGxlVGFzazYgPSBuZXcgVGFzayggJzIwMjItMDktMjcnLCAnQ29kZSBUZXRyaXMnLCAnaGlnaCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s3ID0gbmV3IFRhc2soICcyMDIyLTEwLTAxJywgJ1JlY3ljbGUnLCAnaGlnaCcgKTtcbmNvbnN0IHNhbXBsZVRhc2s4ID0gbmV3IFRhc2soICcyMDIyLTEwLTAyJywgJ1N3aW0nLCAnbm9ybWFsJyApO1xuY29uc3Qgc2FtcGxlVGFzazkgPSBuZXcgVGFzayggJzIwMjItMTAtMjMnLCAnRWF0JywgJ2hpZ2gnICk7XG5cbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrKTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrMik7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazMpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s0KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrNSk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazYpO1xubWFzdGVyTGlzdC5hZGRUYXNrKHNhbXBsZVRhc2s3KTtcbm1hc3Rlckxpc3QuYWRkVGFzayhzYW1wbGVUYXNrOCk7XG5tYXN0ZXJMaXN0LmFkZFRhc2soc2FtcGxlVGFzazkpO1xubWFzdGVyTGlzdC5zb3J0QnlEYXRlKCk7XG5cblxubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrLCAncHJvamVjdCcsICdDb2RpbmcnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazUsICdwcm9qZWN0JywgJ0NvZGluZycpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrNiwgJ3Byb2plY3QnLCAnQ29kaW5nJyk7XG5tYXN0ZXJMaXN0LmVkaXRUYXNrKHNhbXBsZVRhc2szLCAnY29tcGxldGVkJywgJ3RydWUnKTtcbm1hc3Rlckxpc3QuZWRpdFRhc2soc2FtcGxlVGFzazgsICdwcm9qZWN0JywgJ0hlYWx0aCcpO1xubWFzdGVyTGlzdC5lZGl0VGFzayhzYW1wbGVUYXNrOSwgJ3Byb2plY3QnLCAnSGVhbHRoJyk7XG5cbi8vICoqKioqKioqKioqKioqKlxuXG5cbi8vIENhY2hlIERPTSBhbmQgcmVuZGVyIGVhY2ggc2VjdGlvblxuLy9jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4vL2NvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxucmVuZGVySGVhZGVyKERPTS5ib2R5KTtcbnJlbmRlclNpZGVCYXIoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG5yZW5kZXJBZGRUYXNrTW9kYWwoRE9NLmJvZHksIG1hc3Rlckxpc3QuZ2V0TGlzdE9mUHJvamVjdHMoKSk7XG5yZW5kZXJNYWluKG1hc3Rlckxpc3QsIGN1cnJlbnRTZXR0aW5ncy52aWV3QnksIGN1cnJlbnRTZXR0aW5ncy53aGljaFByb2plY3QpO1xuXG4vLyBBZGQgZXZlbnRsaXN0ZW5lcnMgdG8gaGVhZGVyIGFuZCBtb2RhbFxuYWRkSW5pdGlhbEV2ZW50TGlzdGVuZXJzKCk7XG5hZGRTaWRlUHJvamVjdEV2ZW50TGlzdGVuZXJzKCk7XG5hZGRNYWluRXZlbnRMaXN0ZW5lcnMoKTtcblxuXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9