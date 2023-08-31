const { scriptHelpers } = require("../helpers");

const queryListOfKTC = async () => {
    try {
        return await scriptHelpers.executeScript('ktc');
    } catch (error) {
        console.error('Error in queryListOfKTC:', error);
        throw error;
    }
};

const queryListOfSF = async () => {
    try {
        return await scriptHelpers.executeScript('superflex');
    } catch (error) {
        console.error('Error in queryListOfSuperFlex:', error);
        throw error;
    }
}

const queryListOfFC = async () => {
    try {
        return await scriptHelpers.executeScript('fantasy_calc');
    } catch (error) {
        console.error('Error in queryListOfFantasyCalc:', error);
        throw error;
    }
}

module.exports = {
    queryListOfKTC,
    queryListOfSF,
    queryListOfFC,
}