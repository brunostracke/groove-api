const express = require("express");
const { getCodes } = require("./participants.controller");

const participantsRouter = express.Router();

participantsRouter.get("/codes/:id", getCodes)

module.exports = {
  participantsRouter
}