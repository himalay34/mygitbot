const path = require('path');
const readdir = require('fs-readdir-recursive');
const chalk = require('chalk');

const Manager = require('./manager');

class EventManager extends Manager {
    getName() {
        return 'events';
    }

    init() {
      const bot = this.bot;
      this.loadEvents(bot)
    }
    
  async loadEvents(bot) {
    
    const dir = path.resolve(__dirname, '..', 'events')
    const evtFiles = await readdir(dir);
    bot.logger.info(`Loading a total of ${evtFiles.length} events.`)
    
    evtFiles
    .filter(file => file.endsWith('.js'))
    .forEach((file) => {
        const eventName = file.split(".")[0];
        //bot.logger.info(`Loading Event: ${eventName}`);
        const eventFile = require(path.resolve(dir, file));
        
        let check = this.validateEvent(eventName, eventFile);
        
        if(check) return bot.logger.error(`Error in '${file}': ${chalk.red(check)}`);
      
        const event = new eventFile(bot);
        bot.on(eventName, (...args) => event.run(...args));
        delete require.cache[require. resolve(`${dir}/${file}`)];
    });
    
  }
  
  validateEvent(name,event){
    if (!event.prototype) return `Event Module exports must be a class.`;
    
    return '';
  }
}

module.exports = EventManager;