const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    id: String,
    toggle: {type: Boolean, default: false},
    channel: {type: String, default: "NaN"},
    embeds: {
        modified: {
            title: {type:String, default:`Message modifié`},
            link: {type:String, default:"{logs.message.url}"},
            color: {type:String, default:`5865F2`},
            authorName: {type:String, default: "NaN"},
            authorAvatar: {type:String, default:"NaN"},
            thumbnail: {type: String, default:`{user.avatar}`},
            description: {type:String, default:"**Utilisateur visé** \n{user.mention} (`{user.id}`) \n\n**Salon** \n{logs.message.channel.mention} (`{logs.message.channel.id}`) \n\n**Ancien message** \n```{logs.message.before}``` \n**Nouveau message** \n```{logs.message.after}```"},            image: {type:String, default:"NaN"},
            footer: {type:String, default:`By Logs Delivery - {logs.date}`}
        },
        delete: {
            title: {type: String, default:`Message supprimé`},
            link: {type:String, default:"NaN"},
            color: {type:String, default:`5865F2`},
            authorName: {type: String, default: "{logs.by.tag}"},
            authorAvatar: {type:String, default: "{logs.by.avatar}"},
            thumbnail: {type: String, default:"{user.avatar}"},
            description: {type: String, default:"**Utilisateur visé** \n{user.mention} (`{user.id}`) \n**Supprimé par** \n{logs.by.mention} (`{logs.by.id}`) \n**Salon** \n{logs.message.channel.mention} (`{logs.message.channel.id}`) \n\n**Ancien message** \n```{logs.message.before}```"},
            footer: {type:String, default:"Par Logs Delivery - {logs.date}"},
        },
    },
    bypass: {
        user: {type: String, default: "NaN"},
        channel: {type: String, default: "NaN"}
    }
});

module.exports = mongoose.model('MessageLogs', Schema);