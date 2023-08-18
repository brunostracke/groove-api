const express = require("express");
const {getEvents} = require("./events.controller")

const eventRouter = express.Router();

eventRouter.get("/", getEvents)

module.exports = {eventRouter}