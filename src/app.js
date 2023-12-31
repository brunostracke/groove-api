const express = require("express");
const cors = require("cors");
const api = require("./api/api");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", api);

module.exports = app;
