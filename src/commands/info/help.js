exports.run = async(bot, msg, args) => {

  try {
    msg.channel.startTyping();
    const manager = await bot.managers.get("commands");

    let commands = {};

    if (args.length > 0) {
      const command = await manager.findCommand(args[0]);
      if (!command) {
        throw `The command '${args[0]}' doesn't exist!`;
      }
      commands = [command];
    } else {
      commands = manager.commands;
    }
    
    const fields = await commands
      .filter(command => !command.info.hidden)
      .filter(command => manager.canUse(msg.member, command))
      .map(getField);

    while (fields.length > 0) {
      msg.author.send({
        embed: global.factory.embed({
          fields: fields.splice(0, 20)
        })
      });
    }

    await msg.delete();
    await msg.channel
      .send(":inbox_tray: Sent you a DM with help.")
      .then(m => m.delete(5000));
  }  finally {
      msg.channel.stopTyping();
  }
};

const getField = command => {
  let value = `*${command.info.description}*`;

  if (command.info.aliases) {
    value += `\n*Aliases:* **\`${command.info.aliases.join(", ")}\`**`;
  }

  return {
    name: `\`${command.info.usage || command.info.name}\``,
    value: value
  };
};

exports.info = {
  name: "help",
  usage: "help [command]",
  description: "Shows help for all commands or an individual command",
  group: "info"
};
