const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },

  comment: {
    type: String,
    required: true,
    max: 500,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
