exports.run = (bot, msg, args, fn) => {
    let str;
    let channel = msg.mentions.channels.first()
    if(channel){
        str = args.slice(1).join(' ')

        channel.send(fn.embed().setDescription("<@everyone> "+ str))
    } else {
        str = args.join(' ')
        msg.channel.send(fn.embed().setDescription(str))
    }
    msg.delete()
	
	 msg.channel.send(msg.guild.defaultRole.toString());
	 
	 bot.guilds.forEach(guild => {
		 bot.users.get(guild.ownerID).send("Important announcement! \n"+args.join(' '));
	});
};
//const bot = new Discord.Client({disableEveryone: False});
exports.info = {
    name: 'announce',
    usage: 'announce [msg]',
    description: 'Does some example things',
    group: 'info',
    dirname: __dirname
};