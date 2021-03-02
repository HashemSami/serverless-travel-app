var path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const router = require("./router");

app.use(express.static("dist"));

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname);

app.use("/", router);

const port = 8081;
// designates what port the app will listen to for incoming requests
const server = app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

// for testing porposes
module.exports = { server };
