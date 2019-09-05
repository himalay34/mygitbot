const arraySort = require('array-sort'),
    table = require('table')

exports.run = async(bot, msg, args, fn) => {
    let data = await bot.managers
            .get("server")
            .getServers()
            .catch(console.log)

    let servers = [['ID', 'Name', 'Auto Topic', 'Prefix']]
    data.rows.forEach(row => {
        //console.log(row)

        servers.push([row.id, row.doc.name, row.doc.allowSetTopic, row.doc.prefix])

    })

    let embed = fn.embed()
    .setTitle("Total Servers: "+ data.rows.length)
    .setDescription(`\`\`\` ${table.table(servers)} \`\`\``)
    .setTimestamp()
    .setFooter(`Requested by ${msg.author.username}`, fn.avatarURL(msg));

    msg.channel.send(embed)
};

exports.info = {
    name: 'allserver',
    usage: 'allserver',
    description: 'Show all the server that BGCTMC WARRIORS bot joins',
    group: 'info',
    ownerOnly: true,
};