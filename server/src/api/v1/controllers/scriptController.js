const { scriptService } = require("../services");

const getKCT = async (req, res) => {
   const kctList = await scriptService.queryListOfKCT();
    return res.json(kctList);
};

const getSuperflex = async (req, res) => {
    const sfList = await scriptService.queryListOfSF();
    return res.json(sfList);
};

const getFantasyCalc = async (req, res) => {
    const fcList = await scriptService.queryListOfFC();
    return res.json(fcList);
};

module.exports = {
    getFantasyCalc,
    getKCT,
    getSuperflex,
};