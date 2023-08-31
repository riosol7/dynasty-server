const { playerHelpers } = require("../helpers");

const queryListOfPlayers = async () => {
    return await playerHelpers.fetchPlayerData();
}

const queryListOfKTCValues = async (path) => {
    return await playerHelpers.scrapeKTCPlayerValues(path);
}

module.exports = {
    queryListOfKTCValues,
    queryListOfPlayers,
}