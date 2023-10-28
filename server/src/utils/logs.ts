import { existsSync, mkdirSync, appendFileSync } from "fs";

class Logs {
  private logsDirectory = "./data";

  constructor () {
    if (!existsSync(this.logsDirectory)) {
      mkdirSync(this.logsDirectory);
    }
  }

  public write<Data extends { toString(): string }>(data: Data, silent = false): void {
    const date = new Date();

    const timeString = date.toLocaleTimeString("ru-RU");
    const dateString = date.toLocaleDateString("ru-RU").replace(/\./g, "-");

    const logData = `[${timeString}] ${data.toString()}`;
    const logPath = `${this.logsDirectory}/${dateString}.txt`;

    appendFileSync(logPath, logData + "\n");

    if (!silent) {
      console.log(logData);
    }
  }
}

export const logs = new Logs();