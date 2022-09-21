/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// Factory function to make task objects
const taskMaker = (date, content, project = null) => {
    let completed = false;
    return {date, content, completed, project};
};

//Test taskMaker
const date1 = new Date('November 1, 2022');
const task1 = taskMaker(date1, 'clean the house');
const task2 = taskMaker(date1, 'make the bed');
const task3 = taskMaker(date1, 'walk the dog');


// Factory function to make project objects
const projectMaker = (content) => {
    let tasks = [];
    
    // Later remove methods from project object and add to its prototype
    const addTask = (task) => {
        task.project = content;
        tasks.push(task);
    }
    
    const removeTask = (task) => {
        task.project = null;
        tasks = tasks.filter(task => task.project != null);
    }

    return {tasks, content, addTask, removeTask}
}

// Test projectMaker
const project1 = projectMaker('chores');
project1.addTask(task1);
project1.addTask(task2);
project1.addTask(task3);

project1.removeTask(task1);
//task1.project = null;
//project1.tasks = project1.tasks.filter(task => task.project != null);

//for (const item of project1.tasks) {
//    console.log(item);
//}


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEZhY3RvcnkgZnVuY3Rpb24gdG8gbWFrZSB0YXNrIG9iamVjdHNcbmNvbnN0IHRhc2tNYWtlciA9IChkYXRlLCBjb250ZW50LCBwcm9qZWN0ID0gbnVsbCkgPT4ge1xuICAgIGxldCBjb21wbGV0ZWQgPSBmYWxzZTtcbiAgICByZXR1cm4ge2RhdGUsIGNvbnRlbnQsIGNvbXBsZXRlZCwgcHJvamVjdH07XG59O1xuXG4vL1Rlc3QgdGFza01ha2VyXG5jb25zdCBkYXRlMSA9IG5ldyBEYXRlKCdOb3ZlbWJlciAxLCAyMDIyJyk7XG5jb25zdCB0YXNrMSA9IHRhc2tNYWtlcihkYXRlMSwgJ2NsZWFuIHRoZSBob3VzZScpO1xuY29uc3QgdGFzazIgPSB0YXNrTWFrZXIoZGF0ZTEsICdtYWtlIHRoZSBiZWQnKTtcbmNvbnN0IHRhc2szID0gdGFza01ha2VyKGRhdGUxLCAnd2FsayB0aGUgZG9nJyk7XG5cblxuLy8gRmFjdG9yeSBmdW5jdGlvbiB0byBtYWtlIHByb2plY3Qgb2JqZWN0c1xuY29uc3QgcHJvamVjdE1ha2VyID0gKGNvbnRlbnQpID0+IHtcbiAgICBsZXQgdGFza3MgPSBbXTtcbiAgICBcbiAgICAvLyBMYXRlciByZW1vdmUgbWV0aG9kcyBmcm9tIHByb2plY3Qgb2JqZWN0IGFuZCBhZGQgdG8gaXRzIHByb3RvdHlwZVxuICAgIGNvbnN0IGFkZFRhc2sgPSAodGFzaykgPT4ge1xuICAgICAgICB0YXNrLnByb2plY3QgPSBjb250ZW50O1xuICAgICAgICB0YXNrcy5wdXNoKHRhc2spO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCByZW1vdmVUYXNrID0gKHRhc2spID0+IHtcbiAgICAgICAgdGFzay5wcm9qZWN0ID0gbnVsbDtcbiAgICAgICAgdGFza3MgPSB0YXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLnByb2plY3QgIT0gbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHt0YXNrcywgY29udGVudCwgYWRkVGFzaywgcmVtb3ZlVGFza31cbn1cblxuLy8gVGVzdCBwcm9qZWN0TWFrZXJcbmNvbnN0IHByb2plY3QxID0gcHJvamVjdE1ha2VyKCdjaG9yZXMnKTtcbnByb2plY3QxLmFkZFRhc2sodGFzazEpO1xucHJvamVjdDEuYWRkVGFzayh0YXNrMik7XG5wcm9qZWN0MS5hZGRUYXNrKHRhc2szKTtcblxucHJvamVjdDEucmVtb3ZlVGFzayh0YXNrMSk7XG4vL3Rhc2sxLnByb2plY3QgPSBudWxsO1xuLy9wcm9qZWN0MS50YXNrcyA9IHByb2plY3QxLnRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2sucHJvamVjdCAhPSBudWxsKTtcblxuLy9mb3IgKGNvbnN0IGl0ZW0gb2YgcHJvamVjdDEudGFza3MpIHtcbi8vICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuLy99XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==