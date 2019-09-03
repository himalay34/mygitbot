const Discord = require("discord.js")
const chalk = require("chalk");
module.exports = class {

    constructor (client) {
        this.client = client;
        //console.log(client)
    }

    async run () {
        //global.log('ready event starts')
        let client = this.client;

        let allServers = await client.managers
            .get("server")
            .getServers()
            .catch(console.log)
        
        // add to bot
        client.servers = new Discord.Collection();
        if (allServers.total_rows > 0) {
            allServers.rows.forEach(r => {
                client.servers.set(r.id, r.doc);
            });
        } //end add to bot
        //
        const updateDisplay = async () => {  
            //global.log("tick tok")
            client.guilds.forEach(guild => {
              // get guild config
              let gConfig = client.servers.get(guild.id)
              //stats data
              let totalMember = guild.memberCount
              let [bots, user] = guild.members.partition(u => u.user.bot);
              let [online, offline] = guild.presences.partition(m => m.status !== 'offline' );    
          
              //grab status formate
              let topic = global.config.statusFormat
                          .replace(/{members}/g, totalMember)
                          .replace(/{users}/g, user.size)
                          .replace(/{bots}/g, bots.size)
                          .replace(/{online}/g, online.size)
                          .replace(/{offline}/g, offline.size);
          
              // get main channel
              // first check main channel available or not in config
              let mainChannel = guild.channels.get(gConfig.mainChannelId)
              if(mainChannel){
                  // Check first to not spam the crap out of audit-log
                  if(mainChannel.topic !== topic) mainChannel.setTopic(topic);
              }
          })
          
          client.user.setActivity(`bgctmcwarriors.ml | ${config.prefix}help`);
          }; // end updateDisplay
        //
        client.setInterval(updateDisplay, 15000);
        updateDisplay();

        client.generateInvite([
            "MANAGE_MESSAGES",
            "MANAGE_CHANNELS",
            "BAN_MEMBERS",
            "KICK_MEMBERS"
            ])
            .then(invite => console.log(chalk.blue(invite))); // end generate invite
            
        global.log("Bot has loaded successfully. We're in business!")
    } // end run
}