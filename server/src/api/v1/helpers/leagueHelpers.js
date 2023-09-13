const { sleeperAPI } = require("../../../../api");

const fetchLegacyLeague = async (leagueID) => {
    let legacyData = [];

    while (leagueID !== null) {
        const currentLeague = await sleeperAPI.fetchLeagueData(leagueID);
        const { draft_id } = currentLeague;

        const [bracketData, draftData, matchData, rosterData, transactionData, userData] = await Promise.all([               
            sleeperAPI.fetchBracketData(leagueID),
            sleeperAPI.fetchDraftData(draft_id),
            fetchMatches(leagueID),
            fetchRosters(leagueID),
            fetchTransactions(leagueID),
            fetchUsers(leagueID),
        ]);

        const currentLegacyData = {
            ...currentLeague,
            brackets: bracketData,
            draft: draftData,
            matchups: matchData,
            rosters: rosterData,
            transactions: transactionData,
            users: userData,
        };

        // Add currentLegacyData to the legacy array
        legacyData.push(currentLegacyData);

        const { previous_league_id } = currentLeague;
        leagueID = previous_league_id; // Move to the previous league
    };

    return legacyData;
};

const fetchMatches = async (leagueID) => {
    try {
        return await Promise.all(
            Array.from({ length: 17 }, (_, i) =>
                sleeperAPI.fetchMatchData(leagueID, i + 1)
            )
        );
    } catch (error) {
        console.error('Error in fetchMatches:', error);
        throw error;
    };
};

const fetchTransactions = async (leagueID) => {
    try {
        let transactions = [];

        for (let i = 1; i <= 17; i++) {
            const foundTransactions = await sleeperAPI.fetchTransactionData(leagueID, i);

            if (foundTransactions.length !== 0) {
                transactions.push(...foundTransactions);
            };
        };

        return transactions; 
    } catch (error) {
        console.error('Error in fetchTransactions:', error);
        throw error;
    };
};

const fetchUsers = async (leagueID) => {
    try {
       return await sleeperAPI.fetchUserData(leagueID);
    
    } catch (error) {
        console.error('Error in fetchOwners:', error);
        throw error;
    }
};

const fetchRosters = async (leagueID) => {
    try {
        return await sleeperAPI.fetchRosterData(leagueID);

    } catch (error) {
        console.error('Error in fetchRosters:', error);
        throw error;
    };
};

module.exports = {
    fetchLegacyLeague,
}