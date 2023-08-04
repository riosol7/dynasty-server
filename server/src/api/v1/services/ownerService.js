const { ownerHelpers } = require("../helpers")

const queryListOfOwners = async () => {
    return await ownerHelpers.getOwners()
}

const queryOwnerById = async = (id) => {
    return null
}

module.exports = {
    queryListOfOwners,
    queryOwnerById,
}