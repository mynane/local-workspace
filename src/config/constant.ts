import path from "path";

class Constant {
  // 获取项目仓库正则
  static REPOI_RE = /origin\t(.+)\s\(fetch\)/;
  // 项根目录路径
  static ROOT = process.env.HOME || process.env.USERPROFILE || "";
  // jk root 目录
  static JK_ROOT = path.join(Constant.ROOT, "/.local-workspace");
  // jk配置路径
  static JK_CONFIG = path.join(Constant.ROOT, "/.local-workspace/config");
  // 多久检测一次版本
  static checkVersionTimeInterval = 60 * 60 * 1000;
}

export default Constant;
