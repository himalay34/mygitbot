const Discord = require("discord.js");

const Manager = new Discord.ShardingManager("./src/bot.js", {
    token: process.env.TOKEN,
    totalShards: 1  // Tell it how many shards we want (Approx. 1100 servers per shard)
});

Manager.on("launch", (shard) => {
    console.log(`Launching Shard ${shard.id} (${shard.id + 1}/${Manager.totalShards})`);
});

Manager.spawn().then(() => {
        console.log("Sharding | shard launched !");
    });

