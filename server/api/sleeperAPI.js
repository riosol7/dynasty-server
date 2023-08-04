const { cacheUtils } = require("../src/api/v1/utils")

const SLEEPER_BASE_URL = process.env.SLEEPER_BASE_URL
const yr2023 = process.env.yr2023;

const fetchRosterData = async () => {
    try {
        const rosterResponse = await cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}/league/${yr2023}/rosters`, 'rosterData');
        return rosterResponse;
    } catch (err) {
        throw new Error('Error fetching roster data: ' + err.message);
    }
};
  
const fetchUserData = async () => {
    try {
        const userResponse = await cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}/league/${yr2023}/users`, 'userData');
        return userResponse;
    } catch (err) {
        throw new Error('Error fetching user data: ' + err.message);
    }
};
  
const fetchPlayerData = async () => {
    try {
        const playerResponse = await cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}/players/nfl`, 'playerData');
        return playerResponse;
    } catch (err) {
        throw new Error('Error fetching player data: ' + err.message);
    }
};

const fetchCurrentLeagueData = async () => {
    const currentLeague = await cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}/league/${yr2023}`, 'currentLeagueData');
    const { draft_id } = currentLeague;
  
    const [draft, draftPicks, winnerBracket, loserBracket] = await Promise.all([
        cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}/draft/${draft_id}`, draft_id),
        cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}/draft/${draft_id}/picks`, `${draft_id}-picks`),
        cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}/league/${yr2023}/winners_bracket`, `${yr2023}-winners_bracket`),
        cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}/league/${yr2023}/losers_bracket`, `${yr2023}-losers_bracket`),
    ]);
  
    return {
        currentLeague,
        draft: { ...draft, picks: draftPicks },
        brackets: {
            winner: winnerBracket,
            loser: loserBracket,
        },
    };
};

const fetchMatches = async () => {
    return await Promise.all(
        Array.from({ length: 17 }, (_, i) =>
            cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}/league/${yr2023}/matchups/${i + 1}`, `${yr2023}-wk-${i}`)
        )
    );
}

const fetchUsers = async () => {
    return cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}/league/${yr2023}/users`, 'users');
}

const fetchTransactions = async (round) => {
    return cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}/league/${yr2023}/transactions/${round}`, `${yr2023}-${round}`);

}

module.exports = {
    fetchRosterData,
    fetchUserData,
    fetchPlayerData,
    fetchCurrentLeagueData,
    fetchMatches,
    fetchUsers,
    fetchTransactions,
}