const { cacheUtils } = require("../src/api/v1/utils");

const SLEEPER_BASE_URL = process.env.SLEEPER_BASE_URL

const fetchRosterData = async (leagueID) => {
    try {
        const rosterResponse = await cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}league/${leagueID}/rosters`, `${leagueID}-rosterData`);
        return rosterResponse;
    } catch (err) {
        throw new Error('Error fetching roster data: ' + err.message);
    }
};
  
const fetchUserData = async (leagueID) => {
    try {
        const userResponse = await cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}league/${leagueID}/users`, `${leagueID}-userData`);
        return userResponse;
    } catch (err) {
        throw new Error('Error fetching user data: ' + err.message);
    }
};
  
const fetchPlayerData = async () => {
    try {
        const playerResponse = await cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}players/nfl`, 'playerData');
        return playerResponse;
    } catch (err) {
        throw new Error('Error fetching player data: ' + err.message);
    }
};

const fetchDraftData = async (draftID) => {
    try {
        const [draft, draftPicks] = await Promise.all([
            cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}draft/${draftID}`, draftID),
            cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}draft/${draftID}/picks`, `${draftID}-picks`),
    
        ]);
        
        return {...draft, picks: draftPicks};

    } catch (err) {
        throw new Error('Error fetching draft data: ' + err.message);
    }
};

const fetchBracketData = async (leagueID) => {
    try {
        const [winnerBracket, loserBracket] = await Promise.all([
            cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}league/${leagueID}/winners_bracket`, `${leagueID}-playoffs`),
            cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}league/${leagueID}/losers_bracket`, `${leagueID}-toilet`),
        ]);
        
        return {playoffs: winnerBracket, toiletBowl: loserBracket};

    } catch (err) {
        throw new Error('Error fetching bracket data: ' + err.message);
    };
};

const fetchLeagueData = async (leagueID) => {
    try {
        const leagueResponse = await cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}league/${leagueID}`, leagueID);
        return leagueResponse;
    
    } catch (err) {
        throw new Error('Error fetching league data: ' + err.message);
    };
};

const fetchMatchData = async (leagueID, wk) => {
    try {
        const matchResponse = await cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}league/${leagueID}/matchups/${wk}`, `${leagueID}-wk-${wk}`)
        return matchResponse;
    } catch (err) {
        throw new Error('Error fetching match data: ' + err.message);
    }
};

const fetchTransactionData = async (leagueID, round) => {
    try {
        const transactionResponse = await cacheUtils.fetchWithCaching(`${SLEEPER_BASE_URL}league/${leagueID}/transactions/${round}`, `${leagueID}-transaction-${round}`);
        return transactionResponse; 
    } catch (err) {
        throw new Error('Error fetching transaction data: ' + err.message);
    };
};

module.exports = {
    fetchBracketData,
    fetchDraftData,
    fetchRosterData,
    fetchUserData,
    fetchPlayerData,
    fetchLeagueData,
    fetchMatchData,
    fetchUserData,
    fetchTransactionData,
}