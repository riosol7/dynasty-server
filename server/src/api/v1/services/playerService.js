const { playerHelpers } = require("../helpers");
const { sleeperAPI } = require("../../../../api")

const queryListOfPlayers = async () => {
    return await playerHelpers.fetchUpdatedPlayerData();
}

const queryListOfRosters = async () => {
    return await await sleeperAPI.fetchRosterData();
}

module.exports = {
    queryListOfPlayers,
    queryListOfRosters,
}