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

const getRosters = async (req, res) => {
    const rosterList = await ownerService.queryListOfRosters();
    return res.json(rosterList);
};

module.exports = {
    getOwners,
    getOwnerById,
    getRosters,
}