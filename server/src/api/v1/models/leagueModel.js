const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
    seasons: mongoose.Schema.Types.Mixed,
    owners: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model("League", leagueSchema);