const Discord = require("discord.js");
const Canvas = require("canvas");
const { resolve } = require("path");
const imageUrlRegex = /\?size=2048$/g;

const bImg = "https://i.imgur.com/lhayre7.jpg";

const applyText = (canvas, text, defaultFontSize) => {
  const ctx = canvas.getContext("2d");
  do {
    ctx.font = `${(defaultFontSize -= 10)}px Bold`;
  } while (ctx.measureText(text).width > 600);
  return ctx.font;
};

// Register assets fonts
//Canvas.registerFont(resolve("../fSrc/assets/fonts/theboldfont.ttf"), { family: "Bold" });
//Canvas.registerFont(resolve("../fSrc/assets/fonts/SketchMatch.ttf"), { family: "SketchMatch" });

exports.run = async(bot, msg, args, fn) => {

  msg.delete().catch(O_o => {});
  bot.emit("guildMemberAdd", msg.member);

  // let message = `Hellow ${msg.member.user}, welcome to ${msg.guild.name}, we have ${msg.guild.memberCount}`;         
                    
  //       let canvas = Canvas.createCanvas(1024, 450),
  //       ctx = canvas.getContext("2d"),
  //       text = msg.guild.name,
  //       number = msg.guild.memberCount,
  //       title = "welcome"
    
  //       // Background language
  //       let background = await Canvas.loadImage(resolve("../fSrc/assets/img/greetings_background.png"));
  //       // This uses the canvas dimensions to stretch the image onto the entire canvas
  //       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  //       // Draw username
  //       ctx.fillStyle = "#ffffff";
  //       ctx.font = applyText(canvas, msg.member.user.username, 48);
  //       ctx.fillText(msg.member.user.username, canvas.width - 660, canvas.height - 248);
  //       // Draw server name
  //       ctx.font = applyText(canvas, text, 53);
  //       ctx.fillText(text, canvas.width - 690, canvas.height - 65);
  //       // Draw discriminator
  //       ctx.font = "40px Bold";
  //       ctx.fillText(msg.member.user.discriminator, canvas.width - 623, canvas.height - 178);
  //       // Draw number
  //       ctx.font = "22px Bold";
  //       ctx.fillText(number, 40, canvas.height - 50);
  //       // Draw # for discriminator
  //       ctx.fillStyle = "#44d14a";
  //       ctx.font = "75px SketchMatch";
  //       ctx.fillText("#", canvas.width - 690, canvas.height - 165);
  //       // Draw Title with gradient
  //       ctx.font = "90px Bold";
  //       ctx.strokeStyle = "#1d2124";
  //       ctx.lineWidth = 15;
  //       ctx.strokeText(title, canvas.width - 620, canvas.height - 330);
  //       var gradient = ctx.createLinearGradient(canvas.width - 780, 0, canvas.width - 30, 0);
  //       gradient.addColorStop(0, "#e15500");
  //       gradient.addColorStop(1, "#e7b121");
  //       ctx.fillStyle = gradient;
  //       ctx.fillText(title, canvas.width - 620, canvas.height - 330);

  //       // Pick up the pen
  //       ctx.beginPath();
  //       //Define Stroke Line
  //       ctx.lineWidth = 10;
  //       //Define Stroke Style
  //       ctx.strokeStyle = "#03A9F4";
  //       // Start the arc to form a circle
  //       ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
  //       // Draw Stroke
  //       ctx.stroke();
  //       // Put the pen down
  //       ctx.closePath();
  //       // Clip off the region you drew on
  //       ctx.clip();
    
  //       let options = { format: "png", size: 512 },
  //       avatar = await Canvas.loadImage(msg.member.user.displayAvatarURL);
  //       // Move the image downwards vertically and constrain its height to 200, so it"s a square
  //       ctx.drawImage(avatar, 45, 90, 270, 270);

  //       let attachment = new Discord.Attachment(canvas.toBuffer(), "welcome-image.png");
  //       msg.channel.send(message, attachment);
                    








  
  // let canvas = Canvas.createCanvas(800, 450),
  //   ctx = canvas.getContext("2d");
  // // Background language
  // let background = await Canvas.loadImage(bImg);
  // // This uses the canvas dimensions to stretch the image onto the entire canvas
  // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  // // Draw username
  // ctx.fillStyle = "#ffffff";
  // ctx.font = applyText(canvas, msg.member.user.username, 48);
  // ctx.fillText(msg.guild.name, canvas.width - 350, canvas.height - 248);
  
  // // Draw server name
  // ctx.font = applyText(canvas, msg.guild.name, 53);
  // ctx.fillText(msg.member.user.username, canvas.width - 740, canvas.height - 40);
  
  // // Draw discriminator
  // ctx.font = "40px Bold";
  // ctx.fillText(msg.member.user.discriminator, canvas.width - 460, canvas.height - 40);
  
  // // Draw # for discriminator
  // ctx.fillStyle = "#44d14a";
  // ctx.font = "50px SketchMatch";
  // ctx.fillText("#", canvas.width - 500, canvas.height - 40);
  
  // // Draw Title with gradient
  // ctx.font = "70px Bold";
  // ctx.strokeStyle = "#1d2124";
  // ctx.lineWidth = 15;
  // ctx.strokeText("WELCOME TO", canvas.width - 620, canvas.height - 330);
  // var gradient = ctx.createLinearGradient(canvas.width - 780, 0, canvas.width - 30, 0);
  // gradient.addColorStop(0, "#e15500");
  // gradient.addColorStop(1, "#e7b121");
  // ctx.fillStyle = gradient;
  // ctx.fillText("WELCOME TO", canvas.width - 520, canvas.height - 330);
  
  // // Pick up the pen
  // ctx.beginPath();
  // //Define Stroke Line
  // ctx.lineWidth = 10;
  // //Define Stroke Style
  // ctx.strokeStyle = "#03A9F4";
  // // Start the arc to form a circle
  // ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
  // // Draw Stroke
  // ctx.stroke();
  // // Put the pen down
  // ctx.closePath();
  // // Clip off the region you drew on
  // ctx.clip();
  
  // let avatar = await Canvas.loadImage(msg.member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
  // // Move the image downwards vertically and constrain its height to 200, so it"s a square
  // ctx.drawImage(avatar, 45, 90, 270, 270);
  
  // const attachment = new Discord.Attachment(
  //   canvas.toBuffer(),
  //   "welcome.png"
  // );
  
  // msg.channel.send(msg.author.username, attachment)
};

exports.info = {
  name: "test",
  usage: "test",
  description: "Does some testing things",
  group: "test"
};
