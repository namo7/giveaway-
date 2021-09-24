const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, reactor, messageReaction) {
    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    try {
      if (giveaway.extraData) {
        await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
      }
      reactor.send({
        embeds: [
          new Discord.MessageEmbed()
            .setTimestamp()
            .setColor("#2F3136")
            .setTitle("Entery Approved! | You have a chance to win!!")
            .setDescription(
              `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been approved!`
            )
            .setFooter("Subscribe to ZeroSync on YT!")
            .setTimestamp()
        ]
      });
    } catch (error) {
      console.log(error)
      const guildx = client.guilds.cache.get(giveaway.extraData.server)
      messageReaction.users.remove(reactor.user);
      reactor.send({
        embeds: [new Discord.MessageEmbed()
          .setTimestamp()
          .setColor("#2F3136")
          .setTitle(":x: Entery Denied | Databse Entery Not Found & Returned!")
          .setDescription(
            `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied as you did not join **${guildx.name}**`
          )
          .setFooter("Subscribe to ZeroSync on YT!")
        ]
      });
    }
  }
}