const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
let lastMemberPlayed = "";
let messageChannel;
const queue_constructor = {}
const queue = new Map();
//queue(message.guild.id,queue_contructor object {voice channel, text channel,  connection, song[]});
//-music play [link]
//-music stop
//-music skip
module.exports = {
    name: "music",
    // aliases:["skip","stop"],
    description: "Backyard music bot",
    async execute(message, args, Discord, bot) {
        console.log("Ulazi u funkciju");
        console.log(args[1]);
        const basa = "294468077331152896";
        const voice_channel = message.member.voice.channel;
        lastMemberPlayed = buildMemberName(message.author.id);
        messageChannel = message.channel;
        // if (message.author.id == basa) return message.channel.send("Baso, zar stvarno mislis da bi ti dozvolili da pustas muziku lol");
        if (message.author.id == basa) {
            message.channel.send("Baso pazi sta radis");
        }
        if (!voice_channel) return message.channel.send("Moras biti u voice chatu da bi koristio ovu komandu!");

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("Nemas odgovarajuce dozvole da bi koristio ovu komandu!");
        if (!permissions.has("SPEAK")) return message.channel.send("Nemas odgovarajuce dozvole da bi koristio ovu komandu!");

        const server_queue = queue.get(message.guild.id);

        if (args[1] == "play") {
            if (!args[2]) return message.channel.send("Fali ti link pesme!");
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[2])) {
                const song_info = await ytdl.getInfo(args[2]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }

            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) => {
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }
                const video = await video_finder(args.join(' ').replace("music play", ""))
                    .catch(err => console.log("doslo je do greske: ", err));
                if (video) {
                    song = { title: video.title, url: video.url }
                } else {
                    message.channel.send('Error finding video.');
                }
            }
            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue) {

                queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }

                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);

                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('Imam problema pri konekciji!');
                    throw err;
                }
            } else {
                server_queue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** dodata u queue!`);
            }
        }
        else if (args[1] == 'skip') skip_song(message, server_queue);
        else if (args[1] == 'stop') stop_song(message, server_queue);

    }
}
const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        messageChannel.send(`${lastMemberPlayed} imas 30 sekundi da pustis sledecu pesmu ili izlazim sa vojsa :)`);
        setTimeout(() => {
            if (queue_constructor.songs.length === 0) {
                song_queue.voice_channel.leave();
                queue.delete(guild.id);
            }
        }, 30000);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
        .on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });
    try {
        await song_queue.text_channel.send(`🎶 Sada se pusta **${song.title}**`)
    }
    catch (err) {
        console.log('Imam neke probleme!');
        throw err;
    }

}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Moras biti u kanalu kako bi pokrenuo ovu komandu!');
    if (server_queue.songs.length == 1 || !server_queue || server_queue.songs.length == 0) {
        return message.channel.send(`Nema vise pesama u redu 😔`);
    }
    try {
        server_queue.connection.dispatcher.end();
    } catch (err) {
        console.log(err)
        message.channel.send("Desio se sledeci error: ", err)
    }
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Moras biti u kanalu kako bi pokrenuo ovu komandu!');
    server_queue.songs = [];
    try {
        server_queue.connection.dispatcher.end();
    } catch (err) {
        console.log(err)
    }
}
const buildMemberName = (name) => {
    return `<@${name}> `;
}