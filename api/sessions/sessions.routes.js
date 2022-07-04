const express = require("express");
const router = express.Router();

const { getSessions, createSession } = require("./sessions.controllers");

router.get("/", getSessions);
router.post("/create", createSession);
module.exports = router;
