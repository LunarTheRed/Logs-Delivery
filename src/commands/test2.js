const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const ModelsGuild = require('../data/guild.js');

module.exports = {
    name: "testt",
    description: "Testt.",
    permissions: [PermissionsBitField.Flags.ViewChannel],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async executeSlash(client, interaction) {
        const Model = await ModelsGuild.findOne({id: interaction.guild.id});
        if(!Model) {
            let newModel = new ModelsGuild({id: interaction.guild.id});
            await newModel.save();
            return interaction.reply("Bog");
        }


        const button = {
            type: 1,
            components: [
                {
                    type: 2,
                    style: 4,
                    label: "Retour",
                    emoji: {id: "1100486722543960084"},
                    custom_id: "retour"
                }
            ]
        };

        const embed = {
            title: `Bob`,
            description: "Ceci est un test",
            timestamp: new Date(),
            color: 0x5865F2,
            footer: {text: "By Logs Delivery", icon_url: client.user.displayAvatarURL()},
            author: {name: `${interaction.user.tag}`, icon_url: `${interaction.user.displayAvatarURL({dynamic: true})}`},
            fields: [
                {
                    name: "1",
                    value: "Test"
                },
                {
                    name: "2",
                    value: "test"
                }
            ]
        };

        return interaction.reply({embeds:[embed], components:[button]});



        /*const array = Model.user.split(",").map((user) => (user));
        console.log(array);

        const test = array.includes("329403269153816576");
        console.log(test);
        return;*/
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}