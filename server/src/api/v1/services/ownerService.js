const { ownerHelpers } = require("../helpers")
const { sleeperAPI } = require("../../../../api");

const queryListOfOwners = async () => {
    return await ownerHelpers.getOwners()
}

const queryListOfRosters = async () => {
    return await await sleeperAPI.fetchRosterData();
}

// const queryOwnerById = async = (id) => {
//     return null
// }

module.exports = {
    queryListOfOwners,
    queryListOfRosters,
    // queryOwnerById,
}