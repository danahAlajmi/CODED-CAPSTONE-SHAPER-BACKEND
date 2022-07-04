const Session = require("../../models/Session");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    next(err);
  }
};
