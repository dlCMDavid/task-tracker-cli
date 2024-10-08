import FileService from "./fileService.js";
import Task from "../task.js";

class TaskService {
  constructor() {
    this.fileService = new FileService();
  }

  add(description) {
    var validatedDescription = this.validateDescription(description);

    var tasks = this.getTasks();

    var lastId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    tasks.push(
      new Task(
        lastId,
        validatedDescription,
        Task.Status.TODO,
        new Date().toISOString(),
        null
      )
    );

    this.fileService.saveFile(tasks);
    console.log(`Task added successfully (ID: ${lastId})`);
  }

  update(id, description) {
    var validatedDescription = this.validateDescription(description);

    var tasks = this.getTasks();

    var task = tasks.find((x) => x.id === id);

    if (!task) throw new Error("Task not found");

    task.description = validatedDescription;
    task.updatedAt = new Date().toISOString();

    this.fileService.saveFile(tasks);
    console.log(`Task updated successfully (ID: ${task.id})`);
  }

  delete(id) {
    var tasks = this.getTasks();

    var taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) throw new Error("Task not found");

    tasks.splice(taskIndex, 1);
    this.fileService.saveFile(tasks);
    console.log("Task delete successfully");
  }

  mark(id, status) {
    if (!Object.values(Task.Status).includes(status))
      throw new Error("Invalid status");

    var tasks = this.getTasks();
    const task = tasks.find((task) => task.id === id);

    if (!task) throw new Error("Task not found");

    task.status = status;
    task.updatedAt = new Date().toISOString();

    this.fileService.saveFile(tasks);
    console.log(`Task with id ${task.id} status updated to ${task.status}`);
  }

  list(status) {
    var tasks = this.getTasks(status);

    if (tasks.length === 0) throw new Error("No tasks available.");

    console.log("Tasks:");
    tasks.forEach((task) => {
      console.log(
        `ID: ${task.id}, Description: ${task.description}, Status: ${task.status}, CreatedAt: ${task.createdAt}, UpdatedAt: ${task.updatedAt}`
      );
    });
  }

  getTasks(status) {
    const data = this.fileService.readFile();

    var tasks = data.map(
      (item) =>
        new Task(
          item.id,
          item.description,
          item.status,
          item.createdAt,
          item.updatedAt
        )
    );

    if (status) {
      if (!Object.values(Task.Status).includes(status))
        throw new Error("Invalid status");

      tasks = tasks.filter((x) => x.status === status);
    }

    return tasks;
  }

  removeQuotesOnDescription(description) {
    return description.replace(/^['"]|['"]$/g, "").trim();
  }

  validateDescription(description) {
    const cleanedDescription = this.removeQuotesOnDescription(description);
    if (!cleanedDescription) {
      throw new Error("Description cannot be empty or whitespace.");
    }
    return cleanedDescription;
  }
}

export default TaskService;
