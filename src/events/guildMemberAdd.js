let Event = require('../base/event.js')
module.exports = class event extends Event {

  async run (member) {
    //load welcome utility
    const newUser = require("../utils/newUser");
    // greet user
    newUser.welcome(this.client, member);
    
    member.guild.owner.send(
        `> \`${member.guild}\` | **New member:** ${member} - \`${member.user.tag} | Joind at ${member.guild.joinedAt.toDateString()}\``
    );
  }
};