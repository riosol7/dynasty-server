const { sleeperAPI } = require("../../../../api")

async function getTransactionsData() {
    // let pagination = 1;
    let transactions = [];

    for (let i = 1; i <= 17; i++) {
        const foundTransactions = await sleeperAPI.fetchTransactions(i);

        if (foundTransactions.length !== 0) {
            transactions.push(...foundTransactions);
        }
    }
    return transactions;
}

module.exports = { getTransactionsData }