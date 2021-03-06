let Event = require('../base/event.js')
module.exports = class event extends Event {
    
    async run () {
      let client = this.client;
      
      if(!client.user.bot) {
          client.logger.log("Automating normal user accounts (generally called \"self-bots\") outside of the OAuth2/bot API is forbidden, and can result in an account termination if found.", "error");
          client.logger.log("https://support.discordapp.com/hc/en-us/articles/115002192352-Automated-user-accounts-self-bots-", "error");
          process.exit(0);
      }
      console.log('ready')

      const updateDisplay = async () => {  
            //global.log("tick tok")
            client.guilds.forEach(guild => {
              // get guild config
              let gConfig = client.config.get(guild.id)
              
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
              if(gConfig.mainChannelId){
                  let mainChannel = guild.channels.get(gConfig.mainChannelId)
                  if(mainChannel){
                      // Check first to not spam the crap out of audit-log
                      if(mainChannel.topic !== topic) mainChannel.setTopic(topic);
                  }
              }
          })
          
          }; // end updateDisplay
      client.setInterval(updateDisplay, 15000);
        updateDisplay();
      //const manager = await client.managers.get("server");
      
      client.logger.info(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");
      console.log(client.settings)
      client.user.setActivity(`${global.config.prefix}help`, {type: "PLAYING"});
    }
}
