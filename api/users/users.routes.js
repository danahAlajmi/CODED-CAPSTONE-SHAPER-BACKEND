const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  signup,
  getUsers,
  getTrainers,
  signin,
  getReport,
} = require("./users.controllers");

router.get("/", getUsers);
router.get("/trainers", getTrainers);
router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

router.post("/report", getReport);
module.exports = router;
