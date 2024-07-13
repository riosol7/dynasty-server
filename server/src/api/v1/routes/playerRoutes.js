const express = require("express");
const router = express.Router();
const { playerController } = require("../controllers");

router.get("/", playerController.getPlayers);
router.get("/ktc", playerController.getKTCDynastyRankings);
router.get("/ktc/:path", playerController.getKTCPlayerValues);
router.get("/fantasy_calc", playerController.getFantasyCalcRankings);
// router.get("/superFlex", playerController.getSuperFlexRankings);
router.get("/dynastyProcess", playerController.getDynastyProcessRankings);
router.get("/fantasyPro", playerController.getFantasyPro);

module.exports = router;