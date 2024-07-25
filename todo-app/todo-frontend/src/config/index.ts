import AppConfig from "./app-config.json";

class Config {
  AppConfig: object;

  constructor() {
    this.AppConfig = AppConfig;
  }

  static get SERVER_URL() {
    return AppConfig.SERVER_URL;
  }
}

export default Config;
