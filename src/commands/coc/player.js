const url = 'http://bgctmcwarriors.ml/api/raw?uri=players/' //2Y0L98GRV
const axios = require('axios')

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
        await axios.get(url+tag)
            .then(res=>{
                let data = JSON.parse(res.data)
                console.info(typeof(res.data))
                console.info(res.data)
            })

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