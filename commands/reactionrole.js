module.exports = {
    name:"reactionrole",
    description:"Reaction role komanda!",
    async execute(message,args,Discord,bot) {
        const channel = "868474980365664296";             //id od get-roles channela
        const blueRole= message.guild.roles.cache.find(role => role.name === "blue role");
        const redRole= message.guild.roles.cache.find(role => role.name === "red role");
        
        const blueEmoji=":cowboy:";
        const redEmoji=":yum:";

        let embed = new Discord.MessageEmbed()
        .setColor("#e42643")
        .setTitle("Izaberi role za igrice koje igras!")
        .setDescription(`Odabirom rola ce ti dozvoliti da otkljucas posebne channele bas za te igrice! \n\n'
            ${blueEmoji} za plavi tim\n
            ${redEmoji} za crveni tim`);
        
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(blueEmoji);
        messageEmbed.react(redEmoji);   
    }
}