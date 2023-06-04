const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    id: String,
    toggle: {type:Boolean, default: false},
    channel: {type:String, default: "NaN"},
    embeds:{
        logo: {
            title: {type:String, default:"Icon du serveur modifié"},
            link: {type:String, default:"NaN"},
            avatarName: {type:String, default: "NaN"},
            avatarURL: {type:String, default:"NaN"},
            thumbnail: {type: String, default:"NaN"},
            description: {type:String, default:"NaN"},
            image: {type:String, default:"NaN"},
            footer: {type:String, default:`Par Logs Delivery - {logs.date}`}
        },
        name: {
            title: {type:String, default:"Nom du serveur modifié"},
            link: {type:String, default:"NaN"},
            color: {type:String, default:`5865F2`},
            avatarName: {type:String, default: "NaN"},
            avatarURL: {type:String, default:"NaN"},
            thumbnail: {type: String, default:"NaN"},
            description: {type:String, default:"NaN"},
            image: {type:String, default:"NaN"},
            footer: {type:String, default:`Par Logs Delivery - {logs.date}`}
        },
        description: {
            title: {type:String, default:"Description modifié"},
            link: {type:String, default:"NaN"},
            color: {type:String, default:`5865F2`},
            avatarName: {type:String, default: "NaN"},
            avatarURL: {type:String, default:"NaN"},
            thumbnail: {type: String, default:"NaN"},
            description: {type:String, default:"NaN"},
            image: {type:String, default:"NaN"},
            footer: {type:String, default:`Par Logs Delivery - {logs.date}`}
        }
    },
    bypass: {
        user: {type:String, default: "NaN"}
    }
});

module.exports = mongoose.model('GuildLogs', Schema);