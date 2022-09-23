"use strict";

// Constructor to make task objects
export class MasterList {
    constructor() { 
       this.list = [];
    }

    addTask(task) {
        this.list.push.call(this,task);
    }

    removeTask(task) {
        let tempArr = [];
        while (this.list.indexOf.call(this,task) > -1) {
            tempArr.push(this.list.pop.bind(this)());
        }
        tempArr.pop();
        while (tempArr.length) {
            this.list.push.call(this, tempArr.pop());
        }
       
    }

    editTask(task) {

    }

    sortByDate() {
        this.list.sort.call(this ,(a,b) => a.date - b.date);
    }

    produceProjectList() {

    }

}