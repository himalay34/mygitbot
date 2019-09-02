module.exports.run = (bot, message, args, fn) => {
  var hrs = Math.round(bot.uptime / (1000 * 60 * 60)) + " hour(s),";
  var mins = " " + (Math.round(bot.uptime / (1000 * 60)) % 60) + " minute(s), ";
  var sec = (Math.round(bot.uptime / 1000) % 60) + " second(s)";
  if (hrs == "0 hour(s),") hrs = "";
  if (mins == " 0 minute(s), ") mins = "";
  let uptime = hrs + mins + sec;

  let em = fn
    .embed()
    .setTitle(`**${bot.user.username} Uptime**\n`)
    .setDescription(`**Serving ${bot.guilds.size} servers for ${uptime}!**`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(
      `Requested by ${message.author.username}.`,
      fn.avatarURL(message)
    );

  message.delete().catch(O_o => {});
  message.channel.send(em);
};

module.exports.info = {
  name: "uptime",
  usage: "uptime",
  description: "Provides information about bot uptime",
  hidden: false,
  group: "info"
};
