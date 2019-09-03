const { stripIndents } = require("common-tags");
const { formatDistance, formatRelative } = require("date-fns");

exports.run = (bot, msg, args, fn) => {
    msg.delete().catch(O_o => {});
    // get mensioned user
    let user = msg.mentions.users.first();

    if(!user) user = msg.author

    const { createdAt } = user;
    return msg.reply(stripIndents`${user} ${formatDistance(createdAt, new Date())} old.
    Created on ${formatRelative(createdAt, new Date())}.`);
};

exports.info = {
    name: 'account-age',
    usage: 'account-age [@User]',
    description: 'Get user account age',
    group: 'info'
};