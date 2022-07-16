const Session = require("../../models/Session");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const xlsx = require("xlsx");
const path = require("path");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }).populate("profile");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getTrainers = async (req, res, next) => {
  try {
    const trainers = await User.find({ isTrainer: true }).populate("profile");
    res.json(trainers);
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res) => {
  try {
    const foundUser = await User.findById(req.user._id);
    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      isTrainer: foundUser.isTrainer,
      profile: foundUser.profile,
      enrolled: foundUser.enrolled,
      owner: foundUser.owner,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token: token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const newProfile = await Profile.create({ user: newUser._id });
    await User.findByIdAndUpdate(newUser._id, { profile: newProfile._id });

    const payload = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isTrainer: newUser.isTrainer,
      profile: newProfile._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token: token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getReport = async (req, res, next) => {
  try {
    const sessions = await Session.find(
      { participants: req.body._id },
      { _id: 0, image: 0, location: 0, participants: 0, __v: 0, limit: 0 }
    ).populate("trainer");
    // begin

    const workSheetColumnName = [
      "Title",
      "Description",
      "Date",
      "Duration",
      "Trainer",
    ];

    const workSheetName = "Sessions";
    const filePath = `./reports/sessions-${
      Date.now() + "-" + req.body._id
    }.xlsx`;
    const data = sessions.map((session) => {
      return [
        session.title,
        session.description,
        new Date(session.date).toLocaleDateString() +
          " " +
          new Date(session.date).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        session.duration,
        session.trainer.username,
      ];
    });
    const workBook = xlsx.utils.book_new();
    const workSheetData = [workSheetColumnName, ...data];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));

    res.json(sessions);
  } catch (err) {
    next(err);
  }
};
