const userRouter = require("express").Router();
const verifyJWT = require("../middlewares/verifyJWT");

// get user profile
const getUserProfile = require("../contollers/getUserProfileContollers");

// follow and unfollow user
const {
  followRequest,
  unFollowRequest,
} = require("../contollers/followContollers");

// create, del, like and unile etc for POST.
const {
  createPost,
  likePost,
  unlikePost,
  commentPost,
  deletePost,
  getPost,
} = require("../contollers/postContollers");

userRouter.get("/user", verifyJWT, getUserProfile);
userRouter.post("/follow/:id", verifyJWT, followRequest);
userRouter.post("/unfollow/:id", verifyJWT, unFollowRequest);

// User Router for Post
userRouter.post("/posts", verifyJWT, createPost);
userRouter.post("/like/:id", verifyJWT, likePost);
userRouter.post("/unlike/:id", verifyJWT, unlikePost);
userRouter.post("/comment/:id", verifyJWT, commentPost);
userRouter.post("/posts/delete/:id", verifyJWT, deletePost);
userRouter.get("/posts/:id", verifyJWT, getPost);

module.exports = userRouter;
