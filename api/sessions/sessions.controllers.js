const Session = require("../../models/Session");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

exports.fetchSession = async (sessionId, next) => {
  try {
    const session = await Session.findById(sessionId);
    return session;
  } catch (error) {
    next(error);
  }
};

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
    const newSession = await Session.create(req.body);
    await User.findByIdAndUpdate(req.body.trainer, {
      $push: { owner: newSession._id },
    });
    res.json(newSession);
  } catch (error) {
    next(error);
  }
};
