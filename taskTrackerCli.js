import readline from "readline";
import TaskService from "./services/taskService.js";

const taskService = new TaskService();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "task-cli ",
});

console.log('Task Tracker. Type "help" for available commands.');
rl.prompt();

rl.on("line", (line) => {
  const [command, ...args] = line.trim().split(" ");

  try {
    switch (command) {
      case "add":
        const description = args.join(" ");
        taskService.add(description);
        break;
      case "delete":
        const deleteId = parseInt(args[0], 10);
        taskService.delete(deleteId);
        break;
      case "update":
        const updateId = parseInt(args[0], 10);
        const newDescription = args.slice(1).join(" ");
        taskService.update(updateId, newDescription);
        break;
      case "list":
        const status = args.join(" ");
        taskService.list(status);
        break;
      case "mark-in-progress":
      case "mark-done":
        const newStatus = command.replace("mark-", "");
        const markId = parseInt(args[0], 10);
        taskService.mark(markId, newStatus);
        break;
      case "help":
        console.log(
          `Available commands: 
          - add [description]
          - delete [id]
          - update [id] [description]
          - list
          - mark-[status] [id]
          - exit`
        );
        break;
      case "exit":
        rl.close();
        break;
      default:
        console.log("Unrecognized command. Use help to see available commands");
        break;
    }
  } catch (error) {
    console.error(error.message);
  }

  rl.prompt();
}).on("close", () => {
  console.log("Exit.");
  process.exit(0);
});
