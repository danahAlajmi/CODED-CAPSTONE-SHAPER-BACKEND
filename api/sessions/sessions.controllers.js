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

exports.joinSession = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { enrolled: req.session.id },
      new: true,
    });
    const updatedSession = await Session.findByIdAndUpdate(req.session.id, {
      $push: { participants: userId },
      new: true,
    });
    res.status(200).json(updatedSession);
  } catch (error) {
    next(error);
  }
};
// session id 62c302925b49abb902fc776e
// user id 62c44c7cc5d2f07a6ba7088a
