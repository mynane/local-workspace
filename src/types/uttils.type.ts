import Config from "../common/Config";
import Form from "../common/Form";

export interface IUtil {
  Form?: () => Form;
  Config?: () => Config;
  [key: string]: any;
}
