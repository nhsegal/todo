"use strict";



// Constructor to make task objects
export class MasterList {
    constructor() { 
       this.data = [];
    }

    addTask(task) {
        this.data.push(task);
    }

    removeTask(task) {
        let tempArr = [];
        while (this.data.indexOf(task) > -1) {
            tempArr.push(this.data.pop());
        }
        tempArr.pop();
        while (tempArr.length) {
            this.data.push(tempArr.pop());
        }
    }

    editTask(task, attribute, value) {
        this.data[this.data.indexOf(task)][attribute] = value; 
    }

    sortByDate() {
        this.data.sort((a,b) => a.date - b.date);
        console.log(this.data);
    }

    produceProjectList(project) {
        const projectList = this.data.filter( (task) => task.project == project);
        projectList.sort((a,b) => a.date - b.date);
        return projectList;
    }

}