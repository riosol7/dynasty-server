const { playerService } = require("../services");

const getPlayers = async (req, res) => {
    const playerList = await playerService.queryListOfPlayers();
    return res.json(playerList);
};

const getKTCPlayerValues = async (req, res) => {
    const path = req.params.path;
    const data = await playerService.queryListOfKTCValues(path);
    return res.json(data); 
};

module.exports = {
    getKTCPlayerValues,
    getPlayers,
};