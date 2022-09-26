"use strict";

import { Task } from "./tasks";
import { prepareDOM } from "./dom";
import { MasterList } from "./masterList";
import { renderMain, renderAddTaskModal, renderSideBar, renderHeader } from "./render";
import { currentSettings } from "./currentSettings";

// Create the masterList before building the DOM
const masterList = new MasterList;




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
const body = document.querySelector("body");
const addDiv = document.querySelector("#for-add-task-modal");
const main = document.querySelector("main");
renderHeader(body);
renderSideBar(body, masterList, masterList.getListOfProjects());
renderAddTaskModal(body, masterList.getListOfProjects());
renderMain(masterList, main, currentSettings.viewBy, currentSettings.whichProject);

// Add eventlisteners to header and modal
//prepareDOM();

// Add eventlisteners to sidebar




const addSideBarEventListeners = () => {
    try {
        const todaysTasks = document.querySelector("#todays-tasks");
        todaysTasks.addEventListener("click", function(){
        currentSettings.update('today', null);
        renderMain(masterList, main, currentSettings.viewBy, currentSettings.whichProject)});

        const weeksTasks = document.querySelector("#this-week");
        weeksTasks.addEventListener("click", function(){
        currentSettings.update('this-week', null);
        renderMain(masterList, main, currentSettings.viewBy, currentSettings.whichProject)});

        const allTasks = document.querySelector("#all-tasks");
        allTasks.addEventListener("click", function(){
        currentSettings.update('all', null);
        renderMain(masterList, main, currentSettings.viewBy, currentSettings.whichProject)});
    }
    catch {
        console.log('failed');
    }
};

addSideBarEventListeners();







