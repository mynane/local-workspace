import Config from "../common/Config";
import Form from "../common/Form";
import Loading from "../common/Loading";
import Server from "../common/Server";
import Version from "../common/Version";
import Website from "../common/Website";

export interface IBase {
  command?: string;
  options?: string[][];
  description?: string;
  alias?: string;
  action?: (type: any, name: any) => void;
  [key: string]: any;
}

export interface IContext {
  Form?: Form;
  Config?: Config;
  Loading?: Loading;
  Version?: Version;
  Website?: Website;
  Server?: Server;
}
