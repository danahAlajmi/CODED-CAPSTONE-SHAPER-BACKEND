const express = require("express");
const router = express.Router();
const { signup, getUsers, getTrainers } = require("./users.controllers");

router.get("/", getUsers);
router.get("/trainers", getTrainers);
router.post("/signup", signup);
module.exports = router;
