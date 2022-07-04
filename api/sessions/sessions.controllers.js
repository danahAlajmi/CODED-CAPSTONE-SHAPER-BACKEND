const Session = require("../../models/Session");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (err) {
    next(err);
  }
};

exports.createSession = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
