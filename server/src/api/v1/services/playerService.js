const { playerHelpers } = require("../helpers");

const queryListOfPlayers = async () => {
    try {
        return await playerHelpers.fetchPlayerData();
    } catch (error) {
        console.error('Error in queryListOfPlayers:\n', error);
        throw error;
    }
}

const queryListOfKTCPlayerValues = async (path) => {
    try {
        return await playerHelpers.getKTCPlayerValues(path);
    } catch (error) {
        console.error('Error in queryListOfKTCPlayerValues:\n', error);
        throw error;
    };
};

const queryListOfKTCDynastyRankings = async () => {
    try {
        return await playerHelpers.scrapeListOfKTCDynastyRankings();
    } catch (error) {
        console.error('Error in queryListOfKTCDynastyRankings:\n', error);
        throw error;
    }
};

const queryListOfFantasyCalcRankings = async () => {
    try {
        return await playerHelpers.scrapeListOfFantasyCalcRankings();
    } catch (error) {
        console.error('Error in queryListOfFantasyCalcRankings:\n', error);
        throw error;
    }
}

const queryListOfDynastyProcessRankings = async () => {
    try {
        return await playerHelpers.scrapeListOfDynastyProcessRankings();
    } catch (error) {
        console.error('Error in queryListOfDynastyProcessRankings:\n', error);
        throw error;
    }
}

const queryListOfFantasyPro = async () => {
    try {
        return await playerHelpers.scrapeListOfFantasyPro();
    } catch (error) {
        console.error('Error in queryListOfFantasyPro:\n', error);
        throw error;
    }
}

module.exports = {
    queryListOfKTCDynastyRankings,
    queryListOfDynastyProcessRankings,
    queryListOfKTCPlayerValues,
    queryListOfFantasyCalcRankings,
    queryListOfFantasyPro,
    queryListOfPlayers,
}