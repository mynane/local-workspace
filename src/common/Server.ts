import chalk from "chalk";
import child_process from "child_process";
import { JKUtil } from "../libs/Application";
import checkApi from "../utils/checkApi";

class Server extends JKUtil {
  constructor() {
    super();
  }

  public async start() {
    try {
      await checkApi();
      console.log(chalk.blue("start api server: http://localhost:41414"));
    } catch (error) {
      child_process.exec(`pm2 start dist/Server.js --name local-workspace`, function (err, data) {
        console.log("data: ", data);
        if (!err) {
          console.log(chalk.blue("start api server: http://localhost:41414"));
        }
      });
    }
  }

  /**
   * save
   */
  public async stop(doc = "") {
    try {
      await checkApi();
      child_process.exec(`pm2 stop local-workspace && pm2 delete local-workspace`, function (err, data) {
        if (!err) {
          console.log(chalk.blue("local-workspace stoped"));
        }
      });
    } catch (error) {
      console.log(chalk.blue("local-workspace stoped"));
    }
  }
}

export default Server;
