const express = require("express");
const router = express.Router();
const { playerController } = require("../controllers");

router.get("/", playerController.getPlayers);
router.get("/ktc", playerController.getKTCDynastyRankings);
router.get("/ktc/:path", playerController.getKTCPlayerValues);
router.get("/fantasy_calc", playerController.getFantasyCalcRankings);

module.exports = router;