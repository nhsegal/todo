"use strict";

// Constructor to make task objects
class Task {
    constructor(date, content, completed, priority, project = null) { 
        this.date = date;
        this.content = content;
        this.completed = completed;
        this.priority = priority;
        this.project = project;
    }

    markDone() {
        this.completed = true;
    }
};

class Project {
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



//Test taskMaker
const date1 = new Date('November 1, 2022');
const task1 = new Task(date1, 'clean the house');
const task2 = new Task(date1, 'make the bed');
const task3 = new Task(date1, 'walk the dog');



// Test projectMaker
const project1 = new Project('chores');
project1.addTask(task1);
project1.addTask(task2);
project1.addTask(task3);

project1.removeTask(task1);
//task1.project = null;
//project1.tasks = project1.tasks.filter(task => task.project != null);

//for (const item of project1.tasks) {
//    console.log(item);
//}

