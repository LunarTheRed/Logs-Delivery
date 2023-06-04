const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');

module.exports = {
    modalEmbed1: async function(title, url, authorName, authorURL, color) {

        const modal = {
            title: "Modification Embed Part 1",
            custom_id: "modalEmbed1",
            components:[
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            custom_id: "modalEmbedTitle",
                            style: 1,
                            label: "Title",
                            placeholder: `${title}`,
                            max_length: 256,
                            required: false
                        },
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            custom_id: "modalEmbedURL",
                            style: 1,
                            label: "Title Link",
                            placeholder: `${url}`,
                            max_length: 100,
                            required: false
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            custom_id: "modalEmbedColor",
                            style: 1,
                            label: "Color",
                            placeholder: `${color}`,
                            max_length: 10,
                            required: false
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            custom_id: "modalEmbedAuthorName",
                            style: 1,
                            label: "Author Name",
                            placeholder: `${authorName}`,
                            max_length: 256,
                            required: false
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            custom_id: "modalEmbedAuthorUrl",
                            style: 1,
                            label: "Author Avatar",
                            placeholder: `${authorURL}`,
                            max_length: 100,
                            required: false
                        }
                    ]
                }
            ]
        };

        return modal;

        //Footer = 1242
    },

    modalEmbed2: async function(thumbnail, description, footer) {

        const modal = {
            title: "Modification Embed Part 2",
            custom_id: "modalEmbed2",
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            style: 1,
                            placeholder: `${thumbnail}`,
                            max_width: 100,
                            label: "Thumbnail",
                            required: false,
                            custom_id: "modalEmbedThumbnail"
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            style: 2,
                            placeholder: `${description}`,
                            max_width: 4000,
                            label: "Description",
                            required: false,
                            custom_id: "modalEmbedDescription"
                        }
                    ]
                },
                {
                    type: 1,
                    components: [
                        {
                            type: 4,
                            style: 1,
                            placeholder: `${footer}`,
                            max_width: 256,
                            label: "Footer",
                            required: false,
                            custom_id: "modalEmbedFooter"
                        }
                    ]
                }
            ]
        };

        return modal;

    }
}