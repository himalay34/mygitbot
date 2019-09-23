const Manager = require("./manager");
const PouchDB = require('pouchdb');
const url = process.env.BASEURL;
const dbPath = `http://${process.env.USER}:${process.env.PASSWORD}@${url}/servers`;

class ServerManager extends Manager {
  
  getName() {
    return "server";
  }

  preInit() {
    this.db = new PouchDB(dbPath);
  }

  async createServer(id, options = {}) {
    const serverOptions = Object.assign(
      {
        _id: id,
        prefix: "",
        autorole: "User",
        allowSetTopic: true,
        mainChannelId: "",
        welcomeChannelId: "",
        LogChannelId: ""
      },
      options
    );
    try {
      const response = await this.db.put(serverOptions);
      if (response.ok) {
        console.log(response)
        return serverOptions;
      }
    } catch (error) {
      throw error;
    }
  }

  async getServer(id) {
    try {
      return await this.db.get(id);
    } catch (err) {
      // Just return undefined if the profile isn't found
      if (err.status !== 404) {
        throw err;
      }
    }
  }

  async getOrCreateServer(id, options = {}) {
    let server = await this.getServer(id);
    if (!server) {
      server = await this.createServer(id, options);
    }
    return server;
  }

  async updateServer(id, changes) {
    // const server = await this.getOrCreateServer(id);
    // const serverData = Object.assign({
    // 	_id: id,
    // 	_rev: server._rev
    // }, changes);

    try {
      return await this.db.get(id).then(doc => {
        var update = Object.assign(doc, changes);
        return this.db.put(update);
      });
    } catch (error) {
      throw error;
    }
  }

  async getServers() {
    try {
      return await this.db.allDocs({ include_docs: true }); //.then(docs => docs.rows);
    } catch (err) {
      // Just return undefined if the profile isn't found
      throw err;
    }
  }

  async deleteServer(id) {
    let self = this
    try {
      return await this.db.get(id).then(function(doc) {
        return self.db.remove(doc);
      });
    } catch (err) {
      // Just return undefined if the profile isn't found
      throw err;
    }
  }
  /**
  * get custom config for a guild
   */
  async getSettings(guild){
    // get default config
    const defaults = this.bot.managers.get("config").config || {};
    let guildData;
    
    try { 
      guildData = await this.db.get(guild.id);
    } catch(er){
      guildData = {}
    }

    const returnObject = {};

    Object.keys(defaults).forEach((key) => {
      returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
    });
    
    return returnObject;
  }
}

module.exports = ServerManager;
