module.exports = {
    buttonEmbed1: async function(ModelMessage) {

        let emoji;

        if (!ModelMessage || ModelMessage.toggle === false) {
            emoji = "1100449050295275530"
        } else {
            emoji = "1100449058545471588"
        }

        const button = {
            type: 1,
            components: [
                {
                    type: 2,
                    style: 2,
                    emoji: {id: emoji},
                    custom_id: "button_message_toggle",
                },
                {
                    type: 2,
                    style: 3,
                    emoji: {name:"📨"},
                    custom_id: "button_message_channel"
                },
                {
                    type: 2,
                    style: 1,
                    emoji: {name:"📚"},
                    custom_id: "button_message_embed",
                },
                {
                    type: 2,
                    style: 4,
                    emoji: {name:"⬅️"},
                    custom_id: "button_message_retour",
                }
            ]
        };

        return button;
    },
    buttonMessageEmbedModif: async function() {
        const button = {
            type: 1,
            components: [
                {
                    type: 2,
                    style: 1,
                    custom_id: "button_message_embed_modified_one",
                    emoji: {name: "1️⃣"}
                },
                {
                    type: 2,
                    style: 1,
                    custom_id: "button_message_embed_modified_two",
                    emoji: {name: "2️⃣"},
                },
                {
                    type: 2,
                    style: 4,
                    custom_id: "button_message_embed_retour",
                    emoji: {name: "⬅️"}
                }
            ]
        };

        return button;
    },

    buttonMessageEmbedDel: async function() {
        const button = {
            type: 1,
            components: [
                {
                    type: 2,
                    style: 1,
                    custom_id: "button_message_embed_delete_one",
                    emoji: {name: "1️⃣"}
                },
                {
                    type: 2,
                    style: 1,
                    custom_id: "button_message_embed_delete_two",
                    emoji: {name: "2️⃣"},
                },
                {
                    type: 2,
                    style: 4,
                    custom_id: "button_message_embed_retour",
                    emoji: {name: "⬅️"}
                }
            ]
        };

        return button;
    },

    buttonEmbed2: async function() {
        const button = {
            type: 1,
            components: [
                {
                    type: 2,
                    style: 1,
                    custom_id: "button_message_modified",
                    emoji: {name: "1️⃣"}
                },
                {
                    type: 2,
                    style: 1,
                    custom_id: "button_message_delete",
                    emoji: {name: "2️⃣"}
                },
                {
                    type: 2,
                    style: 4,
                    custom_id: "button_message_embed_modified_retour",
                    emoji: {name: "⬅️"}
                }
            ]
        };

        return button;
    }
}