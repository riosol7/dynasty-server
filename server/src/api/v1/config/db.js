require("dotenv").config()
const mongoose = require("mongoose");

// Error / Disconnection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/Dynasty";
// Connection string (we will be replacing this later with environmental variables)
mongoose.set('strictQuery', false); // Set the strictQuery option to false

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});