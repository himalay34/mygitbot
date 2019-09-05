exports.run = (bot, msg, args, fn) => {
    let str;
    let channel = msg.mentions.channels.first()
    let embed = fn.embed()
    if (channel) {
        str = args.slice(1).join(' ')
        str += `\n \n -${msg.guild.defaultRole.toString()}`
        embed.setDescription(str)
            .setTimestamp()
            .setFooter(`Requested by ${msg.author.username}`, fn.avatarURL(msg));

        channel.send(embed)
    } else {
        str = args.join(' ')
        str += `\n \n -${msg.guild.defaultRole.toString()}`

        embed.setDescription(str)
            .setTimestamp()
            .setFooter(`Requested by ${msg.author.username}`, fn.avatarURL(msg));

        msg.channel.send(embed)
    }
    msg.delete()
	
	//msg.channel.send(msg.guild.defaultRole.toString());
};
//const bot = new Discord.Client({disableEveryone: False});
exports.info = {
    name: 'say',
    usage: 'say [msg]',
    description: 'Announce Message',
    group: 'info',
    dirname: __dirname
};