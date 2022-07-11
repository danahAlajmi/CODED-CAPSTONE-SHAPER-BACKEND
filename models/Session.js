const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  title: { type: String, required: true },

  description: { type: String },
  image: {
    type: String,
    default:
      "https://img.freepik.com/free-photo/man-holding-dumbbell-orange-background_438099-4325.jpg",
  },

  date: { type: Number, required: true },

  location: { type: String },
  duration: { type: Number, required: true },
  limit: { type: Number, required: true },

  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Session", SessionSchema);
