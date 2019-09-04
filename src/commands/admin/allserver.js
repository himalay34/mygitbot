exports.run = async(bot, msg, args, fn) => {
    let data = await bot.managers
            .get("server")
            .getServers()
            .catch(console.log)

    let embed = fn.embed().setTitle("Servers");
    data.rows.forEach(row => {
        embed.addField("ID", `\`\`\` ${row.id} \`\`\``)
        embed.addField("Name", `\`\`\` ${row.doc.name} \`\`\``)
        msg.channel.send(embed)
    })
};

exports.info = {
    name: 'allserver',
    usage: 'allserver',
    description: 'Show all the server that BGCTMC WARRIORS bot joins',
    group: 'info',
    ownerOnly: true,
};