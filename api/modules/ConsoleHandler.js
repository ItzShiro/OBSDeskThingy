import { createInterface } from "readline";

class ConsoleHandler {
  constructor() {
    this.commands = {};
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  addCommand(command, info, handler) {
    this.commands[command] = { info, handler };
  }

  executeCommand(input) {
    const [command, ...args] = input.split(" ");

    if (this.commands[command]) {
      this.commands[command].handler(args);
    } else {
      console.log(
        'Command not found. Type "help" for a list of available commands.'
      );
    }
  }

  displayHelp() {
    console.log("Available commands:");
    Object.keys(this.commands).forEach((command) => {
      console.log(`${command}: ${this.commands[command].info}`);
    });
  }

  startConsole() {
    this.rl.setPrompt("> ");
    this.rl.prompt();

    this.rl.on("line", (input) => {
      this.executeCommand(input.trim());
      this.rl.prompt();
    });

    this.rl.on("close", () => {
      console.log("Exiting console.");
      process.exit(0);
    });

    this.addCommand("help", "Display list of available commands", () => {
      this.displayHelp();
    });

    this.addCommand("info", "Display information about the application", () => {
      console.log("Application information: This is a sample application.");
    });
  }
}

export { ConsoleHandler };
