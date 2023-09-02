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

const queryListOfSuperFlexRankings = async () => {
    try {
        return await playerHelpers.scrapeListOfSuperFlexRankings();
    } catch (error) {
        console.error('Error in queryListOfSuperFlexRankings:', error);
        throw error;
    }
}

const queryListOfDynastyProcessRankings = async () => {
    try {
        return await playerHelpers.scrapeListOfDynastyProcessRankings();
    } catch (error) {
        console.error('Error in queryListOfDynastyProcessRankings:', error);
        throw error;
    }
}

const queryListOfFantasyPro = async () => {
    try {
        return await playerHelpers.scrapeListOfFantasyPro();
    } catch (error) {
        console.error('Error in queryListOfFantasyPro:', error);
        throw error;
    }
}

module.exports = {
    queryListOfKTCDynastyRankings,
    queryListOfDynastyProcessRankings,
    queryListOfKTCPlayerValues,
    queryListOfFantasyCalcRankings,
    queryListOfFantasyPro,
    queryListOfSuperFlexRankings,
    queryListOfPlayers,
}