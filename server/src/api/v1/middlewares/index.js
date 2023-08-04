const corsMiddleware = require("./corsMiddleware");
const methodOverrideMiddleware = require ("./methodOverrideMiddleware");

module.exports = {
    corsMiddleware,
    methodOverrideMiddleware
}