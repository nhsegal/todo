"use strict";

import { Task } from "./tasks";
import { DOM } from "./DOMCache";
import { addMainEventListeners, addInitialEventListeners, addSideProjectEventListeners } from "./addELs";
import { masterList } from "./masterList";
import { renderMain, renderAddTaskModal, renderSideBar, renderHeader } from "./render";
import { currentSettings } from "./currentSettings";

/*
To Do: 
--remove projects
--edit task
--local storage
--styling
*/



//  ###########     Sample tasks to test the app     ########### 

const sampleTask = new Task( '2022-09-23', 'Finish Odin Project', 'normal' );
sampleTask.completed = true;
const sampleTask2 = new Task( '2022-09-23', 'Practice Kung fu', 'high' );
const sampleTask3 = new Task( '2022-09-26', 'Cook a pie', 'normal' );
const sampleTask4 = new Task( '2022-09-26', 'Sleep', 'high' );
const sampleTask5 = new Task( '2022-09-28', 'Learn Ruby', 'normal' );
const sampleTask6 = new Task( '2022-09-27', 'Code Tetris', 'high' );
const sampleTask7 = new Task( '2022-10-01', 'Recycle', 'high' );
const sampleTask8 = new Task( '2022-10-02', 'Swim', 'normal' );
const sampleTask9 = new Task( '2022-10-23', 'Eat', 'high' );

masterList.addTask(sampleTask);
masterList.addTask(sampleTask2);
masterList.addTask(sampleTask3);
masterList.addTask(sampleTask4);
masterList.addTask(sampleTask5);
masterList.addTask(sampleTask6);
masterList.addTask(sampleTask7);
masterList.addTask(sampleTask8);
masterList.addTask(sampleTask9);
masterList.sortByDate();


masterList.editTask(sampleTask, 'project', 'Coding');
masterList.editTask(sampleTask5, 'project', 'Coding');
masterList.editTask(sampleTask6, 'project', 'Coding');
masterList.editTask(sampleTask3, 'completed', 'true');
masterList.editTask(sampleTask8, 'project', 'Health');
masterList.editTask(sampleTask9, 'project', 'Health');

// ***************


// Cache DOM and render each section


renderHeader(DOM.body);
renderSideBar(DOM.body, masterList.getListOfProjects());
renderAddTaskModal(DOM.body, masterList.getListOfProjects());
renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);

// Add eventlisteners to header and modal
addInitialEventListeners();
addSideProjectEventListeners();
addMainEventListeners();
DOM.sidebarProjectListRemove;







