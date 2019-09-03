exports.run = (bot, msg, args, fn) => {
    let alternatives = [
        'Heads',
        'Tails'
    ];

    // Variable name will probably be changed in the future.
    let randomAlternative = alternatives[Math.floor(Math.random() * alternatives.length)];

    message.delete().catch(O_o=>{}); 

    message.channel.send(fn.embed().setDescription(randomAlternative));
};

exports.info = {
    name: 'coinflip',
    usage: 'coinflip',
    description: 'Flip the coin',
    group: 'info'
};