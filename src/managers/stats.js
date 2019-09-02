const Manager = require('./manager');

class StatsFilter extends Manager {
    init(bot) {
        //this.bot.setInterval(this.setDefaults, 15000);
        //this.setDefaults()
    }

    async setDefaults() {
        console.log('\n\n------ begin:xyz  ------')
        console.log(this.bot.guilds)
        console.log('------ end:xyz  ------\n\n')
        // let servers = await bot.managers
        // .get("server")
        // .getServers()
        // .catch(er =>{ throw 'Something went wrong. try again '});

        //guilds
        this.bot.guilds.forEach(guild => {
            // get guild config
            let gConfig = this.bot.servers.get(guild.id)
            //stats data
            let totalMember = guild.memberCount
            let [bots, user] = guild.members.partition(u => u.user.bot);
            let [online, offline] = guild.presences.partition(m => m.status !== 'offline' );    

            //grab status formate
            let topic = global.config.statusFormat
                        .replace(/{members}/g, totalMember)
                        .replace(/{users}/g, user.size)
                        .replace(/{bots}/g, bots.size)
                        .replace(/{online}/g, online.size)
                        .replace(/{offline}/g, offline.size);
        
            // get main channel
            // first check main channel available or not in config
            let mainChannel = guild.channels.get(gConfig.mainChannelId)
            if(mainChannel){
                // Check first to not spam the crap out of audit-log
                if(mainChannel.topic !== topic) mainChannel.setTopic(topic);
            }
        })
    }
}

module.exports = StatsFilter;