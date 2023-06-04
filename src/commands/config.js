const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ComponentType } = require("discord.js");
const ModelsMessage = require('../data/messagelogs.js');
const ModelsGuild = require('../data/guild.js');

module.exports = {
    name: "config",
    description: "Afficher le ping du bot.",
    aliases: [],
    permissions: [PermissionsBitField.Flags.ViewChannel],
    guildOwnerOnly: false,
    botOwnerOnly: false,
    async executeSlash(client, interaction) {
        await interaction.deferReply()

        let ModelMessage = await ModelsMessage.findOne({id: interaction.guild.id});
        let ModelGuild = await ModelsGuild.findOne({id: interaction.guild.id});
        let ModelJoin = "NaN";
        let ModelUser = "NaN";
        let ModelWebhook = "NaN";
        let ModelChannel = "NaN";
        let ModelEmoji = "NaN";
        let ModelRole = "NaN";

        let embed = await client.functions.getEmbedMenu(client, ModelGuild, ModelMessage);
        let row = await client.functions.getMenu(ModelJoin, ModelUser, ModelChannel, ModelEmoji, ModelWebhook, ModelRole, ModelGuild, ModelMessage);
        const abc = await interaction.editReply({embeds:[embed], components:[row]}).catch(() => {});
        
        const filterSelect = i => interaction.user.id === i.user.id;
        const collectorMenu = abc.createMessageComponentCollector({
            componentType: 3,
            filter: filterSelect,
            time: 300000
        });
        const collectorMenuChannel = abc.createMessageComponentCollector({
            componentType: 8,
            filter: filterSelect,
            time: 300000
        });
        const collectorButton = abc.createMessageComponentCollector({
            componentType: 2,
            filter: filterSelect,
            time: 300000
        });

        collectorMenu.on(`collect`, async (cld) => {
            if (cld.user.id !== interaction.user.id) return;
            await cld.deferUpdate();

            if(cld.customId == "menuConfig") {
                if (cld.values[0] === "toggle") {
                    if (ModelGuild.toggle == true) {
                        await ModelGuild.updateOne({toggle: false});
                        ModelGuild.toggle = false;
                    } else {
                        await ModelGuild.updateOne({toggle: true});
                        ModelGuild.toggle = true;
                    }
    
                    embed = await client.functions.getEmbedMenu(client, ModelGuild, ModelMessage);
                    row = await client.functions.getMenu(ModelJoin, ModelUser, ModelChannel, ModelEmoji, ModelWebhook, ModelRole, ModelGuild, ModelMessage);
                    await cld.editReply({
                        embeds: [embed],
                        components:[row]
                    })
                    return;
                } else if (cld.values[0] === "message") {
                    row = await client.functions.buttonEmbed1(ModelMessage);
                    embed = await client.functions.getEmbedMessage(client, ModelMessage);
                    await cld.editReply({
                        embeds: [embed],
                        components:[row]
                    });
                    return;
                }
            };
        });

        collectorMenuChannel.on('collect', async (cld) => {
            if(cld.user.id !== interaction.user.id) return;
            await cld.deferUpdate();
            
            if (cld.customId == "menuChannelMessage") {

                const channelId = cld.values[0];

                row = await client.functions.buttonEmbed1(ModelMessage);
            }
        })

        collectorButton.on(`collect`, async (cld) => {
            if (cld.user.id !== interaction.user.id) return;

            if (cld.customId === "button_message_toggle") {
                await cld.deferUpdate();

                if(ModelMessage.toggle === true) {
                    await ModelMessage.updateOne({toggle: false});
                    ModelMessage.toggle = false;
                } else {
                    await ModelMessage.updateOne({toggle: true});
                    ModelMessage.toggle = true;
                }

                embed = await client.functions.getEmbedMessage(client, ModelMessage);
                row = await client.functions.buttonEmbed1(ModelMessage);

                await cld.editReply({
                    embeds: [embed],
                    components: [row]
                });
                return;
            } else if (cld.customId === "button_message_embed") {
                await cld.deferUpdate();

                embed = await client.functions.getEmbedEmbedMessage(client, ModelMessage);
                row = await client.functions.buttonEmbed2();
                
                await cld.editReply({
                    embeds: [embed],
                    components: [row]
                });
                return;
            } else if (cld.customId === "button_message_retour") {
                await cld.deferUpdate();

                embed = await client.functions.getEmbedMenu(client, ModelGuild, ModelMessage);
                row = await client.functions.getMenu(ModelJoin, ModelUser, ModelChannel, ModelEmoji, ModelWebhook, ModelRole, ModelGuild, ModelMessage);

                await cld.editReply({
                    embeds: [embed],
                    components: [row]
                });
                return;
            } else if (cld.customId == "button_message_modified") {
                await cld.deferUpdate();

                embed = await client.functions.getEmbedModification(client);
                row = await client.functions.buttonMessageEmbedModif();
                const embedExemple = await client.functions.exempleMessageModified(client, ModelMessage, interaction, cld);

                await cld.editReply({
                    embeds: [embed],
                    components: [row]
                });
                if(embedExemple !== "try") {
                    const bcd = await cld.followUp({embeds:[embedExemple]});
                    setTimeout(async () => {
                        await bcd.delete();
                    }, 30000);
                }
                return;
            } else if (cld.customId == "button_message_delete") {
                await cld.deferUpdate();

                embed = await client.functions.getEmbedModification(client);
                row = await client.functions.buttonMessageEmbedDel();
                const embedExemple = await client.functions.exempleMessageDelete(client, ModelMessage, interaction, cld);

                await cld.editReply({
                    embeds: [embed],
                    components: [row]
                });
                if(embedExemple !== "try") {
                    const bcd = await cld.followUp({embeds:[embedExemple]});
                    setTimeout(async () => {
                        await bcd.delete();
                    }, 30000);
                }
                return;
            } else if (cld.customId == "button_message_embed_modified_retour") {
                await cld.deferUpdate();

                embed = await client.functions.getEmbedMessage(client, ModelMessage);
                row = await client.functions.buttonEmbed1(ModelMessage);

                await cld.editReply({
                    embeds: [embed],
                    components: [row]
                });
                return;
            } else if (cld.customId == "button_message_embed_retour") {
                await cld.deferUpdate();

                embed = await client.functions.getEmbedEmbedMessage(client, ModelMessage);
                row = await client.functions.buttonEmbed2();

                await cld.editReply({
                    embeds: [embed],
                    components: [row]
                });
                return;
            } else if (cld.customId == "button_message_embed_modified_one") {
                const title = ModelMessage.embeds.modified.title == "NaN" ? "Desactivate" : ModelMessage.embeds.modified.title.length >= 100 ? ModelMessage.embeds.modified.title.slice(0, 97) + "..." : ModelMessage.embeds.modified.title;
                const url = ModelMessage.embeds.modified.link == "NaN" ? "Desactivate" : ModelMessage.embeds.modified.link.length >= 100 ? ModelMessage.embeds.modified.link.slice(0, 97) + "..." : ModelMessage.embeds.modified.link;
                const authorName = ModelMessage.embeds.modified.authorName == "NaN" ? "Desactivate" : ModelMessage.embeds.modified.authorName.length >= 100 ? ModelMessage.embeds.modified.authorName.slice(0, 97) + "..." : ModelMessage.embeds.modified.authorName;
                const authorURL = ModelMessage.embeds.modified.authorAvatar == "NaN" ? "Desactivate" : ModelMessage.embeds.modified.authorAvatar.length >= 100 ? ModelMessage.embeds.modified.authorAvatar.slice(0, 97) + "..." : ModelMessage.embeds.modified.authorAvatar;
                const color = ModelMessage.embeds.modified.color == "NaN" ? "#5865F2" : ModelMessage.embeds.modified.color.length >= 100 ? ModelMessage.embeds.modified.color.slice(0, 97) + "..." : ModelMessage.embeds.modified.color;

                row = await client.functions.modalEmbed1(title, url, authorName, authorURL, color);

                await cld.showModal(row);

                await cld.awaitModalSubmit({filterSelect, time:120_000}).then(async (ger) => {
                    if(ger.customId == "modalEmbed1") {
                        await ger.deferUpdate();
                        const title2 = ger.fields.getTextInputValue("modalEmbedTitle");
                        const titleURL2 = ger.fields.getTextInputValue("modalEmbedURL");
                        const color2 = ger.fields.getTextInputValue("modalEmbedColor");
                        const authorName2 = ger.fields.getTextInputValue("modalEmbedAuthorName");
                        const authorAvatar2 = ger.fields.getTextInputValue("modalEmbedAuthorUrl");

                        if (title2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.modified.title': `${title2}`
                                }
                            });
                            ModelMessage.embeds.modified.title = `${title2}`;
                        };
                        if (titleURL2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.modified.link': `${titleURL2}`
                                }
                            });
                            ModelMessage.embeds.modified.link = `${titleURL2}`;
                        };
                        if (color2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.modified.color': `${color2}`
                                }
                            });
                            ModelMessage.embeds.modified.color = `${color2}`;
                        };
                        if (authorName2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.modified.authorName': `${authorName2}`
                                }
                            });
                            ModelMessage.embeds.modified.authorName = `${authorName2}`;
                        };
                        if (authorAvatar2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.modified.authorAvatar': `${authorAvatar2}`
                                }
                            });
                            ModelMessage.embeds.modified.authorAvatar = `${authorAvatar2}`;
                        };

                        embed = await client.functions.exempleMessageModified(client, ModelMessage, interaction, cld);

                        const bcd = await cld.followUp({embeds:[embed]});
                        setTimeout(async () => {
                            await bcd.delete().catch(() => {});
                        }, 30000);
                        return;
                    }
                })

                setTimeout(() => {
                    return;
                }, 120000)
            } else if (cld.customId == "button_message_embed_modified_two") {
                const thumbnail = ModelMessage.embeds.modified.thumbnail == "NaN" ? "Desactivate" : ModelMessage.embeds.modified.thumbnail.length >= 100 ? ModelMessage.embeds.modified.thumbnail.slice(0, 97) + "..." : ModelMessage.embeds.modified.thumbnail;
                const description = ModelMessage.embeds.modified.description == "NaN" ? "Desactivate" : ModelMessage.embeds.modified.description.length >= 100 ? ModelMessage.embeds.modified.description.slice(0, 97) + "..." : ModelMessage.embeds.modified.description;
                const footer = ModelMessage.embeds.modified.footer == "NaN" ? "Desactivate" : ModelMessage.embeds.modified.footer.length >= 100 ? ModelMessage.embeds.modified.footer.slice(0, 97) + "..." : ModelMessage.embeds.modified.footer;

                row = await client.functions.modalEmbed2(thumbnail, description, image, footer);

                await cld.showModal(row);

                await cld.awaitModalSubmit({filterSelect, time:120_000}).then(async (ger) => {
                    if(ger.customId == "modalEmbed2") {
                        await ger.deferUpdate();
                        const thumbnail2 = ger.fields.getTextInputValue("modalEmbedThumbnail");
                        const description2 = ger.fields.getTextInputValue("modalEmbedDescription");
                        const footer2 = ger.fields.getTextInputValue("modalEmbedFooter");

                        if (thumbnail2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.modified.thumbnail': `${thumbnail2}`
                                }
                            });
                            ModelMessage.embeds.modified.thumbnail = `${thumbnail2}`;
                        };
                        if (description2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.modified.description': `${description2}`
                                }
                            });
                            ModelMessage.embeds.modified.description = `${description2}`;
                        };
                        if (footer2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.modified.footer': `${footer2}`
                                }
                            });
                            ModelMessage.embeds.modified.footer = `${footer2}`;
                        };

                        embed = await client.functions.exempleMessageModified(client, ModelMessage, interaction, cld);

                        const bcd = await cld.followUp({embeds:[embed]});
                        setTimeout(async () => {
                            await bcd.delete().catch(() => {});
                        }, 30000);
                        return;
                    }
                })
                setTimeout(() => {
                    return;
                }, 60000)
            } else if (cld.customId == "button_message_embed_delete_one") {
                const title = ModelMessage.embeds.delete.title == "NaN" ? "Desactivate" : ModelMessage.embeds.delete.title.length >= 100 ? ModelMessage.embeds.delete.title.slice(0, 97) + "..." : ModelMessage.embeds.delete.title;
                const url = ModelMessage.embeds.delete.link == "NaN" ? "Desactivate" : ModelMessage.embeds.delete.link.length >= 100 ? ModelMessage.embeds.delete.link.slice(0, 97) + "..." : ModelMessage.embeds.delete.link;
                const authorName = ModelMessage.embeds.delete.authorName == "NaN" ? "Desactivate" : ModelMessage.embeds.delete.authorName.length >= 100 ? ModelMessage.embeds.delete.authorName.slice(0, 97) + "..." : ModelMessage.embeds.delete.authorName;
                const authorURL = ModelMessage.embeds.delete.authorAvatar == "NaN" ? "Desactivate" : ModelMessage.embeds.delete.authorAvatar.length >= 100 ? ModelMessage.embeds.delete.authorAvatar.slice(0, 97) + "..." : ModelMessage.embeds.delete.authorAvatar;
                const color = ModelMessage.embeds.delete.color == "NaN" ? "#5865F2" : ModelMessage.embeds.delete.color.length >= 100 ? ModelMessage.embeds.delete.color.slice(0, 97) + "..." : ModelMessage.embeds.delete.color;

                row = await client.functions.modalEmbed1(title, url, authorName, authorURL, color);

                await cld.showModal(row);

                await cld.awaitModalSubmit({filterSelect, time:120_000}).then(async (ger) => {
                    if(ger.customId == "modalEmbed1") {
                        await ger.deferUpdate();
                        const title2 = ger.fields.getTextInputValue("modalEmbedTitle");
                        const titleURL2 = ger.fields.getTextInputValue("modalEmbedURL");
                        const color2 = ger.fields.getTextInputValue("modalEmbedColor");
                        const authorName2 = ger.fields.getTextInputValue("modalEmbedAuthorName");
                        const authorAvatar2 = ger.fields.getTextInputValue("modalEmbedAuthorUrl");

                        if (title2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.delete.title': `${title2}`
                                }
                            });
                            ModelMessage.embeds.delete.title = `${title2}`;
                        };
                        if (titleURL2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.delete.link': `${titleURL2}`
                                }
                            });
                            ModelMessage.embeds.delete.link = `${titleURL2}`;
                        };
                        if (color2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.delete.color': `${color2}`
                                }
                            });
                            ModelMessage.embeds.delete.color = `${color2}`;
                        };
                        if (authorName2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.delete.authorName': `${authorName2}`
                                }
                            });
                            ModelMessage.embeds.delete.authorName = `${authorName2}`;
                        };
                        if (authorAvatar2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.delete.authorAvatar': `${authorAvatar2}`
                                }
                            });
                            ModelMessage.embeds.delete.authorAvatar = `${authorAvatar2}`;
                        };

                        embed = await client.functions.exempleMessageDelete(client, ModelMessage, interaction, cld);

                        const bcd = await cld.followUp({embeds:[embed]});
                        setTimeout(async () => {
                            await bcd.delete().catch(() => {});
                        }, 30000);
                        return;
                    }
                })

                setTimeout(() => {
                    return;
                }, 120000)
            } else if (cld.customId == "button_message_embed_delete_two") {
                const thumbnail = ModelMessage.embeds.delete.thumbnail == "NaN" ? "Desactivate" : ModelMessage.embeds.delete.thumbnail.length >= 100 ? ModelMessage.embeds.delete.thumbnail.slice(0, 97) + "..." : ModelMessage.embeds.delete.thumbnail;
                const description = ModelMessage.embeds.delete.description == "NaN" ? "Desactivate" : ModelMessage.embeds.delete.description.length >= 100 ? ModelMessage.embeds.delete.description.slice(0, 97) + "..." : ModelMessage.embeds.delete.description;
                const footer = ModelMessage.embeds.delete.footer == "NaN" ? "Desactivate" : ModelMessage.embeds.delete.footer.length >= 100 ? ModelMessage.embeds.delete.footer.slice(0, 97) + "..." : ModelMessage.embeds.delete.footer;

                row = await client.functions.modalEmbed2(thumbnail, description, footer);

                await cld.showModal(row);

                await cld.awaitModalSubmit({filterSelect, time:120_000}).then(async (ger) => {
                    if(ger.customId == "modalEmbed2") {
                        await ger.deferUpdate();
                        const thumbnail2 = ger.fields.getTextInputValue("modalEmbedThumbnail");
                        const description2 = ger.fields.getTextInputValue("modalEmbedDescription");
                        const footer2 = ger.fields.getTextInputValue("modalEmbedFooter");

                        if (thumbnail2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.delete.thumbnail': `${thumbnail2}`
                                }
                            });
                            ModelMessage.embeds.delete.thumbnail = `${thumbnail2}`;
                        };
                        if (description2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.delete.description': `${description2}`
                                }
                            });
                            ModelMessage.embeds.delete.description = `${description2}`;
                        };
                        if (footer2) {
                            await ModelMessage.updateOne({
                                $set: {
                                    'embeds.delete.footer': `${footer2}`
                                }
                            });
                            ModelMessage.embeds.delete.footer = `${footer2}`;
                        };

                        embed = await client.functions.exempleMessageDelete(client, ModelMessage, interaction, cld);

                        const bcd = await cld.followUp({embeds:[embed]});
                        setTimeout(async () => {
                            await bcd.delete().catch(() => {});
                        }, 30000);
                        return;
                    }
                })
                setTimeout(() => {
                    return;
                }, 60000)
            } else if(cld.customId == "button_message_channel") {
                await cld.deferUpdate();

                const type = "message";
                row = await client.functions.getMenuChannelMessage(client, type, interaction);

                await cld.editReply({
                    components: [row]
                });
                return;
            }
        });
    },
    get data() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
    }
}