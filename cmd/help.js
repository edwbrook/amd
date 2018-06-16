exports.run = (bot, msg, params) => {

  let embed = bot.embed();

  //Lista todos os comandos;
  if (params.length == 0) {
    embed.setTitle(`Lista de Comandos`);
    embed.setDescription(`Usa **!help <nome_comando>** para mais detalhes;`)
    embed.addBlankField(true);

    //Cria um field para cada comando existente;
    bot.commands.map(c => {
      embed.addField("`"+c.help.name+"`", "`"+c.help.description+"`")
    });

    msg.channel.send(embed);
    return;
  }

  command = bot.commands.get(params[0]);

  //Dá informação sobre o comando command;
  if(command != undefined) {
    embed.setTitle("`"+command.help.name+"`");
    embed.setDescription("`"+command.help.description+"`\n"+"\n**"+command.help.usage+"**");

    msg.channel.send(embed);
    return;
  }

  //O comando não existe;
  embed.setTitle("Infelizmente "+"`"+params[0]+"`"+" não é um comando.\n");
  embed.setDescription("Usa **!help** para veres os comandos disponíveis;");

  msg.channel.send(embed);
  return;

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name : "help",
  description: "Devolve informação sobre os comandos disponíveis.",
  usage: "!help <nome_comando>"
};
