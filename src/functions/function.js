const { EmbedBuilder } = require('discord.js');

module.exports = {
    exempleMessageModified: async function(client, ModelMessage, interaction, cld) {
        if(ModelMessage) {
            let embedExemple = new EmbedBuilder();

            if(ModelMessage.embeds.modified.title !== "NaN") {
                embedExemple.setTitle(`${ModelMessage.embeds.modified.title}`);
            }
            if(ModelMessage.embeds.modified.link !== "NaN" && ModelMessage.embeds.modified.link.startsWith("https://")) {
                embedExemple.setURL(`${ModelMessage.embeds.modified.link}`);
            } else if(ModelMessage.embeds.modified.link === "{logs.message.url}") {
                embedExemple.setURL(`${cld.message.url}`);
            }
            if(ModelMessage.embeds.modified.color !== "NaN") {
                embedExemple.setColor(`#${ModelMessage.embeds.modified.color}`);
            } else {
                embedExemple.setColor(`5865F2`);
            }
            if(ModelMessage.embeds.modified.authorName !== "NaN" && ModelMessage.embeds.modified.authorAvatar !== "NaN" && ModelMessage.embeds.modified.authorAvatar.startsWith("https://")) {
                embedExemple.setAuthor({name: `${ModelMessage.embeds.modified.authorName}`, iconURL: `${ModelMessage.embeds.modified.authorAvatar}`});
            } else if (ModelMessage.embeds.modified.authorName !== "NaN" && ModelMessage.embeds.modified.authorAvatar === "{user.avatar}") {
                embedExemple.setAuthor({name: `${ModelMessage.embeds.modified.authorName}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})});
            } else if (ModelMessage.embeds.modified.authorName !== "NaN" && ModelMessage.embeds.modified.authorAvatar !== "NaN") {
                embedExemple.setAuthor({name:`${ModelMessage.embeds.modified.authorName}`, iconURL: client.user.displayAvatarURL()});
            }
            if(ModelMessage.embeds.modified.thumbnail !== "NaN" && ModelMessage.embeds.modified.thumbnail.startsWith("https://")) {
                embedExemple.setThumbnail(`${ModelMessage.embeds.modified.thumbnail}`);
            } else if(ModelMessage.embeds.modified.thumbnail === "{user.avatar}") {
                embedExemple.setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true})}`);
            } else if(ModelMessage.embeds.modified.thumbnail === "{guild.icon}") {
                embedExemple.setThumbnail(`${interaction.guild.iconURL({dynamic: true})}`);
            }
            if(ModelMessage.embeds.modified.description !== "NaN") {
                embedExemple.setDescription(`${ModelMessage.embeds.modified.description}`);
            }
            if(ModelMessage.embeds.modified.footer !== "NaN") {
                embedExemple.setFooter({text:`${ModelMessage.embeds.modified.footer}`, iconURL: client.user.displayAvatarURL()});
            } else {
                embedExemple.setFooter({text:`By ${client.user.username}`, iconURL: client.user.displayAvatarURL()});
            }

            return embedExemple;            
        } else {
            let abc = "try";
            return abc;
        }
    },

    exempleMessageDelete: async function(client, ModelMessage, interaction, cld) {
        if(ModelMessage) {
            let embedExemple = new EmbedBuilder();

            if(ModelMessage.embeds.delete.title !== "NaN") {
                embedExemple.setTitle(`${ModelMessage.embeds.delete.title}`);
            }
            if(ModelMessage.embeds.delete.link !== "NaN" && ModelMessage.embeds.delete.link.startsWith("https://")) {
                embedExemple.setURL(`${ModelMessage.embeds.delete.link}`);
            } else if(ModelMessage.embeds.delete.link === "{logs.message.url}") {
                embedExemple.setURL(`${cld.message.url}`);
            }
            /*if(ModelMessage.embeds.delete.color !== "NaN") {
                embedExemple.setColor(`#${ModelMessage.embeds.delete.color}`);
            } else {
                embedExemple.setColor(`5865F2`);
            }*/
            /* COLOR */ embedExemple.setColor(`5865F2`);
            if(ModelMessage.embeds.delete.authorName !== "NaN" && ModelMessage.embeds.delete.authorAvatar !== "NaN" && ModelMessage.embeds.delete.authorAvatar.startsWith("https://")) {
                embedExemple.setAuthor({name: `${ModelMessage.embeds.delete.authorName}`, iconURL: `${ModelMessage.embeds.delete.authorAvatar}`});
            } else if (ModelMessage.embeds.delete.authorName !== "NaN" && ModelMessage.embeds.delete.authorAvatar === "{user.avatar}") {
                embedExemple.setAuthor({name: `${ModelMessage.embeds.delete.authorName}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})});
            } else if (ModelMessage.embeds.delete.authorName !== "NaN" && ModelMessage.embeds.delete.authorAvatar !== "NaN") {
                embedExemple.setAuthor({name:`${ModelMessage.embeds.delete.authorName}`, iconURL: client.user.displayAvatarURL()});
            }
            if(ModelMessage.embeds.delete.thumbnail !== "NaN" && ModelMessage.embeds.delete.thumbnail.startsWith("https://")) {
                embedExemple.setThumbnail(`${ModelMessage.embeds.delete.thumbnail}`);
            } else if(ModelMessage.embeds.delete.thumbnail === "{user.avatar}") {
                embedExemple.setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true})}`);
            } else if(ModelMessage.embeds.delete.thumbnail === "{guild.icon}") {
                embedExemple.setThumbnail(`${interaction.guild.iconURL({dynamic: true})}`);
            }
            if(ModelMessage.embeds.delete.description !== "NaN") {
                embedExemple.setDescription(`${ModelMessage.embeds.delete.description}`);
            }
            if(ModelMessage.embeds.delete.footer !== "NaN") {
                embedExemple.setFooter({text:`${ModelMessage.embeds.delete.footer}`, iconURL: client.user.displayAvatarURL()});
            } else {
                embedExemple.setFooter({text:`By ${client.user.username}`, iconURL: client.user.displayAvatarURL()});
            }

            return embedExemple;            
        } else {
            let abc = "try";
            return abc;
        }
    },

    replaceMessage: async function(client, type, content, message, user, userBy, channel, guild, newMessage) {
        if(type === "modified") {
            const date = new Date();
            const retour = content.replace(/{user.avatar}/g, user.displayAvatarURL({dynamic: true})).replace(/{user.tag}/g, user.tag).replace(/{user.username}/g, user.username).replace(/{user.id}/g, user.id).replace(/{user.mention}/g, `<@${user.id}>`).replace(/{logs.date.mini.year}/g, date.getUTCFullYear()).replace(/{logs.date.year}/g, date.getUTCFullYear()).replace(/{logs.date.month}/g, date.getUTCMonth()).replace(/{logs.date.day}/g, date.getUTCDay()).replace(/{logs.date.hours}/g, date.getUTCHours()).replace(/{logs.date.minutes}/g, date.getUTCMinutes()).replace(/{logs.date.seconds}/g, date.getUTCSeconds()).replace(/{logs.date}/g, `${date.getUTCMonth()}/${date.getUTCDate()}/${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`).replace(/{logs.message.url}/g, message.url).replace(/{logs.message.before}/g, message.content).replace(/{logs.message.after}/g, newMessage.content).replace(/{logs.message.channel.mention}/g, `<#${channel.id}>`).replace(/{logs.message.channel.id}/g, channel.id).replace(/{logs.message.channel.name}/g, channel.name);
            return retour;
        } else if(type === "delete") {
            if(user.id === guild.members.me.id) user = client.user;

            const date = new Date();
            let retour = content.replace(/{user.avatar}/g, user.displayAvatarURL({dynamic: true})).replace(/{user.tag}/g, user.tag).replace(/{user.username}/g, user.username).replace(/{user.id}/g, user.id).replace(/{user.mention}/g, `<@${user.id}>`).replace(/{logs.by.avatar}/g, userBy.displayAvatarURL({dynamic: true})).replace(/{logs.by.tag}/g, userBy.tag).replace(/{logs.by.username}/g, userBy.username).replace(/{logs.by.id}/g, userBy.id).replace(/{logs.by.mention}/g, `<@${userBy.id}>`).replace(/{logs.date.mini.year}/g, date.getUTCFullYear()).replace(/{logs.date.year}/g, date.getUTCFullYear()).replace(/{logs.date.month}/g, date.getUTCMonth()).replace(/{logs.date.day}/g, date.getUTCDay()).replace(/{logs.date.hours}/g, date.getUTCHours()).replace(/{logs.date.minutes}/g, date.getUTCMinutes()).replace(/{logs.date.seconds}/g, date.getUTCSeconds()).replace(/{logs.date}/g, `${date.getUTCMonth()}/${date.getUTCDate()}/${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`).replace(/{logs.message.channel.mention}/g, `<#${channel.id}>`).replace(/{logs.message.channel.id}/g, channel.id).replace(/{logs.message.channel.name}/g, channel.name);

            if (message.content === "" && message.embeds[0]) {
                retour = retour.replace(/{logs.message.before}/g, `[Embeds]`);
            } else if (message.content !== "" && message.embeds[0]) {
                retour = retour.replace(/{logs.message.before}/g, `${message.content} \n\n[Embeds]`)
            } else if (message.content === "" && message.stickers.first()) {
                retour = retour.replace(/{logs.message.before}/g, `[Stickers]`);
            } else if (message.content !== "" && message.stickers.first()) {
                retour = retour.replace(/{logs.message.before}/g, `${message.content} \n\n[Stickers]`);
            } else if (message.content === "" && message.attachments.first()) {
                retour = retour.replace(/{logs.message.before}/g, "[Attachments]");
            } else if (message.content !== "" && message.attachments.first()) {
                retour = retour.replace(/{logs.message.before}/g, `${message.content} \n\n[Attachments]`);
            } else {
                retour = retour.replace(/{logs.message.before}/g, message.content);
            }

            return retour;
        }
    }

    /*
    USER : .replace(/{user.avatar}/g, user.displayAvatarURL({dynamic: true})).replace(/{user.tag}/g, user.tag).replace(/{user.username}/g, user.username).replace(/{user.id}/g, user.id).replace(/{user.mention}/g, `<@${user.id}>`);
    BY : .replace(/{logs.by.avatar}/g, userBy.displayAvatarURL({dynamic: true})).replace(/{logs.by.tag}/g, userBy.tag).replace(/{logs.by.username}/g, userBy.username).replace(/{logs.by.id}/g, userBy.id).replace(/{logs.by.mention}/g, `<@${userBy.id}>`);
    DATE : .replace(/{logs.date.mini.year}/g, date.getUTCfullYear()).replace(/{logs.date.year}/g, date.getUTCFullYear()).replace(/{logs.date.month}/g, date.getUTCMonth()).replace(/{logs.date.day}/g, date.getUTCDay()).replace(/{logs.date.hours}/g, date.getUTCHours()).replace(/{logs.date.minutes}/g, date.getUTCMinutes()).replace(/{logs.date.seconds}/g, date.getUTCSeconds()).replace(/{logs.date}/g, `${date.getUTCMonth()}/${date.getUTCDate()}/${date.getUTCFullYear()} ${date.getUTCHours()}:${date.getUTCMinutes()}`);
    LOGS MESSAGE : .replace(/{logs.message.url}/g, message.url).replace(/{logs.message.before}/g, message.content).replace(/{logs.message.after}/g, newMessage.content);
    LOGS MESSAGE CHANNEL : .replace(/{logs.message.channel.mention}/g, `<#${channel.id}>`).replace(/{logs.message.channel.id}/g, channel.id).replace(/{logs.message.channel.name}/g, channel.name);
    */
}