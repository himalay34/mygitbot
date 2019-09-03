const path = require("path");
let dir = path.resolve(global.settings.baseDir,'store')
const PouchDB = require('pouchdb').defaults({prefix: dir+'/'});

const Manager = require("./manager");

class ServerManager extends Manager {
  
  getName() {
    return "server";
  }

  preInit() {
    this.pdb = global.pdb = new PouchDB("servers");
  }

  async createServer(id, options = {}) {
    const serverOptions = Object.assign(
      {
        _id: id,
        prefix: "",
        autorole: "User",
        mainChannelId: "",
        welcomeChannelId: "",
        serverLogChannelId: ""
      },
      options
    );
    try {
      const response = await this.pdb.put(serverOptions);
      if (response.ok) {
        return serverOptions;
      }
    } catch (error) {
      throw error;
    }
  }

  async getServer(id) {
    try {
      return await this.pdb.get(id);
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
      return await this.pdb.get(id).then(doc => {
        var update = Object.assign(doc, changes);
        return pdb.put(update);
      });
    } catch (error) {
      throw error;
    }
  }

  async getServers() {
    try {
      return await this.pdb.allDocs({ include_docs: true }); //.then(docs => docs.rows);
    } catch (err) {
      // Just return undefined if the profile isn't found
      throw err;
    }
  }

  async deleteServer(id) {
    try {
      return await this.pdb.get(id).then(function(doc) {
        return this.pdb.remove(doc);
      });
    } catch (err) {
      // Just return undefined if the profile isn't found
      throw err;
    }
  }
}

module.exports = ServerManager;
