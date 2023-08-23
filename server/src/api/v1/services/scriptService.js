const { scriptHelpers } = require("../helpers");

const queryListOfKCT = async () => {
    return await scriptHelpers.executeScript('kct');
};

const queryListOfSF = async () => {
    return await scriptHelpers.executeScript('superflex');
}

const queryListOfFC = async () => {
    return await scriptHelpers.executeScript('fantasy_calc');
}

module.exports = {
    queryListOfKCT,
    queryListOfSF,
    queryListOfFC,
}