const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    user_id: String,
    settings: String,
    metadata: {
        mascot_item_type_id_leg_6: String,
        mascot_item_type_id_leg_10: String,
        mascot_item_type_id_leg_18: String,
        mascot_message_emotion_leg_11: String,
        mention_pn: String,
        show_mascots: String,
        mascot_item_type_id_leg_5: String,
        mascot_item_type_id_leg_13: String,
        team_name: String,
        allow_pn: String,
        mascot_item_type_id_leg_9: String,
        mascot_message_emotion_leg_14: String,
        mascot_item_type_id_leg_8: String,
        mascot_item_type_id_leg_7: String,
        mascot_item_type_id_leg_17: String,
        mascot_message_emotion_leg_7: String,
        mascot_item_type_id_leg_12: String,
        mascot_item_type_id_leg_15: String,
        mascot_message_emotion_leg_5: String,
        mascot_item_type_id_leg_4: String,
        mascot_message_emotion_leg_12: String,
        mascot_message_emotion_leg_2: String,
        mascot_message_emotion_leg_6: String,
        mascot_message_emotion_leg_1: String,
        mascot_item_type_id_leg_16: String,
        mascot_message_emotion_leg_8: String,
        mascot_item_type_id_leg_11: String,
        mascot_item_type_id_leg_1: String,
        mascot_item_type_id_leg_3: String,
        mascot_message_emotion_leg_15: String,
        avatar: String,
        mascot_item_type_id_leg_14: String,
        mascot_message_emotion_leg_4: String,
        mascot_item_type_id_leg_2: String,
        mascot_message_emotion_leg_9: String,
    },
    league_id: String,
    is_owner: Boolean,
    is_bot: Boolean,
    display_name: String,
    avatar: String,
    roster_id:Number,
    team_rating:[{
        _id:false,
        date:{type:Date, default: Date.now},
        value:Number
    }],
    qb_rating:[{
        _id:false,
        date:{type:Date, default: Date.now},
        value:Number
    }],
    rb_rating:[{
        _id:false,
        date:{type:Date, default: Date.now},
        value:Number
    }],
    wr_rating:[{
        _id:false,
        date:{type:Date, default: Date.now},
        value:Number
    }],
    te_rating:[{
        _id:false,
        date:{type:Date, default: Date.now},
        value:Number
    }],
})

module.exports = mongoose.model("Owner", ownerSchema);