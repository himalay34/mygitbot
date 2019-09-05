const stripIndents = require("common-tags").stripIndents;

exports.run = async (bot, message, args, fn) => {
  console.log("serverinfo")
  const verificationLevels = ["None", "Low", "Medium", "Insane", "Extreme"];
  const role = message.guild.roles.size;
  const roles = message.guild.roles.map(e => e).join(", ");
  //const online = (message.guild.members.filter(m => m.presence.status != 'offline').size - message.guild.members.filter(m=>m.user.bot).size)
  const online = message.guild.members.filter(
    m => m.presence.status != "offline"
  ).size;
  const tBot = message.guild.members.filter(m => m.user.bot).size;
  const tMember =
    message.guild.memberCount -
    message.guild.members.filter(m => m.user.bot).size;
  const textChnl = message.guild.channels.filter(chan => chan.type === "text")
    .size;
  const voiceChnl = message.guild.channels.filter(chan => chan.type === "voice")
    .size;
  const categories = message.guild.channels.filter(
    chan => chan.type === "category"
  ).size;

  const embed = fn
    .embed()
    .setAuthor("Server Name: " + message.guild.name, message.guild.iconURL)
    .setColor(0x00a2e8)
    .setThumbnail(message.guild.iconURL)
    .addField("Owner:", message.guild.owner.toString(), true)
    .addField("Region:", `\`\`\`${message.guild.region}\`\`\``, true)
    .addField(
      "Created At:",
      `\`\`\`${message.guild.createdAt.toLocaleString()}\`\`\``
    )
    .addField(
      `Users:`,
      `\`\`\`Total members: ${tMember +
        tBot}\nMember: ${tMember}\nBot: ${tBot}\nOnline: ${online}\`\`\``
    ,true)
    .addField(
      "Channels:",
      `\`\`\`Total Channels: ${message.guild.channels.size}\nCategories: ${categories}\nText Channels: ${textChnl}\nVoice Channels:${voiceChnl}\`\`\``
      ,true)
    .addField(`Server Roles: [${role}] `, roles, true)
    .addField(
      "Verification Level: ",
      `\`\`\`${verificationLevels[message.guild.verificationLevel]}\`\`\``,true
    )
    .addField("splashURL:", `\`\`\`${message.guild.splashURL}\`\`\``, true)
    .setTimestamp()
    .setFooter(
      "Requested by " + message.member.user.username,
      message.member.user.avatarURL
    );
  message.channel.send({ embed });
};

exports.info = {
  name: "server",
  usage: "server",
  description: "Shows server informations",
  group: "info"
};
