const express = require("express");
const router = express.Router();

const {
  fetchSession,
  getSessions,
  createSession,
  joinSession,
  updateSession,
  deleteSession,
  cancelSession,
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
router.put("/update/:sessionId", updateSession);
router.post("/:sessionId/user/:userId", joinSession);
router.delete("/delete/:sessionId", deleteSession);
router.post("/cancel/:sessionId/:userId", cancelSession);

module.exports = router;
