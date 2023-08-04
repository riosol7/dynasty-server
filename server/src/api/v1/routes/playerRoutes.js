const express = require("express");
const router = express.Router();
const { playerController } = require("../controllers");

router.get("/", playerController.getPlayers);
router.get("/roster", playerController.getRosters);

module.exports = router;