exports.run = async (bot, message, args) => {
  // user avatar fallback
  let avatar = message.author.avatarURL || "https://i.imgur.com/OUIVnke.jpg";

  message.delete().catch(O_o => {});

  let limit = 100;

  if (
    !message.member.hasPermission([
      "MANAGE_CHANNELS",
      "MOVE_MEMBERS",
      "ADMINISTRATOR"
    ])
  ) {
    throw `:neutral_face: Sorry! ${message.member.user} are not allowed to delete message :neutral_face:.`;
  }

  // get mensioned user
  const user = message.mentions.users.first();

  // Parse Amount
  const amount = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);

  if (isNaN(amount)) {
    throw "Please provide a number of messages to delete!";
  }

  if (!amount || amount < 1) throw "You cannot delete less than 1 message!";

  if (amount > 100) throw "Amount must be within 1 to 100!";

  if (!amount && !user)
    throw "Must specify a user and amount, or just an amount, of messages to purge!";

  // if no user mensioned , then
  if (!user) limit = amount;

  // Fetch 100 messages (will be filtered and lowered up to max amount requested)
  await message.channel
    .fetchMessages({
      limit: limit
    })
    .then(messages => {
      if (user) {
        const filterBy = user ? user.id : bot.user.id;
        messages = messages
          .filter(m => m.author.id === filterBy)
          .array()
          .slice(0, amount);
      }
      message.channel
        .send(
          ":exclamation: Beginning to purge " +
            amount +
            " messages... :exclamation:"
        )
        .then(m => m.delete(5000));

      message.channel
        .bulkDelete(messages)
        .then(() => {
          message.channel
            .send(`:ok: Purging complete :ok:`)
            .then(m => m.delete(2500));
        })
        .catch(error => console.log(error.stack));
    })
    .then(() => {
      message.channel
        .send(`:white_check_mark: \`${amount}\` messages deleted.`)
        .then(m => m.delete(10000));
    })
    .catch(er =>
      message.channel
        .send("I couldn't purge those messages.")
        .then(m => m.delete(2000))
    );
};

exports.info = {
  name: "purge",
  usage: "purge [@user] <amount>",
  description:
    "Deletes message from channels. Either you have to provide @user#123 with amount, or only amount. amount must be within 1 to 100.",
  hidden: false,
  group: "moderation"
};
