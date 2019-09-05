exports.run = async(bot, msg, args, fn) => {
    await msg.channel.startTyping();

    await msg.delete()

    await bot.guilds.forEach(guild => {
		bot.users.get(guild.ownerID).send("Important announcement! \n"+args.join(' '));
    });
    
    await msg.channel.stopTyping();
};

exports.info = {
    name: 'news',
    usage: 'news <message>',
    description: 'Send news to every server where bot joinned.',
    group: 'info',
    ownerOnly: true
};