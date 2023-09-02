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

const getKTCDynastyRankings = async (req, res) => {
    const ktcList = await playerService.queryListOfKTCDynastyRankings();
    return res.json(ktcList);
}

const getFantasyCalcRankings = async (req, res) => {
    const fcList = await playerService.queryListOfFantasyCalcRankings();
    return res.json(fcList);
}

const getSuperFlexRankings = async (req, res) => {
    const sfList = await playerService.queryListOfSuperFlexRankings();
    return res.json(sfList);
} 

module.exports = {
    getKTCDynastyRankings,
    getKTCPlayerValues,
    getFantasyCalcRankings,
    getSuperFlexRankings,
    getPlayers,
};