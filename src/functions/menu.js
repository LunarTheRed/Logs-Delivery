const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} = require('discord.js');

module.exports = {
    getMenu: async function(ModelJoin, ModelUser, ModelChannel, ModelEmoji, ModelWebhook, ModelRole, ModelGuild, ModelMessage) {
        const menu = new StringSelectMenuBuilder()
        .setCustomId("menuConfig")
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel(`${ModelGuild.toggle === true ? "Désactivé" : "Activé"}`)
            .setDescription(`Permet ${ModelGuild.toggle == true ? "de désactiver" : "d'activer"} les logs`)
            .setValue("toggle"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Message")
            .setDescription(`${!ModelMessage ? "Désactivé" : `${ModelMessage.toggle == true ? "Activé" : "Désactivé"}`} - Logs des messages`)
            .setValue("message"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Guild")
            .setDescription(`${!ModelGuild ? "Désactivé" : `${ModelGuild.toggle == true ? "Activé" : "Désactivé"}`} - Logs du serveur`)
            .setValue("guild"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Join/Leave")
            .setDescription(`${!ModelJoin ? "Désactivé" : `${ModelJoin.toggle == true ? "Activé" : "Désactivé"}`} - Logs des arrivées / départs`)
            .setValue("join"),
            new StringSelectMenuOptionBuilder()
            .setLabel("User")
            .setDescription(`${!ModelUser ? "Désactivé" : `${ModelUser.toggle == true ? "Activé" : "Désactivé"}`} - Logs des utilisateurs`)
            .setValue("user"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Channel")
            .setDescription(`${!ModelChannel ? "Désactivé" : `${ModelChannel.toggle == true ? "Activé" : "Désactivé"}`} - Logs des salons`)
            .setValue("channel"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Emoji")
            .setDescription(`${!ModelEmoji ? "Désactivé" : `${ModelEmoji.toggle == true ? "Activé" : "Désactivé"}`} - Logs des emojis`)
            .setValue("emoji"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Webhook")
            .setDescription(`${!ModelWebhook ? "Désactivé" : `${ModelWebhook.toggle == true ? "Activé" : "Désactivé"}`} - Logs des webhooks`)
            .setValue("webhook"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Role")
            .setDescription(`${!ModelRole ? "Désactivé" : `${ModelRole.toggle == true ? "Activé" : "Désactivé"}`} - Logs des rôles`)
            .setValue("role")
        );

        const row = new ActionRowBuilder()
        .addComponents(menu);

        return row;
    },

    getMenuChannelMessage: async function(client, interaction) {
        const menu = {
            type: 1,
            components: [
                {
                    type: 8,
                    custom_id: "menuChannelMessage",
                    channel_types: [0]
                }
            ]
        };
        return menu;
    }
}