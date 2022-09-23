"use strict";

import { Task } from "./tasks";
//import { Project } from "./tasks";
import { prepareDOM } from "./dom";
import { MasterList } from "./masterList";


prepareDOM();

const sampleTask = new Task( '2022-09-24', 'Finish Odin Project', 'normal' );
const sampleTask2 = new Task( '2022-09-23', 'Practice Kung fu', 'high' );
const sampleTask3 = new Task( '2022-09-23', 'Cook a pie', 'normal' );
const sampleTask4 = new Task( '2022-09-29', 'Sleep', 'high' );

const masterList = new MasterList;
masterList.addTask(sampleTask);
masterList.addTask(sampleTask2);
masterList.addTask(sampleTask3);
masterList.addTask(sampleTask4);
masterList.sortByDate();
//masterList.removeTask(sampleTask3);

//masterList.editTask(sampleTask);


const main = document.querySelector("main");

function renderMain() {
    let today = new Date();
    let todayGroup = null;
    for (let i = 0; i < masterList.data.length; i++){
        if (masterList.data[i].date.getDate() == today.getDate() && masterList.data[i].date.getMonth() == today.getMonth() && todayGroup == null ) {
            todayGroup = 1;
            const todayHeading = document.createElement("div");
            todayHeading.classList.add('heading');
            todayHeading.textContent = 'Today';
            main.append(todayHeading);
         
        }; 

        if ((masterList.data[i].date.getDate() != today.getDate() && todayGroup == 1) ||  (masterList.data[i].date.getMonth() != today.getMonth() && todayGroup == 1) ) {
            todayGroup = null;
            const lineBreak = document.createElement('hr');
            main.append(lineBreak);
        }; 

        main.append(masterList.data[i].htmlFormat());
    }
   
}


renderMain();


