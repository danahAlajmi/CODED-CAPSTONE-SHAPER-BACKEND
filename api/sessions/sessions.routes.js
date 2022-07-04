const express = require("express");
const router = express.Router();

const {
  fetchSession,
  getSessions,
  createSession,
} = require("./sessions.controllers");

router.param("sessionId", async (req, res, next, sessionId) => {
  const session = await fetchSession(sessionId, next);
  if (session) {
    req.session = session;
    next();
  } else {
    const err = new Error("Session Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", getSessions);
router.post("/create", createSession);
module.exports = router;
