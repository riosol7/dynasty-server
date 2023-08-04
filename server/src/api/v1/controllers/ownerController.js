const { ownerService } = require("../services");

const getOwners = async (req, res) => {
    const ownerList = await ownerService.queryListOfOwners();
    return res.json(ownerList)
}

const getOwnerById = async (req, res) => {
    id = req.params.id
    const owner = await ownerService.getOwnerById();
    return res.json(owner)
}

module.exports = {
    getOwners,
    getOwnerById,
}