const express = require("express");
const router = express.Router();
const { leagueController } = require("../controllers");

router.get("/", leagueController.getLeague);
router.get("/matches", leagueController.getMatches);
router.get("/transactions", leagueController.getTransactions);

module.exports = router;