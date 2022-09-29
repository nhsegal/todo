"use strict";

import { Task } from "./tasks";
import { DOM } from "./DOMCache";
import { addMainEventListeners, addInitialEventListeners, addSideProjectEventListeners } from "./addELs";
import { masterList } from "./masterList";
import { renderMain, renderAddTaskModal, renderSideBar, renderHeader } from "./render";
import { currentSettings } from "./currentSettings";
import freshStart from "./freshStart";
import resume from "./resume";

//  In resume.js 
//  Need to take the returned thing by JSON and make a bunch of Task objects that are then added to masterlist.data

//function reviver(thing){
//    new Task(this.)
    
    //return new Task( )
//}


if(!localStorage.getItem('oldData')) {
    freshStart();
    localStorage.setItem('instance', masterList);
    localStorage.setItem('oldData', JSON.stringify(masterList.data));
    localStorage.setItem('oldDisplayList', JSON.stringify(masterList.displayedList));
} 
else {
   resume();
}







