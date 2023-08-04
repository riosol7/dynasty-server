const { League, Owner } = require("../models")
const { ownerData } = require("../data")
const { leagueHelpers } = require("../helpers")
const { sleeperAPI } = require("../../../../api")

const queryLeague = async () => {
    const [foundOwners, previousLeagues, leagueData] = await Promise.all([
        Owner.find({}, ownerData.ownerFiltered),
        League.find({}),
        sleeperAPI.fetchCurrentLeagueData(),
    ])

    return {
        ...leagueData.currentLeague,
        brackets: leagueData.brackets,
        draft: leagueData.draft,
        history:previousLeagues,
        owners:foundOwners,
    }
}

const queryListOfMatches = async () => {
    return await sleeperAPI.fetchMatches();
}

const queryListOfTransactions = async () => {
    return await leagueHelpers.getTransactionsData();
}

module.exports = {
    queryLeague,
    queryListOfMatches,
    queryListOfTransactions,
}