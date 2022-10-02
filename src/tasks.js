// Constructor to make task objects
export default class Task {
  constructor(date, content, priority, project = null) {
    this.date = new Date(date);
    this.content = content;
    this.isCompleted = false;
    this.priority = priority;
    this.project = project;
    this.id = Math.floor(Math.random() * 100000000);
  }

  markDone() {
    this.isCompleted = true;
  }
}
