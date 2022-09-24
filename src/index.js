"use strict";

import { Task } from "./tasks";
import { prepareDOM } from "./dom";
import { MasterList } from "./masterList";
import { renderMain, renderAddTaskModal } from "./render";




const todaysTasks = document.querySelector("#todays-tasks");
todaysTasks.addEventListener("click", function(){renderMain(masterList, main, 'today')});

const allTasks = document.querySelector("#all-tasks");
allTasks.addEventListener("click", function(){renderMain(masterList, main, 'all')});

const sampleTask = new Task( '2022-09-23', 'Finish Odin Project', 'normal' );
const sampleTask2 = new Task( '2022-09-23', 'Practice Kung fu', 'high' );
const sampleTask3 = new Task( '2022-09-23', 'Cook a pie', 'normal' );
const sampleTask4 = new Task( '2022-09-29', 'Sleep', 'high' );
const sampleTask5 = new Task( '2022-09-23', 'Learn Ruby', 'normal' );
const sampleTask6 = new Task( '2022-09-26', 'Code Tetris', 'high' );

const masterList = new MasterList;
masterList.addTask(sampleTask);
masterList.addTask(sampleTask2);
masterList.addTask(sampleTask3);
masterList.addTask(sampleTask4);
masterList.addTask(sampleTask5);
masterList.addTask(sampleTask6);
masterList.sortByDate();
//masterList.removeTask(sampleTask3);

masterList.editTask(sampleTask, 'project', 'Coding');
masterList.editTask(sampleTask5, 'project', 'Coding');
masterList.editTask(sampleTask6, 'project', 'Coding');
masterList.editTask(sampleTask3, 'completed', 'true');



const main = document.querySelector("main");
const addDiv = document.querySelector("#for-add-task-modal");

renderAddTaskModal(addDiv);
prepareDOM();
renderMain(masterList, main, 'byProject', 'Coding');


