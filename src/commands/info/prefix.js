exports.run = async (bot, msg, args, fn) => {
  let config = await bot.servers.get(msg.guild.id);
  //console.log(config);

  let embed = fn
    .embed()
    .setTitle(msg.guild.name)
    .setDescription(`\`\`\` Server Prefix is " ${config.prefix} " \`\`\``)
    .setTimestamp()
    .setFooter(`Requested by ${msg.author.username}`, fn.avatarURL(msg));

  msg.channel.send(embed);
};

exports.info = {
  name: "prefix",
  usage: "prefix",
  description: "Shows server prefix",
  group: "info"
};
