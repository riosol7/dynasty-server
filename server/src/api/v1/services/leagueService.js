const { leagueHelpers } = require("../helpers")

const queryLegacyLeague = async (id) => {
    try {
        return await leagueHelpers.fetchLegacyLeague(id);
    } catch (error) {
        console.error('Error in queryLegacyLeague:', error);
        throw error;
    }
};

module.exports = {
    queryLegacyLeague
}