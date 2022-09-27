"use strict";
import { masterList } from "./masterList";
import { renderMain } from "./render";
import { currentSettings } from "./currentSettings";


const main = document.querySelector('main');

// Constructor to make task objects
export class Task {

    constructor(date, content, priority) { 
        this.date = new Date(date);
        this.content = content;
        this.completed = false;
        this.priority = priority;
        this.project = null;
        this.id = Math.floor(Math.random()*100000000);
    }

    markDone() {
        this.completed = true;
    }

    htmlFormat() {
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "isCompletedCheckbox";
        checkbox.setAttribute('data-id', this.id);
        checkbox.checked = this.completed;
        checkbox.id = this.content;
    
        const taskName = document.createElement("div");
        taskName.classList.add('task-name');
        taskName.setAttribute('data-id', this.id);
        taskName.textContent = this.content;

        const taskDue = document.createElement("div");
        taskDue.classList.add('task-due-date');
        taskDue.setAttribute('data-id', this.id);
        taskDue.textContent = `Due: ${this.date.toLocaleString('default', {weekday: 'short' })},
           ${ this.date.toLocaleString('default', { month: 'short' })}. 
            ${ this.date.getDate()} `  
    
        const editTask = function(e) {
            console.log(e.target.parentElement.getAttribute("data-id"));
        }

        const removeTask = function(e) {
            const thisTask = masterList.data.filter( (t) => t.id == e.target.parentElement.getAttribute("data-id"));
            masterList.removeTask(thisTask[0])
            // reRender();
            renderMain(masterList, main, currentSettings.viewBy, currentSettings.whichProject);
        }
    
        const editBtn = document.createElement("button");
        editBtn.classList.add('edit-task');
        editBtn.setAttribute('data-id', this.id);
        editBtn.textContent = 'edit';
        editBtn.addEventListener("click", editTask);
    
        const removeBtn = document.createElement("button");
        removeBtn.classList.add('remove-task');
        removeBtn.setAttribute('data-id', this.id);
        removeBtn.textContent = 'remove';
        removeBtn.addEventListener("click", removeTask);
    
        const card = document.createElement("div");
        card.classList.add('card');
        card.setAttribute('data-id', this.id);
        if (this.priority == 'high') {
            card.classList.add('important');
        } 
        card.append(checkbox, taskName, taskDue, editBtn, removeBtn);
        return (card)
    } 
};



