const { Client, Collection, Util, WebhookClient } = require('discord.js');
const winston = require('winston');
const path = require('path');
let dir = path.resolve(__dirname, '../../', 'store')
const PouchDB = require('pouchdb').defaults({prefix: dir+'/'});
const chalk = require("chalk");
const util = require("util")
const fs = require("fs")
const readdir = util.promisify(fs.readdir)

module.exports = class FabClient extends Client {
  constructor(options) {
    super(options);
    this.logger = require('../modules/logger.js');
    //this.webhook = new WebhookClient(XIAO_WEBHOOK_ID, XIAO_WEBHOOK_TOKEN, { disableEveryone: true });
    this.config = new Collection();
    this.settings = new Collection();
    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldowns = new Collection();
    this.queue = new Collection();//new Map();
    // Basically just an async shortcut to using a setTimeout. Nothing fancy!
    this.wait = require("util").promisify(setTimeout);
  }
  
  /*SINGLE-LINE AWAITMESSAGE
  A simple way to grab a single reply, from the user that initiated
  the command. Useful to get "precisions" on certain things...
  USAGE
  const response = await client.awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);
  */
  async awaitReply (msg, question, limit = 60000) {
    const filter = m=>m.author.id = msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  }
  
  /*
  MESSAGE CLEAN FUNCTION
  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
  */
  async clean (text) {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 1 });

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(this.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  }
  
  // getSettings merges the client defaults with the guild settings. guild settings in
  // enmap should only have *unique* overrides that are different from defaults.
  getSettings (guild) {
    const defaults = this.config.defaultSettings || {};
    const guildData = this.settings.get(guild.id) || {};
    const returnObject = {};
    Object.keys(defaults).forEach((key) => {
      returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
    });
    return returnObject;
  }

  // writeSettings overrides, or adds, any configuration item that is different
  // than the defaults. This ensures less storage wasted and to detect overrides.
  writeSettings (id, newSettings) {
    const defaults = this.settings.get("default");
    let settings = this.settings.get(id);
    if (typeof settings != "object") settings = {};
    for (const key in newSettings) {
      if (defaults[key] !== newSettings[key]) {
        settings[key] = newSettings[key];
      } else {
        delete settings[key];
      }
    }
    this.settings.set(id, settings);
  }
}