const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const Models = require('../data/messagelogs.js');

module.exports = {
    name: "test",
    description: "Test.",
    permissions: [PermissionsBitField.Flags.ViewChannel],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async executeSlash(client, interaction) {
        const Model = await Models.findOne({id: interaction.guild.id});

        if(!Model) {
            let newModels = new Models({id:interaction.guild.id});
            await newModels.save();
            return interaction.reply("1");
        }
        return interaction.reply("2");
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}