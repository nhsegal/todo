"use strict";

export class Project {
    constructor(content) { 
        this.content = content;
        this.tasks = [];
    }

    addTask(task) {
        task.project = this.content;
        this.tasks.push(task);
    }

    removeTask(task) {
        task.project = null;
        this.tasks = this.tasks.filter(task => task.project != null);
    }

}