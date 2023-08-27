const mongoose = require("mongoose");

const ktcPlayerSchema = new mongoose.Schema({
    rank: String,
    player: String,
    team: String,
    position: String,
    age: String,
    tier: String,
    trend: String,
    value: String,
    player_id: String,
    path: String,
})
module.exports = mongoose.model("KTC", ktcPlayerSchema);