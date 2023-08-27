const { scriptHelpers } = require("../helpers");

const queryListOfKTC = async () => {
    return await scriptHelpers.executeScript('ktc');
};

const queryListOfSF = async () => {
    return await scriptHelpers.executeScript('superflex');
}

const queryListOfFC = async () => {
    return await scriptHelpers.executeScript('fantasy_calc');
}

module.exports = {
    queryListOfKTC,
    queryListOfSF,
    queryListOfFC,
}