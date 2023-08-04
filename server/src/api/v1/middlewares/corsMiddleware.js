require("dotenv").config()
const cors = require("cors");

const whiteList = [process.env.REACT_APP_URL || "http://localhost:3000"];

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin || 1==1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by Cors"));
        }
    },
};

module.exports = cors(corsOptions);