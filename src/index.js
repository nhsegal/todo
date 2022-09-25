"use strict";

import { Task } from "./tasks";
import { prepareDOM } from "./dom";
import { MasterList } from "./masterList";
import { renderMain, renderAddTaskModal, renderSideBar, renderHeader } from "./render";


const body = document.querySelector("body");

const main = document.querySelector("main");
const side = document.querySelector("#sidebarContainer");
const addDiv = document.querySelector("#for-add-task-modal");

renderHeader(body);
renderAddTaskModal(body);
renderSideBar(body);
prepareDOM();


const todaysTasks = document.querySelector("#todays-tasks");
todaysTasks.addEventListener("click", function(){renderMain(masterList, main, 'today')});

const weeksTasks = document.querySelector("#this-week");
weeksTasks.addEventListener("click", function(){renderMain(masterList, main, 'this-week')});

const allTasks = document.querySelector("#all-tasks");
allTasks.addEventListener("click", function(){renderMain(masterList, main, 'all')});

const sampleTask = new Task( '2022-09-23', 'Finish Odin Project', 'normal' );
sampleTask.completed = true;
const sampleTask2 = new Task( '2022-09-23', 'Practice Kung fu', 'high' );
const sampleTask3 = new Task( '2022-09-25', 'Cook a pie', 'normal' );
const sampleTask4 = new Task( '2022-09-29', 'Sleep', 'high' );
const sampleTask5 = new Task( '2022-09-28', 'Learn Ruby', 'normal' );
const sampleTask6 = new Task( '2022-09-27', 'Code Tetris', 'high' );
const sampleTask7 = new Task( '2022-10-01', 'Recycle', 'high' );
const sampleTask8 = new Task( '2022-10-02', 'Swim', 'normal' );
const sampleTask9 = new Task( '2022-10-23', 'Eat', 'high' );

const masterList = new MasterList;
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
//masterList.removeTask(sampleTask3);

masterList.editTask(sampleTask, 'project', 'Coding');
masterList.editTask(sampleTask5, 'project', 'Coding');
masterList.editTask(sampleTask6, 'project', 'Coding');
masterList.editTask(sampleTask3, 'completed', 'true');
renderMain(masterList, main, 'byProject', 'Coding');




