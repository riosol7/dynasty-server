const mongoose = require("mongoose");

const kctPlayerSchema = new mongoose.Schema({
    rank: String,
    player: String,
    team: String,
    position: String,
    age: String,
    tier: String,
    trend: String,
    rating: String,
    player_id: String
})
module.exports = mongoose.model("KCT", kctPlayerSchema);