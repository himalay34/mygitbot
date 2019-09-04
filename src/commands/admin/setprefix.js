exports.run = async (bot, msg, args, fn) => {
  // check args
  if (!args[0]) throw "You have to provide custom prefix";

  // custom prefix == default prefix
  // get custom config for prefix per server
  let dbPrefix = bot.servers.get(msg.guild.id);
  console.log()
  
  if (args[0] == dbPrefix.prefix)
    throw `Nothing to change :wink: . Because your new prefix and current prefix is same i.e "${args[0]}"` ;
  
  if (args[0] == global.config.prefix)
    throw `Nothing to change :wink: . Because your prefix and default prefix is same i.e "${args[0]}"` ;
  

  try {
   
    let data = await bot.managers
      .get("server")
      .updateServer(msg.guild.id, { prefix: args[0] })
      .then(console.log)
      .catch(console.log);
    //let data = await bot.managers.get('server').getServer(msg.guild.id).catch(console.log)
    let prefix = args[0].length ? args[0] : global.config.prefix;
    await msg.channel.send(
      `:white_check_mark: Done changing the prefix (Bot prefix is now "${args[0]}")`
    );
    // delete server id from collection not from database
    // so config will be reloaded
    await bot.servers.delete(msg.guild.id);

    await bot.emit("reloadConfigs");

  } catch (error) {
    throw error;
  }
};

exports.info = {
  name: "setprefix",
  usage: "setprefix <prefix>",
  description: `Set custom prefix for ${global.config.name}. Default prefix is "${global.config.prefix}"`,
  group: "admin",
  hidden: true,
  ownerOnly: true,
  disabled: true
};
