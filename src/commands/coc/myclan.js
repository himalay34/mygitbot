let axios = require('axios')
let url = "http://bgctmcwarriors.ml/api/myclan"

exports.run = (client, message, args, tools) => {
    // delete user message cz we bot will supply the message
    message.delete().catch(O_o => {});
    
    let embed = tools.embed()    
    
    axios.get(url)
        .then(res => {
            let row = res.data
            embed.setColor('#0099ff')
            //.setTitle(row.name + ' - ' + row.tag)
            .setURL(url)
            .setAuthor(row.name +' - '+row.tag, row.badgeUrls.small, url+encodeURIComponent(row.tag))
            .setDescription(row.description)
            .setThumbnail(row.badgeUrls.medium)
            //.addField('Description', row.description)
            .addField('Clan Level', row.clanLevel, true)
            .addField('Location', row.location.name, true)
            .addField('War Wins', row.warWins, true)
            .addField('Members', row.members+'/50', true) 
            .addField('Required Trophies', row.requiredTrophies, true)
            .addField('Points', row.clanPoints, true)
            .addField('Clan Versus Points', row.clanVersusPoints, true)
            .addField('War Frequency', row.warFrequency, true)
            //.setImage(row.badgeUrls.medium)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, fn.avatarURL(message));
            
            // send
            message.channel.send(`Open in Clash of Clans https://link.clashofclans.com/?action=OpenClanProfile&tag=${encodeURIComponent(row.tag)}`)
            message.channel.send(embed);
        })
        .catch(err => {
            embed.setTitle("Oops! Something went wrong")
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, fn.avatarURL(message));
            
            // send
            message.channel.send(embed);
        }) //axios end
    
};

exports.info = {
    name: 'myclan',
    usage: 'myclan',
    description: 'Shows clan informations of BGCTMC WARRIORS',
    group: 'coc'
};