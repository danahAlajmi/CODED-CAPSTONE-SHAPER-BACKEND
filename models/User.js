const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isTrainer: { type: Boolean, required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
});

module.exports = mongoose.model("User", UserSchema);
