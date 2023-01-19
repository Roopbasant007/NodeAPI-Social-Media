const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  likedBy: {
    type: Array,
    default: [],
  },
  unlikedBy: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Reaction", reactionSchema);
