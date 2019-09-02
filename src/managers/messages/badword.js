const Manager = require('../manager');
class BadwordManager extends Manager {
    getName() { return 'badword'; }

    init() {
        const bot = this.bot;

        bot.on('message', msg => this.checkMessage(msg));

        bot.on('messageUpdate', (oldMsg, newMsg) => {
            if (oldMsg.content === newMsg.content) return;
            this.checkMessage(newMsg);
        });
    }

    async checkMessage(msg) {
        let content = msg.content
        // badword filter
        var swearWords = await require(__dirname+'/words.json')
        if( swearWords.some(word => msg.content.includes(word)) ) {
            await msg.delete();
            await msg.channel.send(":angry: Offensive words are not allowed here...").then(m => m.delete(2000));
            await msg.author.send('**The following message was deleted because it contains offensive words: **').then(() => {
                msg.author.send(content);
                return;
            });
        }
    }
}

module.exports = BadwordManager;