exports.run = async(bot, msg, args, fn) => {
    // get data // args => ['main', '', '434342345645']

    let channel = args[0]
    let id = args[1]
    
    let changes = ''
    switch(channel){
        case 'main':
            changes = { mainChannelId: id }
            break;
        case 'log':
            changes = { serverLogChannelId: id }
            break;
        case 'welcome':
            //console.log(channel)
            changes = { welcomeChannelId: id }
            break;
        default: 
            throw `You have to provide channel name i.e \n* **main** for main channel \n* **log** for log channel \n* **welcome** for welcome channel \n \n But you provided **${channel}** as channel name.`
    }

    try {
        
        await bot.managers
        .get("server")
        .updateServer(msg.guild.id, changes)
        //.catch(console.log);
        
        // delete server id for refrsh config
        await bot.emit("reloadConfigs");

        await msg.delete().catch(O_o => {});

        await msg.channel.send(
            `:white_check_mark: Channel ID setting successfull`
        ).then(m => m.delete(5000));
        
    } catch (error) {
        throw error
    }
};

exports.info = {
    name: 'setchannel',
    usage: 'setchannel <channelId>',
    description: 'Set channel id  for some automated stafs. Please do not provide wrong id.',
    ownerOnly: true,
    hidden: true
};
