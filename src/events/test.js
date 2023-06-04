const Models = require('../data/messagelogs.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "messageUpdate",
    async execute(client, oldMessage, newMessage) {

        if(newMessage.author.bot) return;
        if(newMessage.channel.type === "1" || newMessage.channel.type === "3") return;
        
        const type = "modified";
        const guild = newMessage.guild;
        const channel = newMessage.channel;
        const message = oldMessage;
        const user = newMessage.author;
        const userBy = "NaN";
        //const newMessage = newMessage;

        const Model = await Models.findOne({id: guild.id});
        if(!Model) return;

        const channelSend = await client.channels.fetch("1101217335714513038");
        let embed = new EmbedBuilder();

        if (Model.embeds.modified.title !== "NaN") {
            let content = Model.embeds.modified.title;
            const title = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            embed.setTitle(title);
        };
        if (Model.embeds.modified.link !== "NaN") {
            let content = Model.embeds.modified.link;
            const url = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            if (url.startsWith("https://")) embed.setURL(url);
        };
        if (Model.embeds.modified.authorName !== "NaN" && Model.embeds.modified.authorAvatar !== "NaN") {
            let content = Model.embeds.modified.authorName;
            const authorName = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            content = Model.embeds.modified.authorAvatar;
            const authorAvatar = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            if (authorAvatar.startsWith("https://")) embed.setAuthor({name:`${authorName}`, iconURL: authorAvatar});
        };
        if (Model.embeds.modified.color) {
            embed.setColor("5865F2");
        };
        if (Model.embeds.modified.thumbnail !== "NaN") {
            let content = Model.embeds.modified.thumbnail;
            const thumbnail = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            if (thumbnail.startsWith("https://")) embed.setThumbnail(thumbnail);
        };
        if (Model.embeds.modified.description !== "NaN") {
            let content = Model.embeds.modified.description;
            const description = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            embed.setDescription(description);
        };
        if (Model.embeds.modified.image) {
            const Bob = "bob";
        };
        if (Model.embeds.modified.footer !== "NaN") {
            let content = Model.embeds.modified.footer;
            const footer = await client.functions.replaceMessage(client, type, content, message, user, userBy, channel, guild, newMessage);
            embed.setFooter({text:`${footer}`, iconURL:client.user.displayAvatarURL()});
        };
        
        await channelSend.send({
            embeds: [embed]
        });
        return;
    }
}