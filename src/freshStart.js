import Task from './tasks';
import DOM from './DOMCache';
import { addMainEventListeners, addInitialEventListeners, addSideProjectEventListeners } from './addELs';
import masterList from './masterList';
import { renderMain, renderAddTaskModal, renderSideBar } from './render';
import currentSettings from './currentSettings';

export default function freshStart() {
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

  const sampleTask = new Task(today, 'Refactor tic-tac-toe program', 'normal');
  const sampleTask2 = new Task(today, 'Buy milk', 'high');
  const sampleTask3 = new Task(tomorrow, 'Buy birthday card', 'normal');
  const sampleTask4 = new Task(tomorrow, 'Call mom', 'high');
  const sampleTask5 = new Task(tomorrow, 'Do Ruby beginner tutorial', 'normal');
  const sampleTask6 = new Task(dayAfterTomorrow, 'Vacuum', 'high');
  const sampleTask7 = new Task(dayAfterTomorrow, 'Laundry', 'normal');
  const sampleTask8 = new Task(dayAfterTomorrow, 'Practice piano', 'normal');
  const sampleTask9 = new Task(today, 'Dog-sit for Kimmy', 'high');
  const sampleTask10 = new Task(yesterday, 'Schedule dentist appointment', 'high');

  masterList.addTask(sampleTask);
  masterList.addTask(sampleTask2);
  masterList.addTask(sampleTask3);
  masterList.addTask(sampleTask4);
  masterList.addTask(sampleTask5);
  masterList.addTask(sampleTask6);
  masterList.addTask(sampleTask7);
  masterList.addTask(sampleTask8);
  masterList.addTask(sampleTask9);
  masterList.addTask(sampleTask10);
  masterList.sortByDate();

  masterList.editTask(sampleTask, 'project', 'Coding');
  masterList.editTask(sampleTask2, 'project', 'Shopping');
  masterList.editTask(sampleTask3, 'project', 'Shopping');
  masterList.editTask(sampleTask5, 'project', 'Coding');
  masterList.editTask(sampleTask6, 'project', 'Housework');
  masterList.editTask(sampleTask7, 'project', 'Housework');

  // ***************

  // Cache DOM and render each section

  renderSideBar(masterList.getListOfProjects());
  renderAddTaskModal(DOM.body, masterList.getListOfProjects());
  renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);

  // Add eventlisteners to header and modal
  addInitialEventListeners();
  addSideProjectEventListeners();
  addMainEventListeners();
  DOM.sidebarProjectListRemove;
}
