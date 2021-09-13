module.exports = {
    name: "joke",
    description: "Tells a joke",
    async execute(message, args) {
        const http = require("http");
        let conn="";
        if (args[1] && !isNaN(args[1])) {
            conn=`http://bh003.bluefoxhost.com:4047/vic/${args[1]}`;
        }else{
            conn="http://bh003.bluefoxhost.com:4047/vic/random";
        }
    
        http.get(conn, (reply) => {
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