exports.run = async(bot, msg, args, fn) => {
    let data = await bot.managers
            .get("server")
            .getServers()
            .catch(console.log)

    let embed = fn.embed().setTitle("Servers")
    data.rows.forEach(row => {
        
    })
    msg.channel.send(JSON.stringify(data.rows))
};

exports.info = {
    name: 'allserver',
    usage: 'example <some> [args]',
    description: 'Does some example things',
    group: 'info'
};