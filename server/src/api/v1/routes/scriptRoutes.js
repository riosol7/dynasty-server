const express = require("express");
const router = express.Router();
const { scriptController } = require("../controllers");

router.get("/ktc", scriptController.getKTC);
router.get("/superflex", scriptController.getSuperflex);
router.get("/fantasy_calc", scriptController.getFantasyCalc);

module.exports = router;