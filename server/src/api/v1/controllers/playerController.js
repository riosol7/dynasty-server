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

const getDynastyProcessRankings = async (req, res) => {
    const dpList = await playerService.queryListOfDynastyProcessRankings();
    return res.json(dpList);
} 

const getFantasyPro = async (req, res) => {
    const fpList = await playerService.queryListOfFantasyPro();
    return res.json(fpList);
} 

module.exports = {
    getDynastyProcessRankings,
    getKTCDynastyRankings,
    getKTCPlayerValues,
    getFantasyCalcRankings,
    getFantasyPro,
    getSuperFlexRankings,
    getPlayers,
};