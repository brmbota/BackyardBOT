module.exports = {
    name: "joke",
    description: "Tells a joke",
    async execute() {
        await message.channel.send("Sta radi Sasa Matic na brodu?");
        await message.channel.send("-Ceka autobus :cowboy:");
    }
}