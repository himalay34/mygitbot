const api = 'http://bgctmcwarriors.ml/api/player?tag='//2Y0L98GRV
const got = require('got');
const axios = require('axios');

exports.run = async(bot, msg, args, fn) => {
  const embed = fn.embed()
      
  try {
    if (!args[0])
        throw "You have to provide player tag"
    
        //tag = '2g2qrj8qg'//'2Y0L98GRV'//'#8VQUCLJQ'//V9LYR8YY
    
    tag = args[0]// grab clan tag
    
    
    // check is it starts with #, then remove #
    if(tag[0].startsWith == '#')
        tag = tag.substring(1);
  
    let url = api + tag
    console.log(url)
        
      const response = await got(url, { json: true });
        console.log(typeof(response.body))
        let data = response.body
    
        if(data.reason == 'notFound') throw 'Player not found with tag: '+ tag
    
      console.log(data)
      await embed
        //.setTitle(`${data.name} ${data.tag}`)
        .setAuthor(data.name + ' '+ data.tag, data.league.iconUrls.tiny, url)
        .addField(`***Town Hall Level***`, `${data.townHallLevel}`, true)
        .addField(`***Builder Hall Level***`, `${data.builderHallLevel}`, true)
        .addField('***Exp Level***', data.expLevel, true)
        .addField(`***War Stars***`, `${data.warStars}`, true)
        
        .addField(`***League***`, `${data.league.name}`, true)
        .addField('***Trophies***', ':trophy: '+data.trophies, true)
        .addField('***Best Trophies***', ':trophy: '+data.bestTrophies, true)
        .addField(`***Attack Wins***`, `${data.attackWins}`, true)
        .addField(`***Defense Wins***`, `${data.defenseWins}`, true)
        .addField('***Donations***',  `:arrow_up: ${data.donations}`, true)
        .addField('***Donations Received***', `:arrow_down: ${data.donationsReceived}`, true)
        .addField('***D:R Ratio***', '≈ ' + Math.round(data.donations/data.donationsReceived), true)
        .addField('***Versus Info:***', `\`\`\`Versus Trophies: ${data.versusTrophies} \nBest Versus Trophies: ${data.bestVersusTrophies} \nVersus Battle Wins: ${data.versusBattleWins} \`\`\``)
        
        .setURL('http://bgctmcwarriors.ml/api/player?tag='+data.tag);
        if(data.heroes){
            let str = '';
            if(data.heroes[0]){
                str +=  `${fn.emoji(bot,'barbarianking')} ${data.heroes[0].name} (${data.heroes[0].level})  `
            }
            if(data.heroes[1]){
                str +=  `${fn.emoji(bot,'archerqueen')} ${data.heroes[1].name} (${data.heroes[1].level})  `
            }
            if(data.heroes[2]){
                str +=  `${fn.emoji(bot,'grandwarden')} ${data.heroes[2].name} (${data.heroes[2].level})  `
            }

            embed.addField('***Heroes***', str);
        }
        if(data.clan){
        embed.addField(`***Clan***`, `\`\`\`${data.clan.name} \nTag: ${data.clan.tag} \nClan Level: ${data.clan.clanLevel}\`\`\``)
        .addField(`***Role***`, `:shield: ${data.role}`, true);
        }
        
    if(data.legendStatistics){
          embed
          .addField(`***Legend League Statistics***`,`\`\`\`Best Season: ${data.legendStatistics.bestSeason.id} \nTrophies: ${data.legendStatistics.bestSeason.trophies} \nRank: ${data.legendStatistics.bestSeason.rank} \`\`\``);
        }
    
    embed.setTimestamp()
        .setFooter(`Requested By ${msg.author.username}`, data.league.iconUrls.small);
    
        await msg.channel.send(embed)
    
    } catch (error) {
        throw error;
        //=> 'Internal server error ...'
    }
};

exports.info = {
    name: 'player',
    usage: 'player <tag>',
    description: 'Show COC Player Profile',
    group: 'coc'
};
