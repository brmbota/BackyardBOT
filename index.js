const Discord = require("discord.js");  //ucitavanje discord.js biblioteka
const fs = require("fs");
const dotenv = require('dotenv');       //ucitavanje biblioteke za secure store
const { name } = require("./commands/reactionrole");
dotenv.config();                        //tokena i ostalih vrednosti in future

const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
bot.login(process.env.TOKEN);

bot.once('ready', () => {                       //obavestenje u konzoli da se bot uspesno digao
    console.log('BackyardBot je online!');
});

bot.commands = new Discord.Collection();        //pravljenje kolekcija komandi

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith(".js")); //filtriranje samo .js fajlova
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);   //property objekat.name=naziv komande
}


const PREFIX = process.env.prefix;             //kupljenje prefixa za komande
let version = process.env.version;             //kupljenje inforamcije trenutne verzije bota

bot.on("message", message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case `joke`:                                       //komanda -joke - govori glup vic
            bot.commands.get("joke").execute();
            break;
        case `info`:                                       //komanda info
            bot.commands.get("info").execute(message, args, version);
            break;
        case `clear`:                                      //komanda -clear [arg-MAX=>100] - brise predhodnih [arg] poruka //primer:!clear 90 
            bot.commands.get("clear").execute(message,args)    
            break;
        case `reactionrole`:                               //komanda -reactionrole - pravi embed poruku i omogucava reaction role
            bot.commands.get("reactionrole").execute(message, args, Discord, bot);
            break;
    }

});