import Task from './tasks';
import DOM from './DOMCache';
import { addMainEventListeners, addInitialEventListeners, addSideProjectEventListeners } from './addELs';
import masterList from './masterList';
import {
  renderMain,
  renderAddTaskModal,
  renderSideBar,
} from './render';
import currentSettings from './currentSettings';

function myFunction(dataFromServer) {
  const parsedJSON = JSON.parse(dataFromServer);
  for (let i = 0; i < parsedJSON.length; i++) {
    const t = new Task(parsedJSON[i].date, parsedJSON[i].content, parsedJSON[i].priority);
    t.project = parsedJSON[i].project;
    t.completed = parsedJSON[i].completed;
    masterList.data.push(t);
  }
}

export default function resume() {
  const oldJSON = localStorage.getItem('oldData');
  myFunction(oldJSON);
  renderSideBar(masterList.getListOfProjects());
  renderAddTaskModal(DOM.body, masterList.getListOfProjects());
  renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);

  // Add eventlisteners to header and modal
  addInitialEventListeners();
  addSideProjectEventListeners();
  addMainEventListeners();
  DOM.sidebarProjectListRemove;
}
