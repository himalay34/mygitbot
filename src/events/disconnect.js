let Event = require('../base/event.js')
module.exports = class event extends Event {

  async run (event) {
    const bot = this.client;
    //this.client.logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
    switch(event.code) {
        case 1000: {
            return bot.logger.info("Disconnected from Discord cleanly.")
        }
        case 4004: {
            bot.logger.error(`An invalid bot token was provided in the botConfig.js file.`);
            return process.exit(0);
        }
        default: {
            bot.logger.warn(`Disconnected with event code: ${event.code}.`);
        }
    }
  }
};