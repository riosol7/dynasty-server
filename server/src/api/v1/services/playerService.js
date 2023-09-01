const { playerHelpers } = require("../helpers");

const queryListOfPlayers = async () => {
    return await playerHelpers.fetchPlayerData();
}

const queryListOfKTCPlayerValues = async (path) => {
    return await playerHelpers.getKTCPlayerValues(path);
}

const queryListOfKTCDynastyRankings = async () => {
    try {
        return await playerHelpers.scrapeListOfKTCDynastyRankings();
    } catch (error) {
        console.error('Error in queryListOfKTCDynastyRankings:', error);
        throw error;
    }
};

const queryListOfFantasyCalcRankings = async () => {
    try {
        return await playerHelpers.scrapeListOfFantasyCalcRankings();
    } catch (error) {
        console.error('Error in queryListOfFantasyCalcRankings:', error);
        throw error;
    }
}

module.exports = {
    queryListOfKTCDynastyRankings,
    queryListOfKTCPlayerValues,
    queryListOfPlayers,
}