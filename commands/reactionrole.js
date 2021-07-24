module.exports = {
    name: "reactionrole",
    description: "Reaction role komanda!",
    async execute(message, args, Discord, bot) {
        const channel = "868474980365664296";             //id od get-roles channela
        const blueRole = message.guild.roles.cache.find(role => role.name === "blue role");
        const redRole = message.guild.roles.cache.find(role => role.name === "red role");

        const blueEmoji = "🤠";
        const redEmoji = "😋";

        let embed = new Discord.MessageEmbed()
            .setColor("#e42643")
            .setTitle("Izaberi role za igrice koje igras!")
            .setDescription(`Odabirom rola ce ti dozvoliti da otkljucas posebne channele bas za te igrice! \n\n'
            ${blueEmoji} za plavi tim\n
            ${redEmoji} za crveni tim`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(blueEmoji);
        messageEmbed.react(redEmoji);

        bot.on("messageReactionAdd", async (reaction, user) => {            //ko god reaguje na ovo ulazi u ovaj event
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;                                           //posto bot reaguje takodje, da se njemu nista ne modifikuje
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {                   //ako nije ovo postavljeno bot ce gledati po celom srw
                if (reaction.emoji.name === blueEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blueRole);
                }
                if (reaction.emoji.name === redEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(redRole);
                }
            } else {
                return;
            }
        });


        bot.on("messageReactionRemove", async (reaction, user) => {            //ko god reaguje na ovo ulazi u ovaj event
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;                                           //posto bot reaguje takodje, da se njemu nista ne modifikuje
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {                   //ako nije ovo postavljeno bot ce gledati po celom srw
                if (reaction.emoji.name === blueEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blueRole);
                }
                if (reaction.emoji.name === redEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(redRole);
                }
            } else {
                return;
            }
        });
    }
}