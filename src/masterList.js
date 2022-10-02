// There should only be one master list
let instance = null;

// Constructor to make task objects
class MasterList {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!');
    }
    instance = this;
    this.data = [];
    this.displayedList = [];
  }

  addTask(task) {
    this.data.push(task);
  }

  removeTask(task) {
    this.data.splice(this.data.indexOf(task), 1);
  }

  editTask(task, attribute, value) {
    this.data[this.data.indexOf(task)][attribute] = value;
  }

  sortByDate() {
    console.log('sorting');
    this.data
      .sort((a, b) => {
        const byDate = a.date - b.date;
        if (byDate !== 0) {
          return byDate;
        }
        if (a.priority.localeCompare(b.priority) !== 0) {
          return a.priority.localeCompare(b.priority);
        }
        return (a.content.toLowerCase().localeCompare(b.content.toLowerCase()));
      });
  }

  produceProjectList(project) {
    const projectList = this.data.filter((task) => task.project === project);
    projectList.sort((a, b) => a.date - b.date);
    return projectList;
  }

  getListOfProjects() {
    const allProjects = [];
    this.data.forEach((task) => {
      if (task.project != null && task.project !== '' && !allProjects.some((a) => a === task.project)) {
        allProjects.push(task.project);
      }
    });
    return allProjects;
  }
}

const masterList = new MasterList();
export default masterList;
