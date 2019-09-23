let Event = require('../base/event.js')
module.exports = class event extends Event {
  
  async run (guild) {
    this.client.logger.log(`New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
    await this.client.managers.get('server').getOrCreateServer(guild.id, {guildID: guild.id,name: guild.name, ownerID: guild.ownerID}).then(doc => {
      //bot.logger.info(doc)
      if(doc.ok){
        this.client.logger.info(`Adding ${guild.name} to ${this.client.user.username} Bot server database.`)
      } else {
        this.client.logger.info(guild.id+' exist. no need to add it again.')
      }
    }).catch(console.log)
  }
};