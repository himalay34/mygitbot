const util = require("util")
const fs = require("fs")
const readdir = util.promisify(fs.readdir)
const path = require("path");
const chalk = require("chalk");
const Client = require('./base/client.js');
const ManagerHandler = require("./managers");

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

const bot = new Client();

const managers = (bot.managers = new ManagerHandler()
  .add("config")
  .add("server")
  .add('events')
  .add("data")
  .add("commands")
  .add('settings')
  // Message moderation
  .add("messages/logger")
  .add("messages/badword")
  .add('messages/filter')
  // Ranks system
  .add('ranks/levels')
  .add('ranks/autorole')
);

// init manager
managers.preInit();

const config = (global.config = managers.get("config").config);
managers.init(bot);

process.on("exit", () => {
  processExiting = true;
  bot.destroy();
});

process.on('unhandledRejection', err => {
  console.error(`Uncaught error (${err.status}): ${err.response ? JSON.parse(err.response.text).message : err}`);
});

bot.on("warn", console.warn);

bot.login(config.token).then( ()=>{
  // add guilds to db here
  bot.guilds.forEach(async(guild) => {
    //bot.managers.get('server').deleteServer(guild.id).catch(console.log)
    bot.managers.get('server').getOrCreateServer(guild.id, {guildID: guild.id,name: guild.name, ownerID: guild.ownerID}).then(doc => {
      if(doc.ok){
        console.log(`Adding ${guild.name} to ${bot.user.username} Bot server database.`)
      } else {
        console.log(guild.id+' exist. no need to add it again.')
      }

      return guild.id
    })
    .then(async (id)=>{
      let data = await bot.managers.get('server').getSettings(id);
      
      bot.setConfigs(id, data)
    })
    .catch(console.log)
  })

});

module.exports = bot;
