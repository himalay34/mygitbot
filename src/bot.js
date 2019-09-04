require("dotenv").config();
const util = require("util")
const fs = require("fs")
const readdir = util.promisify(fs.readdir)
const path = require("path");
const chalk = require("chalk");
const Discord = require("discord.js");
const ManagerHandler = require("./managers");
const winston = require('winston')
global.logger = winston.createLogger({
  transports: [
      new winston.transports.Console(),
      new winston.transports.File({
          filename: './combined.log'
      })
  ]
})

global.settings = {
  baseDir: path.resolve(__dirname, ".."),
  dataFolder: path.resolve(__dirname, "..", "data"),
  store: path.resolve(__dirname, "..", "store")
};

global.log = (data) =>{
  console.log('\n')
  console.log(chalk.red('start =>')+chalk.cyan('-*-'.repeat(16)))
  console.log(chalk.yellow(data))
  console.log(chalk.gray('/end ')+chalk.gray('*-*'.repeat(17)+'\n'))
}
global.factory = require("./factory");

const bot = new Discord.Client();

const managers = (bot.managers = new ManagerHandler()
  .add("config")
  .add("server")
  .add("data")
  .add("commands")
  .add("logger")
  // Message moderation
  .add("messages/badword")
  .add('messages/filter')
  // Ranks system
  .add('ranks/levels')
  //.add('ranks/autorole')
);

// init manager
managers.preInit();

const config = (global.config = managers.get("config").config);
managers.init(bot);

// do some nesty works
bot.on("reloadConfigs", async () => {
  let allServers = await managers
    .get("server")
    .getServers()
    .catch(console.log);

  if (allServers.total_rows > 0) {
    allServers.rows.forEach(r => {
      bot.servers.set(r.id, r.doc);
    });
  }
});

(async()=>{
  const eventsFolder = path.resolve(__dirname, '.', 'events');
  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir(eventsFolder);
  console.log(`Loading a total of ${evtFiles.length} events.`)
  evtFiles.forEach((file) => {
      const eventName = file.split(".")[0];
      console.log(`Loading Event: ${eventName}`);
      //let event = require(`./${dir}/${f}`);
      //command = require(path.resolve(commandsFolder, file));
      const eventFile = require(path.resolve(eventsFolder, file));
      const event = new eventFile(bot);
      bot.on(eventName, (...args) => event.run(...args));
      delete require.cache[require. resolve(`${eventsFolder}/${file}`)];
  });
})()

let processExiting = false;

process.on("exit", () => {
  processExiting = true;
  bot.destroy();
});

process.on('unhandledRejection', err => {
  console.error(`Uncaught error (${err.status}): ${err.response ? JSON.parse(err.response.text).message : err}`);
});

bot.on("warn", console.warn);

bot.on("error", console.error);

bot.on("disconnect", () => {
  processExiting ||
    setTimeout(() => {
      bot.user || (bot.destroy(), bot.login(config.tokens));
    }, 15000);
});

bot.login(config.token).then( ()=>{
  // add guilds to db here
  bot.guilds.forEach(async(guild) => {
    //bot.managers.get('server').deleteServer(guild.id).catch(console.log)
    //console.log(`Adding ${guild.name} to ${bot.user.username} Bot server database.`)
    bot.managers.get('server').getOrCreateServer(guild.id, {guildID: guild.id,name: guild.name, ownerID: guild.ownerID}).then(doc => {
      if(doc.ok){
        console.log(`Adding ${guild.name} to ${bot.user.username} Bot server database.`)
      } else {
        console.log(guild.id+' exist. no need to add it again.')
      }
    }).catch(console.log)
  })

});

module.exports = bot;
