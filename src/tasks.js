"use strict";

// Constructor to make task objects
export class Task {
    constructor(date, content, priority) { 
        this.date = date;
        this.content = content;
        this.completed = false;
        this.priority = priority;
        this.project = null;
    }

    markDone() {
        this.completed = true;
    }


    
};



