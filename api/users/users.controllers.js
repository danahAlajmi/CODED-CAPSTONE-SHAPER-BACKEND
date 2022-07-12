const Session = require("../../models/Session");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("profile");
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
