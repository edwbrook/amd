exports.run = (bot, msg, params = []) => {
  let embed = bot.embed();

  //Caso não existam argumentos;
  if(params.length == 0){
    embed.setTitle("Não posso insultar o nada...")
    embed.setDescription(`Tenta algo deste do tipo... **${this.help.usage}**`)

    msg.channel.send(embed);
    return;
  }

  let user = msg.guild.member(msg.mentions.users.first());

  //Caso nenhum usuário seja mencionado;
  if(user == undefined){
    embed.setDescription(`${params[0]} não é humano!`)

    msg.channel.send(embed);
    return;
  }

  embed.setDescription(`${user} não é humano!`)

  msg.channel.send(embed);
  return;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['human','offend'],
  permLevel: 0
};

exports.help = {
  name: "insult",
  description: "Ofende algo ou alguém de forma grosseira.",
  usage: "!insult <algo>/@alguém"
};
