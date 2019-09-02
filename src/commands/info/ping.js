exports.run = async (bot, msg, args, fb) => {
  msg.delete().catch(O_o => {});
  const m = await msg.channel.send("Pong!");
  m.edit(`Pong! \`${m.createdTimestamp - msg.createdTimestamp}ms\` :watch:`);
};

exports.info = {
  name: "ping",
  usage: "ping",
  description: "Pings the bot",
  group: "info"
};
