import path from "path";
import fs from "fs";

class FileService {
  constructor() {
    this.filePath = path.join(process.cwd(), "tasks.json");
  }

  readFile() {
    this.createFileIfNotExists();
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading file:", err);
      throw err;
    }
  }

  saveFile(data) {
    this.createFileIfNotExists();

    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Error writing file:", err);
      throw err;
    }
  }

  createFileIfNotExists() {
    try {
      fs.accessSync(this.filePath);
    } catch (error) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }
}

export default FileService;
