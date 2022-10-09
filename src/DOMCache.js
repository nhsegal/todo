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
<<<<<<< HEAD
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
        console.log('no projects?');
        queryStr = null;
=======
      const nodeListOfProjectLinks = document.getElementById('list-by-project').children;
      const arr = [];
      for (const child of nodeListOfProjectLinks) {
        arr.push(child.firstChild);
>>>>>>> experimental
      }
      return arr;
    },
<<<<<<< HEAD
    get sidebarProjectListRemove() {
      const listitems = Array.from(document.querySelector('#sidebar').children[1].children);
      const listOfRemoveBtns = [];
      for (let i = 0; i < listitems.length;
      ) {
        listOfRemoveBtns.push(listitems[i].lastChild);
=======
    get sidebarProjectListRemoveBtns() {
      const nodeListOfProjectLinks = document.getElementById('list-by-project').children;
      const arr = [];
      for (const child of nodeListOfProjectLinks) {
        arr.push(child.lastChild);
>>>>>>> experimental
      }
      return arr;
    },
  };
}
const DOM = dom();
export default DOM;
