"use strict"

import { Task } from "./tasks";
import { DOM } from "./DOMCache";
import { addMainEventListeners, addInitialEventListeners, addSideProjectEventListeners } from "./addELs";
import { masterList } from "./masterList";
import { renderMain, renderAddTaskModal, renderSideBar, renderHeader } from "./render";
import { currentSettings } from "./currentSettings";


function makeTaskFromJSON(thing){
    console.log(thing);
    const t = new Task(thing.date, thing.content, thing.priority);
    t.project = thing.project;
    t.completed = thing.completed;
   // console.log(t)
    return t
}





function myFunction(dataFromServer){
    const parsedJSON = JSON.parse(dataFromServer);
    for (let i=0;i<parsedJSON.length;i++) {
        const t = new Task(parsedJSON[i].date, parsedJSON[i].content, parsedJSON[i].priority);
        t.project = parsedJSON[i].project;
        t.completed = parsedJSON[i].completed;
        masterList.data.push(t);
    }
 }

export default function resume() { 
    const oldJSON = localStorage.getItem('oldData');
    myFunction(oldJSON);
   // for (const entry of oldJSON){
       //console.log(entry)
        //masterList.data.push(makeTaskFromJSON(entry)); 
   // }
   // console.log(masterList.data);

    

    renderHeader(DOM.body);
    renderSideBar(DOM.body, masterList.getListOfProjects());
    renderAddTaskModal(DOM.body, masterList.getListOfProjects());
    renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);

    // Add eventlisteners to header and modal
    addInitialEventListeners();
    addSideProjectEventListeners();
    addMainEventListeners();
    DOM.sidebarProjectListRemove;
}