const Discord = require("discord.js");  //ucitavanje discord.js biblioteka
const fs = require("fs");
const dotenv = require('dotenv');       //ucitavanje biblioteke za secure store
dotenv.config();                        //tokena i ostalih vrednosti in future

const bot = new Discord.Client({partials:["MESSAGE","CHANNEL","REACTION"]});
bot.login(process.env.TOKEN);

bot.once('ready', () => {                       //obavestenje u konzoli da se bot uspesno digao
    console.log('BackyardBot je online!');
});

bot.commands = new Discord.Collection();        //pravljenje kolekcija komandi

const commandFiles = fs.readdirSync('./commands').filter(file=>{file.endsWith(".js")}); //filtriranje samo .js fajlova
for (const file of commandFiles){
    const command = require(`./commands${file}`);

    bot.commands.set(command.name, command);   //property objekat.name=naziv komande
}


const PREFIX = process.env.prefix;             //kupljenje prefixa za komande
let version = process.env.version;             //kupljenje inforamcije trenutne verzije bota

bot.on("message", message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case `roles`:                                      //komanda !roles - izlistava trenutno dostupne rolove
            message.reply("Izlistavam u konzoli tokene svakog rola!");
            message.channel.send("Izlistavam u konzolite tokene svakog rola!");
            console.log(message.guild.roles);
            break;

        case `joke`:                                       //komanda !joke - govori glup vic
            message.channel.send("Sta radi Sasa Matic na brodu?");
            message.channel.send("-Ceka autobus :cowboy:");
            break;

        case `info`:
            if (args[1] === "version") {
                message.channel.send(`Verzija: ${version}`);
            } else {
                message.channel.send("Nevalidni argumenti!");
            }
            break;
        case `clear`:                                     //komanda !clear [arg-MAX=>100] - brise predhodnih [arg] poruka //primer:!clear 90 
            if (!args[1]) {
                return message.reply(`Lol ne znas da koristis komandu \n'Error: unesi broj koliko poruka da obrisem!`);
            }
            else if (args[1] > 100) {
                return message.reply("Discord mi ne daje da obrisem vise od 100 poruka odjednom :/");
            } else {
                message.channel.bulkDelete(args[1]);
            }
            break;
        case `reactionrole`:
                bot.commands.get("reactionrole").execute(message, args, Discord, bot);
            break;
    }

});