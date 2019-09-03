const path = require("path");
const fse = require("fs-extra");
const Manager = require("./manager");

class ConfigManager extends Manager {
  getName() {
    return "config";
  }

  preInit() {
    this._configPath = path.resolve(global.settings.baseDir, "botConfig.json");
    this._examplePath = path.resolve(
      global.settings.baseDir,
      "config-example.json"
    );

    this.loadConfig();
  }

  loadConfig() {
    if (!fse.existsSync(this._configPath)) {
      fse.copySync(this._examplePath, this._configPath);
      throw "The config.json file was not set up, please fill it out.";
    }

    const config = fse.readJSONSync(this._configPath);

    if (!config.token || !/^[A-Za-z0-9._-]+$/.test(config.token)) {
      let envToken = process.env.TOKEN;
      if (envToken) {
        //merge token to config
        config.token = envToken;
      } else {
        throw "Config is missing a valid bot token! Please acquire one at https://discordapp.com/developers/applications/me";
      }
    }

    this._config = global.config = config;
  }

  get config() {
    return Object.assign(this._config, { save: () => this.save() });
  }

  save() {
    fse.writeFileSync(this._configPath, JSON.stringify(this._config, null, 4));
  }
  
}

module.exports = ConfigManager;
