const express = require("express");
const { participantsRouter } = require("./participants/participants.routes");
const { eventRouter } = require("./events/events.router");

const api = express.Router();

api.use("/participants", participantsRouter);
api.use("/events", eventRouter);

module.exports = api;
