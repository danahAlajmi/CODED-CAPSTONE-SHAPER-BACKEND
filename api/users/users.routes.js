const express = require("express");
const router = express.Router();
const { signup, getUsers } = require("./users.controllers");

router.get("/", getUsers);

router.post("/signup", signup);
module.exports = router;
