const express = require("express");
const router = express.Router();
const { ownerController } = require("../controllers");

router.get("/", ownerController.getOwners);
// router.get("/:id", ownerController.getOwnerById);
router.get("/rosters", ownerController.getRosters);

module.exports = router;