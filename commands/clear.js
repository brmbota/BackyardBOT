module.exports= {
    name:"clear",
    description:"Clear messages from channel",
    async execute(message,args){
        if (!args[1]) {
            return message.reply(`Lol ne znas da koristis komandu \n'Error: unesi broj koliko poruka da obrisem!`);
        }
        else if (args[1] > 100) {
            return message.reply("Discord mi ne daje da obrisem vise od 100 poruka odjednom :/");
        } else {
            message.channel.bulkDelete(args[1]);
        }
    }
}