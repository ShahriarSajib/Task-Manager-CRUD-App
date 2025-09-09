let tasks = [];
let idCounter = 1;

class Task {
  constructor(title, description = "", status = "To Do") {
    this.id = idCounter++;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export default { Task, tasks };
