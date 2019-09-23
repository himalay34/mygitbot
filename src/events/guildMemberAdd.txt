const Discord = require("discord.js")
module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (member) {
        //load welcome utility
        const newUser = require("../utils/newUser");
        // greet user
        newUser.welcome(this.client, member);
        
        member.guild.owner.send(
            `> \`${member.guild}\` | **New member:** ${member} - \`${member.user.tag} | Joind at ${member.guild.joinedAt.toDateString()}\``
        );
    } // end run
}