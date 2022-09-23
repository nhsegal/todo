"use strict";

import { Task } from "./tasks";
//import { Project } from "./tasks";
import { prepareDOM } from "./dom";


prepareDOM();

const sampleTask = new Task( '2022-09-24', 'Finish Odin Project', 'normal' );
const sampleTask2 = new Task( '2022-09-23', 'Practice Kung fu', 'high' );
const sampleTask3 = new Task( '2022-09-23', 'Cook a pie', 'normal' );
const sampleTask4 = new Task( '2022-09-29', 'Sleep', 'high' );

const masterList = [];
masterList.push(sampleTask);
masterList.push(sampleTask2);
masterList.push(sampleTask3);
masterList.push(sampleTask4);
masterList.sort((a,b) => a.date - b.date);

const main = document.querySelector("main");



function renderMain() {
    let today = new Date();
    let todayGroup = null;
    for (let i = 0; i < masterList.length; i++){
        if (masterList[i].date.getDate() == today.getDate() && masterList[i].date.getMonth() == today.getMonth() && todayGroup == null ) {
            todayGroup = 1;
            const todayHeading = document.createElement("div");
            todayHeading.classList.add('heading');
            todayHeading.textContent = 'Today';
            main.append(todayHeading);
        }; 

        if ((masterList[i].date.getDate() != today.getDate() && todayGroup == 1) ||  (masterList[i].date.getMonth() != today.getMonth() && todayGroup == 1) ) {
            todayGroup = null;
            const lineBreak = document.createElement('hr');
            main.append(lineBreak);
        }; 

        main.append(masterList[i].htmlFormat());
    }
   
}


renderMain();
