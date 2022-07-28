const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  bio: { type: String, default: "" },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  zoomLink: { type: String, default: "" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Profile", ProfileSchema);
