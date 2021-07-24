const Discord = require("discord.js");  //ucitavanje discord.js biblioteka

const dotenv = require('dotenv');       //ucitavanje biblioteke za secure store
dotenv.config();                        //tokena i ostalih vrednosti in future


const blueRole="868132893111779439";

const bot = new Discord.Client();


console.log(process.env.TOKEN);

bot.login(process.env.TOKEN);