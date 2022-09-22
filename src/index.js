"use strict";

import { Task } from "./tasks";
import { Project } from "./tasks";
import { prepareDOM } from "./dom";

prepareDOM();

const sampleTask = {
    date: '2022-09-29', content: 'Finish Odin Project', completed: false, priority: 'normal', project: null
    
}

const sampleTask2 = {
    date: '2022-09-30', content: 'Exercise', completed: true, priority: 'high', project: null
    
}


function htmlFormat(task) {
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.checked = task.completed;
    checkbox.id = task.content;

    const taskName = document.createElement("div");
    taskName.classList.add('task-name');
    taskName.textContent = task.content;

    


    /*
    const taskDate = document.createElement("div");
    taskDate.classList.add('task-date');
    taskDate.textContent = task.date;
    const taskPriority = document.createElement("div");
    taskPriority.classList.add('task-priority');
    taskPriority.textContent = task.priority;
    */
    const card = document.createElement("div");
    card.classList.add('card');
    if (task.priority == 'high') {
        card.classList.add('important');
    }
    //card.setAttribute("data-id", );

    //card.append(checkbox,taskName, taskDate, taskPriority);
    
    card.append(checkbox, taskName);
    return (card)
}
const main = document.querySelector("main");
main.append(htmlFormat(sampleTask));
main.append(htmlFormat(sampleTask2));

