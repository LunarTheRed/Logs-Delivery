const { EmbedBuilder } = require('discord.js');

module.exports = {
    getEmbedMenu: async function(client, ModelGuild, ModelMessage) {
        const embed = {
            title: `Configuration`,
            color: 0x5865F2,
            thumbnail: {url: client.user.displayAvatarURL()},
            description: `<:INFO:1100451049086668911> __**Légende:**__ \n> <:ON2:1100449058545471588> **ON** \n> <:OFF2:1100449050295275530> **OFF** \n${ModelGuild.toggle == true ? "<:ON2:1100449058545471588>" : "<:OFF2:1100449050295275530>"} **Activé** / **Désactivé** \n\n\n${!ModelMessage ? "<:OFF3:1100486722543960084>" : `${ModelMessage.toggle == true ? "<:ON3:1100486713647824978>" : "<:OFF3:1100486722543960084>"}`} **Message**<:a_:1100480298195619911><:a_:1100480298195619911><:a_:1100480298195619911> <:OFF3:1100486722543960084> **Guild** \n\n<:OFF3:1100486722543960084> **Join/Leave**<:a_:1100480298195619911> <:a_:1100480298195619911> <:OFF3:1100486722543960084> **User** \n\n<:OFF3:1100486722543960084> **Channel**<:a_:1100480298195619911><:a_:1100480298195619911> <:a_:1100480298195619911> <:OFF3:1100486722543960084> **Emoji** \n\n<:OFF3:1100486722543960084> **Webhook**<:a_:1100480298195619911><:a_:1100480298195619911><:a_:1100480298195619911><:OFF3:1100486722543960084> **Role**`,
            footer: {text:`By ${client.user.username}`, icon_url: client.user.displayAvatarURL()}
        }
        return embed;
    },

    getEmbedMessage: async function(client, ModelMessage) {
        const embed = {
            thumbnail: {url: client.user.displayAvatarURL()},
            color: 0x5865F2,
            description: `<:INFO:1100451049086668911> **__Légende:__** \n> <:ON2:1100449058545471588> **ON** \n> <:OFF2:1100449050295275530> **OFF** \n${!ModelMessage ? "<:OFF2:1100449050295275530>" : ModelMessage.toggle === true ? "<:ON2:1100449058545471588>" : "<:OFF2:1100449050295275530>"} **Activé** / **Désactivé** \n\n📨 **Channel** \n📚 **Embeds**`,
            footer: {text:`By ${client.user.username}`, icon_url: client.user.displayAvatarURL()},
            title: `Configuration des messages`
        };

        return embed;
    },

    getEmbedModification: async function(client) {
        const embed = {
            thumbnail: {url: client.user.displayAvatarURL()},
            color: 0x5865F2,
            fields: [
                {
                    name: `:one: Part 1`,
                    value: "```Title, Title Link, Author Name, Author Avatar, Color```"
                },
                {
                    name: `:two: Part 2`,
                    value: "```Thumbnail, Description, Footer```"
                }
            ],
            footer: {text:`By ${client.user.username}`, icon_url: client.user.displayAvatarURL()},
            title: `Configuration de l'embed`
        };

        return embed;
    },

    getEmbedEmbedMessage: async function(client, ModelMessage) {
        const embed = {
            thumbnail: {url:client.user.displayAvatarURL()},
            color: 0x5865F2,
            description: ":one: Modified Message \n:two: Delete Message",
            footer: {text:`By ${client.user.username}`, icon_url: client.user.displayAvatarURL()},
            title: `Configuration de l'embed des messages`
        };

        return embed;
    }
}