exports.run = async(bot, msg, args, fn) => {
    msg.delete();

    if(!args[0]) throw `You must provide on or off as argument but you provides nothing. \n Example: ${global.config.prefix}auto-topic on`

    if(args[0] !== 'on' || args[0] !== 'off') throw `You must provide on or off as argument. \n You entered ${args[0]} \n Example: ${global.config.prefix}auto-topic on`

    try {
        let data = await bot.managers
        .get("server")
        .updateServer(msg.guild.id, { allowSetTopic: args[0] })
        .then(doc => {
            msg.channel.send(
            `:white_check_mark: Done! Auto topic is "${args[0]}" now.`
            );
        })
        .catch(console.log);
    } catch (error) {
        throw "Oops! something went wrong, Please try again."
    } finally {
        // delete server id from collection not from database
        // so config will be reloaded
        await bot.servers.delete(msg.guild.id);
        await bot.emit("reloadConfigs");
    }
};

exports.info = {
    name: 'auto-topic',
    usage: 'auto-topic <on|off>',
    description: 'Allow bot to set auto topic for main channel of the server, default "on"',
    group: 'info',
    ownerOnly: true
};