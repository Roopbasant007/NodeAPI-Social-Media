const Post = require("../models/postSchema");
const Reaction = require("../models/reactionSchema");
const Comment = require("../models/commentSchema");

// Create a post
async function createPost(req, res) {
  try {
    const { title, desc } = req.body;

    if (!title || !desc)
      res
        .status(403)
        .json({ message: "A post shouldn't have an empty title and desc" });

    const newPost = new Post({
      userId: req.id,
      title: title,
      desc: desc,
    });

    await newPost.save();

    const postId = String(newPost._id);

    const post = await Post.findOne({ _id: { $eq: postId } });

    // create like table also

    console.log(postId);

    const reactions = new Reaction({
      postId: postId,
    });

    await reactions.save();

    const { comment, likes, unlikes, updatedAt, __v, ...other } = post._doc;

    return res.status(201).json(other);
  } catch (error) {
    console.log(error);
    res.status(501).json("internal Server Error");
  }
}

// Delete a Post

async function deletePost(req, res) {
  try {
    const postId = String(req.params.id);

    await Post.findByIdAndDelete(req.params.id);

    await Reaction.findOneAndDelete({ postId: { $eq: postId } });

    await Commnent.deleteMany({ postId: { $eq: postId } });

    return res
      .status(201)
      .json({ messsage: "Post has been deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal Server Error" });
  }
}

// Like a Post
async function likePost(req, res) {
  if (req.params.id) {
    try {
      const postId = String(req.params.id);

      const reaction = await Reaction.findOne({ postId: { $eq: postId } });

      console.log(reaction.postId);

      if (
        !reaction.likedBy.includes(req.id) &&
        reaction.unlikedBy.includes(req.id)
      ) {
        await reaction.updateOne({ $pull: { unlikedBy: req.id } });
        await reaction.updateOne({ $push: { likedBy: req.id } });

        await Post.updateOne({ _id: postId }, { $inc: { likes: 1 } });
        await Post.updateOne({ _id: postId }, { $inc: { unlikes: -1 } });

        return res.status(201).json({
          message: "You have liked a post which was unliked by you",
        });
      } else if (!reaction.likedBy.includes(req.id)) {
        await reaction.updateOne({ $push: { likedBy: req.id } });

        await Post.updateOne({ _id: postId }, { $inc: { likes: 1 } });
        return res.status(201).json({ message: "Post Has been liked" });
      } else {
        res.status(403).json({ message: "You have already liked this post" });
      }
    } catch (error) {
      console.log(error);
      return res.status(501).json("Internal Server Error");
    }
  } else {
    return res.json({ message: "No such post exist" });
  }
}

// Unlike a Post
async function unlikePost(req, res) {
  if (req.params.id) {
    try {
      const postId = String(req.params.id);

      const reaction = await Reaction.findOne({ postId: { $eq: postId } });

      console.log(reaction.postId);

      if (
        reaction.likedBy.includes(req.id) &&
        !reaction.unlikedBy.includes(req.id)
      ) {
        await reaction.updateOne({ $pull: { likedBy: req.id } });
        await reaction.updateOne({ $push: { unlikedBy: req.id } });

        await Post.updateOne({ _id: postId }, { $inc: { likes: -1 } });
        await Post.updateOne({ _id: postId }, { $inc: { unlikes: 1 } });

        return res.status(201).json({
          message: "You have unliked a post which was liked by you",
        });
      } else if (!reaction.unlikedBy.includes(req.id)) {
        await reaction.updateOne({ $push: { unlikedBy: req.id } });

        await Post.updateOne({ _id: postId }, { $inc: { unlikes: 1 } });
        return res.status(201).json({ message: "Post Has been unliked" });
      } else {
        res.status(403).json({ message: "You have already unliked this post" });
      }
    } catch (error) {
      console.log(error);
      return res.status(501).json("Internal Server Error");
    }
  } else {
    return res.json({ message: "No such post exist" });
  }
}

// Commnent on a Post

async function commentPost(req, res) {
  try {
    const postId = String(req.params.id);
    const comment = req.body.comment;

    console.log(postId, comment);

    if (!postId || !comment) {
      res.status(403).json({
        message: "Either no such post exist or comment field is empty",
      });
    }

    const newComment = new Comment({
      postId: postId,
      comment: comment,
    });

    await newComment.save();

    console.log(newComment._id);

    res.status(201).json({ CommentID: newComment._id });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal Server Error" });
  }
}

// Fetch a post

async function getPost(req, res) {
  try {
    // let comment = [];
    const postId = String(req.params.id);

    const post = await Post.findOne({ _id: { $eq: postId } });

    // create like table also

    console.log(postId);

    const {
      _id,
      userId,
      title,
      desc,
      unlikes,
      createdAt,
      updatedAt,
      __v,
      ...other
    } = post._doc;

    console.log(other);

    return res.status(201).json({ Likes: other.likes });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createPost,
  likePost,
  unlikePost,
  commentPost,
  deletePost,
  getPost,
};
