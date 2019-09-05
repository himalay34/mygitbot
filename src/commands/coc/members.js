const api = 'http://bgctmcwarriors.ml/api/members?tag='//2Y0L98GRV
const got = require('got');
const table = require('table')

exports.run = async(bot, msg, args, fn) => {
  
  if(!args[0]) throw 'That\'s not a valid clan tag! Try again.'
  
  try{
    let tag = args[0]// grab clan tag
    
    // check is it starts with #, then remove #
    if(tag[0].startsWith == '#')
        tag = tag.substring(1);
  
    let url = api + tag
    
    const response = await got(url, { json: true });
    
    let data = response.body
    
    if(data.reason == 'notFound') throw 'Sorry, Clan '+data.reason 
    
    let members = [['Name', 'Tag', 'Role']]
    let member = ' ';
        data.forEach(items => {
            members.push([ items.name, items.tag, items.role])

            member += '❯ '+ items.name + ' ' + items.tag + '\n\n';
        });

    // let embed = fn.embed()
    //   .setTitle("Members: ["+data.length+"]")
    //   .setDescription(member)
    //   .setTimestamp()
    //   .setFooter(`Requested By ${msg.author.username}`, fn.avatarURL(msg));
    
    // await msg.channel.send(embed)

    // let embd = fn.embed()
    // .setTitle("Total Servers: "+ data.length)
    // .setDescription(`\`\`\` ${table.table(members)} \`\`\``)
    // .setTimestamp()
    // .setFooter(`Requested by ${msg.author.username}`, fn.avatarURL(msg));

    msg.channel.send(`\`\`\` ${table.table(members)} \`\`\``)
  } catch(err){
    throw err
  }
};

exports.info = {
    name: 'members',
    usage: 'members <clanTag>',
    description: 'Get Clan members by Tag',
    group: 'coc',
    perms: ['READ_MESSAGES', 'SEND_MESSAGES']
};