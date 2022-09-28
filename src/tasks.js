"use strict";

//const main = document.querySelector('main');

// Constructor to make task objects
export class Task {

    constructor(date, content, priority, project = null) { 
        this.date = new Date(date);
        this.content = content;
        this.completed = false;
        this.priority = priority;
        this.project = project;
        this.id = Math.floor(Math.random()*100000000);
    }

    markDone() {
        this.completed = true;
    }

};



