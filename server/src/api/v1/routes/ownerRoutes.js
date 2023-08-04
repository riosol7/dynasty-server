const express = require("express");
const router = express.Router();
const { ownerController } = require("../controllers");

router.get("/", ownerController.getOwners);
router.get("/:id", ownerController.getOwnerById);

module.exports = router;