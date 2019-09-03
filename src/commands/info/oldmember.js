const { stripIndents } = require("common-tags");
const { formatDistance, formatRelative } = require("date-fns");
exports.run = async(bot, msg, args, fn) => {
    msg.delete()
    const oldest = await msg.guild.members
        .filter(u => !u.user.bot)
        .sort((member1, member2) => {
            const timestamp1 = member1.user.createdTimestamp;
            const timestamp2 = member2.user.createdTimestamp;

            if (timestamp1 > timestamp2) {
                return 1;
            } else if (timestamp1 < timestamp2) {
                return -1;
            }
            return 0;
        })
      .first().user;

    const { createdAt } = oldest;
    const age = formatDistance(createdAt, new Date());
    const date = formatRelative(createdAt, new Date());
    return msg.reply(stripIndents`${oldest.tag} is the oldest member on this server.
    Their account is ${age} old (created ${date}).`);
};

exports.info = {
    name: 'oldest-member',
    usage: 'oldest-member',
    description: 'Return oldest member of the guild except bot.',
    group: 'info'
};