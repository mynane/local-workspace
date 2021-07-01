/* eslint-disable prefer-const */
import { Command, JKModule } from "../libs/Application";

/**
 * check
 */
@Command({
  command: "check",
  description: "check the npm version",
  alias: "c",
})
export class CheckCommand extends JKModule {
  public action = async () => {
    await this.ctx?.Version?.check(false);
  };
}
/**
 *
 */
@Command({
  command: "home",
  description: "open homepage",
})
export class HomeCommand extends JKModule {
  public action = async () => {
    await this.ctx?.Website?.Home();
  };
}

@Command({
  command: "start",
  description: "start server",
})
export class ServiceStartCommand extends JKModule {
  public action = async () => {
    await this.ctx?.Server?.start();
  };
}

@Command({
  command: "stop",
  description: "stop server",
})
export class ServiceStopCommand extends JKModule {
  public action = async () => {
    await this.ctx?.Server?.stop();
  };
}
