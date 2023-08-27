const { scriptService } = require("../services");

const getKTC = async (req, res) => {
   const ktcList = await scriptService.queryListOfKTC();
    return res.json(ktcList);
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
    getKTC,
    getSuperflex,
};