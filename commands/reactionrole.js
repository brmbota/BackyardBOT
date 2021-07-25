module.exports = {
    name: "reactionrole",
    description: "Reaction role komanda!",
    async execute(message, args, Discord, bot) {
        ////////////////////////////////////////////////
        const channel = "868835687963705364";  //id od get-roles channela 
        /////////////////////////////////////////////////
        const backyardRole = message.guild.roles.cache.find(role => role.name === "Backyard");
        const graveRole = message.guild.roles.cache.find(role => role.name === "Graveyard");
        const mcRole = message.guild.roles.cache.find(role => role.name === "Minecraft gang");
        const amongRole = message.guild.roles.cache.find(role => role.name === "Among us gang");
      
        const backyardEmoji = "🌝";
        const graveEmoji = "🌚";
        const mcEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'steve');
        const amongEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'amonglove');

        let embed = new Discord.MessageEmbed()
            .setColor("#e42643")
            .setTitle("Izaberi role za igrice koje igras!")
            .setDescription(`Odabirom rola ce ljudi znati koji ti je stil igre! \n\n
            ${backyardEmoji} - Backyard : chill & casual\n
            ${graveEmoji} - Graveyard : evil & edgy\n\n
            Odabirom rola ce ti dozvoliti da otkljucas posebne channele bas za te igrice!\n\n
            ${mcEmoji} - Minecraft\n
            ${amongEmoji} - Among us
            `);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(backyardEmoji);
        messageEmbed.react(graveEmoji);
        messageEmbed.react(mcEmoji);
        messageEmbed.react(amongEmoji);

        bot.on("messageReactionAdd", async (reaction, user) => {            //ko god reaguje na ovo ulazi u ovaj event
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;                                           //posto bot reaguje takodje, da se njemu nista ne modifikuje
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {                   //ako nije ovo postavljeno bot ce gledati po celom srw
                console.log(reaction.emoji.name);
                if (reaction.emoji.name === backyardEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(backyardRole);
                }
                if (reaction.emoji.name === graveEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(graveRole);
                }
                if (reaction.emoji.id === mcEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(mcRole);
                }
                if (reaction.emoji.id === amongEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(amongRole);
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
                if (reaction.emoji.name === backyardEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(backyardRole);
                }
                if (reaction.emoji.name === graveEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(graveRole);
                }
                if (reaction.emoji.id === mcEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(mcRole);
                }
                if (reaction.emoji.id === amongEmoji.id) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(amongRole);
                }
            } else {
                return;
            }
        });
    }
}