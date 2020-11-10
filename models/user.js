const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require('config')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin, name: this.username },
    config.get("jwtPrivatekey"),
    { expiresIn: "1h" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
