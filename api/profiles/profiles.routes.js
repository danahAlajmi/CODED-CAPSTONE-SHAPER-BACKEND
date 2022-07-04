const express = require("express");
const router = express.Router();

const { getProfiles } = require("./profiles.controllers");

router.get("/", getProfiles);
module.exports = router;
