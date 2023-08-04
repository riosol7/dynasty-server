const { playerService } = require("../services");

const getPlayers = async (req, res) => {
    const playerList = await playerService.queryListOfPlayers();
    return res.json(playerList)
}

const getRosters = async (req, res) => {
    const rosterList = await playerService.queryListOfRosters();
    return res.json(rosterList)
}

module.exports = {
    getPlayers,
    getRosters
}