const { RichEmbed, Collection } = require("discord.js");

exports.embed = options =>
  new RichEmbed(options)
    // ----- Apply defaults -----
    .setColor(global.config.color);

exports.ucfirst = string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

exports.avatarURL = msg =>
  msg.author.avatarURL ||
  msg.member.user.displayAvatarURL ||
  "https://i.imgur.com/OUIVnke.jpg";

exports.getUser = (id, msg) => {
  let guild = msg.guild || msg
  return guild.members.get(id)
}

exports.sendMsg = (channel, message, timer) => {
  // 2 args required, 3rd one is optional
  channel = channel.channel || channel;

  return channel
    .send({
      embed: {
        description: message,
        color: 0x1db954
      }
    })
    .then(m => {
      // this is checking if timer is defined And a valid number
      // remember time is in milisecond i.e 1 sec = 1000ms
      if (!isNaN(timer)) m.delete({ timeout: timer });
    });
};

exports.usageBuilder = command => {
  const embed = this.embed()
    .setTitle(`Usage for \`${global.config.prefix}${command}\`:`)
    .setDescription("\u200b");

  return {
    addCommand(usage, description) {
      embed.addField(
        `\`${global.config.prefix}${command} ${usage}\``,
        `*${description}*`
      );
      return this;
    },
    build() {
      return embed;
    }
  };
};

exports.formatDate = (date) =>
{
  if(typeof(date) == 'string' || typeof(date) == 'number') date =  new Date(date)
  
    let ca2 = date.toString().split(' ');
    let cAF = `${ca2[1]} ${ca2[2]},${ca2[3]} [${ca2[4]}]`;
  
    return cAF;
}

exports.fixISO = str => {
  return str.substr(0,4) + "-" + str.substr(4,2) + "-" + str.substr(6,5) + ":" + str.substr(11,2) + ":" +  str.substr(13)
}

exports.randomItem = (array)  =>
{
    return array[Math.floor(Math.random() * array.length)];
}

exports.randomColor = () =>
{
    return "#" + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
}

exports.emoji =(bot,name) => {
  let emo = bot.emojis.find(emoji => emoji.name === name)
  if(emo) 
    return emo.toString();
}

