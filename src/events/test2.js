const { EmbedBuilder } = require('discord.js');
const Models = require('../data/messagelogs.js');

module.exports = {
    name: "messageDelete",
    async execute(client, message) {
        //if(message.author.bot) return;
        if(message.channel.type === "1" || message.channel.type === "3") return;
        if(!message.guild.members.me.permissions.has("VIEW_LOGS")) return console.log(`${message.guild.id} | ${message.guild.name} - I don't have the permission for Audit Logs`);
        
        //const message = message;
        const type = "delete";
        const guild = message.guild;
        const channel = message.channel;
        const user = message.author;
        let userBy = "NaN";
        const newMessage = "NaN";

        const Model = await Models.findOne({id: guild.id});
        if(!Model) return;

        if(user === null) return;

        const channelSend = await client.channels.fetch("1101217335714513038");
        let embed = new EmbedBuilder();

        const auditLogs = await guild.fetchAuditLogs({
            type: 72,
            limit: 1
        });

        const AuditEntry = auditLogs.entries.first();

        userBy = AuditEntry.executor;

        //return console.log();
        //message.embeds[0] ? " " : "Embeds"
        //message.attachments.first() ? " " : "Attachments"
        //message.stickers.first() ? " " : "Stickers"

        if (Model.embeds.delete.title !== "NaN") {
            let content = Model.embeds.delete.title;
            const title = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            embed.setTitle(title);
        };
        if (Model.embeds.delete.link !== "NaN") {
            let content = Model.embeds.delete.link;
            const url = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            if (url.startsWith("https://")) embed.setURL(url);
        };
        if (Model.embeds.delete.authorName !== "NaN" && Model.embeds.delete.authorAvatar !== "NaN") {
            let content = Model.embeds.delete.authorName;
            const authorName = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            content = Model.embeds.delete.authorAvatar;
            const authorAvatar = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            if (authorAvatar.startsWith("https://")) embed.setAuthor({name:`${authorName}`, iconURL: authorAvatar});
        };
        if (Model.embeds.delete.color) {
            embed.setColor("5865F2");
        };
        if (Model.embeds.delete.thumbnail !== "NaN") {
            let content = Model.embeds.delete.thumbnail;
            const thumbnail = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            if (thumbnail.startsWith("https://")) embed.setThumbnail(thumbnail);
        };
        if (Model.embeds.delete.description !== "NaN") {
            let content = Model.embeds.delete.description;
            const description = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            embed.setDescription(description);
        };
        if (message.attachments.first()) {
            embed.setImage(`${message.attachments.first().url}`);
        };
        if (Model.embeds.delete.footer !== "NaN") {
            let content = Model.embeds.delete.footer;
            const footer = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            embed.setFooter({text:`${footer}`, iconURL:client.user.displayAvatarURL()});
        };
        
        await channelSend.send({
            embeds: [embed]
        });
        return;
    }
}