module.exports= {
    name:"info",
    description:"Gives info about bot",
    async execute(message, args, version) {
        if (args[1] === "version") {
            await message.channel.send(`Verzija: ${version}`);
        } else {
            await message.channel.send("Nevalidni argumenti!");
        }
        
    }
}