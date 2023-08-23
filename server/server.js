require("dotenv").config()
const express = require("express");
const app = express();

require("./src/api/v1/config/db")
const { corsMiddleware, methodOverrideMiddleware } = require("./src/api/v1/middlewares");
const routes = require("./src/api/v1/routes");

const port = process.env.PORT || 5000;

app.use(corsMiddleware);
app.use(methodOverrideMiddleware);
app.use(express.json());

app.use("/owners", routes.ownerRoutes);
app.use("/players", routes.playerRoutes);
app.use("/league", routes.leagueRoutes);
app.use("/scripts", routes.scriptRoutes);

app.listen(port, () => {
    console.log(`DynastyDB is running on port ${port}`)
})