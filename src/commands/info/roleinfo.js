exports.run = (bot, message, args, fn) => {
  if (args.length < 1) {
    throw "Please enter the name or ID of the role you want to get the info for.";
  }

  const input = args.join(" ").toLowerCase();
  const role =
    message.mentions.roles.first() ||
    message.guild.roles.find(
      role => role.id === input || role.name.toLowerCase() === input
    );

  if (!role) {
    throw "That role could not be found!";
  }

  message.delete().catch(O_o => {});

  message.channel.send(
    global.factory
      .embed()
      .setTitle(`${role.name}`)
      .setThumbnail(
        `http://placehold.it/100x100/${role.hexColor.slice(
          1
        )}/${role.hexColor.slice(1)}`
      )
      .setColor(role.color)
      .addField(
        "Total members",
        message.guild.members.filter(member => member.roles.has(role.id)).size, true
      )
      .addField("Mentionable", role.mentionable ? "Yes" : "No", true)
      .addField("Color", role.hexColor, true)
      .addField("ID", role.id, true)
      .setTimestamp()
      .setFooter(`Requested by ${message.author.username}`, fn.avatarURL(message))
  );
};

exports.info = {
  name: "roleinfo",
  usage: "roleinfo <role>",
  description: "Gives you information about the given role.",
  group: "info"
};
