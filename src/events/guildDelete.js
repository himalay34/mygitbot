let Event = require('../base/event.js')
module.exports = class event extends Event {

  async run (guild) {
    this.client.logger.log(`Oops! ${guild.name} left the server`);
    await this.client.managers.get('server').deleteServer(guild.id).catch(console.log)
  }
};