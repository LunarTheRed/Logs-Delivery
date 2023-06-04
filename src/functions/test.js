const {StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ButtonBuilder} = require("discord.js");

module.exports = {
    test: async function(test) {
        const returnArg = test + 1
        return returnArg;
    },

    /*getMenu: async function(ModelGuild, ModelMessage) {
        const menu = new StringSelectMenuBuilder()
        .setCustomId("menuConfig")
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel(`${ModelGuild == true ? "Désactivé" : "Activé"}`)
            .setDescription(`Permet ${ModelGuild == true ? "de désactiver" : "d'activer"} les logs`)
            .setValue("toggle"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Message")
            .setDescription(`${!ModelMessage ? "Désactivé" : `${ModelMessage.toggle == true ? "Activé" : "Désactivé"}`} - Logs des messages`)
            .setValue("message"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Guild")
            .setDescription(`Désactivé - Logs du serveur`)
            .setValue("guild"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Join/Leave")
            .setDescription("Désactivé - Logs des arrivées / départs")
            .setValue("join"),
            new StringSelectMenuOptionBuilder()
            .setLabel("User")
            .setDescription("Désactivé - Logs des utilisateurs")
            .setValue("user"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Channel")
            .setDescription("Désactivé - Logs des salons")
            .setValue("channel"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Emoji")
            .setDescription("Désactivé - Logs des emojis")
            .setValue("emoji"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Webhook")
            .setDescription("Désactivé - Logs des webhooks")
            .setValue("webhook"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Role")
            .setDescription("Désactivé - Logs des rôles")
            .setValue("role")
        );
        return menu;
    },*/

    getMenuEmbed: async function(client, ModelGuild, ModelMessage) {
        const embed = new EmbedBuilder()
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("5865F2")
        .setDescription(`<:INFO:1100451049086668911> __**Légende:**__ \n> <:ON2:1100449058545471588> **ON** \n> <:OFF2:1100449050295275530> **OFF** \n${ModelGuild.toggle == true ? "<:ON2:1100449058545471588>" : "<:OFF2:1100449050295275530>"} **Activé** / **Désactivé** \n\n\n${!ModelMessage ? "<:OFF3:1100486722543960084>" : `${ModelMessage.toggle == true ? "<:ON3:1100486713647824978>" : "<:OFF3:1100486722543960084>"}`} **Message**<:a_:1100480298195619911><:a_:1100480298195619911><:a_:1100480298195619911> <:OFF3:1100486722543960084> **Guild** \n\n<:OFF3:1100486722543960084> **Join/Leave**<:a_:1100480298195619911> <:a_:1100480298195619911> <:OFF3:1100486722543960084> **User** \n\n<:OFF3:1100486722543960084> **Channel**<:a_:1100480298195619911><:a_:1100480298195619911> <:a_:1100480298195619911> <:OFF3:1100486722543960084> **Emoji** \n\n<:OFF3:1100486722543960084> **Webhook**<:a_:1100480298195619911><:a_:1100480298195619911><:a_:1100480298195619911><:OFF3:1100486722543960084> **Role**`);

        return embed;
    }
}