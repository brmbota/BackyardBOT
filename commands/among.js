module.exports = {
    name: "among",
    description: "Makes among us event",
    async execute(message, args, Discord, bot) {
        ////////////////////////////////////////////////
        const channel = "777621751781523486";  //id od gaming-general channela 
        /////////////////////////////////////////////////
        const reactEmoji = "👍";
        let reminder = "";
        if (!args[1]) {
            return message.reply(`Moras da mi napises u koliko pocinje event!\n=>-among [vreme] [koliko minuta pre reminder]`);
        }
        if (!args[2]) {
            return message.reply(`Moras da mi napises koliko pre pocetka da podsetim ljude!\n=>-among [vreme] [koliko minuta pre reminder]`);
        }

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Ko je za Among u ${args[1]}?`)
            .setThumbnail(message.author.avatarURL())
            .setDescription(`
            <@&781991542067822593>\n
            Organizuje se Lobby u ${args[1]}\n
            Ko hoce da igra nek react sa:${reactEmoji}\n
            Kako bih te podsetio ${args[2]} minuta pre pocetka!
            `)
            .setImage("https://imgur.com/IasA5Kz.png");

        let messageEmbed = await bot.channels.cache.get("777621751781523486").send(embed);
        messageEmbed.react(reactEmoji);

        let arr=args[1].split(":");
        let trVremeH = new Date().getHours() * 60 * 60 * 1000;
        let trVremeM = new Date().getMinutes() * 60 * 1000;
        let novoVreme=(parseInt(arr[0])*60*60*1000+parseInt(arr[1])*60*1000-parseInt(args[2])*60*1000-trVremeH-trVremeM);
        console.log(novoVreme);
        console.log(new Date(novoVreme));

        function ispisi() {
            bot.channels.cache.get("777621751781523486").send(`Podsetnik za:\n${reminder}\n
            za ${args[2]} minuta pocinje da se igra!`);
        }

        setTimeout(ispisi, novoVreme);

        bot.on("messageReactionAdd", async (reaction, user) => {            //ko god reaguje na ovo ulazi u ovaj event
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;                                           //posto bot reaguje takodje, da se njemu nista ne modifikuje
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                reminder += `<@${user.id}> `;
            }
        });
    }
}