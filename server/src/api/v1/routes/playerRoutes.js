const express = require("express");
const router = express.Router();
const { playerController } = require("../controllers");

router.get("/", playerController.getPlayers);
router.get("/rosters", playerController.getRosters);
router.get("/ktc/:path", playerController.getKTCPlayerValues);

module.exports = router;