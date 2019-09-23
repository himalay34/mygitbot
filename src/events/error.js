let Event = require('../base/event.js')
module.exports = class event extends Event {
  async run (error) {
    this.client.logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
  }
};