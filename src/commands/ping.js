const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Afficher le ping du bot.",
    permissions: [PermissionsBitField.Flags.ViewChannel],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async executeSlash(client, interaction) {
        let embed = new EmbedBuilder()
        .setColor("5865F2")
        .setDescription(`Mon ping est de : **${client.ws.ping} ms**`);

        return interaction.reply({embeds:[embed]});
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}