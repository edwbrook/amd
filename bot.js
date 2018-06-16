const Discord = require("discord.js");
const bot = new Discord.Client({ fetchAllMembers: true });

const config = require("./config.json");
const fs = require("fs");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

/*
  Carrega os comandos definidos na pasta cmd;
*/
fs.readdir("./cmd/", (err, files) => {
  if (err) console.error(err);

  files.forEach(f => {
    let props = require(`./cmd/${f}`);
    bot.commands.set(props.help.name, props);

    props.conf.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });

  });
});

/*
  Reage a uma mensagem a execução de um comando caso exista;
*/
bot.on("message", msg => {
  //Caso o autor seja um bot;
  if(msg.author.bot)
    return;

  //Caso não comece com o prefixo;
  if (!msg.content.startsWith(config.prefix))
    return;

  let command = msg.content.split(" ")[0].slice(config.prefix.length);
  let params = msg.content.split(" ").slice(1);
  let perms = bot.elevation(msg);

  let cmd = bot.commands.get(command);

  //Caso o comando não exista;
  if(cmd == undefined)
    cmd = bot.commands.get(bot.aliases.get(command));

  //Caso não haja aliases;
  if (cmd != undefined)
    //Caso o user não tenha permissões;
    if (perms >= cmd.conf.permLevel)
      cmd.run(bot, msg, params, perms);

  return
});

bot.on("error", console.error);
bot.on("warn", console.warn);

bot.login(config.token);


bot.elevation = function(msg) {
  let permlvl = 0;

  let mod_role = msg.guild.roles.find("name", "Mods");
  if(mod_role && msg.member.roles.has(mod_role.id)) permlvl = 2;

  let admin_role = msg.guild.roles.find("name", "Devs");
  if(admin_role && msg.member.roles.has(admin_role.id)) permlvl = 3;

  if(msg.author.id === config.ownerid) permlvl = 4;

  return permlvl;
};

bot.embed = function() {
  let embed = new Discord.RichEmbed();
  embed.setColor(0x00AE86);

  return embed;
};
