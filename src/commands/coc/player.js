const url = 'http://bgctmcwarriors.ml/api/raw?uri=players/' //2Y0L98GRV
const got = require('got');

exports.run = async(bot, msg, args, fn) => {
    msg.delete().catch(O_o => {});
    
    let tag = ''
    
    if (!args[0]){
        tag = '#8VQUCLJQ'//implement attached id here
    } else {
        tag = args[0]// grab clan tag
    }
    
    // check is it starts with #, then remove #
    if(tag[0] == '#')
        tag = tag.substring(1);
        
    const embed = fn.embed()
    console.log(tag)
    try {
        const response = await got(url+tag, { json: true });
        let data = JSON.parse(response.body);

        msg.channel.send(data)
    } catch (error) {
        throw error
    }
};

exports.info = {
    name: 'player',
    usage: 'player [tag]',
    description: 'Shows player informations',
    group: 'coc'
};