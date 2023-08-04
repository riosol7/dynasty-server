const { leagueService } = require("../services");

const getLeague = async (req, res) => {
    const league = await leagueService.queryLeague();
    return res.json(league)
}

const getMatches = async (req, res) => {
    const matchList = await leagueService.queryListOfMatches();
    return res.json(matchList)
}

const getTransactions = async (req, res) => {
    const transactionList = await leagueService.queryListOfTransactions();
    return res.json(transactionList)
}

module.exports = {
    getLeague,
    getMatches,
    getTransactions,
}