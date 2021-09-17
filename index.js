const Discord = require("discord.js");  //ucitavanje discord.js biblioteka
const fs = require("fs");
const dotenv = require('dotenv');       //ucitavanje biblioteke za secure store
const { name } = require("./commands/reactionrole");
dotenv.config();                        //tokena i ostalih vrednosti in future

const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
bot.login(process.env.TOKEN);

bot.commands = new Discord.Collection();        //pravljenje kolekcija komandi

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith(".js")); //filtriranje samo .js fajlova
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);   //property objekat.name=naziv komande
}

bot.once('ready', () => {                       //obavestenje u konzoli da se bot uspesno digao
    console.log('BackyardBot je online!');
    bot.channels.cache.get("868835687963705364")
        .send("-reactionrole");                                           
});



const PREFIX = process.env.prefix;             //kupljenje prefixa za komande
let version = process.env.version;             //kupljenje inforamcije trenutne verzije bota

bot.on("message", message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case `joke`:                                       //komanda -joke - govori glup vic
            bot.commands.get("joke").execute(message, args);
            break;
        case `info`:                                       //komanda info
            bot.commands.get("info").execute(message, args, version);
            break;
        case `clear`:                                      //komanda -clear [arg-MAX=>100] - brise predhodnih [arg] poruka //primer:!clear 90 
            bot.commands.get("clear").execute(message, args)
            break;
        case `reactionrole`:                               //komanda -reactionrole - pravi embed poruku i omogucava reaction role
            bot.commands.get("reactionrole").execute(message, args, Discord, bot);
            break;
        case `among`:
            bot.commands.get("among").execute(message, args, Discord, bot);
            break;
        case `help`:
            bot.commands.get("help").execute(message, args)
            break;
        case `music`:
            bot.commands.get("music").execute(message, args, Discord, bot);
            break;
    }

});

bot.on("guildMemberAdd", guildMember => {
    let WelcomeRole= guildMember.guild.roles.cache.find(role => role.name === "ServerMember"); //will be used in future when the server is set
    guildMember.roles.add(WelcomeRole);

    guildMember.guild.channels.cache.get("775662408982593539")
        .send(`Dobrodosao <@${guildMember.user.id}> na Backyard server! Poseti #welcome kanal kako bi otkljucao druge kanale!`); //INSERT HERE CHANNEL ID FOR WELCOME MSG

});