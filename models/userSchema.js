const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      match: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
    },

    password: {
      type: String,
      required: true,
      min: 6,
    },

    followers: {
      type: Number,
      default: 0,
    },

    following: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
