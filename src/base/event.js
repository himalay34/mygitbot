module.exports = class Event {
  constructor (client) {
    this.client = client;
    
    if(typeof this.preInit !== "undefined") this.preInit(client);
    
  }
  
  async run (...args) {}
};