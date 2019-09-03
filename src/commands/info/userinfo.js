exports.run = async(bot, msg, args, fn) => {
    try {
        msg.channel.stopTyping();

        msg.delete();

        let user = await msg.mentions.users.first() || msg.author
        let member = await fn.getUser(user.id, msg)
        //rank
        
        const data = await bot.managers.get('levels').getUserData(user.id);

        let embed = await fn.embed()
            .setTitle(`Informations:`)
            .setAuthor(`${user.username}#${user.discriminator} | ID: ${user.id}`,fn.avatarURL(msg))
            .setThumbnail(fn.avatarURL(msg))
            .addField('Nickname', member.displayName || 'none', true)
            .addField('Profile', user.toString(), true)
            .addField('Registered for Discord', user.createdAt.toLocaleString(), true)
            .addField('Joined the Guild', member.joinedAt.toLocaleString(), true)
            .addField('Status', member.presence.status, true)
            .addField('Game', member.presence.game ? member.presence.game.name : 'No game', true)
            .addField('Owns the server?', member.id === msg.guild.ownerID ? 'Yes' : 'No', true)
            .addField('Roles', member.roles.array().length ? member.roles.map(role => role.name).join(', ') : 'User has no roles.', true)
            .addField('Current State:', `**Deafened:** ${member.deaf ? 'yes' : 'no'}\n`
                  + `**Kickable (by the bot):** ${member.kickable ? 'yes' : 'no'}\n`
                  + `**Muted:** ${member.mute ? 'yes' : 'no'}\n`
                  + `**Speaking:** ${member.speaking ? 'yes' : 'no'}\n`
                  + `**Guild Muted:** ${member.serverMute ? 'yes' : 'no'}\n`
                  + `**Guild Deafened:** ${member.serverDeaf ? 'yes' : 'no'}`, true)
            .setColor("RANDOM")
            //.addBlankField()
            .addField('Rank', `${data.rank.place || data.rank.total}/${data.rank.total}`, true)
            .addField('Level', data.currentLevel, true)
            .addField('Next Level', `${data.remaining.toFixed(0)}/${data.xpToLevel.toFixed(0)}`, true)
            .addField('Total XP', data.total.toFixed(0), true)
            .setTimestamp()
            .setFooter(
                `Requested by ${msg.author.username}.`,
                fn.avatarURL(msg)
            );
        await msg.channel.send(embed)

    } catch (error) {
        throw error
    } finally {
        msg.channel.stopTyping();
    }
};

exports.info = {
    name: 'userinfo',
    usage: 'userinfo [@user]',
    description: 'Get info about a user',
    group: 'info'
};