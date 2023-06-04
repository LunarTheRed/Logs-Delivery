const Models = require('../data/guild.js');

module.exports = {
    name: "guildCreate",
    async execute(client, guild) {
        if(!guild) return;
         
        require('../info/security/newGuild.js')(guild);
    }
}