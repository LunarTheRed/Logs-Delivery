const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        if (message.channel.isDMBased() || message.author.bot) return;
        
        if(message.content.startsWith("<@1100258968036720742>")) {
            let embed = new EmbedBuilder()
            .setColor("5865F2")
            .setDescription("Soon.");

            return message.reply({embeds:[embed]}).catch(() => {});
        }
    }
}