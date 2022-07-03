const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  title: { type: String, required: true },

  description: { type: String },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  },

  date: { type: Number, required: true },

  location: { type: String, required: true },
  duration: { type: Number, required: true },
  limit: { type: Number, required: true },

  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Session", SessionSchema);
