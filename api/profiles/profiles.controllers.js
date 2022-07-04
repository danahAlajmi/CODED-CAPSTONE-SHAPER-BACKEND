const Profile = require("../../models/Profile");

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findById(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const updateProfile = await Profile.findByIdAndUpdate(
      req.profile.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updateProfile);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
