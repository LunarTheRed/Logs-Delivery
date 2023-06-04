const { Client, Collection, GatewayIntentBits, Partials, ActivityType } = require("discord.js");
const fs = require("fs");
const colors = require("colors");
const clc = require('cli-color');

const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ],
    partials: [ Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User ],
    restTimeOffset: 0,
    failIfNotExists: false,
    presence: {
        activities: [{
            name: `Soon.`,
            type: ActivityType.Watching
        }],
        status: "online"
    },
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false
    }
});
client.config = require("./config.json");
client.shadow = require("./shadow.json");

client.login(client.shadow.token);

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect(client.shadow.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log(clc.xterm(10).bold(`[MONGODB] Connexion à la base de données réussie.`)))

// chargement des events
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
// console.log(eventFiles)
for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// chargement des commandes
client.commands = new Collection();
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
// console.log(commandFiles)
for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.name, command);
}

client.functions = {}

    const folder = fs.readdirSync("./src/functions");
        folder.forEach(file => {
            if (!file.endsWith('.js')) return;
            for (const key in require(`./src/functions/${file}`)) {
                if (Object.hasOwnProperty.call(require(`./src/functions/${file}`), key)) {
                    const element = require(`./src/functions/${file}`)[key];
                    client.functions[key] = element;
                }
            }
        });

// gestion des erreurs
process.on("unhandledRejection", (error) => {
    if (error.code == 10062) return; // Unknown interaction
    console.log(`[ERROR] ${error}`.red);
})

require('./deploy.js')();

