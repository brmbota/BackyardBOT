module.exports = {
    name: "joke",
    description: "Tells a joke",
    async execute(message, args) {
        const http = require("http");

        http.get("http://bh003.bluefoxhost.com:4047/vic/random", (reply) => {
            let data = "";

            reply.on('data', (chunk) => {
                data += chunk;
            });

            reply.on('end', () => {
                let dataJSON = JSON.parse(data);
                message.channel.send(dataJSON.question);
                message.channel.send(dataJSON.answer);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}