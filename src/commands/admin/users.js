exports.run = async(bot, msg, args, fn) => {
  if (msg.deletable) msg.delete().catch(O_o=>{});
  
  // fetch user old to new
  let data = []
  let users = await msg.guild.members.sort((a, b) => a.joinedAt - b.joinedAt).forEach(u=> {
    //console.log(u.user.username)
    data.push({id: u.user.id, username: u.user.username, avatar: u.user.displayAvatarURL, joinedAt: fn.formatDate(u.joinedTimestamp), user: u.user})
    
  })
  
//   let embed = fn.embed().setTitle("Users: "+data.length)
//     .setTimestamp()
//     .setFooter(`Requested by ${msg.author.username}`, msg.member.user.displayAvatarURL);
    
//   data.forEach(u => {
//     embed.addField(`${u.user}`, `\`\`\`Joined @ ${u.joinedAt} \`\`\``)
    
//   })
  
//   msg.channel.send(embed)
  /////////////////////////
//   // strings mane holo: foo`text ${args}`
//     // ekhane strings holo text`
    function inlineList(strings, rows){
        
        // eg. foo`text ${ rows }`
        // strings is the first args cz strings return ['"text"','']
        var str = `**${strings[0]}**`
        rows.forEach(row => {
            str = `${str}\n**${row.user}** @ ${row.joinedAt}\n`
        })
        return `${str}`;
    }
  let embed = fn.embed()
    .setDescription(inlineList`__Users__:\n ${ data }`)
    .setTimestamp()
    .setFooter(`Requested by ${msg.author.username}`, fn.avatarURL(msg));
  
  msg.channel.send(embed)
};

exports.info = {
    name: 'users',
    usage: 'users [limit] [offset]',
    description: 'Show server user list. Limit,offset not yet implimented',
    hidden: true,
    group: 'admin'
};