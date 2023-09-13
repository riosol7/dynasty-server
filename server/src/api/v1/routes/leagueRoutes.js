const express = require("express");
const router = express.Router();
const { leagueController } = require("../controllers");

router.get("/:id", leagueController.getLegacyLeague);

module.exports = router;