class Task {
  static Status = {
    TODO: "todo",
    INPROCESS: "in-progress",
    DONE: "done",
  };

  constructor(id, description, status, createdAt, updatedAt) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Task;
