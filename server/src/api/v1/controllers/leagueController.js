const { leagueService } = require("../services");

const getLegacyLeague = async (req, res) => {
    const id = req.params.id
    const league = await leagueService.queryLegacyLeague(id);
    return res.json(league)
};

module.exports = {
    getLegacyLeague,
}