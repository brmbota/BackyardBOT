module.exports = {
    name: "joke",
    description: "Tells a joke",
    async execute(message,args) {
        await message.channel.send("Sta radi Sasa Matic na brodu?");
        await message.channel.send("-Ceka autobus :cowboy:");
    }
}