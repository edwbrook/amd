exports.run = (bot, msg, params = []) => {
  msg.channel.send(`//...ainda por fazer...`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['details'],
  permLevel: 0
};

exports.help = {
  name: "info",
  description: "Devolve informação sobre o bot.",
  usage: "!info"
};
